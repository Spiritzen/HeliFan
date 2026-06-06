import { useState, useRef, useCallback } from 'react'
import CardParticles from './CardParticles'
import CardBackground from './CardBackground'
import CardModal from './CardModal'
import './InteractiveCard.css'

export default function InteractiveCard() {
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
    <>
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
        aria-label="Voir les détails de la carte HeliFan"
        onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') openModal() }}
      >
        <div className="card-wrapper" ref={wrapperRef}>
          <div className="card-inner">

            {/* ══════════════ FACE RECTO ══════════════ */}
            <div className="card-face card-front">
              <div className="card-frame">

                <CardBackground />

                {/* ── En-tête ── */}
                <div className="card-header">
                  <span className="card-name">HeliFan</span>
                  <div className="card-mana">
                    <span className="mana mana-gold"  title="Légendaire">★</span>
                    <span className="mana mana-panda" title="Amour">❤</span>
                    <span className="mana mana-creat" title="Créativité">✦</span>
                  </div>
                </div>

                {/* ── Art ── */}
                <div className="card-art-wrap">
                  <div className="card-art-inner">
                    <img
                      src="/cards/future-choice/character.png"
                      alt="HeliFan"
                      className="card-art-img"
                    />
                    <div className="card-art-shadow" />
                  </div>
                  <div className="card-holo" />
                </div>

                {/* ── Ligne de type ── */}
                <div className="card-type-line">
                  <span>Créature Légendaire — Humaine Prophétesse</span>
                  <span className="rarity-icon">✦</span>
                </div>

                {/* ── Zone de texte ── */}
                <div className="card-text-box">
                  <p className="card-ability">
                    <em>Curiosité infinie</em> : Au début de chaque tour, révèle la prochaine carte du destin.
                  </p>
                  <p className="card-ability">
                    <em>Amour rayonnant</em> : Les alliés adjacents gagnent +1 en courage.
                  </p>
                  <p className="card-ability">
                    <em>Pas de panda</em> : Insaisissable. Ne peut pas être bloquée par la peur.
                  </p>
                  <div className="flavor-divider" />
                  <p className="card-flavor">
                    « Chaque chemin commence par une question. Elle, elle ose la poser. »
                  </p>
                </div>

                {/* ── Pied de carte ── */}
                <div className="card-footer">
                  <span className="card-artist">Helistory © — HeliFan · N°01</span>
                  <span className="card-pt">1 / 56</span>
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

      <CardModal isOpen={isModalOpen} onClose={closeModal} />
    </>
  )
}
