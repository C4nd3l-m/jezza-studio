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
    <section className="py-32 bg-gradient-to-b from-nude via-cream to-nude relative">
      <div className="max-w-7xl px-8 mx-auto">
        <div className="text-center mb-20">
          <span className="inline-block text-rose-gold font-medium tracking-widest text-sm uppercase mb-4 gold-line pb-3">
            Ofertas Especiales
          </span>
          <h2 className="text-5xl md:text-6xl font-heading text-charcoal mb-6 leading-tight">
            Promociones del Mes
          </h2>
          <p className="text-warm-gray text-lg max-w-2xl mx-auto leading-relaxed">
            Aprovechá nuestros descuentos exclusivos y date el gusto que te merecés.
          </p>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((n) => (
              <div key={n} className="h-96 bg-white/60 animate-pulse rounded-3xl shadow-premium-sm" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {promos.map((p, i) => (
              <motion.article
                key={p._id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group bg-white rounded-3xl overflow-hidden shadow-premium-sm hover:shadow-premium-lg transition-all duration-500 subtle-border smooth-hover"
              >
                <div className="relative h-72 overflow-hidden">
                  <Image
                    src={p.image}
                    alt={p.title}
                    fill
                    className="object-cover transform group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute top-6 right-6 glass-effect subtle-border px-4 py-2 rounded-full text-xs font-bold text-rose-gold shadow-premium-sm flex items-center gap-2 backdrop-blur-md">
                    <Tag size={14} />
                    PROMO
                  </div>
                </div>

                <div className="p-8">
                  <h3 className="mb-4 text-2xl font-heading text-charcoal group-hover:text-rose-gold transition-colors duration-300 leading-tight">
                    {p.title}
                  </h3>
                  <p className="text-warm-gray text-base leading-relaxed mb-6">
                    {p.description}
                  </p>

                  <a
                    href={`https://wa.me/542616260921?text=${encodeURIComponent('Hola! Me interesa la promo: ' + p.title)}`}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 text-sm font-medium text-rose-gold hover:text-rose-gold/80 transition-colors group/link"
                  >
                    Consultar ahora
                    <svg className="w-4 h-4 transform group-hover/link:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
