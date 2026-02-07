'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Lock, User, Eye, EyeOff, AlertCircle, ShieldAlert } from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'
import { useRouter } from 'next/navigation'

interface LoginModalProps {
    isOpen: boolean
    onClose: () => void
}

// Rate limiting configuration
const MAX_ATTEMPTS = 5
const LOCKOUT_DURATION = 15 * 60 * 1000 // 15 minutes in milliseconds
const STORAGE_KEY = 'admin_login_attempts'

interface LoginAttempt {
    count: number
    lastAttempt: number
    lockedUntil?: number
}

export default function LoginModal({ isOpen, onClose }: LoginModalProps) {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const [isRateLimited, setIsRateLimited] = useState(false)
    const [remainingTime, setRemainingTime] = useState(0)
    const { login } = useAuth()
    const router = useRouter()
    const usernameInputRef = useRef<HTMLInputElement>(null)

    // Auto-focus username field when modal opens
    useEffect(() => {
        if (isOpen && usernameInputRef.current) {
            setTimeout(() => {
                usernameInputRef.current?.focus()
            }, 100)
        }
    }, [isOpen])

    // Check rate limiting on mount and when modal opens
    useEffect(() => {
        if (isOpen) {
            checkRateLimit()
        }
    }, [isOpen])

    // Update remaining time countdown
    useEffect(() => {
        if (isRateLimited && remainingTime > 0) {
            const timer = setInterval(() => {
                const attempts = getLoginAttempts()
                if (attempts.lockedUntil) {
                    const remaining = Math.max(0, attempts.lockedUntil - Date.now())
                    setRemainingTime(remaining)

                    if (remaining === 0) {
                        setIsRateLimited(false)
                        setError('')
                        clearLoginAttempts()
                    }
                }
            }, 1000)

            return () => clearInterval(timer)
        }
    }, [isRateLimited, remainingTime])

    const getLoginAttempts = (): LoginAttempt => {
        try {
            const stored = localStorage.getItem(STORAGE_KEY)
            if (stored) {
                return JSON.parse(stored)
            }
        } catch (e) {
            console.error('Error reading login attempts:', e)
        }
        return { count: 0, lastAttempt: 0 }
    }

    const setLoginAttempts = (attempts: LoginAttempt) => {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(attempts))
        } catch (e) {
            console.error('Error storing login attempts:', e)
        }
    }

    const clearLoginAttempts = () => {
        try {
            localStorage.removeItem(STORAGE_KEY)
        } catch (e) {
            console.error('Error clearing login attempts:', e)
        }
    }

    const checkRateLimit = () => {
        const attempts = getLoginAttempts()

        if (attempts.lockedUntil && attempts.lockedUntil > Date.now()) {
            setIsRateLimited(true)
            setRemainingTime(attempts.lockedUntil - Date.now())
            const minutes = Math.ceil((attempts.lockedUntil - Date.now()) / 60000)
            setError(`Demasiados intentos fallidos. Intenta de nuevo en ${minutes} minuto${minutes > 1 ? 's' : ''}.`)
            return true
        }

        return false
    }

    const recordFailedAttempt = () => {
        const attempts = getLoginAttempts()
        const newCount = attempts.count + 1

        if (newCount >= MAX_ATTEMPTS) {
            const lockedUntil = Date.now() + LOCKOUT_DURATION
            setLoginAttempts({
                count: newCount,
                lastAttempt: Date.now(),
                lockedUntil
            })
            setIsRateLimited(true)
            setRemainingTime(LOCKOUT_DURATION)
            setError(`Demasiados intentos fallidos. Intenta de nuevo en 15 minutos.`)
        } else {
            setLoginAttempts({
                count: newCount,
                lastAttempt: Date.now()
            })
            const remaining = MAX_ATTEMPTS - newCount
            setError(`Credenciales inválidas. ${remaining} intento${remaining > 1 ? 's' : ''} restante${remaining > 1 ? 's' : ''}.`)
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError('')

        // Check rate limiting
        if (checkRateLimit()) {
            return
        }

        // Basic validation
        if (!username.trim()) {
            setError('Por favor ingresa tu usuario')
            return
        }

        if (!password) {
            setError('Por favor ingresa tu contraseña')
            return
        }

        if (password.length < 6) {
            setError('La contraseña debe tener al menos 6 caracteres')
            return
        }

        setLoading(true)

        const success = await login(username, password)

        if (success) {
            clearLoginAttempts()
            onClose()
            setUsername('')
            setPassword('')
            setShowPassword(false)
            router.push('/admin')
        } else {
            recordFailedAttempt()
        }

        setLoading(false)
    }

    const handleClose = () => {
        setError('')
        setUsername('')
        setPassword('')
        setShowPassword(false)
        onClose()
    }

    // Handle keyboard events
    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Escape') {
            handleClose()
        }
    }

    const formatTime = (ms: number) => {
        const minutes = Math.floor(ms / 60000)
        const seconds = Math.floor((ms % 60000) / 1000)
        return `${minutes}:${seconds.toString().padStart(2, '0')}`
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
                        onClick={handleClose}
                        className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
                        aria-hidden="true"
                    />

                    {/* Modal */}
                    <div
                        className="fixed inset-0 z-50 flex items-center justify-center p-4"
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="login-modal-title"
                    >
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="relative w-full max-w-md p-8 bg-white rounded-2xl shadow-2xl"
                            onKeyDown={handleKeyDown}
                        >
                            {/* Close button */}
                            <button
                                onClick={handleClose}
                                className="absolute top-4 right-4 p-2 text-gray-400 transition hover:text-gray-600 hover:bg-gray-100 rounded-full"
                                aria-label="Cerrar modal"
                            >
                                <X size={20} />
                            </button>

                            {/* Header */}
                            <div className="mb-6 text-center">
                                <div className="inline-flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-rose-dust/20">
                                    <Lock className="text-rose-gold" size={32} aria-hidden="true" />
                                </div>
                                <h2 id="login-modal-title" className="text-2xl font-bold text-charcoal font-heading">
                                    Acceso Admin
                                </h2>
                                <p className="mt-2 text-sm text-warm-gray">
                                    Ingresa tus credenciales para continuar
                                </p>
                            </div>

                            {/* Rate limit warning */}
                            {isRateLimited && remainingTime > 0 && (
                                <motion.div
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3"
                                    role="alert"
                                >
                                    <ShieldAlert className="text-red-600 flex-shrink-0 mt-0.5" size={20} />
                                    <div className="flex-1">
                                        <p className="text-sm font-medium text-red-800">Cuenta bloqueada temporalmente</p>
                                        <p className="text-xs text-red-600 mt-1">
                                            Tiempo restante: {formatTime(remainingTime)}
                                        </p>
                                    </div>
                                </motion.div>
                            )}

                            {/* Form */}
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <label
                                        htmlFor="username"
                                        className="block mb-2 text-sm font-medium text-charcoal uppercase tracking-wide"
                                    >
                                        Usuario
                                    </label>
                                    <div className="relative">
                                        <User
                                            className="absolute left-3 top-1/2 -translate-y-1/2 text-rose-gold"
                                            size={20}
                                            aria-hidden="true"
                                        />
                                        <input
                                            ref={usernameInputRef}
                                            id="username"
                                            type="text"
                                            value={username}
                                            onChange={(e) => setUsername(e.target.value)}
                                            className="w-full pl-10 pr-4 py-3 bg-cream/50 border border-gold-accent/20 rounded-xl focus:ring-2 focus:ring-rose-gold/20 focus:border-rose-gold text-charcoal transition outline-none"
                                            placeholder="admin"
                                            required
                                            disabled={isRateLimited}
                                            aria-describedby={error ? 'login-error' : undefined}
                                            autoComplete="username"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label
                                        htmlFor="password"
                                        className="block mb-2 text-sm font-medium text-charcoal uppercase tracking-wide"
                                    >
                                        Contraseña
                                    </label>
                                    <div className="relative">
                                        <Lock
                                            className="absolute left-3 top-1/2 -translate-y-1/2 text-rose-gold"
                                            size={20}
                                            aria-hidden="true"
                                        />
                                        <input
                                            id="password"
                                            type={showPassword ? 'text' : 'password'}
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            className="w-full pl-10 pr-12 py-3 bg-cream/50 border border-gold-accent/20 rounded-xl focus:ring-2 focus:ring-rose-gold/20 focus:border-rose-gold text-charcoal transition outline-none"
                                            placeholder="••••••••"
                                            required
                                            disabled={isRateLimited}
                                            aria-describedby={error ? 'login-error' : undefined}
                                            autoComplete="current-password"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-warm-gray hover:text-rose-gold transition rounded"
                                            disabled={isRateLimited}
                                            aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                                        >
                                            {showPassword ? (
                                                <EyeOff size={20} />
                                            ) : (
                                                <Eye size={20} />
                                            )}
                                        </button>
                                    </div>
                                </div>

                                {error && !isRateLimited && (
                                    <motion.div
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="p-3 bg-red-50 border border-red-200 rounded-lg flex items-start gap-2"
                                        role="alert"
                                        id="login-error"
                                    >
                                        <AlertCircle className="text-red-600 flex-shrink-0 mt-0.5" size={16} />
                                        <p className="text-sm text-red-600">{error}</p>
                                    </motion.div>
                                )}

                                <button
                                    type="submit"
                                    disabled={loading || isRateLimited}
                                    className="w-full py-3 text-black font-medium rounded-xl bg-charcoal hover:bg-rose-gold transition-colors shadow-premium-sm hover:shadow-premium-md disabled:opacity-50 disabled:cursor-not-allowed border"
                                    aria-busy={loading}
                                >
                                    {loading ? 'Ingresando...' : 'Ingresar'}
                                </button>

                                <p className="text-xs text-center text-warm-gray mt-4">
                                    Presiona <kbd className="px-1.5 py-0.5 bg-cream rounded text-charcoal font-mono">Esc</kbd> para cerrar
                                </p>
                            </form>
                        </motion.div>
                    </div>
                </>
            )}
        </AnimatePresence>
    )
}
