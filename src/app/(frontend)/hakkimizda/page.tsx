import { getServiceDataBundle } from '@/lib/services'
import AboutUsPageClient from './page.client'

export default async function AboutUsPage() {
  await getServiceDataBundle() // Or remove this line entirely if not needed, but keeping it in case it triggers some necessary server-side fetch caching

  return <AboutUsPageClient />
}
