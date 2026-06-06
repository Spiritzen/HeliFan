import { useMemo } from 'react'

interface Particle {
  id: number
  x: number
  y: number
  size: number
  duration: number
  delay: number
  opacity: number
}

export default function CardParticles({ active }: { active: boolean }) {
  const particles = useMemo<Particle[]>(() =>
    Array.from({ length: 32 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      duration: Math.random() * 3 + 2.5,
      delay: Math.random() * 5,
      opacity: Math.random() * 0.65 + 0.2,
    })), [])

  return (
    <div className={`card-particles${active ? ' active' : ''}`}>
      {particles.map(p => (
        <span
          key={p.id}
          className="particle"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
            '--p-opacity': p.opacity,
          } as React.CSSProperties}
        />
      ))}
    </div>
  )
}
