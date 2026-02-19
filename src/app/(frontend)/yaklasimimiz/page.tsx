'use client'
import { motion, type Variants } from 'framer-motion'
import { ArrowRight, Binoculars, Circle, Flag, Gem } from 'lucide-react'

import Layout from '../components/Layout'
import analizImage from '@/assets/analiz.png'
import performansImage from '@/assets/performans.png'
import Image from 'next/image'
import Link from 'next/link'

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
}

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
    transition: { staggerChildren: 0.1 },
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

export default function ApproachPage() {
  return (
    <Layout>
      <section className="relative pt-34 pb-20 bg-navy overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)',
            backgroundSize: '56px 56px',
          }}
        />
        <motion.div
          animate={{ opacity: [0.16, 0.3, 0.16], scale: [1, 1.15, 1] }}
          transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -right-24 top-6 h-96 w-96 rounded-full bg-teal/20 blur-[120px]"
        />

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection>
            <motion.span
              variants={fadeInLeft}
              className="inline-flex items-center rounded-full border border-white/15 bg-white/8 px-4 py-2 text-teal text-xs font-bold tracking-widest uppercase"
            >
              Yaklaşımımız
            </motion.span>
            <motion.h1
              variants={fadeInLeft}
              className="mt-6 font-['Bricolage_Grotesque'] text-5xl sm:text-7xl font-black text-white leading-[0.9]"
            >
              Isin Ozune Inen
              <br />
              Danismanlik Yaklasimi
            </motion.h1>
            <motion.p
              variants={fadeInLeft}
              className="mt-6 text-lg text-white/70 max-w-3xl mx-auto leading-relaxed"
            >
              Hedefimiz sadece dijital arac secmek degil; isletmenin gercek ihtiyacini dogru tespit
              edip etkili bir uygulama modeli kurmak.
            </motion.p>
          </AnimatedSection>
        </div>
      </section>

      <section className="relative py-18 bg-[#e9ecf2]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center">
            <motion.p
              variants={fadeInLeft}
              className="text-teal text-4xl sm:text-5xl font-bold underline underline-offset-6 decoration-2"
            >
              Yaklaşımımız
            </motion.p>
            <motion.h1
              variants={fadeInLeft}
              className="mt-5 font-['Bricolage_Grotesque'] text-5xl sm:text-7xl font-black text-navy tracking-tight"
            >
              Stand Out From The Rest
            </motion.h1>
          </AnimatedSection>

          <AnimatedSection className="mt-14 grid lg:grid-cols-3 gap-6 items-stretch">
            <motion.div variants={fadeInUp} className="space-y-6">
              <div className="h-[260px] sm:h-[320px] rounded-2xl overflow-hidden shadow-[0_10px_25px_rgba(15,42,68,0.12)]">
                <Image src={analizImage} alt="Takım uyumu" className="w-full h-full object-cover" />
              </div>

              <article className="rounded-2xl bg-white px-7 py-8 min-h-[280px] flex flex-col items-center text-center shadow-[0_10px_25px_rgba(15,42,68,0.08)]">
                <div className="inline-flex size-14 items-center justify-center rounded-2xl bg-teal/12 text-teal">
                  <Flag className="size-7" />
                </div>
                <h2 className="mt-6 text-3xl sm:text-4xl font-black text-navy">Mission</h2>
                <p className="mt-5 text-xl sm:text-2xl text-gray leading-relaxed max-w-[26ch]">
                  İşletmenin hedeflerini ölçülebilir dijital adımlara dönüştürüp doğru yatırımı
                  doğru zamanda yaptırmak.
                </p>
              </article>
            </motion.div>

            <motion.article
              variants={fadeInUp}
              className="rounded-2xl bg-white px-7 py-8 min-h-[570px] sm:min-h-[660px] flex flex-col text-center shadow-[0_12px_28px_rgba(15,42,68,0.1)]"
            >
              <div className="inline-flex size-14 items-center justify-center rounded-2xl bg-teal/12 text-teal mx-auto">
                <Gem className="size-7" />
              </div>
              <h2 className="mt-6 text-3xl sm:text-4xl font-black text-navy">Core Values</h2>
              <p className="mt-5 text-xl sm:text-2xl text-gray leading-relaxed">
                Karar kalitesi ve süreç disipliniyle ilerleyen, güven temelli bir danışmanlık
                yaklaşımı.
              </p>
              <ul className="mt-8 space-y-4 text-left">
                {[
                  'Bütüncül düşünme',
                  'Sorumluluk sahipliği',
                  'Veriye dayalı netlik',
                  'Uygulanabilirlik',
                  'Sürdürülebilir etki',
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3 sm:text-xl text-gray-dark">
                    <Circle className="size-4 text-[#d3d8e1] shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <div className="mt-auto pt-8">
                <Link
                  href="/hizmetler"
                  className="inline-flex items-center justify-center rounded-xl bg-teal px-8 py-4 text-xl font-bold text-white hover:bg-teal/90 transition-colors"
                >
                  Hizmetleri Gör
                </Link>
              </div>
            </motion.article>

            <motion.div variants={fadeInUp} className="space-y-6">
              <article className="rounded-2xl bg-white px-7 py-8 min-h-[280px] flex flex-col items-center text-center shadow-[0_10px_25px_rgba(15,42,68,0.08)]">
                <div className="inline-flex size-14 items-center justify-center rounded-2xl bg-teal/12 text-teal">
                  <Binoculars className="size-7" />
                </div>
                <h2 className="mt-6 text-3xl sm:text-4xl font-black text-navy">Vision</h2>
                <p className="mt-5 text-xl sm:text-2xl text-gray leading-relaxed max-w-[26ch]">
                  Yerel işletmelerin dijitalleşme sürecinde en güvenilir strateji ortağı olmak.
                </p>
              </article>

              <div className="h-[260px] sm:h-[320px] rounded-2xl overflow-hidden shadow-[0_10px_25px_rgba(15,42,68,0.12)]">
                <Image
                  src={performansImage}
                  alt="Profesyonel ilerleme"
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>
          </AnimatedSection>

          <AnimatedSection className="mt-12 text-center">
            <motion.div variants={fadeInUp}>
              <Link
                href="/iletisim"
                className="inline-flex items-center gap-2 rounded-full bg-navy px-7 py-3 text-white font-bold hover:bg-navy/90 transition-colors"
              >
                Yaklaşımımızı Birlikte Değerlendirelim
                <ArrowRight className="size-4" />
              </Link>
            </motion.div>
          </AnimatedSection>
        </div>
      </section>
    </Layout>
  )
}
