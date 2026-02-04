'use client'

import { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
import Hero from '../components/Hero'
import { useChristmasTheme } from '../hooks/useChristmasTheme'

// Lazy load heavy components below the fold
const Services = dynamic(() => import('../components/Services'), { ssr: true })
const Promotions = dynamic(() => import('../components/Promotions'), { ssr: true })
const Gallery = dynamic(() => import('../components/Gallery'), { ssr: false }) // Gallery is heavy on images
const Testimonials = dynamic(() => import('../components/Testimonials'), { ssr: true })
const Contact = dynamic(() => import('../components/Contact'), { ssr: true })
const Footer = dynamic(() => import('../components/Footer'), { ssr: true })
const LoginModal = dynamic(() => import('../components/LoginModal'), { ssr: false })
const AdminIndicator = dynamic(() => import('../components/AdminIndicator'), { ssr: false })
const SecretAdminButton = dynamic(() => import('../components/SecretAdminButton'), { ssr: false })
const ChristmasSnowfall = dynamic(() => import('../components/ChristmasSnowfall'), { ssr: false })
const ChristmasDecorations = dynamic(() => import('../components/ChristmasDecorations'), { ssr: false })

export default function Home() {
  const [showLoginModal, setShowLoginModal] = useState(false)
  const isChristmas = useChristmasTheme()
  // Keyboard listener removed in favor of SecretAdminButton


  return (
    <main className={`min-h-screen scroll-smooth antialiased bg-gradient-to-b from-cream via-nude to-beige ${isChristmas ? 'christmas-theme' : ''}`}>
      {/* Christmas Theme Elements */}
      {isChristmas && (
        <>
          <ChristmasSnowfall />
          <ChristmasDecorations />
        </>
      )}

      {/* Hero */}
      <Hero isChristmas={isChristmas} />

      {/* Servicios */}
      <Services />

      {/* Promociones */}
      <Promotions />

      {/* Galería */}
      <Gallery />

      {/* Testimonios */}
      <Testimonials />

      {/* Contacto */}
      <Contact />

      {/* Footer */}
      <Footer isChristmas={isChristmas} />

      {/* Login Modal */}
      <LoginModal isOpen={showLoginModal} onClose={() => setShowLoginModal(false)} />

      {/* Secret Admin Button */}
      <SecretAdminButton onOpenLogin={() => setShowLoginModal(true)} />

      {/* Admin Indicator */}
      <AdminIndicator />
    </main>
  )
}
