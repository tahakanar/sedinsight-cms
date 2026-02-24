import type { GlobalConfig } from 'payload'

import { authenticated } from '../access/authenticated'
import { anyone } from '../access/anyone'
import { generatePreviewPath } from '../utilities/generatePreviewPath'

export const AboutUs: GlobalConfig = {
  slug: 'about-us',
  access: {
    read: anyone,
    update: authenticated,
  },
  admin: {
    livePreview: {
      url: ({ data, req }) =>
        generatePreviewPath({
          slug: 'hakkimizda',
          collection: 'about' as any,
          req,
        }),
    },
    preview: (data, { req }) =>
      generatePreviewPath({
        slug: 'hakkimizda',
        collection: 'about' as any,
        req,
      }),
  },
  fields: [
    // Hero Section
    {
      type: 'group',
      name: 'hero',
      label: 'Hero Bölümü',
      fields: [
        {
          name: 'badge',
          type: 'text',
          label: 'Badge Metni',
          defaultValue: 'Hakkımızda',
          required: true,
        },
        {
          name: 'title',
          type: 'text',
          label: 'Başlık',
          defaultValue: 'Dijital Dönüşümde Güvenilir Ortağınız',
          required: true,
        },
        {
          name: 'titleHighlight',
          type: 'text',
          label: 'Vurgulu Başlık (Teal renk)',
          defaultValue: 'Güvenilir Ortağınız',
        },
        {
          name: 'description',
          type: 'textarea',
          label: 'Açıklama',
          defaultValue:
            'İşletmenizi geleceğe taşıyacak yenilikçi çözümler sunuyor, dijital dünyadaki potansiyelinizi en üst düzeye çıkarıyoruz.',
          required: true,
        },
      ],
    },

    // Who We Are Section
    {
      type: 'group',
      name: 'whoWeAre',
      label: 'Biz Kimiz Bölümü',
      fields: [
        {
          name: 'badge',
          type: 'text',
          label: 'Badge Metni',
          defaultValue: 'Biz Kimiz?',
        },
        {
          name: 'title',
          type: 'text',
          label: 'Başlık',
          defaultValue: 'Deneyim ve Teknolojinin Buluşma Noktası',
          required: true,
        },
        {
          name: 'paragraphs',
          type: 'array',
          label: 'Paragraflar',
          minRows: 1,
          maxRows: 5,
          fields: [
            {
              name: 'text',
              type: 'textarea',
              label: 'Paragraf Metni',
              required: true,
            },
          ],
        },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          label: 'Görsel',
        },
        {
          name: 'mission',
          type: 'group',
          label: 'Misyon',
          fields: [
            {
              name: 'title',
              type: 'text',
              label: 'Başlık',
              defaultValue: 'Misyonumuz',
              required: true,
            },
            {
              name: 'description',
              type: 'textarea',
              label: 'Açıklama',
              defaultValue: 'İşletmeleri dijital çağın gereksinimlerine hazırlamak.',
              required: true,
            },
          ],
        },
        {
          name: 'vision',
          type: 'group',
          label: 'Vizyon',
          fields: [
            {
              name: 'title',
              type: 'text',
              label: 'Başlık',
              defaultValue: 'Vizyonumuz',
              required: true,
            },
            {
              name: 'description',
              type: 'textarea',
              label: 'Açıklama',
              defaultValue: 'Sektörde öncü ve yenilikçi bir teknoloji şirketi olmak.',
              required: true,
            },
          ],
        },
      ],
    },

    // Stats Section
    {
      type: 'array',
      name: 'stats',
      label: 'İstatistikler',
      minRows: 3,
      maxRows: 6,
      fields: [
        {
          name: 'value',
          type: 'text',
          label: 'Değer',
          required: true,
          admin: {
            description: 'Örn: 50+, %99, 10+',
          },
        },
        {
          name: 'label',
          type: 'text',
          label: 'Etiket',
          required: true,
          admin: {
            description: 'Örn: Tamamlanan Proje, Müşteri Memnuniyeti',
          },
        },
      ],
    },

    // Features / Why Choose Us
    {
      type: 'group',
      name: 'whyChooseUs',
      label: 'Neden Biz Bölümü',
      fields: [
        {
          name: 'badge',
          type: 'text',
          label: 'Badge Metni',
          defaultValue: 'Neden Biz?',
        },
        {
          name: 'title',
          type: 'text',
          label: 'Başlık',
          defaultValue: 'Sizi Rakiplerinizden Öne Çıkarıyoruz',
          required: true,
        },
        {
          name: 'titleHighlight',
          type: 'text',
          label: 'Vurgulu Başlık (Teal renk)',
          defaultValue: 'Öne Çıkarıyoruz',
        },
        {
          name: 'features',
          type: 'array',
          label: 'Özellikler',
          minRows: 2,
          maxRows: 8,
          fields: [
            {
              name: 'icon',
              type: 'select',
              label: 'İkon',
              required: true,
              options: [
                { label: 'Lightbulb (İnovasyon)', value: 'lightbulb' },
                { label: 'Users (Ekip)', value: 'users' },
                { label: 'Zap (Hız)', value: 'zap' },
                { label: 'Award (Başarı)', value: 'award' },
                { label: 'Target (Hedef)', value: 'target' },
                { label: 'CheckCircle (Onay)', value: 'checkCircle' },
              ],
            },
            {
              name: 'title',
              type: 'text',
              label: 'Başlık',
              required: true,
            },
            {
              name: 'description',
              type: 'textarea',
              label: 'Açıklama',
              required: true,
            },
          ],
        },
      ],
    },
  ],
}
