'use client'

import { motion } from 'framer-motion'
import { ArrowRight, FileText, HelpCircle, PhoneCall } from 'lucide-react'

import type { ServiceDetail } from '@/lib/services'
import Layout from './Layout'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface ServiceDetailLayoutProps {
  service: ServiceDetail
  services: ServiceDetail[]
  children: React.ReactNode
}

export default function ServiceDetailLayout({
  service,
  services,
  children,
}: ServiceDetailLayoutProps) {
  const pathname = usePathname()

  return (
    <Layout>
      <section className="relative pt-34 pb-16 bg-navy overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)',
            backgroundSize: '56px 56px',
          }}
        />

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="mt-6 font-['Bricolage_Grotesque'] text-4xl sm:text-6xl font-black text-white leading-[0.95]"
          >
            {service.title}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mt-5 text-lg text-white/70 max-w-3xl mx-auto"
          >
            {service.description}
          </motion.p>
        </div>
      </section>

      <section className="relative py-16 bg-[#f7f9fb]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-[minmax(0,1fr)_340px] gap-10 items-start">
          <div>{children}</div>

          <aside className="lg:sticky lg:top-24 space-y-6">
            <div className="rounded-3xl border border-navy/10 bg-white p-6 shadow-[0_10px_30px_rgba(15,42,68,0.08)]">
              <p className="text-xs font-bold tracking-widest uppercase text-teal mb-4">
                Hizmetlerimiz
              </p>
              <div className="space-y-2">
                {services.map((item) => {
                  const active = pathname === item.path
                  return (
                    <Link
                      key={item.slug}
                      href={item.path}
                      className={`group flex items-center justify-between rounded-xl px-4 py-3 text-sm font-semibold transition-colors ${
                        active ? 'bg-teal text-white' : 'bg-[#f5f8fa] text-navy hover:bg-teal/12'
                      }`}
                    >
                      <span>{item.title}</span>
                      <ArrowRight
                        className={`size-4 transition-transform ${active ? 'translate-x-0' : 'group-hover:translate-x-0.5'}`}
                      />
                    </Link>
                  )
                })}
              </div>
            </div>

            <div className="rounded-3xl border border-[#0f2a44]/10 bg-white p-6 shadow-[0_10px_30px_rgba(15,42,68,0.08)]">
              <div className="inline-flex size-10 items-center justify-center rounded-xl bg-teal/15 text-teal">
                <FileText className="size-5" />
              </div>
              <h3 className="mt-4 text-lg font-bold text-navy leading-tight">
                A Complete Guide to Employee Engagement
              </h3>
              <p className="mt-3 text-sm text-gray leading-relaxed">
                Operasyonel verim ve ekip uyumunu artırmak için kullanılan temel yaklaşım
                başlıklarını tek bir rehberde topladık.
              </p>
              <Link
                href="/sss"
                className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-teal hover:text-navy transition-colors"
              >
                Rehberi İncele
                <ArrowRight className="size-4" />
              </Link>
            </div>

            <div className="rounded-3xl border border-[#0f2a44]/10 bg-navy p-6 shadow-[0_12px_30px_rgba(15,42,68,0.28)]">
              <div className="inline-flex size-10 items-center justify-center rounded-xl bg-white/10 text-teal">
                <HelpCircle className="size-5" />
              </div>
              <h3 className="mt-4 text-lg font-bold text-white">Have Questions?</h3>
              <p className="mt-3 text-sm text-white/70 leading-relaxed">
                İşletmeniz için hangi hizmetin öncelikli olduğuna birlikte karar verelim.
              </p>
              <div className="mt-5 flex items-center gap-2 text-white/90 text-sm font-semibold">
                <PhoneCall className="size-4 text-teal" />
                +90 555 555 55 55
              </div>
              <Link
                href="/iletisim"
                className="mt-5 inline-flex items-center justify-center rounded-full bg-teal px-5 py-2.5 text-sm font-bold text-white hover:bg-teal/90 transition-colors"
              >
                İletişime Geç
              </Link>
            </div>
          </aside>
        </div>
      </section>
    </Layout>
  )
}
