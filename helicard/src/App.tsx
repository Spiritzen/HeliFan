import { useState } from 'react'
import InteractiveCard from './components/interactive-card/InteractiveCard'
import { futureChoiceCard, socrateCard } from './components/interactive-card/cardData'
import './App.css'

const cards = [futureChoiceCard, socrateCard]

export default function App() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const card = cards[currentIndex]

  return (
    <div className="app-container">
      <div className="stage-ambient" />
      <header className="stage-header">
        <h1 className="stage-title">{card.title}</h1>
        <p className="stage-sub">{card.subtitle} · Survol pour le tilt · Clic pour explorer</p>
      </header>
      <main className="stage-main">
        <InteractiveCard card={card} />
      </main>
      <nav className="card-switcher" aria-label="Sélection de carte">
        {cards.map((c, i) => (
          <button
            key={c.id}
            className={`switcher-dot${i === currentIndex ? ' active' : ''}`}
            style={{ '--dot-color': c.theme.primary } as React.CSSProperties}
            onClick={() => setCurrentIndex(i)}
            aria-label={`Carte ${c.title}`}
            aria-current={i === currentIndex ? 'true' : undefined}
          />
        ))}
      </nav>
    </div>
  )
}
