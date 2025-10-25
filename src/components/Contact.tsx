'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Phone } from 'lucide-react'

const WA_NUMBER = '5492616260921'

export default function Contact() {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [service, setService] = useState('')

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const msg = `Hola! Mi nombre es ${name || '—'}. Quisiera reservar ${service || 'un servicio'}. Mi teléfono es ${phone || '—'}.`
    window.open(`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`, '_blank')
  }

  return (
    <section aria-labelledby="contact-title" className="py-12 bg-beige">
      <div className="max-w-5xl px-6 mx-auto">
        <h3 id="contact-title" className="mb-6 text-3xl font-heading text-primary-dark">Contacto</h3>

        <motion.form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4 md:grid-cols-2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
          <h1>Nombre</h1>
          <input
            id="contact-name"
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder="Nombre"
            className="px-6 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            required
          />
          <h1>Teléfono</h1>
          <input
            id="contact-phone"
            value={phone}
            onChange={e => setPhone(e.target.value)}
            placeholder="Teléfono (código + número)"
            className="px-6 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            required
            inputMode="tel"
          />
          <h1>Tipo de servicio</h1>
          <input
            id="contact-service"
            value={service}
            onChange={e => setService(e.target.value)}
            placeholder="Servicio (ej: Manicura)"
            className="px-6 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary md:col-span-2"
          />
          <button type="submit" className="flex items-center justify-center gap-2 px-6 py-3 text-white transition rounded-full bg-primary hover:bg-primary-dark" aria-label="Enviar mensaje por WhatsApp">
            <Phone size={16} />
            Enviar por WhatsApp
          </button>
        </motion.form>
      </div>
    </section>
  )
}
