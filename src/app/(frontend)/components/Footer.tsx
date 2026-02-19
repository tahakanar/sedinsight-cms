import { motion } from 'framer-motion'
import { Mail, Phone, Linkedin } from 'lucide-react'
import logoImage from '@/assets/logo.png'
import Image from 'next/image'

export default function Footer() {
  const scrollToSection = (href: string) => {
    const element = document.getElementById(href.replace('#', ''))
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <footer className="bg-navy text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Left - Logo & Copyright */}
          <div className="flex items-center gap-4">
            <button onClick={() => scrollToSection('#hero')}>
              <Image src={logoImage} alt="SedInsight Logo" className="h-10 w-auto rounded-full" />
            </button>
            <span className="text-white/40 text-sm hidden sm:block">
              {new Date().getFullYear()} SedInsight
            </span>
          </div>

          {/* Center - Contact */}
          <div className="flex items-center gap-6 text-sm">
            <a
              href="mailto:info@sedinsight.com"
              className="flex items-center gap-2 text-white/50 hover:text-teal transition-colors"
            >
              <Mail className="w-4 h-4" />
              <span className="hidden sm:inline">info@sedinsight.com</span>
            </a>
            <a
              href="tel:+905555555555"
              className="flex items-center gap-2 text-white/50 hover:text-teal transition-colors"
            >
              <Phone className="w-4 h-4" />
              <span className="hidden sm:inline">+90 555 555 55 55</span>
            </a>
          </div>

          {/* Right - Social */}
          <motion.a
            href="#"
            whileHover={{ scale: 1.1 }}
            className="w-9 h-9 bg-white/5 rounded-full flex items-center justify-center hover:bg-teal transition-all"
            aria-label="LinkedIn"
          >
            <Linkedin className="w-4 h-4" />
          </motion.a>
        </div>
      </div>
    </footer>
  )
}
