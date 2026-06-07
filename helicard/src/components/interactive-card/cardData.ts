const base = import.meta.env.BASE_URL

export interface CardTheme {
  primary: string
  secondary: string
  glow: string
  bgFilter?: string
  imagePosition?: string
}

export interface CardAbility {
  name: string
  desc: string
}

export interface CardChoice {
  id: string
  label: string
  emoji: string
  color: string
  message: string
}

export interface CardMana {
  symbol: string
  className: string
  title: string
}

export interface FantasyCard {
  id: string
  number: number
  title: string
  subtitle: string
  typeLine: string
  arcane: string
  stats: string
  imgSrc: string
  imgAlt: string
  mana: CardMana[]
  abilities: CardAbility[]
  flavor: string
  description: string
  theme: CardTheme
  choices: CardChoice[]
  footerArtist: string
}

export const futureChoiceCard: FantasyCard = {
  id: 'future-choice',
  number: 1,
  title: 'HeliFan',
  subtitle: 'La Gardienne des Chemins',
  typeLine: 'Créature Légendaire — Humaine Prophétesse',
  arcane: 'Héroïne Légendaire',
  stats: '1 / 56',
  imgSrc: `${base}cards/future-choice/character.png`,
  imgAlt: 'HeliFan',
  mana: [
    { symbol: '★', className: 'mana-gold',  title: 'Légendaire' },
    { symbol: '❤', className: 'mana-panda', title: 'Amour' },
    { symbol: '✦', className: 'mana-creat', title: 'Créativité' },
  ],
  abilities: [
    { name: 'Curiosité infinie', desc: ': Au début de chaque tour, révèle la prochaine carte du destin.' },
    { name: 'Amour rayonnant',   desc: ': Les alliés adjacents gagnent +1 en courage.' },
    { name: 'Pas de panda',      desc: ': Insaisissable. Ne peut pas être bloquée par la peur.' },
  ],
  flavor: '« Chaque chemin commence par une question. Elle, elle ose la poser. »',
  description: "Petite en taille, immense en lumière. HeliFan avance avec la douceur d'un panda et le courage d'une exploratrice. Sa curiosité est sa boussole. Son amour, son pouvoir.",
  theme: {
    primary:       '#E8C06A',
    secondary:     '#8B6914',
    glow:          'rgba(232, 192, 106, 0.3)',
    imagePosition: '68% 30%',
  },
  choices: [
    {
      id: 'learn',
      label: 'Apprendre',
      emoji: '📚',
      color: '#E8C06A',
      message: "La curiosité est ton armure. Chaque question que tu poses ouvre une porte que personne d'autre n'aurait vue.",
    },
    {
      id: 'love',
      label: 'Aimer',
      emoji: '🐼',
      color: '#7ec8a0',
      message: "Ton pouvoir n'est pas dans ta taille, mais dans la chaleur que tu répands. L'amour que tu donnes revient toujours, amplifié.",
    },
    {
      id: 'create',
      label: 'Créer',
      emoji: '✨',
      color: '#c080e0',
      message: "Tu n'as pas besoin de permission pour créer quelque chose de beau. HeliFan a choisi ce chemin. Il t'appartient aussi.",
    },
  ],
  footerArtist: 'Helistory © — HeliFan · N°01',
}

export const socrateCard: FantasyCard = {
  id: 'socrate',
  number: 2,
  title: 'Socrate',
  subtitle: 'Fondateur de la Philosophie',
  typeLine: 'Philosophe Légendaire — Humain Sage',
  arcane: 'Philosophe Légendaire',
  stats: '0 / ∞',
  imgSrc: `${base}cards/socrate/character.png`,
  imgAlt: "Socrate, philosophe grec de l'Antiquité",
  mana: [
    { symbol: 'Φ', className: 'mana-phi',   title: 'Philosophie' },
    { symbol: '⚖', className: 'mana-logos', title: 'Logos' },
    { symbol: '◈', className: 'mana-truth', title: 'Vérité' },
  ],
  abilities: [
    { name: 'Maïeutique',        desc: ": Révèle la vérité cachée dans l'esprit de chaque allié." },
    { name: 'Ignorance savante', desc: ": Immunisé contre l'illusion. Voit ce que les autres refusent de voir." },
    { name: 'Martyr de vérité',  desc: ': Indestructible par la peur ou la flatterie.' },
  ],
  flavor: "« Je ne sais qu'une chose : c'est que je ne sais rien. »",
  description: "Il ne savait qu'une chose : qu'il ne savait rien. Dans ce vide, il trouva tout. Père de la pensée occidentale, il mourut plutôt que de trahir sa vérité.",
  theme: {
    primary:       '#7EC8E3',
    secondary:     '#2A6B8A',
    glow:          'rgba(126, 200, 227, 0.3)',
    bgFilter:      'hue-rotate(160deg) saturate(0.55) brightness(0.85)',
    imagePosition: 'center top',
  },
  choices: [
    {
      id: 'question',
      label: 'Questionner',
      emoji: '❓',
      color: '#7EC8E3',
      message: "Celui qui questionne avance. Celui qui prétend savoir stagne. La vraie sagesse commence par l'aveu de son ignorance.",
    },
    {
      id: 'resister',
      label: 'Résister',
      emoji: '⚖️',
      color: '#A0C8E0',
      message: "Socrate aurait pu fuir. Il choisit de rester et d'affronter ses juges. La vérité vaut parfois le sacrifice.",
    },
    {
      id: 'transmettre',
      label: 'Transmettre',
      emoji: '📜',
      color: '#5BB8D4',
      message: "Il n'a rien écrit. Pourtant ses idées traversent 25 siècles. Ce que tu transmets vivra au-delà de toi.",
    },
  ],
  footerArtist: 'Helistory © — Socrate · N°02',
}

export interface PlaceholderCard {
  id: string
  number: number
  isEmpty: true
  title: string
  theme: {
    primary: string
    secondary: string
    glow: string
  }
}

export type AnyCard = FantasyCard | PlaceholderCard

export const placeholderCards: PlaceholderCard[] = Array.from({ length: 10 }, (_, i) => ({
  id: `placeholder-${i + 3}`,
  number: i + 3,
  isEmpty: true as const,
  title: '???',
  theme: {
    primary:   '#4A4060',
    secondary: '#2A1A40',
    glow:      'rgba(74, 64, 96, 0.3)',
  },
}))

export const allCards: AnyCard[] = [futureChoiceCard, socrateCard, ...placeholderCards]
