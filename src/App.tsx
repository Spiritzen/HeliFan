import InteractiveCard from './components/interactive-card/InteractiveCard'
import './App.css'

export default function App() {
  return (
    <div className="app-container">
      <div className="stage-ambient" />
      <header className="stage-header">
        <h1 className="stage-title">HeliFan</h1>
        <p className="stage-sub">La Gardienne des Chemins · Survol pour le tilt · Clic pour retourner</p>
      </header>
      <main className="stage-main">
        <InteractiveCard />
      </main>
    </div>
  )
}
