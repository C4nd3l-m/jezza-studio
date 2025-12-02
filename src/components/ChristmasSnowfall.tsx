'use client'

import { useEffect, useState } from 'react'

interface Snowflake {
    id: number
    left: number
    animationDuration: number
    size: number
    delay: number
}

export default function ChristmasSnowfall() {
    const [snowflakes, setSnowflakes] = useState<Snowflake[]>([])

    useEffect(() => {
        // Generate snowflakes
        const flakes: Snowflake[] = Array.from({ length: 50 }, (_, i) => ({
            id: i,
            left: Math.random() * 100, // Random horizontal position (%)
            animationDuration: 10 + Math.random() * 20, // 10-30 seconds
            size: 2 + Math.random() * 4, // 2-6px
            delay: Math.random() * 10, // 0-10 seconds delay
        }))
        setSnowflakes(flakes)
    }, [])

    return (
        <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
            {snowflakes.map((flake) => (
                <div
                    key={flake.id}
                    className="snowflake absolute top-0 text-white/70"
                    style={{
                        left: `${flake.left}%`,
                        fontSize: `${flake.size}px`,
                        animationDuration: `${flake.animationDuration}s`,
                        animationDelay: `${flake.delay}s`,
                    }}
                >
                    ❄
                </div>
            ))}
            <style jsx>{`
        @keyframes snowfall {
          0% {
            transform: translateY(-10px) translateX(0);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            transform: translateY(100vh) translateX(50px);
            opacity: 0;
          }
        }

        .snowflake {
          animation: snowfall linear infinite;
          will-change: transform, opacity;
        }
      `}</style>
        </div>
    )
}
