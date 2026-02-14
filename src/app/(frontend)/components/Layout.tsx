'use client'
import { useState, useEffect } from 'react'

import { motion } from 'framer-motion'
import Navbar from './Navbar'
import Footer from './Footer'
import WhatsAppButton from './WhatsAppButton'
import { usePathname } from 'next/navigation'

interface LayoutProps {
  children: React.ReactNode
}

export default function Layout({ children }: LayoutProps) {
  const pathname = usePathname()

  console.log('pathname', pathname)
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return (
    <div className="min-h-screen flex flex-col bg-gray-light">
      {/* Main Content - Smooth Fade In */}
      <motion.main
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.5,
          ease: 'easeOut',
        }}
        className="flex-1"
      >
        {children}
      </motion.main>

      {/* Footer also fades in */}

      <WhatsAppButton />
    </div>
  )
}
