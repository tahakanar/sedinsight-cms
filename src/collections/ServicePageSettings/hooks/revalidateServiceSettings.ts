import type { CollectionAfterChangeHook, CollectionAfterDeleteHook, PayloadRequest } from 'payload'

import { revalidatePath } from 'next/cache'

import type { ServicePageSetting } from '@/payload-types'

const revalidateSharedPaths = () => {
  revalidatePath('/')
  revalidatePath('/hizmetler')
}

const revalidatePublishedServiceDetailPaths = async (req: PayloadRequest) => {
  const services = await req.payload.find({
    collection: 'services',
    depth: 0,
    limit: 1000,
    overrideAccess: true,
    pagination: false,
    req,
    where: {
      _status: {
        equals: 'published',
      },
    },
  })

  for (const service of services.docs) {
    revalidatePath(`/hizmetlerimiz/${service.slug}`)
  }
}

export const revalidateServiceSettings: CollectionAfterChangeHook<ServicePageSetting> = async ({
  doc,
  req,
}) => {
  if (!req.context.disableRevalidate) {
    req.payload.logger.info('Revalidating service settings paths')

    revalidateSharedPaths()
    await revalidatePublishedServiceDetailPaths(req)
  }

  return doc
}

export const revalidateServiceSettingsDelete: CollectionAfterDeleteHook<
  ServicePageSetting
> = async ({ doc, req }) => {
  if (!req.context.disableRevalidate) {
    revalidateSharedPaths()
    await revalidatePublishedServiceDetailPaths(req)
  }

  return doc
}
