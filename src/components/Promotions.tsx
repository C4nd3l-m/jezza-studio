'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Tag, Calendar } from 'lucide-react'
import Image from 'next/image'

type Promotion = { _id: string, title: string, description: string, image: string }

export default function Promotions() {
  const [promos, setPromos] = useState<Promotion[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/promotions')
      .then(res => res.json())
      .then(data => {
        // Ensure data is an array
        setPromos(Array.isArray(data) ? data : [])
        setLoading(false)
      })
      .catch(() => {
        setPromos([])
        setLoading(false)
      })
  }, [])

  if (!loading && promos.length === 0) return null

  return (
    <section className="py-24 bg-gradient-to-b from-[#1a1a1a] to-[#0a0a0a] relative">
      <div className="max-w-6xl px-6 mx-auto">
        <div className="text-center mb-16">
          <span className="inline-block py-1 px-3 rounded-full bg-primary-light/30 text-primary-dark text-sm font-medium mb-4">
            Ofertas Especiales
          </span>
          <h2 className="text-4xl md:text-5xl font-heading text-white mb-4">Promociones del Mes</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Aprovechá nuestros descuentos exclusivos y date el gusto que te merecés.
          </p>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3">
            {[1, 2, 3].map((n) => (
              <div key={n} className="h-80 bg-white/5 animate-pulse rounded-2xl" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3">
            {promos.map((p, i) => (
              <motion.article
                key={p._id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group bg-white/5 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-white/10"
              >
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={p.image}
                    alt={p.title}
                    fill
                    className="object-cover transform group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-primary-dark shadow-sm flex items-center gap-1">
                    <Tag size={12} />
                    PROMO
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="mb-3 text-xl font-heading text-white group-hover:text-primary transition-colors">
                    {p.title}
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed mb-4">
                    {p.description}
                  </p>

                  <a
                    href={`https://wa.me/542616260921?text=${encodeURIComponent('Hola! Me interesa la promo: ' + p.title)}`}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center text-sm font-medium text-primary hover:text-primary-dark transition-colors"
                  >
                    Consultar ahora
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </a>
                </div>
              </motion.article>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
