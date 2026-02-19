'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { AnimatePresence, motion, type Variants } from 'framer-motion'
import {
  CheckCircle2,
  CircleAlert,
  X,
  User,
  Building2,
  Mail,
  Phone,
  ArrowRight,
  Sparkles,
} from 'lucide-react'
import { useEffect, useState } from 'react'
import { Controller, type SubmitHandler, useForm } from 'react-hook-form'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
}

const fadeInLeft: Variants = {
  hidden: { opacity: 0, x: -40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease: 'easeOut' },
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

const sectorOptions = [
  'Konaklama',
  'Sağlık',
  'Perakende',
  'Üretim',
  'E-ticaret',
  'Profesyonel Hizmetler',
  'Diğer',
] as const

const supportTopicOptions = [
  'Mevcut durum analizi',
  'Stratejik yol haritası',
  'Süreç yönetimi',
  'Performans değerlendirme',
  'Birlikte değerlendirmek istiyorum',
] as const

const contactFormSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(1, 'Ad Soyad zorunludur')
    .min(3, 'Ad Soyad en az 3 karakter olmalıdır'),
  companyName: z
    .string()
    .trim()
    .min(1, 'Şirket / İşletme Adı zorunludur')
    .min(2, 'Şirket / İşletme Adı en az 2 karakter olmalıdır'),
  email: z.string().trim().min(1, 'E-posta zorunludur').email('Geçerli bir e-posta giriniz'),
  phone: z
    .string()
    .trim()
    .min(1, 'Telefon zorunludur')
    .regex(/^\+?[\d\s()\-]{10,}$/, 'Geçerli bir telefon numarası giriniz'),
  sector: z
    .string()
    .min(1, 'Sektör seçimi zorunludur')
    .refine(
      (value) => sectorOptions.includes(value as (typeof sectorOptions)[number]),
      'Geçerli bir sektör seçiniz',
    ),
  supportTopics: z
    .array(z.string())
    .min(1, 'En az bir destek konusu seçiniz')
    .refine(
      (values) =>
        values.every((topic) =>
          supportTopicOptions.includes(topic as (typeof supportTopicOptions)[number]),
        ),
      'Geçerli destek konuları seçiniz',
    ),
})

type ContactFormData = z.infer<typeof contactFormSchema>
type ContactModalState = {
  description: string
  title: string
  tone: 'error' | 'success'
}

function ErrorText({ message }: { message?: string }) {
  if (!message) return null
  return (
    <motion.p
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      className="mt-1.5 text-[13px] font-medium text-rose-500"
    >
      {message}
    </motion.p>
  )
}

export default function ContactSection() {
  const [modalState, setModalState] = useState<ContactModalState | null>(null)
  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      fullName: '',
      companyName: '',
      email: '',
      phone: '',
      sector: '',
      supportTopics: [],
    },
  })

  const onSubmit: SubmitHandler<ContactFormData> = async (values) => {
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      })

      const responseData = await response.json().catch(() => null)

      if (!response.ok) {
        throw new Error(responseData?.message || 'Contact request failed')
      }

      setModalState({
        tone: 'success',
        title: 'Talebiniz Alındı',
        description:
          'Ekibimiz en kısa sürede sizinle iletişime geçecek. İlginiz için teşekkür ederiz.',
      })
      reset()
    } catch (error) {
      console.error(error)
      setModalState({
        tone: 'error',
        title: 'Gönderim Başarısız',
        description: 'Talebiniz gönderilemedi. Lütfen tekrar deneyin.',
      })
    }
  }

  useEffect(() => {
    if (!modalState) return

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setModalState(null)
      }
    }

    window.addEventListener('keydown', handleEscape)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', handleEscape)
    }
  }, [modalState])

  return (
    <>
      <section id="iletisim" className="relative py-24 bg-slate-50 overflow-hidden">
        {/* Premium Background Elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute -top-[20%] -right-[10%] w-[70%] h-[70%] rounded-full bg-linear-to-br from-[#006064]/10 to-transparent blur-3xl" />
          <div className="absolute -bottom-[20%] -left-[10%] w-[60%] h-[60%] rounded-full bg-linear-to-tr from-[#006064]/5 to-transparent blur-3xl" />
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-8 items-start">
            {/* Left Column: Copy & Contact Info */}
            <AnimatedSection className="max-w-xl lg:sticky lg:top-32 lg:pb-12">
              <motion.div variants={fadeInLeft} className="space-y-8">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-[#006064]/10 shadow-sm">
                  <Sparkles className="w-4 h-4 text-[#006064]" />
                  <span className="text-sm font-bold text-[#006064]">İletişime Geçin</span>
                </div>

                <h2 className="font-['Bricolage_Grotesque'] text-4xl sm:text-5xl lg:text-6xl font-black text-navy tracking-tight leading-[1.1]">
                  Hadi <span className="text-teal">Tanışalım!</span>
                </h2>

                <p className="text-slate-600 text-lg leading-relaxed font-medium">
                  Bize ulaşın, işletmenizi dijital dünyada bir adım öne taşıyacak o planı birlikte
                  kuralım. Uzman ekibimiz size özel çözümler sunmak için hazır.
                </p>

                <div className="space-y-6 pt-8 border-t border-slate-200/60">
                  <a
                    href="tel:+905555555555"
                    className="group flex items-center gap-5 p-4 rounded-2xl bg-white border border-slate-100 shadow-sm hover:shadow-md hover:border-[#006064]/20 transition-all"
                  >
                    <div className="shrink-0 w-14 h-14 flex items-center justify-center rounded-xl bg-[#006064]/5 text-[#006064] group-hover:bg-[#006064] group-hover:text-white transition-colors">
                      <Phone className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-500 mb-1">Bizi Arayın</h4>
                      <div className="text-slate-900 text-lg font-bold group-hover:text-[#006064] transition-colors">
                        +90 555 555 55 55
                      </div>
                    </div>
                  </a>

                  <a
                    href="mailto:info@sedinsight.com"
                    className="group flex items-center gap-5 p-4 rounded-2xl bg-white border border-slate-100 shadow-sm hover:shadow-md hover:border-[#006064]/20 transition-all"
                  >
                    <div className="shrink-0 w-14 h-14 flex items-center justify-center rounded-xl bg-[#006064]/5 text-[#006064] group-hover:bg-[#006064] group-hover:text-white transition-colors">
                      <Mail className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-500 mb-1">E-posta Gönderin</h4>
                      <div className="text-slate-900 text-lg font-bold group-hover:text-[#006064] transition-colors">
                        info@sedinsight.com
                      </div>
                    </div>
                  </a>
                </div>
              </motion.div>
            </AnimatedSection>

            {/* Right Column: Form */}
            <AnimatedSection>
              <motion.div
                variants={fadeInUp}
                className="bg-white rounded-4xl shadow-[0_8px_40px_-12px_rgba(0,0,0,0.1)] border border-slate-100 p-6 sm:p-10 relative overflow-hidden"
              >
                {/* Decorative subtle line top */}
                <div className="absolute top-0 left-0 w-full h-1.5 bg-linear-to-r from-[#006064] via-[#20c8cd] to-[#006064]" />

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-8" noValidate>
                  <div className="grid sm:grid-cols-2 gap-6">
                    {/* Full Name */}
                    <div className="space-y-2.5">
                      <label htmlFor="fullName" className="text-sm font-bold text-slate-700">
                        Ad Soyad
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                          <User className="h-5 w-5" />
                        </div>
                        <Input
                          id="fullName"
                          {...register('fullName')}
                          className="pl-11 h-14 bg-slate-50/50 border-slate-200 hover:border-[#006064]/30 focus:border-[#006064] focus:ring-[#006064]/10 transition-all rounded-xl shadow-sm text-slate-900 font-medium"
                          placeholder="Ahmet Yılmaz"
                          aria-invalid={Boolean(errors.fullName)}
                        />
                      </div>
                      <ErrorText message={errors.fullName?.message} />
                    </div>

                    {/* Company Name */}
                    <div className="space-y-2.5">
                      <label htmlFor="companyName" className="text-sm font-bold text-slate-700">
                        Şirket / İşletme Adı
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                          <Building2 className="h-5 w-5" />
                        </div>
                        <Input
                          id="companyName"
                          {...register('companyName')}
                          className="pl-11 h-14 bg-slate-50/50 border-slate-200 hover:border-[#006064]/30 focus:border-[#006064] focus:ring-[#006064]/10 transition-all rounded-xl shadow-sm text-slate-900 font-medium"
                          placeholder="Şirket A.Ş."
                          aria-invalid={Boolean(errors.companyName)}
                        />
                      </div>
                      <ErrorText message={errors.companyName?.message} />
                    </div>

                    {/* Email */}
                    <div className="space-y-2.5">
                      <label htmlFor="email" className="text-sm font-bold text-slate-700">
                        E-posta
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                          <Mail className="h-5 w-5" />
                        </div>
                        <Input
                          id="email"
                          type="email"
                          {...register('email')}
                          className="pl-11 h-14 bg-slate-50/50 border-slate-200 hover:border-[#006064]/30 focus:border-[#006064] focus:ring-[#006064]/10 transition-all rounded-xl shadow-sm text-slate-900 font-medium"
                          placeholder="ornek@sirket.com"
                          aria-invalid={Boolean(errors.email)}
                        />
                      </div>
                      <ErrorText message={errors.email?.message} />
                    </div>

                    {/* Phone */}
                    <div className="space-y-2.5">
                      <label htmlFor="phone" className="text-sm font-bold text-slate-700">
                        Telefon
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                          <Phone className="h-5 w-5" />
                        </div>
                        <Input
                          id="phone"
                          type="tel"
                          {...register('phone')}
                          className="pl-11 h-14 bg-slate-50/50 border-slate-200 hover:border-[#006064]/30 focus:border-[#006064] focus:ring-[#006064]/10 transition-all rounded-xl shadow-sm text-slate-900 font-medium"
                          placeholder="+90 555 555 55 55"
                          aria-invalid={Boolean(errors.phone)}
                        />
                      </div>
                      <ErrorText message={errors.phone?.message} />
                    </div>
                  </div>

                  {/* Sector */}
                  <div className="space-y-2.5">
                    <label htmlFor="sector" className="text-sm font-bold text-slate-700">
                      Sektör
                    </label>
                    <Controller
                      name="sector"
                      control={control}
                      render={({ field }) => (
                        <Select
                          name={field.name}
                          value={field.value || undefined}
                          onValueChange={field.onChange}
                        >
                          <SelectTrigger
                            id="sector"
                            aria-invalid={Boolean(errors.sector)}
                            className="h-14 bg-slate-50/50 border-slate-200 hover:border-[#006064]/30 focus:border-[#006064] focus:ring-[#006064]/10 transition-all rounded-xl shadow-sm text-slate-900 font-medium data-placeholder:text-slate-400"
                          >
                            <SelectValue placeholder="Sektör seçiniz" />
                          </SelectTrigger>
                          <SelectContent className="rounded-xl border-slate-100 shadow-xl">
                            {sectorOptions.map((option) => (
                              <SelectItem
                                key={option}
                                value={option}
                                className="rounded-lg cursor-pointer focus:bg-[#006064]/5 focus:text-[#006064] font-medium"
                              >
                                {option}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      )}
                    />
                    <ErrorText message={errors.sector?.message} />
                  </div>

                  {/* Support Topics (Pills) */}
                  <div className="space-y-3">
                    <label className="text-sm font-bold text-slate-700">
                      Destek Almak İstediğiniz Konu?
                    </label>
                    <Controller
                      name="supportTopics"
                      control={control}
                      render={({ field }) => (
                        <div className="flex flex-wrap gap-2.5">
                          {supportTopicOptions.map((topic) => {
                            const selectedTopics = field.value ?? []
                            const isSelected = selectedTopics.includes(topic)

                            return (
                              <button
                                key={topic}
                                type="button"
                                onClick={() => {
                                  if (isSelected) {
                                    field.onChange(selectedTopics.filter((t) => t !== topic))
                                  } else {
                                    field.onChange([...selectedTopics, topic])
                                  }
                                }}
                                className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 border ${
                                  isSelected
                                    ? 'bg-[#006064] border-[#006064] text-white shadow-md shadow-[#006064]/20'
                                    : 'bg-white border-slate-200 text-slate-600 hover:border-[#006064]/30 hover:bg-slate-50'
                                }`}
                              >
                                {topic}
                              </button>
                            )
                          })}
                        </div>
                      )}
                    />
                    <ErrorText message={errors.supportTopics?.message} />
                  </div>

                  <div className="pt-2">
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full h-14 text-base font-bold text-white bg-linear-to-r from-navy to-teal hover:from-navy/50 hover:to-teal/70 rounded-xl shadow-lg shadow-[#006064]/25 transition-all duration-300 disabled:opacity-70 group"
                    >
                      {isSubmitting ? (
                        <span className="flex items-center gap-3">
                          <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          Gönderiliyor...
                        </span>
                      ) : (
                        <span className="flex items-center justify-center gap-2">
                          Talebi Gönder
                          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </span>
                      )}
                    </Button>
                  </div>
                </form>
              </motion.div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      <AnimatePresence>
        {modalState && (
          <motion.div
            className="fixed inset-0 z-110 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.button
              type="button"
              aria-label="Modali kapat"
              onClick={() => setModalState(null)}
              className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />

            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby="contact-modal-title"
              aria-describedby="contact-modal-description"
              className="relative w-full max-w-md overflow-hidden rounded-4xl border border-white/50 bg-white shadow-2xl"
              initial={{ opacity: 0, y: 24, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 16, scale: 0.98 }}
              transition={{ duration: 0.22, ease: 'easeOut' }}
            >
              <div className="pointer-events-none absolute -top-12 -right-12 size-40 rounded-full bg-slate-50 blur-2xl" />
              <div className="pointer-events-none absolute -bottom-16 -left-14 size-48 rounded-full bg-[#006064]/5 blur-2xl" />

              <button
                type="button"
                onClick={() => setModalState(null)}
                className="absolute right-4 top-4 z-10 inline-flex size-8 items-center justify-center rounded-full bg-slate-100 text-slate-500 transition-colors hover:bg-slate-200 hover:text-slate-900"
              >
                <X className="size-4" />
              </button>

              <div className="relative px-8 pb-8 pt-12 text-center">
                <div
                  className={`mx-auto mb-6 flex size-16 items-center justify-center rounded-2xl shadow-lg ${
                    modalState.tone === 'success'
                      ? 'bg-emerald-50 text-emerald-600 shadow-emerald-500/10 border border-emerald-100'
                      : 'bg-rose-50 text-rose-600 shadow-rose-500/10 border border-rose-100'
                  }`}
                >
                  {modalState.tone === 'success' ? (
                    <CheckCircle2 className="size-8" />
                  ) : (
                    <CircleAlert className="size-8" />
                  )}
                </div>

                <h3
                  id="contact-modal-title"
                  className="text-2xl font-['Bricolage_Grotesque'] font-black tracking-tight text-slate-900"
                >
                  {modalState.title}
                </h3>
                <p
                  id="contact-modal-description"
                  className="mt-3 text-[15px] leading-relaxed font-medium text-slate-600"
                >
                  {modalState.description}
                </p>

                <Button
                  type="button"
                  onClick={() => setModalState(null)}
                  className="mt-8 w-full h-12 rounded-xl bg-slate-900 text-white font-bold hover:bg-slate-800 transition-colors"
                >
                  Tamam
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
