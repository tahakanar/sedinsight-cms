import { motion } from 'framer-motion'
import avatar1 from '@/assets/avatar.png' // Fallback/Placeholder
import Image from 'next/image'

// Placeholder data - replace with real testimonials if available
const TESTIMONIALS = [
  {
    text: "SedInsight'in stratejik yaklaşımı sayesinde dijital dönüşüm sürecimizde net bir yol haritasına sahip olduk.",
    name: 'Ayşe Yılmaz',
    title: 'Pazarlama Müdürü',
    image: avatar1,
  },
  {
    text: 'Karmaşık görünen süreçleri bu kadar sadeleştirmeleri inanılmaz. Tam ihtiyacımız olan çözümleri sundular.',
    name: 'Mehmet Demir',
    title: 'Operasyon Direktörü',
    image: avatar1,
  },
  {
    text: 'Veriye dayalı kararlar almamızda bize rehberlik ettiler. İşletmemiz için gerçek bir dönüm noktası oldu.',
    name: 'Zeynep Kaya',
    title: 'Girişimci',
    image: avatar1,
  },
  {
    text: 'Ekip olarak bizimle bütünleştiler ve sanki kendi işleriymiş gibi sahiplendiler. Harika bir deneyimdi.',
    name: 'Caner Öztürk',
    title: 'CTO',
    image: avatar1,
  },
]

const FEATURED_TESTIMONIAL = {
  text: 'SedInsight, şimdiye kadar çalıştığım en vizyoner ve sonuç odaklı danışmanlık partneri.',
  name: 'Burak Yıldız',
  title: 'Genel Müdür, TechCorp',
  image: avatar1,
}

export default function Testimonials() {
  return (
    <section className="relative pt-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pb-10">
        {/* Featured Testimonial */}
        <div className="max-w-4xl mx-auto text-center mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="font-['Bricolage_Grotesque'] text-4xl sm:text-5xl lg:text-6xl font-bold text-navy leading-tight mb-10">
              &quot;{FEATURED_TESTIMONIAL.text}&quot;
            </h2>

            <div className="flex flex-col items-center justify-center gap-4">
              <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-gray-light shadow-lg">
                <Image
                  src={FEATURED_TESTIMONIAL.image}
                  alt={FEATURED_TESTIMONIAL.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="text-center">
                <h3 className="text-xl font-bold text-navy">{FEATURED_TESTIMONIAL.name}</h3>
                <p className="text-gray-dark font-medium">{FEATURED_TESTIMONIAL.title}</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Marquee Testimonials */}
        <div className="relative overflow-hidden">
          {/* Gradient Masks for Marquee fade effect - Tunnel Feel */}
          {/* Gradient Masks for Marquee fade effect - Tunnel Feel */}
          <div className="absolute top-0 bottom-0 left-0 sm:w-64 bg-linear-to-r from-white from-30% via-white/95 to-transparent z-10 pointer-events-none" />
          <div className="absolute top-0 bottom-0 right-0 sm:w-64 bg-linear-to-l from-white from-30% via-white/95 to-transparent z-10 pointer-events-none" />

          <motion.div
            className="flex gap-6 w-max"
            animate={{ x: ['0%', '-50%'] }}
            transition={{
              duration: 40,
              repeat: Infinity,
              ease: 'linear',
              repeatType: 'loop',
            }}
          >
            {/* Duplicated list for seamless scrolling */}
            {[...TESTIMONIALS, ...TESTIMONIALS, ...TESTIMONIALS].map((item, idx) => (
              <div
                key={idx}
                className="w-87.5 p-8 rounded-3xl bg-gray-light border border-gray-200/50 hover:shadow-xl transition-shadow duration-300"
              >
                <p className="text-navy/80 text-lg font-medium leading-relaxed mb-6">
                  &quot;{item.text}&quot;
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-200 shrink-0">
                    <Image
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-bold text-navy text-sm">{item.name}</h4>
                    <p className="text-gray text-xs">{item.title}</p>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
