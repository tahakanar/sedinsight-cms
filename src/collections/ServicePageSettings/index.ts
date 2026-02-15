import type { CollectionConfig } from 'payload'

import { authenticated } from '@/access/authenticated'
import { authenticatedOrPublished } from '@/access/authenticatedOrPublished'

import {
  revalidateServiceSettings,
  revalidateServiceSettingsDelete,
} from './hooks/revalidateServiceSettings'

export const ServicePageSettings: CollectionConfig<'service-page-settings'> = {
  slug: 'service-page-settings',
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticatedOrPublished,
    update: authenticated,
  },
  admin: {
    defaultColumns: ['key', 'updatedAt'],
    useAsTitle: 'key',
  },
  fields: [
    {
      name: 'key',
      type: 'text',
      defaultValue: 'default',
      index: true,
      required: true,
      unique: true,
    },
    {
      name: 'listHero',
      type: 'group',
      fields: [
        {
          name: 'badge',
          type: 'text',
          required: true,
        },
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'description',
          type: 'textarea',
          required: true,
        },
      ],
    },
    {
      name: 'listCta',
      type: 'group',
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'description',
          type: 'textarea',
          required: true,
        },
        {
          name: 'buttonLabel',
          type: 'text',
          required: true,
        },
        {
          name: 'buttonHref',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'detailSectionTitles',
      type: 'group',
      fields: [
        {
          name: 'focusPointsTitle',
          type: 'text',
          required: true,
        },
        {
          name: 'deliverablesTitle',
          type: 'text',
          required: true,
        },
        {
          name: 'processFlowTitle',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'sidebar',
      type: 'group',
      fields: [
        {
          name: 'servicesLabel',
          type: 'text',
          required: true,
        },
        {
          name: 'guideCard',
          type: 'group',
          fields: [
            {
              name: 'title',
              type: 'text',
              required: true,
            },
            {
              name: 'description',
              type: 'textarea',
              required: true,
            },
            {
              name: 'linkLabel',
              type: 'text',
              required: true,
            },
            {
              name: 'linkHref',
              type: 'text',
              required: true,
            },
          ],
        },
        {
          name: 'questionCard',
          type: 'group',
          fields: [
            {
              name: 'title',
              type: 'text',
              required: true,
            },
            {
              name: 'description',
              type: 'textarea',
              required: true,
            },
            {
              name: 'phone',
              type: 'text',
              required: true,
            },
            {
              name: 'ctaLabel',
              type: 'text',
              required: true,
            },
            {
              name: 'ctaHref',
              type: 'text',
              required: true,
            },
          ],
        },
      ],
    },
    {
      name: 'notFound',
      type: 'group',
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'description',
          type: 'textarea',
          required: true,
        },
        {
          name: 'buttonLabel',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'effectiveSolutions',
      type: 'group',
      fields: [
        {
          name: 'badge',
          type: 'text',
          required: true,
        },
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'description',
          type: 'textarea',
          required: true,
        },
        {
          name: 'readMoreLabel',
          type: 'text',
          required: true,
        },
      ],
    },
  ],
  hooks: {
    afterChange: [revalidateServiceSettings],
    afterDelete: [revalidateServiceSettingsDelete],
  },
  versions: {
    drafts: {
      autosave: {
        interval: 100,
      },
      schedulePublish: true,
    },
    maxPerDoc: 50,
  },
}
