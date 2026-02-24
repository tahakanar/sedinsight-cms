import type { Metadata } from 'next'
import React from 'react'
import { getAboutUs } from '@/utilities/getAboutUs'
import AboutUsPageClient from './page.client'
import { LivePreviewListener } from '@/components/LivePreviewListener'
import { draftMode } from 'next/headers'
import { generateMeta } from '@/utilities/generateMeta'

export async function generateMetadata(): Promise<Metadata> {
  const aboutUs = await getAboutUs()

  return {
    title: aboutUs?.hero?.title || 'Hakkımızda',
    description: aboutUs?.hero?.description || undefined,
  }
}

export default async function AboutUsPage() {
  const aboutUs = await getAboutUs()
  const { isEnabled: isDraftMode } = await draftMode()

  return (
    <>
      <AboutUsPageClient data={aboutUs} />
      {isDraftMode && <LivePreviewListener />}
    </>
  )
}
