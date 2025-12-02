'use client'

import { useState } from 'react'
import { Lock } from 'lucide-react'

interface SecretAdminButtonProps {
    onOpenLogin: () => void
}

export default function SecretAdminButton({ onOpenLogin }: SecretAdminButtonProps) {
    return (
        <button
            onClick={onOpenLogin}
            className="fixed bottom-4 right-4 z-50 opacity-20 hover:opacity-100 transition-opacity duration-300 text-2xl p-2 rounded-full hover:bg-white/10"
            title="Admin Access"
            aria-label="Admin Access"
        >
            💅
        </button>
    )
}
