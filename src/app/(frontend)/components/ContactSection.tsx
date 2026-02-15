'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { AnimatePresence, m, motion, type Variants } from 'framer-motion'
import { CheckCircle2, CircleAlert, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Controller, type SubmitHandler, useForm } from 'react-hook-form'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

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
  return <p className="mt-2 text-sm font-medium text-[#7f1d1d]">{message}</p>
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
        title: 'Talebiniz Alindi',
        description:
          'Ekibimiz en kisa surede sizinle iletisime gececek. Ilginiz icin tesekkur ederiz.',
      })
      reset()
    } catch (error) {
      console.error(error)
      setModalState({
        tone: 'error',
        title: 'Gonderim Basarisiz',
        description: 'Talebiniz gonderilemedi. Lutfen tekrar deneyin.',
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
      <section id="iletisim" className="relative pt-24 bg-[#e7f4f5] overflow-hidden">
        <div
          className="absolute inset-0 opacity-10 pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(#006064 1px, transparent 1px)',
            backgroundSize: '20px 20px',
          }}
        />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <AnimatedSection className="text-center mb-16 space-y-4">
            <motion.h2
              variants={fadeInLeft}
              className="font-['Bricolage_Grotesque'] text-4xl sm:text-6xl font-black text-[#006064] tracking-tight"
            >
              Hadi Tanışalım!
            </motion.h2>
            <motion.p
              variants={fadeInLeft}
              className="text-[#006064]/80 text-lg max-w-2xl mx-auto font-medium"
            >
              Bize ulaşın, işletmenizi dijital dünyada bir adım öne taşıyacak o planı birlikte
              kuralım.
            </motion.p>
          </AnimatedSection>

          <AnimatedSection>
            <form onSubmit={handleSubmit(onSubmit)} className="max-w-5xl mx-auto pb-10" noValidate>
              <div className="grid lg:grid-cols-2 gap-8 mb-10">
                <motion.div variants={fadeInUp}>
                  <label htmlFor="fullName" className="block text-sm font-bold text-[#006064] mb-2">
                    Ad Soyad *
                  </label>
                  <Input
                    id="fullName"
                    type="text"
                    aria-invalid={Boolean(errors.fullName)}
                    {...register('fullName')}
                    className="h-12 w-full rounded-2xl border-[#006064]/25 bg-white/70 px-4 text-[#0f2a44] font-semibold focus-visible:border-[#006064] focus-visible:ring-[#006064]/20"
                  />
                  <ErrorText message={errors.fullName?.message} />
                </motion.div>

                <motion.div variants={fadeInUp}>
                  <label
                    htmlFor="companyName"
                    className="block text-sm font-bold text-[#006064] mb-2"
                  >
                    Şirket / İşletme Adı *
                  </label>
                  <Input
                    id="companyName"
                    type="text"
                    aria-invalid={Boolean(errors.companyName)}
                    {...register('companyName')}
                    className="h-12 w-full rounded-2xl border-[#006064]/25 bg-white/70 px-4 text-[#0f2a44] font-semibold focus-visible:border-[#006064] focus-visible:ring-[#006064]/20"
                  />
                  <ErrorText message={errors.companyName?.message} />
                </motion.div>

                <motion.div variants={fadeInUp}>
                  <label htmlFor="email" className="block text-sm font-bold text-[#006064] mb-2">
                    E-posta *
                  </label>
                  <Input
                    id="email"
                    type="email"
                    aria-invalid={Boolean(errors.email)}
                    {...register('email')}
                    className="h-12 w-full rounded-2xl border-[#006064]/25 bg-white/70 px-4 text-[#0f2a44] font-semibold focus-visible:border-[#006064] focus-visible:ring-[#006064]/20"
                  />
                  <ErrorText message={errors.email?.message} />
                </motion.div>

                <motion.div variants={fadeInUp}>
                  <label htmlFor="phone" className="block text-sm font-bold text-[#006064] mb-2">
                    Telefon *
                  </label>
                  <Input
                    id="phone"
                    type="tel"
                    aria-invalid={Boolean(errors.phone)}
                    {...register('phone')}
                    className="h-12 w-full rounded-2xl border-[#006064]/25 bg-white/70 px-4 text-[#0f2a44] font-semibold focus-visible:border-[#006064] focus-visible:ring-[#006064]/20"
                  />
                  <ErrorText message={errors.phone?.message} />
                </motion.div>
              </div>

              <motion.div variants={fadeInUp} className="mb-10">
                <label htmlFor="sector" className="block text-sm font-bold text-[#006064] mb-2">
                  Sektör *
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
                        className="h-12 w-full rounded-2xl border-[#006064]/25 bg-white/70 px-4 text-[#0f2a44] font-semibold focus-visible:border-[#006064] focus-visible:ring-[#006064]/20 data-placeholder:text-[#0f2a44]/50"
                      >
                        <SelectValue placeholder="Sektör seçiniz" />
                      </SelectTrigger>
                      <SelectContent>
                        {sectorOptions.map((option) => (
                          <SelectItem key={option} value={option}>
                            {option}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
                <ErrorText message={errors.sector?.message} />
              </motion.div>

              <motion.fieldset
                variants={fadeInUp}
                className="mb-12 rounded-3xl border border-[#006064]/20 bg-white/50 p-6"
              >
                <legend className="px-2 text-sm font-bold text-[#006064]">
                  Destek Almak İstediğiniz Konu? *
                </legend>
                <Controller
                  name="supportTopics"
                  control={control}
                  render={({ field }) => (
                    <div className="grid sm:grid-cols-2 gap-3 mt-2">
                      {supportTopicOptions.map((topic) => {
                        const selectedTopics = field.value ?? []
                        const checked = selectedTopics.includes(topic)

                        return (
                          <label
                            key={topic}
                            className="flex items-center gap-3 rounded-xl bg-white/70 px-4 py-3 border border-[#006064]/15 cursor-pointer hover:border-[#006064]/40 transition-colors"
                          >
                            <Checkbox
                              checked={checked}
                              aria-invalid={Boolean(errors.supportTopics)}
                              onCheckedChange={(nextChecked) => {
                                const isChecked = nextChecked === true
                                if (isChecked && !selectedTopics.includes(topic)) {
                                  field.onChange([...selectedTopics, topic])
                                  return
                                }
                                if (!isChecked) {
                                  field.onChange(selectedTopics.filter((value) => value !== topic))
                                }
                              }}
                              className="border-[#006064]/40 data-[state=checked]:bg-[#006064] data-[state=checked]:border-[#006064]"
                            />
                            <span className="text-sm font-medium text-[#0f2a44]">{topic}</span>
                          </label>
                        )
                      })}
                    </div>
                  )}
                />
                <ErrorText message={errors.supportTopics?.message} />
              </motion.fieldset>

              <motion.div variants={fadeInUp} className="flex flex-col items-center gap-6">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="h-auto rounded-full bg-[#006064] px-8 py-3 text-white font-bold tracking-wide hover:bg-[#0b7b7f]"
                >
                  Talep Gönder
                </Button>
                <div className="text-[#006064] font-bold mt-2 opacity-70">
                  Ya da bizi arayın:{' '}
                  <a href="tel:+905555555555" className="hover:underline">
                    +90 555 555 55 55
                  </a>
                </div>
              </motion.div>
            </form>
          </AnimatedSection>
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
              className="absolute inset-0 bg-[#001b1f]/45 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />

            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby="contact-modal-title"
              aria-describedby="contact-modal-description"
              className="relative w-full max-w-md overflow-hidden rounded-3xl border border-white/50 bg-white shadow-[0_28px_80px_-30px_rgba(0,96,100,0.55)]"
              initial={{ opacity: 0, y: 24, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 16, scale: 0.98 }}
              transition={{ duration: 0.22, ease: 'easeOut' }}
            >
              <div className="pointer-events-none absolute -top-12 -right-12 size-36 rounded-full bg-[#20c8cd]/30 blur-2xl" />
              <div className="pointer-events-none absolute -bottom-16 -left-14 size-44 rounded-full bg-[#006064]/20 blur-2xl" />

              <button
                type="button"
                onClick={() => setModalState(null)}
                className="absolute right-4 top-4 inline-flex size-8 items-center justify-center rounded-full bg-white/80 text-[#006064] transition-colors hover:bg-white"
              >
                <X className="size-4" />
              </button>

              <div className="relative px-7 pb-7 pt-10 text-center">
                <div
                  className={`mx-auto mb-5 flex size-16 items-center justify-center rounded-2xl shadow-lg ${
                    modalState.tone === 'success'
                      ? 'bg-[#006064] shadow-[#006064]/35'
                      : 'bg-[#b42318] shadow-[#b42318]/35'
                  }`}
                >
                  {modalState.tone === 'success' ? (
                    <CheckCircle2 className="size-8 text-white" />
                  ) : (
                    <CircleAlert className="size-8 text-white" />
                  )}
                </div>

                <h3
                  id="contact-modal-title"
                  className="text-2xl font-['Bricolage_Grotesque'] font-extrabold tracking-tight text-[#00333a]"
                >
                  {modalState.title}
                </h3>
                <p
                  id="contact-modal-description"
                  className="mt-3 text-[15px] leading-relaxed font-medium text-[#0b5d68]/85"
                >
                  {modalState.description}
                </p>

                <Button
                  type="button"
                  onClick={() => setModalState(null)}
                  className="mt-7 h-auto rounded-full bg-[#006064] px-7 py-2.5 text-white font-bold hover:bg-[#0b7b7f]"
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
