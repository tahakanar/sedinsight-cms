import { motion, type Variants } from 'framer-motion'

import type { ServiceListItem } from '@/lib/services'

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

interface ProcessTimelineSectionProps {
  id?: string
  services: ServiceListItem[]
}

export default function ProcessTimelineSection({
  id = 'surec',
  services,
}: ProcessTimelineSectionProps) {
  return (
    <section id={id} className="relative pt-24 bg-gray-light overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-10">
        <AnimatedSection className="text-center mb-20">
          <motion.span
            variants={fadeInLeft}
            className="text-teal font-bold text-lg tracking-widest uppercase mb-4 block"
          >
            4 Adımlı Süreç
          </motion.span>
          <motion.h2
            variants={fadeInLeft}
            className="font-['Bricolage_Grotesque'] text-5xl sm:text-6xl font-black text-gray-dark mb-8 tracking-tighter leading-none"
          >
            Dijital Stratejinin
            <br />
            <span className="text-teal">Yol Haritası</span>
          </motion.h2>
          <motion.p
            variants={fadeInLeft}
            className="text-xl text-gray-dark/70 max-w-3xl mx-auto leading-relaxed"
          >
            Hangi aracın, ne zaman, neden ve nasıl kullanılacağını belirleyen kapsamlı bir stratejik
            planlama süreci.
          </motion.p>
        </AnimatedSection>

        <div className="hidden lg:block relative pb-10">
          <AnimatedSection className="relative">
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, ease: 'easeOut' }}
              className="absolute top-1/2 left-0 right-0 h-1.5 bg-linear-to-r from-transparent via-teal to-transparent origin-center -translate-y-1/2"
            />

            <div className="grid grid-cols-4 relative">
              {services.map((item, index) => {
                const isTop = index % 2 === 0
                return (
                  <motion.div
                    key={item.slug}
                    variants={fadeInUp}
                    className={`relative flex flex-col items-center ${isTop ? 'pt-0 pb-48' : 'pt-48 pb-0'}`}
                  >
                    <motion.div
                      initial={{ scaleY: 0 }}
                      whileInView={{ scaleY: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.5 + index * 0.1, duration: 0.4 }}
                      className={`absolute left-1/2 -translate-x-1/2 w-0.5 h-16 bg-teal/40 ${isTop ? 'bottom-24' : 'top-24'} origin-center`}
                    />

                    <motion.div
                      initial={{ scale: 0, rotate: -180 }}
                      whileInView={{ scale: 1, rotate: 0 }}
                      viewport={{ once: true }}
                      transition={{
                        delay: 0.3 + index * 0.15,
                        type: 'spring',
                        stiffness: 200,
                      }}
                      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20"
                    >
                      <div className="size-22 bg-gray-light rounded-full rotate-45 flex items-center justify-center shadow-xl shadow-teal/20 ring-4 ring-teal/50 overflow-hidden">
                        <img
                          src={item.image}
                          alt={item.imageAlt || item.title}
                          className="-rotate-45 w-full h-full object-contain drop-shadow-md opacity-90"
                        />
                      </div>
                    </motion.div>

                    <motion.div
                      whileHover={{ scale: 1.05, y: isTop ? -5 : 5 }}
                      transition={{ type: 'spring', stiffness: 300 }}
                      className={`w-full max-w-xs p-6 bg-white rounded-3xl shadow-xl border border-gray-100 hover:shadow-2xl hover:shadow-teal/15 transition-all duration-300 ${isTop ? 'order-first' : 'order-last'}`}
                    >
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 bg-teal/10 rounded-xl flex items-center justify-center">
                          <span className="text-teal font-black text-lg">{item.step}</span>
                        </div>
                        <h3 className="text-lg font-bold text-navy leading-tight">{item.title}</h3>
                      </div>
                      <p className="text-gray text-sm leading-relaxed">{item.description}</p>
                    </motion.div>
                  </motion.div>
                )
              })}
            </div>
          </AnimatedSection>
        </div>

        <div className="lg:hidden relative">
          <motion.div
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className="absolute top-0 bottom-0 left-7 w-1 bg-linear-to-b from-navy via-teal to-navy origin-top"
          />

          <AnimatedSection className="space-y-8">
            {services.map((item, index) => (
              <motion.div key={item.slug} variants={fadeInUp} className="relative pl-18">
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{
                    delay: 0.2 + index * 0.1,
                    type: 'spring',
                    stiffness: 200,
                  }}
                  className="absolute left-0 top-6 z-20"
                >
                  <div className="size-16 bg-gray-light rounded-full flex items-center justify-center text-white font-black text-lg shadow-lg shadow-teal/30 ring-4 ring-teal/50 overflow-hidden">
                    <img src={item.image} alt={item.imageAlt || item.title} className="w-full h-full object-contain opacity-90" />
                  </div>
                </motion.div>

                <motion.div
                  whileHover={{ x: 4 }}
                  className="p-6 bg-white rounded-2xl shadow-lg shadow-navy/5 border border-gray-200/50"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-4xl font-black text-teal/20">{item.step}</span>
                    <h3 className="text-lg font-bold text-navy leading-tight">{item.title}</h3>
                  </div>
                  <p className="text-gray text-sm leading-relaxed">{item.description}</p>
                </motion.div>
              </motion.div>
            ))}
          </AnimatedSection>
        </div>
      </div>
    </section>
  )
}
