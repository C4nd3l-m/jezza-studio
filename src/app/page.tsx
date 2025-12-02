'use client'

import { useState, useEffect } from 'react'
import Hero from '../components/Hero'
import Services from '../components/Services'
import Promotions from '../components/Promotions'
import Gallery from '../components/Gallery'
import Testimonials from '../components/Testimonials'
import Contact from '../components/Contact'
import Footer from '../components/Footer'
import LoginModal from '../components/LoginModal'
import AdminIndicator from '../components/AdminIndicator'
import ChristmasSnowfall from '../components/ChristmasSnowfall'
import ChristmasDecorations from '../components/ChristmasDecorations'
import { useChristmasTheme } from '../hooks/useChristmasTheme'
import SecretAdminButton from '../components/SecretAdminButton'

export default function Home() {
  const [showLoginModal, setShowLoginModal] = useState(false)
  const isChristmas = useChristmasTheme()
  // Keyboard listener removed in favor of SecretAdminButton


  return (
    <main className={`min-h-screen scroll-smooth antialiased bg-gradient-to-b from-[#0a0a0a] via-[#1a1a1a] to-[#0f1110] ${isChristmas ? 'christmas-theme' : ''}`}>
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
