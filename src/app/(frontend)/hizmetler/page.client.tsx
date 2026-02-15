'use client'

import { motion, type Variants } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'

import type { ServiceListItem, ServicePageSettingsView } from '@/lib/services'

import EffectiveSolutionsSection from '../components/EffectiveSolutionsSection'
import Layout from '../components/Layout'

const fadeInLeft: Variants = {
  hidden: { opacity: 0, x: -40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 1, ease: 'easeOut' },
  },
}

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
}

function AnimatedSection({
  children,
  className = '',
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
      variants={staggerContainer}
      className={className}
    >
      {children}
    </motion.div>
  )
}

interface ServicesPageClientProps {
  services: ServiceListItem[]
  settings: ServicePageSettingsView
}

export default function ServicesPageClient({ services, settings }: ServicesPageClientProps) {
  return (
    <Layout>
      <section className="relative pt-34 pb-22 bg-navy overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)',
            backgroundSize: '56px 56px',
          }}
        />
        <motion.div
          animate={{ scale: [1, 1.15, 1], opacity: [0.2, 0.35, 0.2] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -top-20 -right-20 h-96 w-96 rounded-full bg-teal/20 blur-[120px]"
        />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center max-w-4xl mx-auto">
            <motion.span
              variants={fadeInLeft}
              className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/8 px-4 py-2 text-teal text-xs font-bold tracking-widest uppercase"
            >
              {settings.listHero.badge}
            </motion.span>
            <motion.h1
              variants={fadeInLeft}
              className="mt-6 font-['Bricolage_Grotesque'] text-5xl sm:text-7xl font-black text-white leading-[0.9]"
            >
              {settings.listHero.title}
            </motion.h1>
            <motion.p variants={fadeInLeft} className="mt-6 text-lg text-white/70 leading-relaxed">
              {settings.listHero.description}
            </motion.p>
          </AnimatedSection>
        </div>
      </section>

      <EffectiveSolutionsSection
        id="hizmet-sureci"
        labels={settings.effectiveSolutions}
        services={services}
      />

      <section className="relative pt-16 pb-20 bg-navy overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-['Bricolage_Grotesque'] text-4xl sm:text-5xl font-black text-white"
          >
            {settings.listCta.title}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mt-4 text-white/70 text-lg"
          >
            {settings.listCta.description}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-8"
          >
            <Link
              href={settings.listCta.buttonHref}
              className="inline-flex items-center gap-2 rounded-full bg-teal px-7 py-3 text-white font-bold hover:bg-teal/90 transition-colors"
            >
              {settings.listCta.buttonLabel}
              <ArrowRight className="size-4" />
            </Link>
          </motion.div>
        </div>
      </section>
    </Layout>
  )
}
