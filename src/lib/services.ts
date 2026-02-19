import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { draftMode } from 'next/headers'
import { cache } from 'react'

import type { Media, Service, ServicePageSetting } from '@/payload-types'

import { getMediaUrl } from '@/utilities/getMediaUrl'

export interface ServiceProcessStep {
  detail: string
  title: string
}

export interface ServiceListItem {
  deliverables: string[]
  description: string
  focusPoints: string[]
  image: string
  imageAlt: string
  intro: string
  path: string
  processFlow: ServiceProcessStep[]
  slug: string
  step: string
  title: string
}

export interface ServicePageSettingsView {
  detailSectionTitles: {
    deliverablesTitle: string
    focusPointsTitle: string
    processFlowTitle: string
  }
  effectiveSolutions: {
    badge: string
    description: string
    readMoreLabel: string
    title: string
  }
  listCta: {
    buttonHref: string
    buttonLabel: string
    description: string
    title: string
  }
  listHero: {
    badge: string
    description: string
    title: string
  }
  notFound: {
    buttonLabel: string
    description: string
    title: string
  }
  sidebar: {
    guideCard: {
      description: string
      linkHref: string
      linkLabel: string
      title: string
    }
    questionCard: {
      ctaHref: string
      ctaLabel: string
      description: string
      phone: string
      title: string
    }
    servicesLabel: string
  }
}

const defaultServicePageSettings: ServicePageSettingsView = {
  detailSectionTitles: {
    deliverablesTitle: 'Teslimatlar',
    focusPointsTitle: 'Bu Hizmette Odaklandığımız Alanlar',
    processFlowTitle: 'Çalışma Akışı',
  },
  effectiveSolutions: {
    badge: 'Leading',
    description:
      'İşletmenin dijital yolculuğunu doğru sırayla, doğru hedefle ve sürdürülebilir etkiyle ilerleten 4 temel çözüm alanı.',
    readMoreLabel: 'Read More',
    title: 'Effective Solutions',
  },
  listCta: {
    buttonHref: '/iletisim',
    buttonLabel: 'Iletisim Formuna Git',
    description: 'Hizmet kapsamini isletmeniz icin birlikte netlestirelim.',
    title: 'Siradaki adim icin iletisime gecelim',
  },
  listHero: {
    badge: 'Hizmetlerimiz',
    description:
      'Dijital sureclerinizi sadece uygulamaya degil, isletme hedeflerine baglayan 4 temel hizmet adimi.',
    title: 'Planli, Olculebilir ve Sonuca Odakli Hizmetler',
  },
  notFound: {
    buttonLabel: 'Hizmetlere Dön',
    description: 'Aradığınız hizmet sayfası mevcut değil.',
    title: 'Hizmet bulunamadı',
  },
  sidebar: {
    guideCard: {
      description:
        'Operasyonel verim ve ekip uyumunu artırmak için kullanılan temel yaklaşım başlıklarını tek bir rehberde topladık.',
      linkHref: '/sss',
      linkLabel: 'Rehberi İncele',
      title: 'A Complete Guide to Employee Engagement',
    },
    questionCard: {
      ctaHref: '/iletisim',
      ctaLabel: 'İletişime Geç',
      description: 'İşletmeniz için hangi hizmetin öncelikli olduğuna birlikte karar verelim.',
      phone: '+90 555 555 55 55',
      title: 'Have Questions?',
    },
    servicesLabel: 'Hizmetlerimiz',
  },
}

const resolveMedia = (image: Service['image']) => {
  if (!image || typeof image !== 'object') {
    return {
      alt: '',
      url: '',
    }
  }

  const typedImage = image as Media

  return {
    alt: typedImage.alt || '',
    url: getMediaUrl(typedImage.url),
  }
}

const getIsDraftEnabled = async (): Promise<boolean> => {
  try {
    const { isEnabled } = await draftMode()
    return isEnabled
  } catch {
    return false
  }
}

const queryServices = cache(async (): Promise<Service[]> => {
  const draft = await getIsDraftEnabled()
  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'services',
    depth: 1,
    draft,
    limit: 1000,
    overrideAccess: draft,
    pagination: false,
    sort: 'order',
  })

  return result.docs
})

const queryServiceSettings = cache(async (): Promise<ServicePageSetting | null> => {
  const draft = await getIsDraftEnabled()
  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'service-page-settings',
    depth: 0,
    draft,
    limit: 1,
    overrideAccess: draft,
    pagination: false,
    where: {
      key: {
        equals: 'default',
      },
    },
  })

  return result.docs[0] || null
})

const mapService = (service: Service, index: number): ServiceListItem => {
  const media = resolveMedia(service.image)

  return {
    deliverables: service.deliverables?.map((item) => item.text).filter(Boolean) || [],
    description: service.description,
    focusPoints: service.focusPoints?.map((item) => item.text).filter(Boolean) || [],
    image: media.url,
    imageAlt: media.alt || service.title,
    intro: service.intro,
    path: `/hizmetlerimiz/${service.slug}`,
    processFlow: service.processFlow || [],
    slug: service.slug,
    step: String(index + 1).padStart(2, '0'),
    title: service.title,
  }
}

const mapSettings = (settings: ServicePageSetting | null): ServicePageSettingsView => {
  if (!settings) {
    return defaultServicePageSettings
  }

  return {
    detailSectionTitles: {
      deliverablesTitle:
        settings.detailSectionTitles?.deliverablesTitle ||
        defaultServicePageSettings.detailSectionTitles.deliverablesTitle,
      focusPointsTitle:
        settings.detailSectionTitles?.focusPointsTitle ||
        defaultServicePageSettings.detailSectionTitles.focusPointsTitle,
      processFlowTitle:
        settings.detailSectionTitles?.processFlowTitle ||
        defaultServicePageSettings.detailSectionTitles.processFlowTitle,
    },
    effectiveSolutions: {
      badge:
        settings.effectiveSolutions?.badge || defaultServicePageSettings.effectiveSolutions.badge,
      description:
        settings.effectiveSolutions?.description ||
        defaultServicePageSettings.effectiveSolutions.description,
      readMoreLabel:
        settings.effectiveSolutions?.readMoreLabel ||
        defaultServicePageSettings.effectiveSolutions.readMoreLabel,
      title:
        settings.effectiveSolutions?.title || defaultServicePageSettings.effectiveSolutions.title,
    },
    listCta: {
      buttonHref: settings.listCta?.buttonHref || defaultServicePageSettings.listCta.buttonHref,
      buttonLabel: settings.listCta?.buttonLabel || defaultServicePageSettings.listCta.buttonLabel,
      description: settings.listCta?.description || defaultServicePageSettings.listCta.description,
      title: settings.listCta?.title || defaultServicePageSettings.listCta.title,
    },
    listHero: {
      badge: settings.listHero?.badge || defaultServicePageSettings.listHero.badge,
      description:
        settings.listHero?.description || defaultServicePageSettings.listHero.description,
      title: settings.listHero?.title || defaultServicePageSettings.listHero.title,
    },
    notFound: {
      buttonLabel:
        settings.notFound?.buttonLabel || defaultServicePageSettings.notFound.buttonLabel,
      description:
        settings.notFound?.description || defaultServicePageSettings.notFound.description,
      title: settings.notFound?.title || defaultServicePageSettings.notFound.title,
    },
    sidebar: {
      guideCard: {
        description:
          settings.sidebar?.guideCard?.description ||
          defaultServicePageSettings.sidebar.guideCard.description,
        linkHref:
          settings.sidebar?.guideCard?.linkHref ||
          defaultServicePageSettings.sidebar.guideCard.linkHref,
        linkLabel:
          settings.sidebar?.guideCard?.linkLabel ||
          defaultServicePageSettings.sidebar.guideCard.linkLabel,
        title:
          settings.sidebar?.guideCard?.title || defaultServicePageSettings.sidebar.guideCard.title,
      },
      questionCard: {
        ctaHref:
          settings.sidebar?.questionCard?.ctaHref ||
          defaultServicePageSettings.sidebar.questionCard.ctaHref,
        ctaLabel:
          settings.sidebar?.questionCard?.ctaLabel ||
          defaultServicePageSettings.sidebar.questionCard.ctaLabel,
        description:
          settings.sidebar?.questionCard?.description ||
          defaultServicePageSettings.sidebar.questionCard.description,
        phone:
          settings.sidebar?.questionCard?.phone ||
          defaultServicePageSettings.sidebar.questionCard.phone,
        title:
          settings.sidebar?.questionCard?.title ||
          defaultServicePageSettings.sidebar.questionCard.title,
      },
      servicesLabel:
        settings.sidebar?.servicesLabel || defaultServicePageSettings.sidebar.servicesLabel,
    },
  }
}

export async function getServicesList(): Promise<ServiceListItem[]> {
  const services = await queryServices()

  return services.map(mapService)
}

export async function getServiceBySlug(slug: string | undefined): Promise<ServiceListItem | null> {
  if (!slug) {
    return null
  }

  const services = await getServicesList()

  return services.find((service) => service.slug === slug) || null
}

export async function getServicePageSettings(): Promise<ServicePageSettingsView> {
  const settings = await queryServiceSettings()

  return mapSettings(settings)
}

export async function getServiceDataBundle(): Promise<{
  services: ServiceListItem[]
  settings: ServicePageSettingsView
}> {
  const [services, settings] = await Promise.all([getServicesList(), getServicePageSettings()])

  return {
    services,
    settings,
  }
}
