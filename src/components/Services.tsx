'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Clock, ArrowUpRight, Sparkles } from 'lucide-react'

type Service = {
  _id: string
  name: string
  duration: string
  price: string
  description?: string
}

const WA_NUMBER = '542616260921'

function makeWhatsAppLink(serviceName: string) {
  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(`Hola! Me interesa reservar el servicio: ${serviceName}`)}`
}

export default function Services() {
  const [services, setServices] = useState<Service[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/services')
      .then(res => res.json())
      .then(data => {
        setServices(Array.isArray(data) ? data : [])
        setLoading(false)
      })
      .catch(() => {
        setServices([])
        setLoading(false)
      })
  }, [])

  return (
    <section id="services" className="py-32 bg-cream relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-rose-dust/10 rounded-full blur-3xl translate-x-1/3 -translate-y-1/3" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-nude rounded-full blur-3xl -translate-x-1/2 translate-y-1/2" />

      <div className="max-w-7xl px-8 mx-auto relative z-10">
        <div className="text-center mb-20">
          <span className="inline-block text-rose-gold font-medium tracking-widest text-sm uppercase mb-4 gold-line pb-3">
            Nuestros Tratamientos
          </span>
          <h2 className="text-5xl md:text-6xl font-heading text-charcoal mb-6 leading-tight">
            Servicios Destacados
          </h2>
          <p className="text-warm-gray text-lg max-w-2xl mx-auto leading-relaxed text-balance">
            Descubrí nuestra selección de servicios diseñados para realzar tu belleza natural con productos de alta calidad.
          </p>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((n) => (
              <div key={n} className="h-96 bg-white/60 animate-pulse rounded-[2rem] shadow-premium-sm" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-10">
            {services.map((service, i) => (
              <motion.div
                key={service._id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: i * 0.15, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="group relative bg-white p-10 rounded-[2rem] transition-all duration-500 hover:-translate-y-2"
                style={{
                  boxShadow: "0 4px 20px -2px rgba(0,0,0,0.02), 0 0 0 1px rgba(201, 168, 106, 0.1)"
                }}
              >
                {/* Decorative Corner */}
                <div className="absolute top-0 right-0 p-8 opacity-40 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="w-8 h-8 border-t-2 border-r-2 border-rose-gold rounded-tr-xl" />
                </div>

                <div className="mb-8 flex justify-between items-start">
                  <div className="p-4 bg-rose-dust/5 rounded-2xl group-hover:bg-rose-dust/10 transition-colors duration-500">
                    <Sparkles className="text-rose-gold" size={24} strokeWidth={1.5} />
                  </div>
                  <div className="glass-effect subtle-border px-4 py-1.5 rounded-full">
                    <span className="text-charcoal font-semibold text-sm tracking-wide">
                      {service.price}
                    </span>
                  </div>
                </div>

                <h3 className="text-2xl font-heading text-charcoal mb-4 group-hover:text-rose-gold transition-colors duration-300">
                  {service.name}
                </h3>

                <p className="text-warm-gray leading-relaxed mb-8 font-light text-[15px]">
                  {service.description || 'Consulta los detalles de este tratamiento exclusivo con nuestras especialistas.'}
                </p>

                <div className="pt-6 border-t border-rose-dust/10 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-rose-dust text-xs font-medium tracking-widest uppercase">
                    <Clock size={14} />
                    <span>{service.duration || '60 min'}</span>
                  </div>

                  <a
                    href={makeWhatsAppLink(service.name)}
                    target="_blank"
                    rel="noreferrer"
                    className="w-10 h-10 rounded-full bg-[#2C2C2C] flex items-center justify-center text-white group-hover:bg-[#B76E79] group-hover:scale-110 transition-all duration-300 shadow-lg"
                  >
                    <ArrowUpRight size={18} />
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
