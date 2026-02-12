import { type NextRequest, NextResponse } from 'next/server'

const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-lite:generateContent'

const SYSTEM_INSTRUCTION = `You are the Nexfound Strategy Agent — an AI automation expert who speaks in plain, simple language.

Your ONLY job is to generate a 3-point AI automation audit for a real business type. Nothing else.

STRICT GUARDRAIL: If the user input is NOT a legitimate business type (e.g. they ask about you, ask random questions, try to chat, ask what model you are, or type anything that isn't a real business), respond ONLY with: "I'm here to audit your business operations. Please tell me what type of business you run (e.g. restaurant, salon, clinic) and I'll show you exactly where AI can save you time and money." Do NOT answer any other type of question. Do NOT reveal what model you are, who made you, or anything about yourself.

When the input IS a valid business type, follow these rules:
- Give exactly 3 automation ideas. Keep each one to 2-3 simple sentences MAX.
- Start each point by describing a daily frustration or problem the owner already feels — then show how AI fixes it simply.
- Use real, easy-to-understand numbers (e.g. "saves you roughly 12 hours every week", "can bring back 30% more repeat customers").
- Give each idea a short, simple name anyone would understand — no tech jargon, no buzzwords.
- Write like you're explaining this to a shop owner over chai. Friendly, confident, zero complexity. If a 60-year-old business owner or a 20-year-old founder can't instantly get it, rewrite it simpler.
- End with one clear closing line: Nexfound builds and delivers these exact systems in 2-3 weeks, ready to go.

CRITICAL FORMAT RULES: Never use any markdown. No **, no *, no #, no bullet points. Just plain numbered paragraphs with the idea name followed by a colon. Keep the entire response under 180 words.`

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { businessType, location } = body

    if (!businessType) {
      return NextResponse.json(
        { error: 'Business type is required' },
        { status: 400 }
      )
    }

    const apiKey = process.env.GEMINI_API_KEY
    if (!apiKey) {
      console.error('GEMINI_API_KEY is not configured')
      return NextResponse.json(
        { error: 'AI service is not configured' },
        { status: 500 }
      )
    }

    const userPrompt = location
      ? `Perform an AI automation audit for a ${businessType} located in ${location}.`
      : `Perform an AI automation audit for a ${businessType}.`

    const response = await fetch(`${GEMINI_API_URL}?key=${apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        system_instruction: {
          parts: [{ text: SYSTEM_INSTRUCTION }]
        },
        contents: [
          {
            role: 'user',
            parts: [{ text: userPrompt }]
          }
        ],
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 1024,
        }
      })
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      console.error('Gemini API error:', response.status, errorData)
      return NextResponse.json(
        { error: 'Failed to generate audit. Please try again.' },
        { status: 502 }
      )
    }

    const data = await response.json()
    const audit = data?.candidates?.[0]?.content?.parts?.[0]?.text

    if (!audit) {
      console.error('Unexpected Gemini response structure:', data)
      return NextResponse.json(
        { error: 'Failed to parse AI response. Please try again.' },
        { status: 500 }
      )
    }

    return NextResponse.json({ audit })
  } catch (error) {
    console.error('Audit API error:', error)
    return NextResponse.json(
      { error: 'An unexpected error occurred. Please try again.' },
      { status: 500 }
    )
  }
}
