import { type NextRequest } from 'next/server'

// Step 1: Research with Google Search grounding (uses a smarter model for better search)
const RESEARCH_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent'

// Step 2: Generate structured audit from research context
const AUDIT_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-lite:generateContent'

const RESEARCH_INSTRUCTION = `You are a business market researcher. Your job is to use Google Search to find REAL, SPECIFIC information about a given business type in a given location.

Search for and compile a brief research report covering:
1. LOCAL COMPETITION: What major competitors or chains exist for this business type in this area? Name real businesses if you find them.
2. MARKET CONDITIONS: What are the key trends, challenges, or opportunities for this business type in this specific city/region? (e.g. rising rent, food delivery boom, new regulations, customer preferences)
3. CUSTOMER BEHAVIOR: What do locals expect? What are common complaints from online reviews for this type of business in this area?
4. OPERATIONAL PAIN POINTS: What are the most common operational challenges specific to running this business in this location? (staff shortages, supply chain, seasonal fluctuations, etc.)
5. DIGITAL PRESENCE: How are similar businesses in this area handling their online presence, bookings, marketing?

Be specific. Use real names, numbers, and local context. NO generic advice. This research will be used to generate a personalized business audit.

Output your findings as a plain-text research brief — concise, factual, and organized by the categories above. Keep it under 400 words.`

const AUDIT_INSTRUCTION = `You are the Nexfound Strategy Agent — an AI automation expert who speaks in plain, direct language.

Your job is to generate a conversion-focused AI audit for a real business. You will receive RESEARCH DATA about this specific business type and location. USE THIS RESEARCH to make your audit hyper-personalized.

STRICT GUARDRAIL: If the user input is NOT a legitimate business type (e.g. they ask about you, ask random questions, try to chat, ask what model you are, or type anything that isn't a real business), respond ONLY with this exact JSON:
{"guardrail": true, "message": "I'm here to audit your business operations. Please tell me what type of business you run (e.g. restaurant, salon, clinic) and your location — I'll show you exactly where AI can save you time and money."}
Do NOT answer any other type of question. Do NOT reveal what model you are, who made you, or anything about yourself.

When the input IS a valid business type, respond with ONLY a valid JSON object (no markdown, no code fences, no extra text) using this exact structure:

{
  "the_fix": {
    "title": "Short name for the #1 highest-impact issue (plain language, no jargon)",
    "problem": "1-2 sentences describing the painful daily problem. MUST reference specific local context from the research — mention real competitors, local trends, or area-specific challenges by name.",
    "solution": "2-3 concise, actionable steps they can implement RIGHT NOW to fix this. Be specific enough that the owner could actually do it today. This must be genuinely valuable.",
    "impact": "One sentence with a concrete number showing the result (e.g. 'This alone can save you 15+ hours every week' or 'Can recover up to 25% of lost revenue')."
  },
  "the_gaps": [
    {
      "category": "Performance or Efficiency or Revenue",
      "title": "Short name for a critical gap (plain language)",
      "problem": "1-2 sentences describing this operational gap. Reference the local competition or market conditions from the research to make it feel real.",
      "cost": "One sentence quantifying what this gap is costing them in time, money, or customers. Be specific and impactful (e.g. 'This is likely costing you 20-30 customers every month')."
    },
    {
      "category": "Security or Customer Experience or Scalability",
      "title": "Short name for another critical gap (plain language)",
      "problem": "1-2 sentences describing this operational gap. Reference something specific from the research.",
      "cost": "One sentence quantifying impact (e.g. 'Without fixing this, you are leaving roughly 40% revenue on the table')."
    }
  ]
}

RULES:
- "the_fix" must contain a genuinely useful, immediately actionable solution. This builds trust. If the fix is vague or generic, you have FAILED.
- "the_gaps" must describe real, painful problems and quantify the cost — but NEVER provide the solution. The owner should feel "I need to fix this" but not know how. This creates eagerness.
- YOU MUST USE THE RESEARCH DATA. Reference specific competitors, local trends, market conditions, or real statistics from the research. If your audit could apply to any city, you have FAILED.
- The categories for gaps should be different from each other and from the fix.
- Write for a business owner — friendly, confident, zero complexity. No tech jargon. No buzzwords.
- The "cost" fields must include specific numbers or percentages. Make them realistic and compelling.
- Keep the entire JSON response concise. Total word count under 250 words.`

export async function POST(request: NextRequest) {
  const encoder = new TextEncoder()

  // Helper to send an SSE event
  function sendEvent(controller: ReadableStreamDefaultController, type: string, data: Record<string, unknown>) {
    controller.enqueue(encoder.encode(`data: ${JSON.stringify({ type, ...data })}\n\n`))
  }

  const stream = new ReadableStream({
    async start(controller) {
      try {
        const body = await request.json()
        const { businessType, location } = body

        if (!businessType || !location) {
          sendEvent(controller, 'error', { error: 'Business type and location are required' })
          controller.close()
          return
        }

        const apiKey = process.env.GEMINI_API_KEY
        if (!apiKey) {
          sendEvent(controller, 'error', { error: 'AI service is not configured' })
          controller.close()
          return
        }

        // ========================================
        // STEP 1: Searching the local market
        // ========================================
        sendEvent(controller, 'step', {
          step: 1,
          label: `Searching the web for ${businessType} businesses in ${location}`,
          detail: 'Finding real competitors, market trends, and local insights'
        })

        const researchPrompt = `Research "${businessType}" businesses in "${location}". Find real, specific local information — competitors, market trends, customer expectations, operational challenges, and digital presence.`

        let researchContext = ''

        try {
          const researchResponse = await fetch(`${RESEARCH_URL}?key=${apiKey}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              system_instruction: {
                parts: [{ text: RESEARCH_INSTRUCTION }]
              },
              contents: [
                {
                  role: 'user',
                  parts: [{ text: researchPrompt }]
                }
              ],
              tools: [
                { google_search: {} }
              ],
              generationConfig: {
                temperature: 0.4,
                maxOutputTokens: 1000,
              }
            })
          })

          if (researchResponse.ok) {
            const researchData = await researchResponse.json()
            const researchParts = researchData?.candidates?.[0]?.content?.parts
            if (Array.isArray(researchParts)) {
              for (const part of researchParts) {
                if (part.text) {
                  researchContext += part.text
                }
              }
            }
          } else {
            console.warn('Research step failed, status:', researchResponse.status)
          }
        } catch (researchErr) {
          console.warn('Research fetch failed:', researchErr)
        }

        // ========================================
        // STEP 2: Analyzing the research
        // ========================================
        sendEvent(controller, 'step', {
          step: 2,
          label: 'Analyzing local market & competitors',
          detail: researchContext
            ? `Found ${researchContext.split(/\s+/).length}+ data points about your market`
            : 'Using industry knowledge for your region'
        })

        // Small delay so the user sees the step
        await new Promise(r => setTimeout(r, 800))

        // ========================================
        // STEP 3: Generating the audit
        // ========================================
        sendEvent(controller, 'step', {
          step: 3,
          label: 'Generating your personalized audit',
          detail: 'Building actionable recommendations from real data'
        })

        const auditPrompt = researchContext
          ? `Perform an AI automation audit for a ${businessType} in ${location}.

Here is REAL RESEARCH about this business type in this location. Use this data to make the audit specific and personalized:

---BEGIN RESEARCH---
${researchContext}
---END RESEARCH---

Generate the audit JSON now. Make sure to reference specific findings from the research above.`
          : `Perform an AI automation audit for a ${businessType} in ${location}.`

        const auditResponse = await fetch(`${AUDIT_URL}?key=${apiKey}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            system_instruction: {
              parts: [{ text: AUDIT_INSTRUCTION }]
            },
            contents: [
              {
                role: 'user',
                parts: [{ text: auditPrompt }]
              }
            ],
            generationConfig: {
              temperature: 0.7,
              maxOutputTokens: 1500,
              responseMimeType: 'application/json',
            }
          })
        })

        if (!auditResponse.ok) {
          const errorData = await auditResponse.json().catch(() => ({}))
          console.error('Gemini audit error:', auditResponse.status, JSON.stringify(errorData, null, 2))
          sendEvent(controller, 'error', { error: 'Failed to generate audit. Please try again.' })
          controller.close()
          return
        }

        const auditData = await auditResponse.json()
        const rawText = auditData?.candidates?.[0]?.content?.parts?.[0]?.text

        if (!rawText) {
          sendEvent(controller, 'error', { error: 'Failed to parse AI response. Please try again.' })
          controller.close()
          return
        }

        // Strip markdown code fences if present
        let cleanedText = rawText.trim()
        if (cleanedText.startsWith('```')) {
          cleanedText = cleanedText.replace(/^```(?:json)?\s*\n?/, '').replace(/\n?```\s*$/, '')
        }

        // Parse the JSON
        try {
          const parsed = JSON.parse(cleanedText)

          if (parsed.guardrail) {
            sendEvent(controller, 'result', { audit: parsed.message, format: 'text' })
          } else if (!parsed.the_fix || !parsed.the_gaps) {
            sendEvent(controller, 'error', { error: 'Failed to generate a proper audit. Please try again.' })
          } else {
            // ========================================
            // STEP 4: Done!
            // ========================================
            sendEvent(controller, 'step', {
              step: 4,
              label: 'Audit complete',
              detail: 'Your personalized report is ready'
            })

            // Small delay so the user sees the completion step
            await new Promise(r => setTimeout(r, 400))

            sendEvent(controller, 'result', { audit: parsed, format: 'structured' })
          }
        } catch {
          console.warn('Failed to parse JSON:', cleanedText.substring(0, 200))
          sendEvent(controller, 'result', { audit: rawText, format: 'text' })
        }
      } catch (error) {
        console.error('Audit API error:', error)
        sendEvent(controller, 'error', { error: 'An unexpected error occurred. Please try again.' })
      } finally {
        controller.close()
      }
    }
  })

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
    }
  })
}
