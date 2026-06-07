import { useState, useEffect, useCallback } from 'react'
import { createPortal } from 'react-dom'
import type { FantasyCard } from './cardData'
import './CardModal.css'

interface CardModalProps {
  isOpen: boolean
  onClose: () => void
  card: FantasyCard
}

export default function CardModal({ isOpen, onClose, card }: CardModalProps) {
  const [selectedChoice, setSelectedChoice] = useState<string | null>(null)

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    if (isOpen) document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [isOpen, onClose])

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  useEffect(() => {
    if (isOpen) setSelectedChoice(null)
  }, [isOpen])

  const handleChoiceClick = useCallback((id: string) => {
    setSelectedChoice(prev => prev === id ? null : id)
  }, [])

  if (!isOpen) return null

  const activeChoice = card.choices.find(c => c.id === selectedChoice) ?? null
  const cardNum = String(card.number).padStart(2, '0')

  return createPortal(
    <div
      className="modal-overlay"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`Détails de la carte ${card.title}`}
    >
      <div
        className="modal-container"
        style={{
          '--theme-primary':         card.theme.primary,
          '--theme-secondary':       card.theme.secondary,
          '--theme-glow':            card.theme.glow,
          '--theme-image-position':  card.theme.imagePosition ?? '68% 30%',
        } as React.CSSProperties}
        onClick={e => e.stopPropagation()}
      >

        <button className="modal-close" onClick={onClose} aria-label="Fermer">✕</button>

        {/* ── Colonne gauche — portrait ── */}
        <div className="modal-card-side">
          <div className="modal-card-visual">
            <img
              src={card.imgSrc}
              alt={card.imgAlt}
              className="modal-portrait"
            />
            <div className="modal-card-glow" />
          </div>
        </div>

        {/* ── Colonne droite — détails ── */}
        <div className="modal-detail-side">

          <div className="modal-header">
            <div className="modal-card-number">✦ {card.arcane} · N°{cardNum} ✦</div>
            <h2 className="modal-title">{card.title}</h2>
            <div className="modal-type-line">{card.typeLine}</div>
          </div>

          <div className="modal-section">
            <p className="modal-description">{card.description}</p>
          </div>

          <div className="modal-section">
            <h3 className="modal-section-title">Capacités</h3>
            <ul className="modal-abilities">
              {card.abilities.map(a => (
                <li key={a.name}>
                  <span className="ability-name">{a.name}</span>
                  <span className="ability-desc">{a.desc}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="modal-section modal-flavor">
            <p>{card.flavor}</p>
          </div>

          <div className="modal-section">
            <h3 className="modal-section-title">Choisir son chemin</h3>
            <div className="modal-choices">
              {card.choices.map(c => (
                <button
                  key={c.id}
                  className={`modal-choice-btn${selectedChoice === c.id ? ' active' : ''}`}
                  style={{ '--choice-color': c.color } as React.CSSProperties}
                  onClick={() => handleChoiceClick(c.id)}
                >
                  {c.emoji} {c.label}
                </button>
              ))}
            </div>
            {activeChoice && (
              <div className="modal-choice-message" key={activeChoice.id}>
                {activeChoice.message}
              </div>
            )}
          </div>

          <div className="modal-footer">
            <span className="modal-brand">{card.footerArtist}</span>
            <span className="modal-stats">{card.stats}</span>
          </div>

        </div>
      </div>
    </div>,
    document.body
  )
}
