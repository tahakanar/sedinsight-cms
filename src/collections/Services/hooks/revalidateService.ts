import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'

import { revalidatePath } from 'next/cache'

import type { Service } from '@/payload-types'

const revalidateServicePaths = (slug?: string | null) => {
  revalidatePath('/')
  revalidatePath('/hizmetler')

  if (slug) {
    revalidatePath(`/hizmetler/${slug}`)
  }
}

export const revalidateService: CollectionAfterChangeHook<Service> = ({
  doc,
  previousDoc,
  req: { payload, context },
}) => {
  if (!context.disableRevalidate) {
    payload.logger.info('Revalidating service paths')

    if (doc._status === 'published') {
      revalidateServicePaths(doc.slug)
    } else {
      revalidateServicePaths()
    }

    if (previousDoc?._status === 'published' && previousDoc.slug !== doc.slug) {
      revalidateServicePaths(previousDoc.slug)
    }

    if (previousDoc?._status === 'published' && doc._status !== 'published') {
      revalidateServicePaths(previousDoc.slug)
    }
  }

  return doc
}

export const revalidateServiceDelete: CollectionAfterDeleteHook<Service> = ({
  doc,
  req: { context },
}) => {
  if (!context.disableRevalidate) {
    revalidateServicePaths(doc?.slug)
  }

  return doc
}
