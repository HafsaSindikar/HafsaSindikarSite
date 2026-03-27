import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  // We only accept POST requests to this API endpoint
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const { name, email, subject, message } = req.body;

    // A quick check to ensure all fields are filled
    if (!name || !email || !subject || !message) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Send the email
    // 'onboarding@resend.dev' allows you to test sending emails TO the email address you signed up with.
    // Once deployed, you can verify a domain on Resend and change this 'from' address.
    const data = await resend.emails.send({
      from: 'Portfolio Contact <onboarding@resend.dev>',
      to: ['hafsasindikar@gmail.com'], // The email you want to receive messages at
      reply_to: email, // This allows you to directly reply to the user's email from your inbox
      subject: `New Portfolio Message: ${subject}`,
      html: `
        <h3>New Contact Form Submission</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <br />
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
    });

    // Send a 200 Success response back to the frontend
    return res.status(200).json({ success: true, data });
  } catch (error) {
    console.error('Error sending email:', error);
    return res.status(500).json({ error: 'Internal Server Error', message: error.message });
  }
}
