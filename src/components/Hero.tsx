'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { Phone, Clock, MapPin, Instagram } from 'lucide-react'
import Link from 'next/link'
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

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  return (
    <header ref={ref} className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Background with Parallax */}
      <motion.div
        style={{ y, opacity }}
        className="absolute inset-0 z-0"
      >
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat transform scale-105"
          style={{ backgroundImage: "url('/hero-banner.png')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-transparent" />
      </motion.div>

      <div className="relative z-10 w-full max-w-6xl px-6 mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-block mb-4 px-4 py-1.5 rounded-full bg-primary-light/50 text-primary-dark text-sm font-medium tracking-wide"
            >
              Nail Art & Care Studio {isChristmas && '🎄'}
            </motion.div>

            <h1 className="mb-4 text-5xl font-heading text-white sm:text-6xl md:text-7xl leading-tight">
              Jezza <span className="text-primary italic">Studio</span>
            </h1>

            <h2 className="mb-6 text-xl text-gray-300 sm:text-2xl font-light tracking-wide">
              Belleza alineada con tu esencia ✨
            </h2>

            <p className="max-w-lg mb-8 text-lg text-gray-400 leading-relaxed">
              En Jezza Studio creemos que la verdadera belleza nace de la energía que proyectás.
              Creamos espacios y diseños que conectan con tu esencia, combinando elegancia, calma y poder femenino.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-10">
              <a
                href={makeWhatsAppLink('Manicura Clásica')}
                target="_blank"
                rel="noreferrer"
                className="group inline-flex items-center justify-center gap-2 bg-primary text-black px-8 py-4 rounded-full shadow-lg hover:bg-primary-dark hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300"
              >
                <Phone size={18} className="group-hover:rotate-12 transition-transform" />
                <span className="font-medium">Reservar turno</span>
              </a>
              <a
                href="#services"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full border-2 border-white/20 text-white font-medium hover:bg-white/10 transition-colors"
              >
                Ver servicios
              </a>
            </div>

            <div className="pt-8 border-t border-white/10">
              <ul className="flex flex-col gap-4 text-sm text-gray-400 sm:flex-row sm:gap-8">
                <li className="flex items-center gap-2">
                  <div className="p-2 rounded-full bg-primary-light/30 text-primary-dark">
                    <Clock size={16} />
                  </div>
                  <span>Lun–Vie 9:00 - 20:00</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="p-2 rounded-full bg-primary-light/30 text-primary-dark">
                    <MapPin size={16} />
                  </div>
                  <span>Av San Martín 1608, Piso 1</span>
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
        className="absolute right-6 bottom-10 z-20 hidden md:flex flex-col gap-4"
      >
        <Link
          href="https://www.instagram.com/jezzastudio_?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
          target="_blank"
          className="p-3 bg-white/10 backdrop-blur shadow-lg rounded-full text-white hover:text-primary hover:scale-110 transition-all"
        >
          <Instagram size={24} />
        </Link>
      </motion.div>
    </header>
  )
}
