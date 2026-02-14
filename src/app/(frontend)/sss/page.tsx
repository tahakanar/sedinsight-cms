import configPromise from '@payload-config'
import { getPayload } from 'payload'

import FAQClient, { type FAQItem } from './FAQClient'

const loadFAQItems = async (): Promise<FAQItem[]> => {
  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'faq-items',
    depth: 0,
    limit: 100,
    overrideAccess: false,
    pagination: false,
    select: {
      answer: true,
      question: true,
    },
    sort: 'order',
  })

  return result.docs.map(({ answer, question }) => ({
    answer,
    question,
  }))
}

export default async function FAQPage() {
  const faqs = await loadFAQItems()

  return <FAQClient faqs={faqs} />
}
