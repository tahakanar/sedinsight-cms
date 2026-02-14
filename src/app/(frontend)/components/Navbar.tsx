import { useState } from 'react'
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion'
import { usePathname, useRouter } from 'next/navigation'
import logoImage from '@/assets/logo.png'
import Image from 'next/image'

const navLinks = [
  { name: 'Hizmetler', href: '/hizmetler', type: 'route' as const },
  { name: 'Yaklaşımımız', href: '/yaklasimimiz', type: 'route' as const },
  { name: 'Hakkımızda', href: '#hakkimizda', type: 'section' as const },
  { name: 'İletişim', href: '/iletisim', type: 'route' as const },
]

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, 'change', (latest) => {
    setIsScrolled(latest > 90)
  })

  const pathname = usePathname()
  const router = useRouter()

  const scrollToSection = (href: string) => {
    if (pathname === '/') {
      const element = document.getElementById(href.replace('#', ''))
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
      }
    } else {
      router.push(`/${href}`)
    }
  }

  const handleLinkClick = (link: (typeof navLinks)[number]) => {
    if (link.type === 'route') {
      router.push(link.href)
      return
    }
    scrollToSection(link.href)
  }

  return (
    <>
      <AnimatePresence initial={false}>
        {!isScrolled && (
          <motion.nav
            key="floating-navbar"
            initial={{ y: -90, opacity: 0, scale: 0.95 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: -38, opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.55, ease: 'easeOut' }}
            className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-220 bg-white/95 border-2 border-teal/20 rounded-full shadow-2xl px-4 md:px-6 py-1.5 flex items-center justify-between"
          >
            <button
              onClick={() => router.push('/')}
              className="flex items-center gap-3 group shrink-0"
            >
              <Image src={logoImage} alt="SedInsight Logo" className="h-11 w-auto rounded-full" />
            </button>

            <div className="hidden lg:flex items-center gap-7">
              {navLinks.map((link) => (
                <button
                  key={link.name}
                  onClick={() => handleLinkClick(link)}
                  className="text-navy/85 text-sm font-semibold hover:text-teal transition-colors"
                >
                  {link.name}
                </button>
              ))}
            </div>

            <motion.button
              onClick={() => router.push('/iletisim')}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="px-6 py-2.5 bg-teal text-white text-sm font-bold rounded-full shadow-lg hover:shadow-teal/25 transition-all cursor-pointer"
            >
              İletişim
            </motion.button>
          </motion.nav>
        )}
      </AnimatePresence>

      <AnimatePresence initial={false}>
        {isScrolled && (
          <motion.nav
            key="sticky-navbar"
            initial={{ y: -90, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -90, opacity: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="fixed top-0 inset-x-0 z-50 border-b border-teal/15 bg-white/95 backdrop-blur-xl shadow-[0_12px_30px_rgba(15,42,68,0.08)]"
          >
            <div className="max-w-7xl mx-auto h-18 px-4 sm:px-6 lg:px-8 flex items-center justify-between">
              <button onClick={() => router.push('/')} className="shrink-0">
                <Image src={logoImage} alt="SedInsight Logo" className="h-10 w-auto rounded-full" />
              </button>

              <div className="hidden md:flex items-center gap-8">
                {navLinks.map((link) => (
                  <button
                    key={`sticky-${link.name}`}
                    onClick={() => handleLinkClick(link)}
                    className="text-navy/90 text-[15px] font-semibold hover:text-teal transition-colors"
                  >
                    {link.name}
                  </button>
                ))}
              </div>

              <button
                onClick={() => router.push('/iletisim')}
                className="rounded-full bg-teal px-5 py-2 text-sm font-bold text-white hover:bg-teal/90 transition-colors"
              >
                İletişim
              </button>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  )
}
