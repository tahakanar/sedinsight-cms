'use client'

import { motion, type Variants } from 'framer-motion'
import { CheckCircle, Target, ArrowRight, Shield, MessageSquare } from 'lucide-react'

import logoImage from '@/assets/avatar.png'
import analizImg from '@/assets/analiz.png'
import digitalImg from '@/assets/digital.png'
import performanceImg from '@/assets/performance.png'
import teknikImg from '@/assets/teknik.png'
import EffectiveSolutionsSection from './components/EffectiveSolutionsSection'
import ContactSection from './components/ContactSection'
import Link from 'next/link'
import Image from 'next/image'
import type { ServiceListItem, ServicePageSettingsView } from '@/lib/services'
import Layout from './components/Layout'

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
}

const fadeInLeft: Variants = {
  hidden: { opacity: 0, x: -60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 1.2, ease: 'easeOut' },
  },
}

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
}

const targetAudience = [
  {
    image: digitalImg,
    text: 'Randevu sistemi olmayan ve doğru altyapıyı planlamak isteyen işletmeler',
  },
  {
    image: teknikImg,
    text: 'Manuel ilerleyen süreçlerini dijitalleştirmek isteyen ekipler',
  },
  {
    image: performanceImg,
    text: 'Mevcut sistemlerini iyileştirmek isteyen işletmeler',
  },
  {
    image: analizImg,
    text: 'Hangi adımın ne zaman ve neden atılacağını netleştirmek isteyenler',
  },
]

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
      viewport={{ once: true, margin: '-100px' }}
      variants={staggerContainer}
      className={className}
    >
      {children}
    </motion.div>
  )
}

interface HomeClientProps {
  effectiveSolutions: ServicePageSettingsView['effectiveSolutions']
  services: ServiceListItem[]
}

export default function HomeClient({ effectiveSolutions, services }: HomeClientProps) {
  const scrollToSection = (href: string) => {
    const element = document.getElementById(href.replace('#', ''))
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  //   const { hash } = usePathname();

  //   useEffect(() => {
  //     if (hash) {
  //       const id = hash.replace('#', '');
  //       const element = document.getElementById(id);
  //       if (element) {
  //         // A small delay ensures the layout is fully ready
  //         setTimeout(() => {
  //           element.scrollIntoView({ behavior: 'smooth' });
  //         }, 100);
  //       }
  //     }
  //   }, [hash]);

  return (
    <Layout>
      {/* Hero Section - World Class Design */}
      <section
        id="hero"
        className="relative min-h-screen flex items-center overflow-hidden bg-navy"
      >
        {/* Animated Grid Background */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Grid Pattern */}
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage:
                'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)',
              backgroundSize: '60px 60px',
            }}
          />

          {/* Gradient Orbs */}
          <motion.div
            animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute top-1/4 -right-20 size-150 bg-teal/20 rounded-full blur-[120px]"
          />
          <motion.div
            animate={{ scale: [1.2, 1, 1.2], opacity: [0.2, 0.4, 0.2] }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 1,
            }}
            className="absolute -bottom-40 -left-40 size-125 bg-teal/10 rounded-full blur-[100px]"
          />

          {/* Floating Elements */}
          <motion.div
            animate={{ y: [-20, 20, -20], rotate: [0, 10, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute top-1/3 left-1/4 w-4 h-4 bg-teal/40 rounded-full"
          />
          <motion.div
            animate={{ y: [20, -20, 20], rotate: [0, -10, 0] }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 1,
            }}
            className="absolute top-1/2 right-1/3 w-3 h-3 bg-white/20 rounded-full"
          />
          <motion.div
            animate={{ y: [-15, 15, -15] }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 2,
            }}
            className="absolute bottom-1/3 left-1/3 w-2 h-2 bg-teal/60 rounded-full"
          />

          {/* Animated Lines */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 2, delay: 0.5 }}
            className="absolute top-1/4 left-0 right-0 h-px bg-linear-to-r from-transparent via-teal/20 to-transparent origin-left"
          />
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 2, delay: 0.8 }}
            className="absolute bottom-1/3 left-0 right-0 h-px bg-linear-to-r from-transparent via-white/10 to-transparent origin-right"
          />
        </div>

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-22 pb-20 w-full">
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center min-h-[80vh]">
            {/* Left Content - 7 columns */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-7 text-center lg:text-left z-10"
            >
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="inline-flex items-center gap-3 px-5 py-2.5 bg-white/5 backdrop-blur-xl rounded-full text-teal text-sm font-bold tracking-widest uppercase mb-10 border border-white/10"
              >
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Target className="w-4 h-4 text-teal" />
                </motion.div>
                Dijital Danışmanlık
              </motion.div>

              {/* Main Heading */}
              <div className="overflow-hidden mb-8">
                <motion.h1
                  initial={{ y: 100 }}
                  animate={{ y: 0 }}
                  transition={{
                    duration: 0.8,
                    delay: 0.4,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="font-['Bricolage_Grotesque'] text-5xl sm:text-6xl md:text-7xl lg:text-8xl  font-black text-white leading-[0.85] tracking-tighter"
                >
                  Analiz et.
                </motion.h1>
              </div>
              <div className="overflow-hidden mb-8">
                <motion.h1
                  initial={{ y: 100 }}
                  animate={{ y: 0 }}
                  transition={{
                    duration: 0.8,
                    delay: 0.5,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="font-['Bricolage_Grotesque'] text-5xl sm:text-6xl md:text-7xl lg:text-8xl  font-black text-teal leading-[0.85] tracking-tighter"
                >
                  Netleştir.
                </motion.h1>
              </div>
              <div className="overflow-hidden mb-12">
                <motion.h1
                  initial={{ y: 100 }}
                  animate={{ y: 0 }}
                  transition={{
                    duration: 0.8,
                    delay: 0.6,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="font-['Bricolage_Grotesque'] text-5xl sm:text-6xl md:text-7xl lg:text-8xl  font-black text-white leading-[0.85] tracking-tighter"
                >
                  Büyüt.
                </motion.h1>
              </div>

              {/* Description */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="text-xl md:text-2xl text-white/60 mb-12 max-w-2xl mx-auto lg:mx-0 font-medium leading-relaxed"
              >
                Sadece analiz değil, <span className="text-teal font-bold">stratejik netlik</span>.
                Karmaşayı bitirin, doğru kararlarla büyüyün.
              </motion.p>

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 }}
                className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
              >
                <motion.button
                  onClick={() => scrollToSection('#iletisim')}
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="group px-8 py-5 bg-teal text-white text-lg font-bold rounded-full shadow-2xl shadow-teal/30 hover:shadow-teal/50 transition-all flex items-center justify-center gap-3 relative overflow-hidden"
                >
                  <span className="relative z-10">Görüşme Planla</span>
                  <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" />
                  <div className="absolute inset-0 bg-linear-to-r from-teal to-teal/80 opacity-0 group-hover:opacity-100 transition-opacity" />
                </motion.button>
              </motion.div>
            </motion.div>

            {/* Right Content - 5 columns */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 1.2,
                ease: [0.16, 1, 0.3, 1],
                delay: 0.4,
              }}
              className="lg:col-span-5 relative hidden lg:flex justify-center items-center"
            >
              {/* Glowing Background */}
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.8, 0.5] }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                  className="w-80 h-80 bg-teal/30 rounded-full blur-[80px]"
                />
              </div>

              {/* Rotating Rings */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
                className="absolute size-112.5 border border-white/10 rounded-full"
              />
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
                className="absolute size-95 border border-teal/20 rounded-full"
              />
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 50, repeat: Infinity, ease: 'linear' }}
                className="absolute size-130 border border-dashed border-white/5 rounded-full"
              />

              {/* Orbiting Dots */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                className="absolute size-100"
              >
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3 h-3 bg-teal rounded-full shadow-lg shadow-teal/50" />
              </motion.div>
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
                className="absolute size-85"
              >
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2 h-2 bg-white/60 rounded-full" />
              </motion.div>

              {/* Logo */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ type: 'spring', stiffness: 300 }}
                className="relative z-20"
              >
                <div className="relative">
                  <motion.div
                    animate={{
                      boxShadow: [
                        '0 0 60px rgba(0,150,136,0.3)',
                        '0 0 100px rgba(0,150,136,0.5)',
                        '0 0 60px rgba(0,150,136,0.3)',
                      ],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                    className="rounded-full"
                  >
                    <Image
                      src={logoImage}
                      alt="SedInsight Logo"
                      className="w-72 h-72 object-cover rounded-full ring-4 ring-white/10"
                    />
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Bottom Gradient Fade */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-linear-to-b from-navy to-white" />
      </section>

      {/* Process Section - Timeline Design */}
      <EffectiveSolutionsSection labels={effectiveSolutions} services={services} />

      {/* FAQ CTA Section */}
      <section className="relative pt-16 bg-navy overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pb-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
            <div>
              <h3 className="font-['Bricolage_Grotesque'] text-3xl sm:text-4xl font-black text-white mb-3 tracking-tight">
                Aklınıza takılan <span className="text-teal">sorular mı var?</span>
              </h3>
              <p className="text-white/70 text-lg font-medium max-w-2xl">
                Merak ettiğiniz tüm detaylar ve süreçlerimiz hakkında bilgi almak için Sıkça Sorulan
                Sorular sayfamızı inceleyebilirsiniz.
              </p>
            </div>
            <Link
              href="/sss"
              className="group px-8 py-5 bg-teal text-white text-lg font-bold rounded-full shadow-lg shadow-teal/20 hover:shadow-teal/40 transition-all flex items-center justify-center gap-3 whitespace-nowrap"
            >
              <span>Sıkça Sorulan Sorular</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* Target Audience Section */}
      <section className="relative pt-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-24">
            <motion.span
              variants={fadeInLeft}
              className="text-teal font-bold text-lg tracking-widest uppercase mb-4 block"
            >
              Kimler İçin
            </motion.span>
            <motion.h2
              variants={fadeInLeft}
              className="font-['Bricolage_Grotesque'] text-5xl sm:text-6xl font-black text-gray-dark mb-8 tracking-tighter leading-none"
            >
              Bu Danışmanlık
              <br />
              <span className="text-teal">Kimler İçin?</span>
            </motion.h2>
            <motion.p
              variants={fadeInLeft}
              className="text-xl text-gray-dark/70 max-w-3xl mx-auto leading-relaxed"
            >
              Amaç, dağınık şekilde ilerleyen çalışmaları tek bir karar zemini altında toparlamak ve
              atılan her adımın işletmenin gerçek ihtiyaçlarına hizmet etmesini sağlamaktır.
            </motion.p>
          </AnimatedSection>

          <AnimatedSection className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 py-12">
            {targetAudience.map((item, index) => {
              return (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  className="relative bg-white rounded-bl-none rounded-tr-none rounded-br-[30px] p-8 pt-14 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.08)] transition-all duration-500  hover:shadow-[0_20px_50px_-10px_rgba(0,96,100,0.15)] group mt-10 lg:mt-0"
                >
                  {/* Number Watermark */}
                  <div className="absolute top-6 right-8 text-5xl font-black text-teal/20 transition-all duration-500 group-hover:text-teal/40 group-hover:text-6xl group-hover:-translate-y-1 font-['Bricolage_Grotesque']">
                    {String(index + 1).padStart(2, '0')}
                  </div>

                  {/* Overlapping Icon Circle */}
                  <div className="absolute -top-10 -left-6 size-25">
                    {/* Decorative Border Ring (Offset to top-right) */}
                    <div className="absolute z-20 inset-0 rounded-full border-[3px] border-navy translate-x-2 -translate-y-2 transition-transform duration-500 group-hover:translate-x-0 group-hover:translate-y-0" />

                    {/* Main Icon Background */}
                    <div className="absolute inset-0 bg-teal rounded-full flex items-center justify-center p-2 shadow-lg z-10 transition-transform duration-500 ease-out">
                      <div className="w-full h-full relative">
                        <Image
                          src={item.image}
                          alt="icons"
                          className="size-20"
                          width={80}
                          height={80}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="relative z-10 mt-4 pt-5">
                    <p className="text-gray-dark leading-relaxed font-medium sm:text-lg">
                      {item.text}
                    </p>
                  </div>
                </motion.div>
              )
            })}
          </AnimatedSection>
        </div>
      </section>

      {/* About Section - Extraordinary Bento Grid Design */}
      <section id="hakkimizda" className="pt-28 bg-navy relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-20 bg-linear-to-b from-white to-navy sm:hidden" />
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
            className="absolute -top-40 -right-40 w-96 h-96 border border-teal/20 rounded-full"
          />
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 80, repeat: Infinity, ease: 'linear' }}
            className="absolute -bottom-20 -left-20 w-72 h-72 border border-white/10 rounded-full"
          />
          <div className="absolute top-1/2 left-1/4 w-2 h-2 bg-teal rounded-full animate-pulse" />
          <div
            className="absolute top-1/3 right-1/3 w-3 h-3 bg-white/20 rounded-full animate-pulse"
            style={{ animationDelay: '1s' }}
          />
          <div
            className="absolute bottom-1/4 right-1/4 w-2 h-2 bg-teal/50 rounded-full animate-pulse"
            style={{ animationDelay: '2s' }}
          />
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Header */}
          <AnimatedSection className="text-center mb-16">
            <motion.div
              variants={fadeInLeft}
              className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 backdrop-blur-sm rounded-full text-teal text-sm font-bold tracking-widest uppercase mb-6 border border-white/10"
            >
              <Target className="w-4 h-4" />
              Danışmanlık Yaklaşımı
            </motion.div>
            <motion.h2
              variants={fadeInLeft}
              className="font-['Bricolage_Grotesque'] text-5xl sm:text-6xl lg:text-7xl font-black text-white mb-6 tracking-tighter leading-none"
            >
              Rol ve
              <br />
              <span className="text-teal">Yaklaşım</span>
            </motion.h2>
          </AnimatedSection>

          {/* Bento Grid */}
          <AnimatedSection className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 pb-10 sm:pb-20">
            {/* Large Card - Spans 2 columns */}
            <motion.div
              variants={fadeInUp}
              whileHover={{ scale: 1.02, y: -5 }}
              transition={{ type: 'spring', stiffness: 300 }}
              className="md:col-span-2 p-8 bg-linear-to-br from-teal to-teal/80 rounded-3xl relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700" />
              <div className="relative z-10">
                <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-6 group-hover:rotate-12 transition-transform duration-300">
                  <Target className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl lg:text-3xl font-bold text-white mb-4 leading-tight">
                  Uygulama ekiplerinin yerine geçmeyi değil
                </h3>
                <p className="text-white/80 text-lg leading-relaxed">
                  İşletmenin hedeflerine uygun kararların alınmasını amaçlıyorum
                </p>
              </div>
              <motion.div
                className="absolute bottom-4 right-4 text-9xl font-black text-white/10"
                animate={{ y: [0, -10, 0] }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              >
                01
              </motion.div>
            </motion.div>

            {/* Tall Card */}
            <motion.div
              variants={fadeInUp}
              whileHover={{ scale: 1.02, y: -5 }}
              transition={{ type: 'spring', stiffness: 300 }}
              className="lg:row-span-2 p-8 bg-white/5 backdrop-blur-sm rounded-3xl border border-white/10 relative overflow-hidden group hover:bg-white/10 transition-colors duration-300"
            >
              <div className="h-full flex flex-col">
                <div className="w-14 h-14 bg-teal/20 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-teal/30 transition-colors duration-300">
                  <CheckCircle className="w-7 h-7 text-teal" />
                </div>
                <h3 className="text-xl font-bold text-white mb-4 leading-tight">
                  Hangi dijital adımların gerçekten gerekli olduğunu planlıyorum
                </h3>
                <p className="text-white/60 leading-relaxed grow">
                  Hangi sırayla ilerlenmesi gerektiğini netleştiriyorum
                </p>
                <div className="mt-6 pt-6 border-t border-white/10">
                  <span className="text-6xl font-black text-teal/30">02</span>
                </div>
              </div>
            </motion.div>

            {/* Small Card with Icon */}
            {/* Calendly Card - Premium Invite */}
            <motion.div
              variants={fadeInUp}
              whileHover={{ scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 300 }}
              className="relative group overflow-hidden rounded-3xl"
            >
              <a
                href="https://calendly.com/demo/30dk"
                target="_blank"
                rel="noopener noreferrer"
                className="block h-full p-6 bg-navy border border-white/10 relative z-10 hover:border-teal/50 transition-colors duration-500 rounded-3xl"
              >
                {/* Background Glow */}
                <div className="absolute inset-0 bg-linear-to-br from-teal/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="relative z-20 flex flex-col h-full items-center text-center justify-center space-y-4">
                  <div className="w-14 h-14 bg-teal rounded-2xl flex items-center justify-center shadow-lg shadow-teal/30 group-hover:scale-110 transition-transform duration-300">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="28"
                      height="28"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                      <line x1="16" y1="2" x2="16" y2="6" />
                      <line x1="8" y1="2" x2="8" y2="6" />
                      <line x1="3" y1="10" x2="21" y2="10" />
                    </svg>
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-white leading-tight mb-2">
                      Tanışma Toplantısı
                    </h3>
                    <p className="text-white/60 text-sm font-medium">30 Dakika • Ücretsiz</p>
                  </div>

                  <div className="px-4 py-2 bg-white/5 rounded-full text-xs font-bold text-teal tracking-wider uppercase border border-white/10 group-hover:bg-teal group-hover:text-white transition-all duration-300">
                    Randevu Oluştur
                  </div>
                </div>
              </a>
            </motion.div>

            {/* Wide Card */}
            <motion.div
              variants={fadeInUp}
              whileHover={{ scale: 1.02, y: -5 }}
              transition={{ type: 'spring', stiffness: 300 }}
              className="md:col-span-2 p-8 bg-white rounded-3xl relative overflow-hidden group"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-navy via-teal to-navy" />
              <div className="flex items-start gap-6">
                <div className="w-16 h-16 bg-navy rounded-2xl flex items-center justify-center shrink-0 group-hover:rotate-6 transition-transform duration-300">
                  <Shield className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-navy mb-3 leading-tight">
                    Gerçek etki değerlendirmesi
                  </h3>
                  <p className="text-gray leading-relaxed">
                    Kararların işletmeye olan gerçek etkisini değerlendiriyorum ve sürecin doğru
                    yönetilmesini destekliyorum
                  </p>
                </div>
              </div>
              <div className="absolute bottom-4 right-6 text-7xl font-black text-navy/5">04</div>
            </motion.div>

            {/* Stats Card */}
            <motion.div
              variants={fadeInUp}
              whileHover={{ scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 300 }}
              className="p-6 bg-teal/20 backdrop-blur-sm rounded-3xl border border-teal/30 flex flex-col items-center justify-center text-center group"
            >
              <motion.span
                className="text-5xl font-black text-teal mb-2"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              >
                03
              </motion.span>
              <p className="text-white/80 text-sm font-medium">Stratejik uyum</p>
            </motion.div>
          </AnimatedSection>
        </div>
      </section>

      <ContactSection />
    </Layout>
  )
}
