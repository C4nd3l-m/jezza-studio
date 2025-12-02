'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Clock, ArrowRight } from 'lucide-react'

type Service = { _id: string, name: string, duration: string, price: string }

export default function Services() {
  const [services, setServices] = useState<Service[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/services')
      .then(res => res.json())
      .then(data => {
        // Ensure data is an array
        setServices(Array.isArray(data) ? data : [])
        setLoading(false)
      })
      .catch(() => {
        setServices([])
        setLoading(false)
      })
  }, [])

  return (
    <section id="services" className="py-24 bg-[#0a0a0a] relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-primary-light/20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary-light/10 rounded-full blur-3xl translate-x-1/3 translate-y-1/3" />

      <div className="max-w-6xl px-6 mx-auto relative z-10">
        <div className="text-center mb-16">
          <span className="text-primary font-medium tracking-wider text-sm uppercase mb-2 block">Nuestros Tratamientos</span>
          <h2 className="text-4xl md:text-5xl font-heading text-white mb-4">Servicios Destacados</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Descubrí nuestra selección de servicios diseñados para realzar tu belleza natural con productos de alta calidad.
          </p>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3">
            {[1, 2, 3].map((n) => (
              <div key={n} className="h-64 bg-white/5 animate-pulse rounded-2xl" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3">
            {services.map((s, i) => (
              <motion.article
                key={s._id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group relative bg-white/5 p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-white/10 hover:border-primary/40"
              >
                <div className="flex flex-col h-full justify-between">
                  <div>
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-xl font-heading text-white group-hover:text-primary transition-colors">
                        {s.name}
                      </h3>
                      <span className="text-lg font-semibold text-black bg-primary px-3 py-1 rounded-full">
                        {s.price}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 text-gray-400 text-sm mb-6">
                      <Clock size={16} />
                      <span>{s.duration}</span>
                    </div>
                  </div>

                  <a
                    href={`https://wa.me/542616260921?text=${encodeURIComponent('Quiero reservar ' + s.name)}`}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-between w-full px-4 py-3 rounded-xl bg-white/10 text-white group-hover:bg-primary group-hover:text-black transition-all duration-300"
                  >
                    <span className="font-medium">Reservar</span>
                    <ArrowRight size={18} className="transform group-hover:translate-x-1 transition-transform" />
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
