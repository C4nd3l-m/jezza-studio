'use client'

import { motion } from 'framer-motion'
import styles from '../css/Testimonials.module.css'

const quotes = [
  { name: 'Laura', text: 'Me encantó la atención, quedaron preciosas mis uñas!' },
  { name: 'María', text: 'Muy profesional y rápido. Recomendado.' },
  { name: 'Sofía', text: 'Ambiente cálido, atención impecable.' },
]

export default function Testimonials() {
  return (
    <section aria-labelledby="testimonials-title" className={`${styles.section} py-12`}>
      <div className="max-w-5xl mx-auto px-6">
        <h3 id="testimonials-title" className={`${styles.title} font-heading mb-6`}>Testimonios</h3>

        <div className="space-y-4">
          {quotes.map((q, i) => (
            <motion.blockquote
              key={i}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06 }}
              className={styles.card}
              role="article"
            >
              <p className={styles.text}>“{q.text}”</p>
              <footer className={styles.author}>— {q.name}</footer>
            </motion.blockquote>
          ))}
        </div>
      </div>
    </section>
  )
}
