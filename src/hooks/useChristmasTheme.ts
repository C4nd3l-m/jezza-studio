import { useState, useEffect } from 'react'

/**
 * Hook to detect if the current month is December
 * Returns true during December, false otherwise
 * Uses mounted state to prevent hydration mismatch
 */
export function useChristmasTheme(): boolean {
    const [isChristmas, setIsChristmas] = useState(false)
    const [isMounted, setIsMounted] = useState(false)

    useEffect(() => {
        // Mark as mounted to prevent hydration mismatch
        setIsMounted(true)

        const checkDate = () => {
            const now = new Date()
            const currentMonth = now.getMonth() // 0-11, where 11 is December
            setIsChristmas(currentMonth === 11) // December = 11
        }

        // Check immediately
        checkDate()

        // Check daily at midnight
        const interval = setInterval(checkDate, 1000 * 60 * 60 * 24)

        return () => clearInterval(interval)
    }, [])

    // Only return true if mounted AND it's December
    // This prevents hydration mismatch between server and client
    return isMounted && isChristmas
}
