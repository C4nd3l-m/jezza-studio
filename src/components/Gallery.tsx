'use client'

import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'

const images = [
  { src: '/1.jpg', alt: 'Manicura lavanda clásica' },
  { src: '/2.jpg', alt: 'Esmaltado en tonos rosados' },
  { src: '/3.jpg', alt: 'Uñas con brillo y glitter' },
  { src: '/4.jpg', alt: 'Manicura francesa moderna' },
  { src: '/5.jpg', alt: 'Diseño floral en uñas' },
  { src: '/6.jpg', alt: 'Diseño floral en uñas' },
  { src: '/7.jpg', alt: 'Diseño floral en uñas' },
  { src: '/8.jpg', alt: 'Diseño floral en uñas' },
  { src: '/9.jpg', alt: 'Diseño floral en uñas' },
  { src: '/10.jpg', alt: 'Diseño floral en uñas' },
  { src: '/11.jpg', alt: 'Diseño floral en uñas' },
]

export default function GalleryCarousel() {
  const [reducedMotion, setReducedMotion] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return
    const mq = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)')
    const handle = () => setReducedMotion(!!mq && mq.matches)
    handle()
    mq && mq.addEventListener('change', handle)
    return () => mq && mq.removeEventListener('change', handle)
  }, [])

  const animationDuration = 16
  const loopItems = [...images, ...images]

  return (
    <section className="py-12 bg-beige">
      <div className="max-w-5xl px-6 mx-auto">
        <h3 className="mb-6 text-3xl font-heading text-primary-dark">Galería</h3>

        <div className="relative overflow-hidden">
          <motion.div
            className="flex gap-6 md:gap-8"
            animate={reducedMotion ? { x: 0 } : { x: ['0%', '-50%'] }}
            transition={reducedMotion ? { duration: 0 } : { repeat: Infinity, ease: 'linear', duration: animationDuration }}
          >
            {loopItems.map((img, i) => (
              <div key={`${img.src}-${i}`} className="flex-shrink-0 w-[48%] sm:w-[30%] md:w-80 md:h-80">
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
