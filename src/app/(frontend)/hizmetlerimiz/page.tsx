import ServicesPageClient from './page.client'

import { getServiceDataBundle } from '@/lib/services'

export default async function ServicesPage() {
  const { services, settings } = await getServiceDataBundle()

  return <ServicesPageClient services={services} settings={settings} />
}
