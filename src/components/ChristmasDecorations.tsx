'use client'

export default function ChristmasDecorations() {
    return (
        <>
            {/* Christmas Lights at the top */}
            <div className="fixed top-0 left-0 right-0 z-40 pointer-events-none">
                <div className="christmas-lights flex justify-around py-2">
                    {Array.from({ length: 20 }).map((_, i) => (
                        <div
                            key={i}
                            className="christmas-light"
                            style={{
                                animationDelay: `${i * 0.1}s`,
                            }}
                        />
                    ))}
                </div>
            </div>

            {/* Decorative corner elements */}
            <div className="fixed top-20 left-4 text-4xl opacity-20 pointer-events-none z-40 animate-pulse hidden md:block">
                🎄
            </div>
            <div className="fixed top-20 right-4 text-4xl opacity-20 pointer-events-none z-40 animate-pulse hidden md:block" style={{ animationDelay: '0.5s' }}>
                ⭐
            </div>

            <style jsx>{`
        .christmas-lights {
          background: linear-gradient(
            to bottom,
            rgba(0, 0, 0, 0.05) 0%,
            transparent 100%
          );
        }

        .christmas-light {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          animation: glow 2s ease-in-out infinite;
        }

        .christmas-light:nth-child(4n + 1) {
          background: radial-gradient(circle, #ff4444, #cc0000);
          box-shadow: 0 0 10px #ff4444;
        }

        .christmas-light:nth-child(4n + 2) {
          background: radial-gradient(circle, #44ff44, #00cc00);
          box-shadow: 0 0 10px #44ff44;
        }

        .christmas-light:nth-child(4n + 3) {
          background: radial-gradient(circle, #ffdd44, #ccaa00);
          box-shadow: 0 0 10px #ffdd44;
        }

        .christmas-light:nth-child(4n + 4) {
          background: radial-gradient(circle, #4444ff, #0000cc);
          box-shadow: 0 0 10px #4444ff;
        }

        @keyframes glow {
          0%,
          100% {
            opacity: 1;
            transform: scale(1);
          }
          50% {
            opacity: 0.6;
            transform: scale(0.9);
          }
        }
      `}</style>
        </>
    )
}
