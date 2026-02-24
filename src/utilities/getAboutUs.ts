import type { AboutUs } from '@/payload-types'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { draftMode } from 'next/headers'
import { cache } from 'react'

const getIsDraftEnabled = async (): Promise<boolean> => {
  try {
    const { isEnabled } = await draftMode()
    return isEnabled
  } catch {
    return false
  }
}

const queryAboutUs = cache(async (): Promise<AboutUs> => {
  const draft = await getIsDraftEnabled()
  const payload = await getPayload({ config: configPromise })

  const aboutUs = await payload.findGlobal({
    slug: 'about-us',
    depth: 1,
    draft,
    overrideAccess: draft,
  })

  return aboutUs
})

export async function getAboutUs(): Promise<AboutUs> {
  return await queryAboutUs()
}
