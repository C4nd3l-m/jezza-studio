'use client'

import { motion } from 'framer-motion'
import { Sparkles } from 'lucide-react'

const services = [
  { id: 1, name: 'Semipermanente', duration: '1:30 hs', price: '$13.000' },
  { id: 2, name: 'Capping Polygel', duration: '2:30 hs', price: '$18.000' },
  { id: 3, name: 'Soft Gel', duration: '2:30 hs', price: '$20.000' },
  { id: 4, name: 'Esculpidas Polygel', duration: '3:00 hs', price: '$25.000' },
  { id: 5, name: 'Retirados de servicios realizados en Jezza Studio', duration: '-', price: '$4.000' },
]


export default function Services() {
  return (
    <section id="services" className="py-16 bg-beige">
      <div className="max-w-5xl px-6 mx-auto">
        <h2 className="mb-8 text-4xl text-center font-heading text-primary-dark">Servicios destacados</h2>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
          {services.map((s, i) => (
            <motion.article
              key={s.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06 }}
              className="p-6 transition border rounded-lg shadow-lg hover:shadow-xl"
            >
              <div className="flex items-start gap-3 mb-3">
                <div className="p-2 rounded-full bg-lila-light">
                  <Sparkles size={18} />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-primary-dark">{s.name}</h3>
                  <p className="text-sm text-gray-600">{s.duration}</p>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xl font-semibold text-primary-dark">{s.price}</span>
                <a
                  href={`https://wa.me/5492616260921?text=${encodeURIComponent('Quiero reservar ' + s.name)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="px-6 py-2 text-white transition rounded-full bg-green-900 hover:bg-primary-dark"
                >
                  Reservar
                </a>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
