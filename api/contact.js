import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body
  const { name, email, organization, message } = body || {}

  if (!name || !email) {
    return res.status(400).json({ error: 'Name and email are required' })
  }

  try {
    await resend.emails.send({
      from: 'Pran Contact Form <founders@pran.green>',
      to: 'founders@pran.green',
      replyTo: email,
      subject: `New pilot enquiry from ${name}`,
      html: `
        <h2>New pilot enquiry</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Organization:</strong> ${organization || '—'}</p>
        <p><strong>Message:</strong></p>
        <p>${message || '—'}</p>
      `,
    })

    return res.status(200).json({ success: true })
  } catch (error) {
    return res.status(500).json({ error: 'Failed to send email' })
  }
}
