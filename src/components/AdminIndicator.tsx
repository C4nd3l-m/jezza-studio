'use client'

import { motion } from 'framer-motion'
import { Shield } from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'

export default function AdminIndicator() {
    const { isAuthenticated } = useAuth()

    if (!isAuthenticated) return null

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            className="fixed bottom-4 right-4 z-40 flex items-center gap-2 px-4 py-2 bg-primary-dark text-white rounded-full shadow-lg"
        >
            <Shield size={16} />
            <span className="text-sm font-medium">Admin</span>
        </motion.div>
    )
}
