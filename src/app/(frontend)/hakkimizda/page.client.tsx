'use client'

import { motion, type Variants } from 'framer-motion'
import { ArrowRight, CheckCircle, Target, Users, Zap, Award, Lightbulb } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import Layout from '../components/Layout'
import type { AboutUs } from '@/payload-types'
import type { Media } from '@/payload-types'
import { getMediaUrl } from '@/utilities/getMediaUrl'

// Import assets (using placeholders that should exist or be replaced)
import avatarImg from '@/assets/avatar.png'

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } },
}

const fadeInLeft: Variants = {
  hidden: { opacity: 0, x: -60 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: 'easeOut' } },
}

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
}

function AnimatedSection({
  children,
  className = '',
  variants = staggerContainer,
}: {
  children: React.ReactNode
  className?: string
  variants?: Variants
}) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
      variants={variants}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// Icon mapping
const iconMap = {
  lightbulb: Lightbulb,
  users: Users,
  zap: Zap,
  award: Award,
  target: Target,
  checkCircle: CheckCircle,
}

export default function AboutUsPageClient({ data }: { data: AboutUs }) {
  // Prepare data with defaults

  console.log('data', data)

  const hero = data?.hero || {}
  const whoWeAre = data?.whoWeAre || {}
  const stats = data?.stats || []
  const whyChooseUs = data?.whyChooseUs || {}
  const features = whyChooseUs?.features || []

  // Get image URL
  const getImageUrl = () => {
    const image = whoWeAre?.image
    if (!image || typeof image === 'string') return null
    return getMediaUrl((image as Media).url)
  }

  const imageUrl = getImageUrl()

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 bg-navy overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage:
                'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)',
              backgroundSize: '60px 60px',
            }}
          />
          <div className="absolute top-0 right-0 w-200 h-200 bg-teal/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3" />
          <div className="absolute bottom-0 left-0 w-150 h-150 bg-teal/5 rounded-full blur-[100px] translate-y-1/3 -translate-x-1/3" />
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <AnimatedSection variants={fadeInUp} className="max-w-3xl mx-auto">
            <span className="inline-block py-1 px-3 rounded-full bg-teal/10 text-teal text-sm font-bold tracking-wider uppercase mb-6 border border-teal/20">
              {hero.badge || 'Hakkımızda'}
            </span>
            <h1 className="font-['Bricolage_Grotesque'] text-4xl sm:text-5xl lg:text-7xl font-black text-white tracking-tight mb-8">
              {hero.title?.replace(hero.titleHighlight || '', '') || 'Dijital Dönüşümde'}{' '}
              <br className="hidden sm:block" />
              <span className="text-teal">{hero.titleHighlight || 'Güvenilir Ortağınız'}</span>
            </h1>
            <p className="text-lg sm:text-xl text-slate-300 font-medium leading-relaxed mb-10">
              {hero.description ||
                'İşletmenizi geleceğe taşıyacak yenilikçi çözümler sunuyor, dijital dünyadaki potansiyelinizi en üst düzeye çıkarıyoruz.'}
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Main Content / Who We Are */}
      <section className="py-20 lg:py-32 bg-white overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Content - Text */}
            <AnimatedSection className="space-y-8">
              <motion.div variants={fadeInLeft}>
                <span className="text-teal text-sm font-bold tracking-widest uppercase mb-3 block">
                  {whoWeAre.badge || 'Biz Kimiz?'}
                </span>
                <h2 className="font-['Bricolage_Grotesque'] text-3xl sm:text-5xl font-black text-navy tracking-tight leading-[1.1] mb-6">
                  {whoWeAre.title || 'Deneyim ve Teknolojinin Buluşma Noktası'}
                </h2>
                <div className="space-y-6 text-slate-600 text-lg leading-relaxed">
                  {whoWeAre.paragraphs?.map((para, index) => <p key={index}>{para.text}</p>) || (
                    <>
                      <p>
                        SED Insight olarak, modern iş dünyasının karmaşık gereksinimlerini anlıyor
                        ve buna uygun yenilikçi, ölçeklenebilir dijital çözümler üretiyoruz.
                        Amacımız, işletmelerin dijitalleşme süreçlerini hızlandırmak ve onlara
                        rekabet avantajı sağlamaktır.
                      </p>
                      <p>
                        Teknolojiye olan tutkumuz ve sektörel deneyimimizle, markanızın dijital
                        varlığını güçlendirmek için buradayız. Her projeye, iş ortağımızın
                        hedeflerini kendi hedefimiz gibi benimseyerek yaklaşıyoruz.
                      </p>
                    </>
                  )}
                </div>

                <div className="mt-10 grid sm:grid-cols-2 gap-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-teal/10 flex items-center justify-center shrink-0">
                      <Target className="w-6 h-6 text-teal" />
                    </div>
                    <div>
                      <h4 className="text-navy font-bold text-lg mb-1">
                        {whoWeAre.mission?.title || 'Misyonumuz'}
                      </h4>
                      <p className="text-slate-600 text-sm">
                        {whoWeAre.mission?.description ||
                          'İşletmeleri dijital çağın gereksinimlerine hazırlamak.'}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-teal/10 flex items-center justify-center shrink-0">
                      <Target className="w-6 h-6 text-teal" />
                    </div>
                    <div>
                      <h4 className="text-navy font-bold text-lg mb-1">
                        {whoWeAre.vision?.title || 'Vizyonumuz'}
                      </h4>
                      <p className="text-slate-600 text-sm">
                        {whoWeAre.vision?.description ||
                          'Sektörde öncü ve yenilikçi bir teknoloji şirketi olmak.'}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatedSection>

            {/* Right Content - Image/Visuals */}
            <AnimatedSection>
              <motion.div variants={fadeInUp} className="relative">
                {/* Decorative Elements */}
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#006064]/5 rounded-full blur-2xl" />
                <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-[#20c8cd]/10 rounded-full blur-2xl" />
                <div
                  className="absolute inset-0 opacity-10"
                  style={{
                    backgroundImage: 'radial-gradient(#006064 2px, transparent 2px)',
                    backgroundSize: '24px 24px',
                  }}
                />

                <div className="relative rounded-3xl overflow-hidden shadow-2xl bg-slate-100 aspect-4/3 border border-slate-200">
                  {/* Placeholder for actual image */}
                  <div className="absolute inset-0 bg-linear-to-tr from-navy to-teal opacity-10 mix-blend-multiply" />
                  <div className="absolute inset-0 flex items-center justify-center text-slate-400 font-medium">
                    {imageUrl ? (
                      <Image
                        src={imageUrl}
                        alt={whoWeAre.title || 'Hakkımızda'}
                        fill
                        className="object-cover"
                        priority
                      />
                    ) : (
                      <Image
                        src={avatarImg}
                        alt="Hakkımızda"
                        className="w-full h-full object-cover"
                        priority
                      />
                    )}
                  </div>

                  {/* Floating Stat Card */}
                  <div className="absolute bottom-6 left-6 bg-white p-6 rounded-2xl shadow-xl border border-slate-100 max-w-50 animate-bounce-slow">
                    <div className="flex items-center gap-4 mb-2">
                      <div className="w-10 h-10 rounded-full bg-teal/10 flex items-center justify-center text-teal">
                        <Award className="w-5 h-5" />
                      </div>
                      <div className="text-3xl font-black text-navy">5+</div>
                    </div>
                    <div className="text-sm font-bold text-slate-600">Yıllık Sektör Tecrübesi</div>
                  </div>
                </div>
              </motion.div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-navy relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/noise.png')] opacity-5 mix-blend-overlay" />
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <AnimatedSection className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 divide-x divide-white/10">
            {stats.length > 0 ? (
              stats.map((stat, index) => (
                <motion.div key={index} variants={fadeInUp} className="text-center px-4">
                  <div className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-2 font-['Bricolage_Grotesque'] tracking-tight">
                    {stat.value}
                  </div>
                  <div className="text-teal font-bold uppercase tracking-wider text-sm">
                    {stat.label}
                  </div>
                </motion.div>
              ))
            ) : (
              <>
                <motion.div variants={fadeInUp} className="text-center px-4">
                  <div className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-2 font-['Bricolage_Grotesque'] tracking-tight">
                    50+
                  </div>
                  <div className="text-teal font-bold uppercase tracking-wider text-sm">
                    Tamamlanan Proje
                  </div>
                </motion.div>
                <motion.div variants={fadeInUp} className="text-center px-4">
                  <div className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-2 font-['Bricolage_Grotesque'] tracking-tight">
                    %99
                  </div>
                  <div className="text-teal font-bold uppercase tracking-wider text-sm">
                    Müşteri Memnuniyeti
                  </div>
                </motion.div>
                <motion.div variants={fadeInUp} className="text-center px-4">
                  <div className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-2 font-['Bricolage_Grotesque'] tracking-tight">
                    10+
                  </div>
                  <div className="text-teal font-bold uppercase tracking-wider text-sm">
                    Uzman Personel
                  </div>
                </motion.div>
                <motion.div variants={fadeInUp} className="text-center px-4">
                  <div className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-2 font-['Bricolage_Grotesque'] tracking-tight">
                    5+
                  </div>
                  <div className="text-teal font-bold uppercase tracking-wider text-sm">
                    Yıllık Tecrübe
                  </div>
                </motion.div>
              </>
            )}
          </AnimatedSection>
        </div>
      </section>

      {/* Why Choose Us / Features */}
      <section className="py-20 lg:py-32 bg-slate-50 relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <AnimatedSection className="text-center max-w-3xl mx-auto mb-16 lg:mb-24">
            <motion.span
              variants={fadeInUp}
              className="text-teal text-sm font-bold tracking-widest uppercase mb-3 block"
            >
              {whyChooseUs.badge || 'Neden Biz?'}
            </motion.span>
            <motion.h2
              variants={fadeInUp}
              className="font-['Bricolage_Grotesque'] text-3xl sm:text-5xl font-black text-navy tracking-tight leading-[1.1]"
            >
              {whyChooseUs.title?.replace(whyChooseUs.titleHighlight || '', '') ||
                'Sizi Rakiplerinizden'}{' '}
              <span className="text-teal">{whyChooseUs.titleHighlight || 'Öne Çıkarıyoruz'}</span>
            </motion.h2>
          </AnimatedSection>

          <AnimatedSection className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.length > 0 ? (
              features.map((feature, index) => {
                const IconComponent = iconMap[feature.icon as keyof typeof iconMap] || Lightbulb
                return (
                  <motion.div
                    key={index}
                    variants={fadeInUp}
                    className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group"
                  >
                    <div className="w-14 h-14 rounded-2xl bg-teal/5 flex items-center justify-center mb-6 group-hover:bg-teal transition-colors duration-300">
                      <IconComponent className="w-7 h-7 text-teal group-hover:text-white transition-colors duration-300" />
                    </div>
                    <h3 className="text-xl font-bold text-navy mb-4">{feature.title}</h3>
                    <p className="text-slate-600 leading-relaxed">{feature.description}</p>
                  </motion.div>
                )
              })
            ) : (
              <>
                <motion.div
                  variants={fadeInUp}
                  className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group"
                >
                  <div className="w-14 h-14 rounded-2xl bg-teal/5 flex items-center justify-center mb-6 group-hover:bg-teal transition-colors duration-300">
                    <Lightbulb className="w-7 h-7 text-teal group-hover:text-white transition-colors duration-300" />
                  </div>
                  <h3 className="text-xl font-bold text-navy mb-4">İnovatif Çözümler</h3>
                  <p className="text-slate-600 leading-relaxed">
                    En son teknolojileri kullanarak işletmenize özel dijital çözümler üretiyoruz.
                  </p>
                </motion.div>
                <motion.div
                  variants={fadeInUp}
                  className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group"
                >
                  <div className="w-14 h-14 rounded-2xl bg-teal/5 flex items-center justify-center mb-6 group-hover:bg-teal transition-colors duration-300">
                    <Users className="w-7 h-7 text-teal group-hover:text-white transition-colors duration-300" />
                  </div>
                  <h3 className="text-xl font-bold text-navy mb-4">Uzman Kadro</h3>
                  <p className="text-slate-600 leading-relaxed">
                    Alanında deneyimli profesyonellerden oluşan ekibimizle yanınızdayız.
                  </p>
                </motion.div>
                <motion.div
                  variants={fadeInUp}
                  className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group"
                >
                  <div className="w-14 h-14 rounded-2xl bg-teal/5 flex items-center justify-center mb-6 group-hover:bg-teal transition-colors duration-300">
                    <Zap className="w-7 h-7 text-teal group-hover:text-white transition-colors duration-300" />
                  </div>
                  <h3 className="text-xl font-bold text-navy mb-4">Hızlı Uygulama</h3>
                  <p className="text-slate-600 leading-relaxed">
                    Projelerinizi söz verdiğimiz sürede, en yüksek kalitede teslim ediyoruz.
                  </p>
                </motion.div>
                <motion.div
                  variants={fadeInUp}
                  className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group"
                >
                  <div className="w-14 h-14 rounded-2xl bg-teal/5 flex items-center justify-center mb-6 group-hover:bg-teal transition-colors duration-300">
                    <Award className="w-7 h-7 text-teal group-hover:text-white transition-colors duration-300" />
                  </div>
                  <h3 className="text-xl font-bold text-navy mb-4">Garantili Başarı</h3>
                  <p className="text-slate-600 leading-relaxed">
                    Ölçülebilir sonuçlar ve sürekli optimizasyon ile başarıyı garantiliyoruz.
                  </p>
                </motion.div>
              </>
            )}
          </AnimatedSection>
        </div>
      </section>
    </Layout>
  )
}
