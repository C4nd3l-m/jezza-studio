import { motion } from 'framer-motion'
import { Phone, Clock, MapPin, Instagram, Facebook } from 'lucide-react'
import Link from 'next/link'

const WA_NUMBER = '549261626-0921'
const makeWhatsAppLink = (service = '') => {
  const base = 'https://wa.me/'
  const text = `Hola! Quisiera reservar un turno para ${service}`
  return `${base}${WA_NUMBER}?text=${encodeURIComponent(text)}`
}

export default function Hero() {
  return (
    <header className="relative overflow-hidden  bg-cover bg-center">
      <div className="absolute inset-0 bg-white/10 backdrop-blur-sm" />

      <div className="relative z-10 grid items-center max-w-6xl grid-cols-1 gap-10 px-6 py-16 mx-auto md:py-20 md:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <h1 className="mb-2 text-5xl font-heading text-green-900 sm:text-6xl md:text-7xl">
            Jezza <span className="text-primary">Studio</span>
          </h1>

          <h2 className="mb-5 text-xl text-green-950 sm:text-2xl md:text-3xl">
            Belleza alineada con tu esencia ✨
          </h2>

          <p className="max-w-md mb-6 text-base font-body text-green-950 sm:text-lg">
            En Jezza Studio creemos que la verdadera belleza nace de la energía que proyectás.
            Creamos espacios y diseños que conectan con tu esencia, combinando elegancia, calma y poder femenino en cada detalle.
          </p>

          <div className="flex flex-col gap-4 sm:flex-row">
            <a
              href={makeWhatsAppLink('Manicura Clásica')}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 font-body border shadow-lg text-green-950 px-6 py-3 rounded-full shadow-soft hover:scale-[1.02] hover:bg-primary-dark transition"
            >
              <Phone size={18} />
              Reservar turno
            </a>
            <a
              href="#services"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 transition border rounded-full shadow-lg font-heading text-pine border-primary hover:bg-primary/10"
            >
              Ver servicios
            </a>
          </div>

          <ul className="flex flex-col gap-3 mt-6 text-sm text-pink-950 sm:flex-row">
            <li className="inline-flex items-center gap-2">
              <Clock size={16} /> Lun–Vie Horario de 9:00 am a 20:00 pm
            </li>
            <li className="inline-flex items-center gap-2">
              <MapPin size={16} /> Av San Martín 1608 primer piso local 41
            </li>
          </ul>

          <div className="flex gap-6 mt-6">
            <Link href="https://www.instagram.com/jezzastudio_?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" target="_blank" rel="noreferrer" className="transition text-green-950 hover:text-primary">
              <Instagram size={24} />
            </Link>
          </div>
        </motion.div>
      </div>
    </header>
  )
}
