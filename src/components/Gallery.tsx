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

  const animationDuration = 16
  const loopItems = images.length > 0 ? [...images, ...images] : []

  if (images.length === 0) {
    return (
      <section className="py-12 bg-[#1a1a1a]">
        <div className="max-w-5xl px-6 mx-auto">
          <h3 className="mb-6 text-3xl font-heading text-white">Galería</h3>
          <p className="text-center text-gray-400">Cargando galería...</p>
        </div>
      </section>
    )
  }

  return (
    <section className="py-12 bg-[#1a1a1a]">
      <div className="max-w-5xl px-6 mx-auto">
        <h3 className="mb-6 text-3xl font-heading text-white">Galería</h3>

        <div className="relative overflow-hidden">
          <motion.div
            className="flex gap-6 md:gap-8"
            animate={reducedMotion ? { x: 0 } : { x: ['0%', '-50%'] }}
            transition={reducedMotion ? { duration: 0 } : { repeat: Infinity, ease: 'linear', duration: animationDuration }}
          >
            {loopItems.map((img, i) => (
              <div key={`${img._id}-${i}`} className="flex-shrink-0 w-[48%] sm:w-[30%] md:w-80 md:h-80">
                <Image
                  src={img.src}
                  alt={img.alt}
                  width={800}
                  height={800}
                  className="object-cover w-full h-auto rounded-lg"
                  priority={i < images.length}
                />
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
