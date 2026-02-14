import { getCachedGlobal } from '@/utilities/getGlobals'
import Link from 'next/link'
import React from 'react'

import type { Footer } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { Logo } from '@/components/Logo/Logo'
import { Linkedin, Mail, Phone } from 'lucide-react'
import { motion } from 'framer-motion'

export async function Footer() {
  const footerData: Footer = await getCachedGlobal('footer', 1)()

  const navItems = footerData?.navItems || []

  return (
    <footer className="mt-auto bg-navy text-white">
      {/* <div className="container py-8 gap-8 flex flex-col md:flex-row md:justify-between">
        <Link className="flex items-center" href="/">
          <Logo />
        </Link>

        <div className="flex flex-col-reverse items-start md:flex-row gap-4 md:items-center">
          <nav className="flex flex-col md:flex-row gap-4">
            {navItems.map(({ link }, i) => {
              return <CMSLink className="text-white" key={i} {...link} />
            })}
          </nav>
        </div>
      </div> */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Left - Logo & Copyright */}
          <div className="flex items-center gap-4">
            <Link className="flex items-center" href="/">
              <Logo />
            </Link>
            <span className="text-white/40 text-sm hidden sm:block">
              {new Date().getFullYear()} SedInsight
            </span>
          </div>

          {/* Center - Contact */}
          <div className="flex items-center gap-6 text-sm">
            <Link
              href="mailto:info@sedinsight.com"
              className="flex items-center gap-2 text-white/50 hover:text-teal transition-colors"
            >
              <Mail className="w-4 h-4" />
              <span className="hidden sm:inline">info@sedinsight.com</span>
            </Link>
            <Link
              href="tel:+905555555555"
              className="flex items-center gap-2 text-white/50 hover:text-teal transition-colors"
            >
              <Phone className="w-4 h-4" />
              <span className="hidden sm:inline">+90 555 555 55 55</span>
            </Link>
          </div>

          {/* Right - Social */}
          <Link
            href="#"
            className="w-9 h-9 bg-white/5 rounded-full flex items-center justify-center hover:bg-teal transition-all"
            aria-label="LinkedIn"
          >
            <Linkedin className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </footer>
  )
}
