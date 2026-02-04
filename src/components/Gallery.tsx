'use client'

import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'

type GalleryImage = {
  _id: string
  src: string
  alt: string
}

export default function GalleryCarousel() {
  const [images, setImages] = useState<GalleryImage[]>([])
  const [reducedMotion, setReducedMotion] = useState(false)

  useEffect(() => {
    // Fetch gallery images from API
    fetch('/api/gallery')
      .then(res => res.json())
      .then(data => {
        // Ensure data is an array
        setImages(Array.isArray(data) ? data : [])
      })
      .catch(err => {
        console.error('Error loading gallery:', err)
        setImages([])
      })
  }, [])

  useEffect(() => {
    if (typeof window === 'undefined') return
    const mq = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)')
    const handle = () => setReducedMotion(!!mq && mq.matches)
    handle()
    mq && mq.addEventListener('change', handle)
    return () => mq && mq.removeEventListener('change', handle)
  }, [])

  if (images.length === 0) {
    return (
      <section className="py-32 bg-beige">
        <div className="max-w-7xl px-8 mx-auto">
          <h3 className="mb-8 text-5xl font-heading text-charcoal text-center">Galería</h3>
          <p className="text-center text-warm-gray">Cargando galería...</p>
        </div>
      </section>
    )
  }

  return (
    <section className="py-32 bg-beige">
      <div className="max-w-7xl px-8 mx-auto">
        <div className="text-center mb-20">
          <span className="inline-block text-rose-gold font-medium tracking-widest text-sm uppercase mb-4 gold-line pb-3">
            Nuestros Trabajos
          </span>
          <h3 className="text-5xl md:text-6xl font-heading text-charcoal mb-6 leading-tight">
            Galería
          </h3>
          <p className="text-warm-gray text-lg max-w-2xl mx-auto leading-relaxed">
            Explorá algunos de nuestros diseños más recientes
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
          {images.map((img, i) => (
            <motion.div
              key={img._id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.08, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="group relative aspect-[4/5] p-3 bg-white rounded-xl shadow-premium-sm transition-all duration-700 hover:-translate-y-2 hover:shadow-premium-xl hover:rotate-1"
            >
              <div className="relative w-full h-full overflow-hidden rounded-lg">
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-cover transition-transform duration-1000 group-hover:scale-110 will-change-transform"
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-rose-dust/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 mix-blend-overlay" />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0 text-white font-medium text-xs tracking-widest uppercase">
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
