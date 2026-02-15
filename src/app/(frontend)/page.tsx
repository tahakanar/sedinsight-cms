import HomeClient from './page.client'

import { getServiceDataBundle } from '@/lib/services'

export default async function Home() {
  const { services, settings } = await getServiceDataBundle()

  return <HomeClient services={services} effectiveSolutions={settings.effectiveSolutions} />
}
