import type { CollectionSlug, File, Payload, PayloadRequest } from 'payload'

import { promises as fs } from 'fs'
import path from 'path'

import { servicePageSettingsSeed } from './service-page-settings'
import { serviceImagesSeed, servicesSeed } from './services'

const serviceCollections: CollectionSlug[] = ['services', 'service-page-settings']

export const seedServicesOnly = async ({
  payload,
  req,
}: {
  payload: Payload
  req: PayloadRequest
}): Promise<void> => {
  payload.logger.info('Seeding services only...')

  await Promise.all(
    serviceCollections.map((collection) => payload.db.deleteMany({ collection, req, where: {} })),
  )

  await Promise.all(
    serviceCollections
      .filter((collection) => Boolean(payload.collections[collection].config.versions))
      .map((collection) => payload.db.deleteVersions({ collection, req, where: {} })),
  )

  const serviceImageAlts = Object.values(serviceImagesSeed).map((item) => item.alt)

  const existingServiceImages = await payload.find({
    collection: 'media',
    depth: 0,
    limit: 100,
    overrideAccess: true,
    pagination: false,
    req,
    where: {
      alt: {
        in: serviceImageAlts,
      },
    },
  })

  await Promise.all(
    existingServiceImages.docs
      .filter((doc) => Boolean(doc?.id))
      .map((doc) =>
        payload.delete({
          collection: 'media',
          id: doc.id,
          overrideAccess: true,
          req,
        }),
      ),
  )

  const serviceImageMap: Record<string, number> = {}

  for (const [key, imageData] of Object.entries(serviceImagesSeed)) {
    const file = await fetchFileByPath(imageData.filePath)

    const imageDoc = await payload.create({
      collection: 'media',
      data: {
        alt: imageData.alt,
      },
      file,
    })

    if (typeof imageDoc?.id !== 'number') {
      throw new Error(`Service image create failed for key: ${key}`)
    }

    serviceImageMap[key] = imageDoc.id
  }

  for (const service of servicesSeed) {
    const imageId = serviceImageMap[service.imageKey]

    if (!imageId) {
      throw new Error(`Missing seeded media id for service image key: ${service.imageKey}`)
    }

    await payload.create({
      collection: 'services',
      context: {
        disableRevalidate: true,
      },
      data: {
        _status: 'published',
        deliverables: service.deliverables.map((text) => ({ text })),
        description: service.description,
        focusPoints: service.focusPoints.map((text) => ({ text })),
        image: imageId,
        intro: service.intro,
        order: service.order,
        processFlow: service.processFlow,
        slug: service.slug,
        title: service.title,
      },
      overrideAccess: false,
      req,
    })
  }

  await payload.create({
    collection: 'service-page-settings',
    context: {
      disableRevalidate: true,
    },
    data: {
      _status: 'published',
      ...servicePageSettingsSeed,
    },
    overrideAccess: false,
    req,
  })

  payload.logger.info('Services-only seed completed successfully!')
}

async function fetchFileByPath(filePath: string): Promise<File> {
  const absolutePath = path.resolve(process.cwd(), filePath)
  const data = await fs.readFile(absolutePath)
  const ext = path.extname(filePath).replace('.', '').toLowerCase()

  const mimeByExtension: Record<string, string> = {
    jpg: 'image/jpeg',
    jpeg: 'image/jpeg',
    png: 'image/png',
    webp: 'image/webp',
  }

  return {
    name: path.basename(filePath),
    data,
    mimetype: mimeByExtension[ext] || 'application/octet-stream',
    size: data.byteLength,
  }
}
