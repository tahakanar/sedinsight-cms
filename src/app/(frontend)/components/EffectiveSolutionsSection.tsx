import { ThumbsUp, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { services } from '@/lib/services'

interface EffectiveSolutionsSectionProps {
  id?: string
  showBottomWave?: boolean
  waveColor?: string
}

export default function EffectiveSolutionsSection({
  id = 'surec',
  showBottomWave = true,
  waveColor = '#0f2a44',
}: EffectiveSolutionsSectionProps) {
  return (
    <section id={id} className="relative pt-24 bg-[#e9ecf2] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-14">
        <div className="text-center max-w-4xl mx-auto">
          <span className="text-teal text-sm sm:text-base font-bold tracking-[0.22em] uppercase">
            Leading
          </span>
          <h2 className="mt-4 font-['Bricolage_Grotesque'] text-5xl sm:text-6xl font-black text-navy tracking-tight">
            Effective Solutions
          </h2>
          <p className="mt-6 text-lg text-gray-dark/70 leading-relaxed">
            İşletmenin dijital yolculuğunu doğru sırayla, doğru hedefle ve sürdürülebilir etkiyle
            ilerleten 4 temel çözüm alanı.
          </p>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {services.map((item) => (
            <article
              key={item.slug}
              className="group relative overflow-hidden rounded-2xl bg-white shadow-[0_14px_34px_rgba(15,42,68,0.08)]"
            >
              <div className="relative h-56 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-navy/20 transition-opacity duration-300 group-hover:opacity-0" />
                <div className="absolute inset-0 bg-linear-to-t from-navy/85 via-navy/45 to-transparent translate-y-full transition-transform duration-500 group-hover:translate-y-0" />
              </div>

              <div className="relative p-7 overflow-hidden">
                <div className="absolute inset-0 bg-teal translate-y-full transition-transform duration-500 group-hover:translate-y-0" />
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-5">
                    <div className="inline-flex size-12 items-center justify-center rounded-xl bg-teal/12 text-teal transition-colors duration-300 group-hover:bg-white/15 group-hover:text-white">
                      <ThumbsUp className="size-6" />
                    </div>
                    <span className="text-gray-dark/30 text-4xl font-black transition-colors duration-300 group-hover:text-white/25">
                      {item.step}
                    </span>
                  </div>

                  <h3 className="text-2xl font-black text-navy transition-colors duration-300 group-hover:text-white">
                    {item.title}
                  </h3>
                  <p className="mt-4 text-gray text-lg leading-relaxed transition-colors duration-300 group-hover:text-white/85 h-15">
                    {item.description}
                  </p>

                  <Link
                    href={item.path}
                    className="mt-6 inline-flex items-center gap-2 text-lg font-bold text-navy transition-colors duration-300 group-hover:text-white"
                  >
                    Read More
                    <ArrowRight className="size-5 transition-transform duration-300 group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
