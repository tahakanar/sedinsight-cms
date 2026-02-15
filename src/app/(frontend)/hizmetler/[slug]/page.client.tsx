'use client'

import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'

import type { ServiceListItem, ServicePageSettingsView } from '@/lib/services'

import Layout from '../../components/Layout'
import ServiceDetailLayout from '../../components/ServiceDetailLayout'

function ServiceArticle({
  sectionTitles,
  service,
}: {
  sectionTitles: ServicePageSettingsView['detailSectionTitles']
  service: ServiceListItem
}) {
  return (
    <article className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-3xl border border-[#0f2a44]/10 bg-white p-7 shadow-[0_12px_30px_rgba(15,42,68,0.08)]"
      >
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
          <div className="size-20 rounded-2xl bg-[#f2f8fa] p-2 shrink-0">
            <img src={service.image} alt={service.imageAlt || service.title} className="w-full h-full object-contain" />
          </div>
          <p className="text-gray-dark/80 text-lg leading-relaxed">{service.intro}</p>
        </div>
      </motion.div>

      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="rounded-3xl border border-[#0f2a44]/10 bg-white p-7 shadow-[0_12px_30px_rgba(15,42,68,0.08)]"
      >
        <h2 className="font-['Bricolage_Grotesque'] text-3xl font-black text-navy">
          {sectionTitles.focusPointsTitle}
        </h2>
        <ul className="mt-5 grid sm:grid-cols-2 gap-3">
          {service.focusPoints.map((point) => (
            <li
              key={point}
              className="rounded-xl bg-[#f4f8fb] px-4 py-3 text-sm text-gray-dark font-medium"
            >
              {point}
            </li>
          ))}
        </ul>
      </motion.section>

      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="rounded-3xl border border-[#0f2a44]/10 bg-white p-7 shadow-[0_12px_30px_rgba(15,42,68,0.08)]"
      >
        <h2 className="font-['Bricolage_Grotesque'] text-3xl font-black text-navy">
          {sectionTitles.deliverablesTitle}
        </h2>
        <div className="mt-5 space-y-3">
          {service.deliverables.map((item) => (
            <div
              key={item}
              className="rounded-xl border border-teal/15 bg-teal/5 px-4 py-3 text-sm font-semibold text-navy"
            >
              {item}
            </div>
          ))}
        </div>
      </motion.section>

      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="rounded-3xl border border-[#0f2a44]/10 bg-white p-7 shadow-[0_12px_30px_rgba(15,42,68,0.08)]"
      >
        <h2 className="font-['Bricolage_Grotesque'] text-3xl font-black text-navy">
          {sectionTitles.processFlowTitle}
        </h2>
        <div className="mt-6 space-y-4">
          {service.processFlow.map((step, index) => (
            <div key={`${step.title}-${index}`} className="flex gap-4 items-start">
              <div className="mt-0.5 size-8 rounded-full bg-teal/15 text-teal text-sm font-black flex items-center justify-center shrink-0">
                {index + 1}
              </div>
              <div>
                <h3 className="text-navy font-bold">{step.title}</h3>
                <p className="mt-1 text-sm text-gray leading-relaxed">{step.detail}</p>
              </div>
            </div>
          ))}
        </div>
      </motion.section>
    </article>
  )
}

interface ServiceDetailPageClientProps {
  service: ServiceListItem | null
  services: ServiceListItem[]
  settings: ServicePageSettingsView
  slug: string
}

export default function ServiceDetailPageClient({
  service,
  services,
  settings,
  slug,
}: ServiceDetailPageClientProps) {
  if (!service) {
    return (
      <Layout>
        <section className="min-h-[60vh] grid place-items-center bg-[#f7f9fb] px-4">
          <div className="text-center">
            <h1 className="font-['Bricolage_Grotesque'] text-4xl font-black text-navy">
              {settings.notFound.title}
            </h1>
            <p className="mt-3 text-gray">{settings.notFound.description}</p>
            <Link
              href="/hizmetler"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-teal px-6 py-3 text-white font-bold"
            >
              {settings.notFound.buttonLabel}
              <ArrowRight className="size-4" />
            </Link>
          </div>
        </section>
      </Layout>
    )
  }

  return (
    <ServiceDetailLayout
      currentSlug={slug}
      service={service}
      services={services}
      settings={settings}
    >
      <ServiceArticle sectionTitles={settings.detailSectionTitles} service={service} />
    </ServiceDetailLayout>
  )
}
