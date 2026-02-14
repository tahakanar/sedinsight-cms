import { getPayload } from 'payload'
import { z } from 'zod'

import configPromise from '@payload-config'

const contactFormSchema = z.object({
  fullName: z.string().trim().min(3),
  companyName: z.string().trim().min(2),
  email: z.string().trim().email(),
  phone: z.string().trim().min(10),
  sector: z.string().trim().min(1),
  supportTopics: z.array(z.string().trim().min(1)).min(1),
})

type ContactFormInput = z.infer<typeof contactFormSchema>

const escapeHtml = (value: string): string =>
  value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;')

const createTextContent = (data: ContactFormInput): string => {
  return [
    'Yeni iletisim formu talebi alindi.',
    '',
    `Ad Soyad: ${data.fullName}`,
    `Sirket/Isletme: ${data.companyName}`,
    `E-posta: ${data.email}`,
    `Telefon: ${data.phone}`,
    `Sektor: ${data.sector}`,
    `Destek konulari: ${data.supportTopics.join(', ')}`,
  ].join('\n')
}

const createHtmlContent = (data: ContactFormInput): string => {
  return `
    <h2>Yeni iletisim formu talebi alindi</h2>
    <ul>
      <li><strong>Ad Soyad:</strong> ${escapeHtml(data.fullName)}</li>
      <li><strong>Sirket/Isletme:</strong> ${escapeHtml(data.companyName)}</li>
      <li><strong>E-posta:</strong> ${escapeHtml(data.email)}</li>
      <li><strong>Telefon:</strong> ${escapeHtml(data.phone)}</li>
      <li><strong>Sektor:</strong> ${escapeHtml(data.sector)}</li>
      <li><strong>Destek konulari:</strong> ${escapeHtml(data.supportTopics.join(', '))}</li>
    </ul>
  `
}

export async function POST(req: Request): Promise<Response> {
  let body: unknown

  try {
    body = await req.json()
  } catch {
    return Response.json({ message: 'Gecersiz istek govdesi.' }, { status: 400 })
  }

  const result = contactFormSchema.safeParse(body)

  if (!result.success) {
    return Response.json({ message: 'Form verileri gecersiz.' }, { status: 400 })
  }

  if (!process.env.RESEND_API_KEY) {
    return Response.json({ message: 'Mail servisi yapilandirilmamis.' }, { status: 500 })
  }
  if (!process.env.RESEND_FROM_EMAIL) {
    return Response.json(
      {
        message: 'RESEND_FROM_EMAIL eksik. Resend verified domain adresi tanimlanmali.',
      },
      { status: 500 },
    )
  }

  const payload = await getPayload({ config: configPromise })
  const data = result.data
  const senderEmail = process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev'
  const recipientEmail = process.env.CONTACT_FORM_TO_EMAIL || 'sedakanar@sedinsight.com'

  try {
    await payload.sendEmail({
      to: recipientEmail,
      subject: `Yeni Talep - ${data.fullName}`,
      replyTo: data.email,
      text: createTextContent(data),
      html: createHtmlContent(data),
    })

    return Response.json({ success: true })
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    const resendDomainHint =
      senderEmail.endsWith('@resend.dev') || senderEmail.endsWith('.resend.dev')
        ? 'RESEND_FROM_EMAIL su an test domaininde. Farkli alicilara gondermek icin verified domain kullanmalisin.'
        : undefined

    payload.logger.error(
      {
        err: error,
        errorMessage,
        senderEmail,
        recipientEmail,
      },
      'Contact email could not be sent',
    )

    return Response.json(
      {
        message: 'E-posta gonderimi basarisiz.',
        debug:
          process.env.NODE_ENV === 'production'
            ? undefined
            : {
                errorMessage,
                hint: resendDomainHint,
              },
      },
      { status: 500 },
    )
  }
}
