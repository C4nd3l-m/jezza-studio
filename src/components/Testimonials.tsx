'use client'

import { motion } from 'framer-motion'
import { Quote } from 'lucide-react'

const quotes = [
  { name: 'Laura', text: 'Me encantó la atención, quedaron preciosas mis uñas!' },
  { name: 'María', text: 'Muy profesional y rápido. Recomendado.' },
  { name: 'Sofía', text: 'Ambiente cálido, atención impecable.' },
]

export default function Testimonials() {
  return (
    <section aria-labelledby="testimonials-title" className="py-32 bg-cream">
      <div className="max-w-7xl mx-auto px-8">
        <div className="text-center mb-20">
          <span className="inline-block text-rose-gold font-medium tracking-widest text-sm uppercase mb-4 gold-line pb-3">
            Testimonios
          </span>
          <h3 id="testimonials-title" className="text-5xl md:text-6xl font-heading text-charcoal mb-6 leading-tight">
            Lo que dicen nuestras clientas
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {quotes.map((q, i) => (
            <motion.blockquote
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="relative bg-white p-10 rounded-3xl shadow-premium-sm hover:shadow-premium-md transition-all duration-300 subtle-border"
              role="article"
            >
              <Quote className="absolute top-8 left-8 text-rose-dust/30" size={40} />
              <div className="relative pt-8">
                <p className="text-charcoal text-lg leading-relaxed mb-6 font-light italic">
                  "{q.text}"
                </p>
                <footer className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-rose-dust/20 flex items-center justify-center">
                    <span className="text-rose-gold font-heading text-lg">{q.name[0]}</span>
                  </div>
                  <div>
                    <p className="text-charcoal font-medium">{q.name}</p>
                    <p className="text-warm-gray text-sm">Cliente</p>
                  </div>
                </footer>
              </div>
            </motion.blockquote>
          ))}
        </div>
      </div>
    </section>
  )
}
