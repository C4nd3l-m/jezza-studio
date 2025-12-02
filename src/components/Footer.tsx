'use client'

import { Instagram, MapPin, Phone, Mail } from 'lucide-react'
import Link from 'next/link'

interface FooterProps {
  isChristmas?: boolean
}

export default function Footer({ isChristmas = false }: FooterProps) {
  return (
    <footer className="bg-[#0f1110] border-t border-white/10 pt-16 pb-8">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div className="space-y-4">
            <h3 className="text-2xl font-heading text-white">
              Jezza <span className="text-primary italic">Studio</span>
            </h3>
            <p className="text-gray-400 leading-relaxed">
              Espacio dedicado al cuidado y arte de tus uñas.
              Creamos diseños únicos que reflejan tu personalidad.
            </p>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h4 className="font-semibold text-white">Contacto</h4>
            <ul className="space-y-3 text-gray-400">
              <li className="flex items-center gap-3">
                <MapPin size={18} className="text-primary" />
                <span>Av San Martín 1608, Piso 1, Local 41</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="text-primary" />
                <span>+54 261 626-0921</span>
              </li>
            </ul>
          </div>

          {/* Social & Hours */}
          <div className="space-y-4">
            <h4 className="font-semibold text-white">Horarios</h4>
            <p className="text-gray-400">
              Lunes a Viernes<br />
              9:00 - 20:00
            </p>
            <div className="pt-4">
              <Link
                href="https://www.instagram.com/jezzastudio_?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
                target="_blank"
                className="inline-flex items-center gap-2 text-white hover:text-primary transition font-medium"
              >
                <Instagram size={20} />
                Seguinos en Instagram
              </Link>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-500">
          <p>© {new Date().getFullYear()} Jezza Studio. Todos los derechos reservados.</p>
          <p>{isChristmas ? '¡Felices Fiestas! 🎄✨' : 'Belleza alineada con tu esencia ✨'}</p>
        </div>
      </div>
    </footer>
  )
}
