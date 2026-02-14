'use client'
import { motion, type Variants } from 'framer-motion'
import { ArrowRight, CalendarDays, PhoneCall, Sparkles } from 'lucide-react'

import ContactSection from '../components/ContactSection'
import Layout from '../components/Layout'
import Link from 'next/link'

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 36 },
  visible: { opacity: 1, y: 0 },
}

const fadeInLeft: Variants = {
  hidden: { opacity: 0, x: -40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.9, ease: 'easeOut' },
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

const quickFacts = [
  {
    icon: CalendarDays,
    title: 'Hizli Gorusme',
    text: 'On gorusme sonrasinda size uygun yol haritasini netlestiriyoruz.',
  },
  {
    icon: PhoneCall,
    title: 'Dogrudan Iletisim',
    text: 'Konu dagilmadan, ihtiyaciniza odakli bir akisla ilerliyoruz.',
  },
  {
    icon: Sparkles,
    title: 'Stratejik Cikti',
    text: 'Toplanti sonunda somut adimlar ve oncelikler belirlenmis olur.',
  },
]

export default function ContactPage() {
  return (
    <Layout>
      <section className="relative overflow-hidden bg-[#0f2a44] pt-32 md:pt-36 pb-24">
        <div
          className="absolute inset-0 opacity-80"
          style={{
            background:
              'radial-gradient(circle at 18% 24%, #1a4a67 0%, #123754 32%, #0f2a44 72%, #0b1c2e 100%)',
          }}
        />
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              'linear-gradient(120deg, #ffffff 1px, transparent 1px), linear-gradient(30deg, #ffffff 1px, transparent 1px)',
            backgroundSize: '48px 48px',
          }}
        />
        <motion.div
          animate={{ y: [0, -12, 0], opacity: [0.18, 0.3, 0.18] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -top-16 right-0 h-80 w-80 rounded-full bg-teal/25 blur-[90px]"
        />
        <motion.div
          animate={{ y: [0, 14, 0], opacity: [0.12, 0.24, 0.12] }}
          transition={{
            duration: 9,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 0.7,
          }}
          className="absolute bottom-8 -left-20 h-72 w-72 rounded-full bg-teal/20 blur-[90px]"
        />

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 sm:pt-12 lg:pt-14">
          <AnimatedSection className="grid lg:grid-cols-[1.05fr_0.95fr] gap-10 items-start">
            <div>
              <motion.span
                variants={fadeInLeft}
                className="inline-flex items-center gap-2 rounded-full border border-teal/35 bg-teal/10 px-4 py-1.5 text-teal text-xs font-bold tracking-[0.18em] uppercase"
              >
                Yeni Baslangic
              </motion.span>
              <motion.h1
                variants={fadeInLeft}
                className="mt-6 font-['Bricolage_Grotesque'] text-4xl sm:text-6xl lg:text-7xl font-black text-white tracking-tight leading-[0.95]"
              >
                Isletmeniz Icin
                <br />
                Net Iletisim Noktasi
              </motion.h1>
              <motion.p
                variants={fadeInLeft}
                className="mt-6 max-w-2xl text-white/70 text-lg leading-relaxed"
              >
                Sureci sade, olculebilir ve karar odakli ilerletelim. Formu doldurun, size uygun
                gorusme planiyla donelim.
              </motion.p>
              <motion.div variants={fadeInUp} className="mt-8 flex flex-wrap items-center gap-3">
                <Link
                  href="/"
                  className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-bold text-navy transition-all hover:-translate-y-0.5"
                >
                  Ana Sayfaya Don
                  <ArrowRight className="size-4" />
                </Link>
                <a
                  href="tel:+905555555555"
                  className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/5 px-5 py-3 text-sm font-bold text-white hover:bg-white/12"
                >
                  +90 555 555 55 55
                </a>
              </motion.div>
            </div>

            <motion.aside
              variants={fadeInUp}
              className="rounded-3xl border border-white/14 bg-[#11314d]/85 p-6 shadow-[0_30px_80px_rgba(0,0,0,0.35)]"
            >
              <p className="text-teal text-xs font-bold tracking-[0.17em] uppercase">
                Iletisim Akisi
              </p>
              <h2 className="mt-3 text-2xl font-bold text-white leading-tight">
                Ilk gorusmede neleri netlestiriyoruz?
              </h2>
              <div className="mt-5 space-y-3">
                {quickFacts.map((item) => {
                  const Icon = item.icon
                  return (
                    <motion.article
                      key={item.title}
                      whileHover={{ x: 3 }}
                      className="rounded-2xl border border-white/10 bg-[#0f2a44]/70 px-4 py-3"
                    >
                      <div className="flex items-start gap-3">
                        <div className="inline-flex size-9 shrink-0 items-center justify-center rounded-xl bg-teal/16 text-teal">
                          <Icon className="size-4" />
                        </div>
                        <div>
                          <h3 className="text-white font-semibold leading-tight">{item.title}</h3>
                          <p className="mt-1 text-white/62 text-sm leading-relaxed">{item.text}</p>
                        </div>
                      </div>
                    </motion.article>
                  )
                })}
              </div>
            </motion.aside>
          </AnimatedSection>
        </div>
      </section>

      <ContactSection />
    </Layout>
  )
}
