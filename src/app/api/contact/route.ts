import { Resend } from 'resend'
import { type NextRequest, NextResponse } from 'next/server'
import { client } from '@/sanity/lib/client'
import { settingsQuery } from '@/app/lib/queries'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, company, message } = body

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required' },
        { status: 400 }
      )
    }

    const [settings] = await Promise.all([
      client.fetch(settingsQuery, {}, { cache: "no-cache" }),
    ]);




    // Send email
    console.log('Contact form submission:', { name, email, company, message })
    console.log('Sending to:', settings?.contactEmail)
    console.log('Using API key:', process.env.RESEND_API_KEY?.substring(0, 10) + '...')

    const { data, error } = await resend.emails.send({
      from: 'Nexfound Contact Form <hello@nexfound.in>', // Use verified custom domain
      to: [settings?.contactEmail],
      replyTo: email, // User's email for easy reply
      subject: `New Contact Form Submission from ${name}`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background: linear-gradient(135deg, #B08D57 0%, #F4E6C0 100%); padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
              .header h1 { margin: 0; color: #000; font-size: 24px; }
              .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 8px 8px; }
              .field { margin-bottom: 20px; }
              .field-label { font-weight: bold; color: #B08D57; margin-bottom: 5px; }
              .field-value { background: white; padding: 10px; border-radius: 4px; border-left: 3px solid #B08D57; }
              .footer { text-align: center; margin-top: 20px; color: #888; font-size: 12px; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1>📧 New Contact Form Submission</h1>
              </div>
              <div class="content">
                <div class="field">
                  <div class="field-label">Name:</div>
                  <div class="field-value">${name}</div>
                </div>
                
                <div class="field">
                  <div class="field-label">Email:</div>
                  <div class="field-value"><a href="mailto:${email}">${email}</a></div>
                </div>
                
                ${company ? `
                <div class="field">
                  <div class="field-label">Company:</div>
                  <div class="field-value">${company}</div>
                </div>
                ` : ''}
                
                <div class="field">
                  <div class="field-label">Message:</div>
                  <div class="field-value">${message.replace(/\n/g, '<br>')}</div>
                </div>
              </div>
              <div class="footer">
                <p>This email was sent from the Nexfound contact form</p>
                <p>Reply directly to this email to respond to ${name}</p>
              </div>
            </div>
          </body>
        </html>
      `,
    })


    if (error) {
      console.error('Resend error:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ success: true, id: data?.id })
  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json(
      { error: 'Failed to send email' },
      { status: 500 }
    )
  }
}