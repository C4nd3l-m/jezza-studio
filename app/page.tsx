'use client'

import Hero from '../src/components/Hero'
import Services from '../src/components/Services'
import GalleryCarousel from '../src/components/Gallery'
import Testimonials from '../src/components/Testimonials'
import Contact from '../src/components/Contact'
import Footer from '../src/components/Footer'

export default function Home() {
  return (
    <main className="min-h-screen bg-linear-to-b from-primary-light via-beige to-white scroll-smooth antialiased">
      <Hero />
      <Services />
      <GalleryCarousel />
      <Testimonials />
      <Contact />
      <Footer />
    </main>
  )
}