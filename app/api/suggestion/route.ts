import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

// Initialize Resend with the API key from environment variables
const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  try {
    const { name, contact, subject, type, message } = await req.json();

    // Basic validation
    if (!subject || !type || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // The email address where you want to receive the submissions
    const adminEmail = 'pptsbpbangi@gmail.com';

    // Send the email using Resend
    const { data, error } = await resend.emails.send({
      from: 'Website Form <onboarding@resend.dev>',
      to: adminEmail,
      subject: `New ${type}: ${subject}`,
      reply_to: contact || undefined,
      html: `
        <p>You have received a new <strong>${type}</strong> from your website.</p>
        <hr>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Details:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
        <hr>
        <p><strong>Submitted by:</strong> ${name || 'Anonymous'}</p>
        <p><strong>Contact Info:</strong> ${contact || 'Not provided'}</p>
      `,
    });

    if (error) {
      console.error('Resend API Error:', error);
      return NextResponse.json({ error: 'Error sending submission' }, { status: 500 });
    }

    return NextResponse.json({ message: 'Submission sent successfully!' }, { status: 200 });
  } catch (error) {
    console.error('Server Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
