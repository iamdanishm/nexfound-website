import { Resend } from 'resend'
import { type NextRequest, NextResponse } from 'next/server'
import { client } from '@/sanity/lib/client'
import { settingsQuery } from '@/app/lib/queries'
import { promises as fs } from 'fs'
import path from 'path'

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

    // Read and process email template
    const templatePath = path.join(process.cwd(), 'src/app/api/contact/email-template.html')
    let htmlTemplate = await fs.readFile(templatePath, 'utf-8')

    // Replace placeholders
    const timestamp = new Date().toLocaleString('en-US', {
      timeZone: 'Asia/Kolkata',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    })

    htmlTemplate = htmlTemplate
      .replace(/\{\{name\}\}/g, name)
      .replace(/\{\{email\}\}/g, email)
      .replace(/\{\{message\}\}/g, message.replace(/\n/g, '<br>'))
      .replace(/\{\{timestamp\}\}/g, timestamp)

    // Handle optional company field
    if (company) {
      htmlTemplate = htmlTemplate
        .replace(/\{\{#company\}\}/g, '')
        .replace(/\{\{\/company\}\}/g, '')
        .replace(/\{\{company\}\}/g, company)
    } else {
      // Remove the company section if no company provided
      const companyRegex = /\{\{#company\}\}[\s\S]*?\{\{\/company\}\}/g
      htmlTemplate = htmlTemplate.replace(companyRegex, '')
    }

    const { data, error } = await resend.emails.send({
      from: 'Nexfound Contact Form <hello@send.nexfound.in>', // Use verified custom domain
      to: [settings?.contactEmail],
      replyTo: email, // User's email for easy reply
      subject: `New Contact Form Submission from ${name}`,
      html: htmlTemplate,
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