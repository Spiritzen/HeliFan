import { useState, useRef, useCallback } from 'react'
import CardParticles from './CardParticles'
import CardBackground from './CardBackground'
import CardModal from './CardModal'
import type { FantasyCard } from './cardData'
import './InteractiveCard.css'

interface InteractiveCardProps {
  card: FantasyCard
}

export default function InteractiveCard({ card }: InteractiveCardProps) {
  const sceneRef   = useRef<HTMLDivElement>(null)
  const wrapperRef = useRef<HTMLDivElement>(null)
  const [isHovered,   setIsHovered]   = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!sceneRef.current || !wrapperRef.current) return
    const rect = sceneRef.current.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width  - 0.5) * 2
    const y = ((e.clientY - rect.top)  / rect.height - 0.5) * 2
    wrapperRef.current.style.transform = `rotateY(${x * 15}deg) rotateX(${y * -15}deg) scale(1.06)`
    sceneRef.current.style.setProperty('--px', `${((x + 1) / 2 * 100).toFixed(1)}%`)
    sceneRef.current.style.setProperty('--py', `${((y + 1) / 2 * 100).toFixed(1)}%`)
    sceneRef.current.style.setProperty('--mx', `${x.toFixed(3)}`)
    sceneRef.current.style.setProperty('--my', `${y.toFixed(3)}`)
  }, [])

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true)
    if (wrapperRef.current) wrapperRef.current.style.transition = 'transform 0.05s linear'
  }, [])

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false)
    if (wrapperRef.current) {
      wrapperRef.current.style.transition = 'transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
      wrapperRef.current.style.transform  = 'rotateY(0deg) rotateX(0deg) scale(1)'
    }
    if (sceneRef.current) {
      sceneRef.current.style.setProperty('--px', '50%')
      sceneRef.current.style.setProperty('--py', '50%')
      sceneRef.current.style.setProperty('--mx', '0')
      sceneRef.current.style.setProperty('--my', '0')
    }
  }, [])

  const openModal  = useCallback(() => setIsModalOpen(true),  [])
  const closeModal = useCallback(() => setIsModalOpen(false), [])

  return (
    <div className="card-stack">
      <div
        className="card-scene"
        ref={sceneRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={openModal}
        role="button"
        tabIndex={0}
        title="Cliquer pour explorer"
        aria-label={`Voir les détails de la carte ${card.title}`}
        onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') openModal() }}
      >
        <div className="card-wrapper" ref={wrapperRef}>
          <div className="card-inner">

            {/* ══════════════ FACE RECTO ══════════════ */}
            <div
              className="card-face card-front"
              style={{
                '--card-primary':         card.theme.primary,
                '--card-secondary':       card.theme.secondary,
                '--card-glow':            card.theme.glow,
                '--card-image-position':  card.theme.imagePosition ?? '68% 30%',
              } as React.CSSProperties}
            >
              <div className="card-frame">

                <CardBackground theme={card.theme} />

                {/* ── En-tête ── */}
                <div className="card-header">
                  <span className="card-name">{card.title}</span>
                  <div className="card-mana">
                    {card.mana.map(m => (
                      <span key={m.className} className={`mana ${m.className}`} title={m.title}>
                        {m.symbol}
                      </span>
                    ))}
                  </div>
                </div>

                {/* ── Art ── */}
                <div className="card-art-wrap">
                  <div className="card-art-inner">
                    <img
                      src={card.imgSrc}
                      alt={card.imgAlt}
                      className="card-art-img"
                    />
                    <div className="card-art-shadow" />
                  </div>
                  <div className="card-holo" />
                </div>

                {/* ── Ligne de type ── */}
                <div className="card-type-line">
                  <span>{card.typeLine}</span>
                  <span className="rarity-icon">✦</span>
                </div>

                {/* ── Zone de texte ── */}
                <div className="card-text-box">
                  {card.abilities.map(a => (
                    <p key={a.name} className="card-ability">
                      <em>{a.name}</em>{a.desc}
                    </p>
                  ))}
                  <div className="flavor-divider" />
                  <p className="card-flavor">{card.flavor}</p>
                </div>

                {/* ── Pied de carte ── */}
                <div className="card-footer">
                  <span className="card-artist">{card.footerArtist}</span>
                  <span className="card-pt">{card.stats}</span>
                </div>

                <div className="card-inner-border" />
              </div>

              <CardParticles active={isHovered} />
              <div className="card-reflection" />
            </div>

          </div>
        </div>
      </div>

      <p className="card-hint">Cliquer pour explorer</p>

      <CardModal isOpen={isModalOpen} onClose={closeModal} card={card} />
    </div>
  )
}
