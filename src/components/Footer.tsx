'use client'

import { Instagram, MapPin, Phone } from 'lucide-react'
import Link from 'next/link'

interface FooterProps {
  isChristmas?: boolean
}

export default function Footer({ isChristmas = false }: FooterProps) {
  return (
    <footer className="bg-charcoal border-t border-charcoal/10 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 mb-16">
          {/* Brand */}
          <div className="space-y-6">
            <h3 className="text-3xl font-heading text-white">
              Jezza <span className="text-rose-dust italic">Studio</span>
            </h3>
            <p className="text-warm-gray/80 leading-relaxed">
              Espacio dedicado al cuidado y arte de tus uñas.
              Creamos diseños únicos que reflejan tu personalidad.
            </p>
          </div>

          {/* Contact */}
          <div className="space-y-6">
            <h4 className="font-semibold text-white text-lg tracking-wide">Contacto</h4>
            <ul className="space-y-4 text-warm-gray/80">
              <li className="flex items-start gap-3">
                <MapPin size={20} className="text-rose-dust mt-1 flex-shrink-0" />
                <span>Av San Martín 1608, Piso 1, Local 41</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={20} className="text-rose-dust flex-shrink-0" />
                <span>+54 261 626-0921</span>
              </li>
            </ul>
          </div>

          {/* Social & Hours */}
          <div className="space-y-6">
            <h4 className="font-semibold text-white text-lg tracking-wide">Horarios</h4>
            <p className="text-warm-gray/80">
              Lunes a Viernes<br />
              9:00 - 20:00
            </p>
            <div className="pt-4">
              <Link
                href="https://www.instagram.com/jezzastudio_?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
                target="_blank"
                className="inline-flex items-center gap-3 text-white hover:text-rose-dust transition-colors font-medium group"
              >
                <div className="p-3 rounded-full bg-white/10 group-hover:bg-rose-dust/20 transition-colors">
                  <Instagram size={20} />
                </div>
                Seguinos en Instagram
              </Link>
            </div>
          </div>
        </div>

        <div className="pt-10 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-warm-gray/60">
          <p>© {new Date().getFullYear()} Jezza Studio. Todos los derechos reservados.</p>
          <p className="text-rose-dust/60">{isChristmas ? '¡Felices Fiestas! 🎄✨' : 'Belleza alineada con tu esencia ✨'}</p>
        </div>
      </div>
    </footer>
  )
}
