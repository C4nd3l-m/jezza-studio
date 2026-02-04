'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Lock, User } from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'
import { useRouter } from 'next/navigation'

interface LoginModalProps {
    isOpen: boolean
    onClose: () => void
}

export default function LoginModal({ isOpen, onClose }: LoginModalProps) {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const { login } = useAuth()
    const router = useRouter()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError('')
        setLoading(true)

        const success = await login(username, password)

        if (success) {
            onClose()
            router.push('/admin')
        } else {
            setError('Credenciales inválidas')
        }

        setLoading(false)
    }

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
                    />

                    {/* Modal */}
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="relative w-full max-w-md p-8 bg-white rounded-2xl shadow-2xl"
                        >
                            {/* Close button */}
                            <button
                                onClick={onClose}
                                className="absolute top-4 right-4 p-2 text-gray-400 transition hover:text-gray-600 hover:bg-gray-100 rounded-full"
                            >
                                <X size={20} />
                            </button>

                            {/* Header */}
                            <div className="mb-6 text-center">
                                <div className="inline-flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-rose-dust/20">
                                    <Lock className="text-rose-gold" size={32} />
                                </div>
                                <h2 className="text-2xl font-bold text-charcoal font-heading">Acceso Admin</h2>
                                <p className="mt-2 text-sm text-warm-gray">Ingresa tus credenciales</p>
                            </div>

                            {/* Form */}
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <label className="block mb-2 text-sm font-medium text-charcoal uppercase tracking-wide">
                                        Usuario
                                    </label>
                                    <div className="relative">
                                        <User className="absolute left-3 top-1/2 -translate-y-1/2 text-rose-gold" size={20} />
                                        <input
                                            type="text"
                                            value={username}
                                            onChange={(e) => setUsername(e.target.value)}
                                            className="w-full pl-10 pr-4 py-3 bg-cream/50 border border-gold-accent/20 rounded-xl focus:ring-2 focus:ring-rose-gold/20 focus:border-rose-gold text-charcoal transition outline-none"
                                            placeholder="admin"
                                            required
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block mb-2 text-sm font-medium text-charcoal uppercase tracking-wide">
                                        Contraseña
                                    </label>
                                    <div className="relative">
                                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-rose-gold" size={20} />
                                        <input
                                            type="password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            className="w-full pl-10 pr-4 py-3 bg-cream/50 border border-gold-accent/20 rounded-xl focus:ring-2 focus:ring-rose-gold/20 focus:border-rose-gold text-charcoal transition outline-none"
                                            placeholder="••••••••"
                                            required
                                        />
                                    </div>
                                </div>

                                {error && (
                                    <motion.div
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg"
                                    >
                                        {error}
                                    </motion.div>
                                )}

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full py-3 text-white font-medium rounded-xl bg-charcoal hover:bg-rose-gold transition-colors shadow-premium-sm hover:shadow-premium-md disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {loading ? 'Ingresando...' : 'Ingresar'}
                                </button>
                            </form>
                        </motion.div>
                    </div>
                </>
            )}
        </AnimatePresence>
    )
}
