import { Resend } from 'resend';
import { type NextRequest, NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
    try {
        const { email } = await req.json();

        if (!email || !email.includes('@')) {
            return NextResponse.json({ error: "Valid email required" }, { status: 400 });
        }

        // replace with your real Audience ID:
        const AUDIENCE_ID = "d375bcb4-e954-4c39-8f1d-2f382706688e";

        // add contact to Resend audience
        const { data, error } = await resend.contacts.create({
            email,
            audienceId: AUDIENCE_ID,
        });

        if (error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        }

        return NextResponse.json({ success: true, contact: data });
    } catch (e) {
        return NextResponse.json({ error: "Server error: " + e }, { status: 500 });
    }
}
