import { createLocalReq, getPayload } from 'payload'
import { headers } from 'next/headers'

import config from '@payload-config'
import { seedServicesOnly } from '@/endpoints/seed/services-only'

export const maxDuration = 60

export async function POST(): Promise<Response> {
  const payload = await getPayload({ config })
  const requestHeaders = await headers()

  const { user } = await payload.auth({ headers: requestHeaders })

  if (!user) {
    return Response.json(
      { error: 'Action forbidden. Please login to admin first.', success: false },
      { status: 403 },
    )
  }

  try {
    const payloadReq = await createLocalReq({ user }, payload)

    await seedServicesOnly({ payload, req: payloadReq })

    return Response.json({ success: true })
  } catch (e) {
    const errorMessage = e instanceof Error ? e.message : 'Unknown error'
    payload.logger.error({ err: e, msg: 'Error seeding services-only data' })
    return Response.json(
      {
        error: 'Error seeding services-only data.',
        message: errorMessage,
        success: false,
      },
      { status: 500 },
    )
  }
}
