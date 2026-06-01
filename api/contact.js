import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export default async function handler(req, res) {
  console.log('[contact] method:', req.method)

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  console.log('[contact] raw body:', req.body)

  const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body
  const { name, email, organization, message } = body || {}

  console.log('[contact] parsed:', { name, email, organization, message })

  if (!name || !email) {
    console.log('[contact] missing name or email')
    return res.status(400).json({ error: 'Name and email are required' })
  }

  console.log('[contact] API key present:', !!process.env.RESEND_API_KEY)

  try {
    const result = await resend.emails.send({
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

    console.log('[contact] Resend result:', JSON.stringify(result))
    return res.status(200).json({ success: true })
  } catch (error) {
    console.error('[contact] Resend error:', error)
    return res.status(500).json({ error: error.message })
  }
}
