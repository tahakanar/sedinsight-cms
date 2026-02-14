'use client'

import { useState } from 'react'
import { AnimatePresence, motion, type Variants } from 'framer-motion'

import Layout from '../components/Layout'

export type FAQItem = {
  question: string
  answer: string
}

const fadeInLeft: Variants = {
  hidden: { opacity: 0, x: -60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 1.2, ease: 'easeOut' },
  },
}

type FAQClientProps = {
  faqs: FAQItem[]
}

export default function FAQClient({ faqs }: FAQClientProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(faqs.length > 0 ? 0 : null)

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <Layout>
      <section className="relative pt-32 pb-32 bg-navy overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage:
                'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)',
              backgroundSize: '60px 60px',
            }}
          />
        </div>

        <div className="relative max-w-4xl mx-auto px-4 text-center z-10">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block text-teal font-bold tracking-widest uppercase mb-4 text-sm"
          >
            Aklınızdaki Sorular
          </motion.span>
          <motion.h1
            initial="hidden"
            animate="visible"
            variants={fadeInLeft}
            className="font-['Bricolage_Grotesque'] text-5xl sm:text-7xl font-black text-white mb-6 tracking-tighter"
          >
            Sıkça Sorulan <span className="text-teal">Sorular</span>
          </motion.h1>
          <motion.p
            initial="hidden"
            animate="visible"
            variants={fadeInLeft}
            className="text-xl text-white/60 max-w-2xl mx-auto font-light leading-relaxed"
          >
            İşleyişimiz, yöntemlerimiz ve merak ettiğiniz diğer detaylar.
          </motion.p>
        </div>
      </section>

      <section className="relative pt-12 pb-24 bg-slate-50 min-h-[50vh]">
        <div className="max-w-3xl mx-auto px-4">
          <div className="space-y-4">
            {faqs.map((faq, index) => {
              const isOpen = openIndex === index
              return (
                <motion.div
                  key={`${faq.question}-${index}`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className={`group rounded-3xl transition-all duration-300 ${
                    isOpen
                      ? 'bg-white shadow-xl shadow-teal/5 ring-1 ring-teal/20'
                      : 'bg-white shadow-md hover:shadow-lg hover:-translate-y-1'
                  }`}
                >
                  <button
                    onClick={() => toggleFAQ(index)}
                    className="flex items-center justify-between w-full p-6 sm:p-8 text-left"
                  >
                    <span
                      className={`text-lg sm:text-xl font-bold transition-colors duration-300 ${
                        isOpen ? 'text-teal' : 'text-gray-dark group-hover:text-teal'
                      }`}
                    >
                      {faq.question}
                    </span>

                    <div
                      className={`relative flex items-center justify-center w-10 h-10 rounded-full transition-colors duration-300 ${isOpen ? 'bg-teal text-white' : 'bg-gray-100 text-gray-dark group-hover:bg-teal/10 group-hover:text-teal'}`}
                    >
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <motion.line
                          x1="5"
                          y1="12"
                          x2="19"
                          y2="12"
                          initial={false}
                          animate={{ rotate: isOpen ? 180 : 0 }}
                          transition={{ duration: 0.3 }}
                        />
                        <motion.line
                          x1="12"
                          y1="5"
                          x2="12"
                          y2="19"
                          initial={false}
                          animate={{
                            scaleY: isOpen ? 0 : 1,
                            opacity: isOpen ? 0 : 1,
                          }}
                          transition={{ duration: 0.2 }}
                        />
                      </svg>
                    </div>
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 sm:px-8 pb-8 text-gray font-medium leading-relaxed border-t border-gray-100 pt-6 mt-2">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>
    </Layout>
  )
}
