'use client'

import { Instagram, Facebook } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="py-6 bg-primary-light">
      <div className="flex flex-col items-center justify-between max-w-5xl gap-4 px-6 mx-auto md:flex-row">
        <div className="text-2xl font-heading text-primary-dark">Jezza Studio</div>
        <div className="text-sm text-gray-600 font-body opacity-80">© {new Date().getFullYear()} Jezza Studio — Elegancia en cada detalle</div>
        <div className="flex gap-4">
          <a href="#" aria-label="Instagram" className="transition text-primary-dark hover:text-primary">
            <Instagram size={20} />
          </a>
          <a href="#" aria-label="Facebook" className="transition text-primary-dark hover:text-primary">
            <Facebook size={20} />
          </a>
        </div>
      </div>
    </footer>
  )
}
