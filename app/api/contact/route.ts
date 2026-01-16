import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

// Initialize Resend with the API key from environment variables
const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  try {
    const { name, email, subject, message } = await req.json();

    // Basic validation
    if (!name || !email || !subject || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // The email address where you want to receive the form submissions
    // IMPORTANT: Replace this with your actual admin email address
    const adminEmail = 'pptsbpbangi@gmail.com';

    // Send the email using Resend
    const { data, error } = await resend.emails.send({
      from: 'Contact Form <onboarding@resend.dev>', // This must be a verified domain in Resend, 'onboarding@resend.dev' is for testing
      to: adminEmail,
      subject: `New Contact Form Submission: ${subject}`,
      replyTo: email,
      html: `
        <p>You have received a new message from your website's contact form.</p>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `,
    });

    if (error) {
      console.error('Resend API Error:', error);
      return NextResponse.json({ error: 'Error sending email' }, { status: 500 });
    }

    return NextResponse.json({ message: 'Email sent successfully!' }, { status: 200 });
  } catch (error) {
    console.error('Server Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
