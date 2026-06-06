import { useState, useEffect, useCallback } from 'react'
import { createPortal } from 'react-dom'
import './CardModal.css'

const CHOICES = [
  {
    key: 'learn',
    label: 'Apprendre',
    emoji: '📚',
    className: 'modal-choice-learn',
    message: "La curiosité est ton armure. Chaque question que tu poses ouvre une porte que personne d'autre n'aurait vue.",
  },
  {
    key: 'love',
    label: 'Aimer',
    emoji: '🐼',
    className: 'modal-choice-love',
    message: "Ton pouvoir n'est pas dans ta taille, mais dans la chaleur que tu répands. L'amour que tu donnes revient toujours, amplifié.",
  },
  {
    key: 'create',
    label: 'Créer',
    emoji: '✨',
    className: 'modal-choice-create',
    message: "Tu n'as pas besoin de permission pour créer quelque chose de beau. HeliFan a choisi ce chemin. Il t'appartient aussi.",
  },
]

interface CardModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function CardModal({ isOpen, onClose }: CardModalProps) {
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

  // Réinitialiser le choix à chaque ouverture
  useEffect(() => {
    if (isOpen) setSelectedChoice(null)
  }, [isOpen])

  const handleChoiceClick = useCallback((key: string) => {
    setSelectedChoice(prev => prev === key ? null : key)
  }, [])

  if (!isOpen) return null

  const activeChoice = CHOICES.find(c => c.key === selectedChoice) ?? null

  return createPortal(
    <div
      className="modal-overlay"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Détails de la carte HeliFan"
    >
      <div className="modal-container" onClick={e => e.stopPropagation()}>

        <button className="modal-close" onClick={onClose} aria-label="Fermer">✕</button>

        {/* ── Colonne gauche — portrait ── */}
        <div className="modal-card-side">
          <div className="modal-card-visual">
            <img
              src={`${import.meta.env.BASE_URL}cards/future-choice/character.png`}
              alt="HeliFan"
              className="modal-portrait"
            />
            <div className="modal-card-glow" />
          </div>
        </div>

        {/* ── Colonne droite — détails ── */}
        <div className="modal-detail-side">

          <div className="modal-header">
            <div className="modal-card-number">✦ Héroïne Légendaire · N°01 ✦</div>
            <h2 className="modal-title">HeliFan</h2>
            <div className="modal-type-line">
              Créature Légendaire — Humaine Prophétesse
            </div>
          </div>

          <div className="modal-section">
            <p className="modal-description">
              Petite en taille, immense en lumière. HeliFan avance avec la douceur
              d'un panda et le courage d'une exploratrice. Sa curiosité est sa
              boussole. Son amour, son pouvoir.
            </p>
          </div>

          <div className="modal-section">
            <h3 className="modal-section-title">Capacités</h3>
            <ul className="modal-abilities">
              <li>
                <span className="ability-name">Curiosité infinie</span>
                <span className="ability-desc">
                  : Au début de chaque tour, révèle la prochaine carte du destin.
                </span>
              </li>
              <li>
                <span className="ability-name">Amour rayonnant</span>
                <span className="ability-desc">
                  : Les alliés adjacents gagnent +1 en courage.
                </span>
              </li>
              <li>
                <span className="ability-name">Pas de panda</span>
                <span className="ability-desc">
                  : Insaisissable. Ne peut pas être bloquée par la peur.
                </span>
              </li>
            </ul>
          </div>

          <div className="modal-section modal-flavor">
            <p>
              « Chaque chemin commence par une question.
              Elle, elle ose la poser. »
            </p>
          </div>

          <div className="modal-section">
            <h3 className="modal-section-title">Choisir son chemin</h3>
            <div className="modal-choices">
              {CHOICES.map(c => (
                <button
                  key={c.key}
                  className={`modal-choice-btn ${c.className}${selectedChoice === c.key ? ' active' : ''}`}
                  onClick={() => handleChoiceClick(c.key)}
                >
                  {c.emoji} {c.label}
                </button>
              ))}
            </div>
            {activeChoice && (
              <div className="modal-choice-message" key={activeChoice.key}>
                {activeChoice.message}
              </div>
            )}
          </div>

          <div className="modal-footer">
            <span className="modal-brand">Helistory © — HeliFan</span>
            <span className="modal-stats">1 / 56</span>
          </div>

        </div>
      </div>
    </div>,
    document.body
  )
}
