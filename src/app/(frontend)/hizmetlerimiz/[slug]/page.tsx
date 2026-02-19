import ServiceDetailPageClient from './page.client'

import { getServiceDataBundle, getServicesList } from '@/lib/services'

type Args = {
  params: Promise<{
    slug?: string
  }>
}

export async function generateStaticParams() {
  const services = await getServicesList()

  return services.map((service) => ({
    slug: service.slug,
  }))
}

export default async function ServiceDetailPage({ params: paramsPromise }: Args) {
  const { slug = '' } = await paramsPromise
  const decodedSlug = decodeURIComponent(slug)

  const { services, settings } = await getServiceDataBundle()
  const service = services.find((item) => item.slug === decodedSlug) || null

  return (
    <ServiceDetailPageClient
      service={service}
      services={services}
      settings={settings}
      slug={decodedSlug}
    />
  )
}
