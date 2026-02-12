'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { Phone, Clock, MapPin, Instagram } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { useRef } from 'react'

const WA_NUMBER = '542616260921'
const makeWhatsAppLink = (service = '') => {
  const base = 'https://wa.me/'
  const text = `Hola! Quisiera reservar un turno para ${service}`
  return `${base}${WA_NUMBER}?text=${encodeURIComponent(text)}`
}

interface HeroProps {
  isChristmas?: boolean
}

export default function Hero({ isChristmas = false }: HeroProps) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  })

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "15%"])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  return (
    <header ref={ref} className="relative min-h-screen flex items-center overflow-hidden bg-cream">
      {/* Background with Parallax */}
      <motion.div
        style={{ y, opacity }}
        className="absolute inset-0 z-0 overflow-hidden bg-cream"
      >
        <div
          className="absolute inset-0 w-full h-full"
          style={{
            backgroundImage: 'url(/banner.webp)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }}
        />
        {/* Overlay más sofisticado: Cream sólido a transparente suave */}
        <div className="absolute inset-0 bg-gradient-to-r from-cream/90 via-cream/40 to-transparent mix-blend-normal" />
      </motion.div>

      <div className="relative z-10 w-full max-w-7xl px-8 mx-auto pt-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="max-w-3xl"
          >
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="inline-flex items-center gap-2 mb-8"
            >
              <span className="h-px w-12 bg-rose-gold/60"></span>
              <span className="text-rose-gold tracking-[0.2em] text-xs md:text-sm font-semibold uppercase">
                Jezza Studio
              </span>
            </motion.div>

            <h1 className="text-6xl md:text-7xl lg:text-8xl font-heading text-charcoal mb-8 leading-[0.95] tracking-tight">
              Belleza alineada <br />
              <span className="italic font-light text-rose-gold/90">con tu esencia</span>
            </h1>

            <p className="text-warm-gray text-lg md:text-xl mb-12 max-w-lg leading-relaxed font-light text-balance">
              Un espacio donde el cuidado de tus uñas se convierte en un ritual de amor propio.
              <span className="block mt-2 font-medium text-rose-dust">Arte. Precisión. Calma.</span>
            </p>

            <div className="flex flex-col sm:flex-row gap-5 mb-12">
              <a
                href={makeWhatsAppLink('Manicura Clásica')}
                target="_blank"
                rel="noreferrer"
                className="group inline-flex items-center justify-center gap-3 bg-[#2C2C2C] text-white px-12 py-6 rounded-full shadow-premium-lg hover:shadow-premium-xl hover:-translate-y-1 hover:bg-[#B76E79] transition-all duration-300 font-semibold text-lg"
              >
                <Phone size={22} className="group-hover:rotate-12 transition-transform" />
                <span>Reservar turno</span>
              </a>
              <a
                href="#services"
                className="inline-flex items-center justify-center gap-2 px-12 py-6 rounded-full border-2 border-[#2C2C2C] text-[#2C2C2C] font-semibold text-lg hover:bg-[#2C2C2C] hover:text-white transition-all duration-300"
              >
                Ver servicios
              </a>
            </div>

            <div className="pt-10 border-t border-charcoal/10">
              <ul className="flex flex-col gap-6 text-sm text-warm-gray sm:flex-row sm:gap-10">
                <li className="flex items-center gap-3">
                  <div className="p-3 rounded-full bg-rose-dust/20 text-rose-gold">
                    <Clock size={18} />
                  </div>
                  <div>
                    <p className="text-xs text-warm-gray uppercase tracking-wide mb-1">Horarios</p>
                    <p className="text-charcoal font-medium">Lun–Vie 9:00 - 20:00</p>
                  </div>
                </li>
                <li className="flex items-center gap-3">
                  <div className="p-3 rounded-full bg-rose-dust/20 text-rose-gold">
                    <MapPin size={18} />
                  </div>
                  <div>
                    <p className="text-xs text-warm-gray uppercase tracking-wide mb-1">Ubicación</p>
                    <p className="text-charcoal font-medium">Av San Martín 1608, Piso 1</p>
                  </div>
                </li>
              </ul>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Social Floating */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1 }}
        className="absolute right-8 bottom-12 z-20 hidden md:flex flex-col gap-4"
      >
        <Link
          href="https://www.instagram.com/jezzastudio_?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
          target="_blank"
          className="p-4 glass-effect subtle-border shadow-premium-sm rounded-full text-charcoal hover:text-rose-gold hover:scale-110 hover:shadow-premium-md transition-all duration-300"
        >
          <Instagram size={24} />
        </Link>
      </motion.div>
    </header>
  )
}
