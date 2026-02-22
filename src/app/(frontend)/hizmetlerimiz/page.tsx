import type { Metadata } from 'next'

import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { cache } from 'react'

import { generateMeta } from '@/utilities/generateMeta'
import { getServiceDataBundle } from '@/lib/services'
import ServicesPageClient from './page.client'

export default async function ServicesPage() {
  const { services, settings } = await getServiceDataBundle()

  return <ServicesPageClient services={services} settings={settings} />
}

export async function generateMetadata(): Promise<Metadata> {
  const page = await queryPageBySlug('hizmetlerimiz')
  return generateMeta({ doc: page })
}

const queryPageBySlug = cache(async (slug: string) => {
  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'pages',
    limit: 1,
    pagination: false,
    overrideAccess: false,
    where: {
      slug: {
        equals: slug,
      },
    },
  })

  console.log('result, meta', result.docs?.[0]?.meta)
  console.log('result, hero', result.docs?.[0]?.hero.richText?.root?.children?.[0]?.children)
  console.log('result, layout', result.docs?.[0]?.layout)
  console.log('result, docs', result.docs)
  return result.docs?.[0] || null
})
