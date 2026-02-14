'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

import type { Header } from '@/payload-types'
import Image from 'next/image'

import { Logo } from '@/components/Logo/Logo'
import { HeaderNav } from './Nav'
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion'

interface HeaderClientProps {
  data: Header
}

export const HeaderClient: React.FC<HeaderClientProps> = ({ data }) => {
  /* Storing the value in a useState to avoid hydration errors */

  console.log('data client', data)
  const [theme, setTheme] = useState<string | null>(null)
  const [isScrolled, setIsScrolled] = useState(false)
  const { scrollY } = useScroll()

  const pathname = usePathname()
  const router = useRouter()
  const { headerTheme, setHeaderTheme } = useHeaderTheme()
  useMotionValueEvent(scrollY, 'change', (latest) => {
    setIsScrolled(latest > 90)
  })

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

  const handleLinkClick = (link: { type: string; href: string }) => {
    if (link.type === 'route') {
      router.push(link.href)
      return
    }
    scrollToSection(link.href)
  }

  useEffect(() => {
    setHeaderTheme(null)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  useEffect(() => {
    if (headerTheme && headerTheme !== theme) setTheme(headerTheme)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [headerTheme])

  return (
    <header className="container relative z-20   " {...(theme ? { 'data-theme': theme } : {})}>
      {/* <div className="py-8 flex justify-between">
        <Link href="/">
          <Logo loading="eager" priority="high" className="invert dark:invert-0" />
        </Link>
        <HeaderNav data={data} />
      </div> */}
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
              <Logo loading="eager" priority="high" className="invert dark:invert-0" />
            </button>

            <div className="hidden lg:flex items-center gap-7">
              <HeaderNav data={data} />
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
                <Logo loading="eager" priority="high" className="invert dark:invert-0" />
              </button>

              <div className="hidden md:flex items-center gap-8">
                <HeaderNav data={data} />
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
    </header>
  )
}
