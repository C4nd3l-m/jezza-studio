'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Phone, User, Smartphone, Sparkles } from 'lucide-react'

const WA_NUMBER = '542616260921'

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
    <section aria-labelledby="contact-title" className="py-32 bg-gradient-to-b from-beige to-nude">
      <div className="max-w-4xl px-8 mx-auto">
        <div className="text-center mb-16">
          <span className="inline-block text-rose-gold font-medium tracking-widest text-sm uppercase mb-4 gold-line pb-3">
            Contacto
          </span>
          <h3 id="contact-title" className="text-5xl md:text-6xl font-heading text-charcoal mb-6 leading-tight">
            Reservá tu turno
          </h3>
          <p className="text-warm-gray text-lg leading-relaxed max-w-2xl mx-auto">
            Completá el formulario y te contactaremos por WhatsApp para confirmar tu cita
          </p>
        </div>

        <motion.form
          onSubmit={handleSubmit}
          className="bg-white p-10 md:p-12 rounded-3xl shadow-premium-md subtle-border space-y-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="space-y-2">
            <label htmlFor="contact-name" className="flex items-center gap-2 text-sm font-medium text-charcoal uppercase tracking-wide">
              <User size={16} className="text-rose-gold" />
              Nombre
            </label>
            <input
              id="contact-name"
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="Tu nombre completo"
              className="w-full px-6 py-4 bg-cream/50 subtle-border rounded-2xl text-charcoal placeholder-warm-gray focus:outline-none focus:ring-2 focus:ring-rose-gold/30 focus:border-rose-gold transition-all"
              required
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="contact-phone" className="flex items-center gap-2 text-sm font-medium text-charcoal uppercase tracking-wide">
              <Smartphone size={16} className="text-rose-gold" />
              Teléfono
            </label>
            <input
              id="contact-phone"
              value={phone}
              onChange={e => setPhone(e.target.value)}
              placeholder="Código + número"
              className="w-full px-6 py-4 bg-cream/50 subtle-border rounded-2xl text-charcoal placeholder-warm-gray focus:outline-none focus:ring-2 focus:ring-rose-gold/30 focus:border-rose-gold transition-all"
              required
              inputMode="tel"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="contact-service" className="flex items-center gap-2 text-sm font-medium text-charcoal uppercase tracking-wide">
              <Sparkles size={16} className="text-rose-gold" />
              Servicio
            </label>
            <input
              id="contact-service"
              value={service}
              onChange={e => setService(e.target.value)}
              placeholder="Ej: Capping Polygel, Manicura Clásica..."
              className="w-full px-6 py-4 bg-cream/50 subtle-border rounded-2xl text-charcoal placeholder-warm-gray focus:outline-none focus:ring-2 focus:ring-rose-gold/30 focus:border-rose-gold transition-all"
            />
          </div>

          <button
            type="submit"
            className="w-full flex items-center justify-center gap-3 px-8 py-6 text-white bg-[#2C2C2C] rounded-2xl hover:bg-[#B76E79] hover:-translate-y-1 transition-all duration-300 font-semibold text-xl shadow-premium-lg hover:shadow-premium-xl mt-8"
            aria-label="Enviar mensaje por WhatsApp"
          >
            <Phone size={22} />
            Enviar por WhatsApp
          </button>
        </motion.form>
      </div>
    </section>
  )
}
