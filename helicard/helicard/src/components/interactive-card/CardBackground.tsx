import './CardBackground.css'

/* ── Constantes SVG communes ─────────────────────────────────────────── */
const VB = '0 0 340 510'
const ASPECT = 'xMidYMid slice'

/* ═══════════════════════════════════════════════════════════════════════
   COUCHE 1 — Ciel nocturne
═══════════════════════════════════════════════════════════════════════ */
function SkyLayer() {
  return (
    <svg width="100%" height="100%" viewBox={VB} preserveAspectRatio={ASPECT}>
      <defs>
        <linearGradient id="bgSkyGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor="#080300" />
          <stop offset="60%"  stopColor="#100600" />
          <stop offset="100%" stopColor="#1A0800" />
        </linearGradient>
        <filter id="bgStarBlur">
          <feGaussianBlur stdDeviation="0.4" />
        </filter>
      </defs>
      <rect width="340" height="510" fill="url(#bgSkyGrad)" />
      {/* Stars */}
      {[
        [32,38,1.1],[80,18,0.8],[152,55,1.3],[218,22,0.7],[288,44,1.0],
        [312,14,0.6],[62,85,0.9],[198,78,0.7],[258,62,1.1],[128,28,0.8],
        [44,120,0.6],[175,40,0.9],[300,95,0.7],[20,62,0.8]
      ].map(([cx,cy,r],i) => (
        <circle key={i} cx={cx} cy={cy} r={r}
          fill="#F5DEB3" opacity={0.08 + (i % 4) * 0.03}
          filter="url(#bgStarBlur)" />
      ))}
      {/* Croissant de lune géométrique, style grec */}
      <path
        d="M290,370 Q318,352 316,385 Q314,415 288,408 Q268,400 272,380 Q278,358 290,370Z"
        fill="#C8960A" opacity="0.13"
      />
      <path
        d="M290,370 Q303,362 302,382 Q300,400 288,405 Q275,400 276,385 Q278,370 290,370Z"
        fill="#080300" opacity="0.8"
      />
    </svg>
  )
}

/* ═══════════════════════════════════════════════════════════════════════
   COUCHE 2 — Frise méandres grecs
═══════════════════════════════════════════════════════════════════════ */
function MeanderLayer() {
  return (
    <svg width="100%" height="100%" viewBox={VB} preserveAspectRatio={ASPECT}>
      <defs>
        <pattern id="bgMeander" x="0" y="0" width="32" height="32" patternUnits="userSpaceOnUse">
          <path
            d="M4,28 L4,18 L14,18 L14,8 L24,8 L24,18 L19,18 L19,23 L28,23 L28,28"
            stroke="#8B6914" strokeWidth="1.3" fill="none"
          />
        </pattern>
        {/* Bande du haut */}
        <pattern id="bgMeanderTop" x="0" y="0" width="32" height="32" patternUnits="userSpaceOnUse">
          <path
            d="M4,4 L4,14 L14,14 L14,24 L24,24 L24,14 L19,14 L19,9 L28,9 L28,4"
            stroke="#8B6914" strokeWidth="1.1" fill="none"
          />
        </pattern>
      </defs>
      {/* Ligne fine de séparation */}
      <line x1="0" y1="434" x2="340" y2="434" stroke="#8B6914" strokeWidth="0.6" opacity="0.38" />
      <line x1="0" y1="444" x2="340" y2="444" stroke="#8B6914" strokeWidth="0.3" opacity="0.2" />
      {/* Bandeau méandre bas */}
      <rect x="0" y="434" width="340" height="45" fill="url(#bgMeander)" opacity="0.32" />
      {/* Ligne fine de séparation haute */}
      <line x1="0" y1="74" x2="340" y2="74" stroke="#8B6914" strokeWidth="0.5" opacity="0.28" />
      {/* Bandeau méandre haut (plus subtil) */}
      <rect x="0" y="44" width="340" height="30" fill="url(#bgMeanderTop)" opacity="0.18" />
    </svg>
  )
}

/* ═══════════════════════════════════════════════════════════════════════
   COUCHE 3 — Ruines de temple dorique
═══════════════════════════════════════════════════════════════════════ */
function RuinsLayer() {
  /* [x, largeur, hauteur] — colonnes depuis le bas (y=430) */
  const cols = [
    { x: 18,  w: 19, h: 235 },
    { x: 68,  w: 21, h: 185 },
    { x: 152, w: 20, h: 275 },
    { x: 246, w: 22, h: 210 },
    { x: 298, w: 18, h: 190 },
  ]
  return (
    <svg width="100%" height="100%" viewBox={VB} preserveAspectRatio={ASPECT}>
      <g fill="#0D0600" stroke="#2A1500" strokeWidth="0.5" opacity="0.62">
        {cols.map(({ x, w, h }, i) => {
          const y = 430 - h
          return (
            <g key={i}>
              {/* Fût */}
              <rect x={x} y={y + 12} width={w} height={h - 12} rx="1.5" />
              {/* Chapiteau */}
              <rect x={x - 3} y={y + 4} width={w + 6} height={9} rx="1" />
              {/* Abaque */}
              <rect x={x - 6} y={y} width={w + 12} height={5} rx="0.5" />
            </g>
          )
        })}
        {/* Sol */}
        <line x1="0" y1="430" x2="340" y2="430" stroke="#2A1500" strokeWidth="1.2" />
        {/* Blocs effondrés */}
        <rect x="42"  y="422" width="22" height="7" rx="1" transform="rotate(-2.5, 53, 426)" />
        <rect x="110" y="424" width="16" height="6" rx="1" transform="rotate(3,  118, 427)" />
        <rect x="198" y="421" width="28" height="8" rx="1" transform="rotate(-1.5, 212, 425)" />
        <rect x="270" y="423" width="18" height="6" rx="1" transform="rotate(2, 279, 426)" />
        {/* Entablement partiellement effondré sur col 1 */}
        <rect x="18" y="195" width="70" height="6" rx="1" opacity="0.5" />
        {/* Fronton partiel sur col 3 */}
        <path d="M142,155 L172,138 L202,155Z" fill="#0D0600" opacity="0.5" />
        <rect x="142" y="155" width="60" height="5" rx="1" />
      </g>
    </svg>
  )
}

/* ═══════════════════════════════════════════════════════════════════════
   COUCHE 4 — Scène de vase grec (figures noires)
═══════════════════════════════════════════════════════════════════════ */
function VaseLayer() {
  return (
    <svg width="100%" height="100%" viewBox={VB} preserveAspectRatio={ASPECT}>
      {/* Fond terre cuite très sombre */}
      <rect width="340" height="510" fill="#8B3A00" opacity="0.13" />

      {/* Bordures verticales style vase */}
      <line x1="32"  y1="140" x2="32"  y2="420" stroke="#8B6914" strokeWidth="1.2" opacity="0.35" />
      <line x1="308" y1="140" x2="308" y2="420" stroke="#8B6914" strokeWidth="1.2" opacity="0.35" />
      <line x1="28"  y1="140" x2="28"  y2="420" stroke="#8B6914" strokeWidth="0.4" opacity="0.2" />
      <line x1="312" y1="140" x2="312" y2="420" stroke="#8B6914" strokeWidth="0.4" opacity="0.2" />

      {/* ── Hercule (silhouette profil gauche) ── */}
      <g fill="#8B6914" opacity="0.42">
        {/* Tête */}
        <circle cx="95" cy="205" r="13" />
        {/* Casque */}
        <path d="M84,200 L85,190 L89,182 L95,177 L101,182 L105,190 L106,200Z" />
        {/* Panache */}
        <path d="M94,177 Q86,163 78,158 Q87,167 94,175"
              stroke="#8B6914" strokeWidth="2" fill="none" opacity="0.7" />
        {/* Cou */}
        <rect x="89" y="218" width="10" height="9" />
        {/* Torse (trapèze musclé) */}
        <path d="M78,227 L112,227 L107,285 L83,285Z" />
        {/* Ceinture */}
        <rect x="82" y="280" width="26" height="6" rx="1" opacity="0.9" />
        {/* Cape derrière */}
        <path d="M108,227 L128,238 L120,295 L107,285Z" opacity="0.32" />
        {/* Jambe droite (avant) */}
        <path d="M83,285 L80,340 L72,340 L75,285Z" />
        {/* Jambe gauche (arrière) */}
        <path d="M101,285 L108,340 L116,340 L109,285Z" opacity="0.78" />
        {/* Sandale droite */}
        <path d="M72,340 L80,340 L76,348 L68,348Z" />
        {/* Sandale gauche */}
        <path d="M108,340 L116,340 L120,348 L112,348Z" opacity="0.78" />
        {/* Bras droit tendu (vers la gauche, massue) */}
        <path d="M78,238 L52,248 L46,256"
              stroke="#8B6914" strokeWidth="7" fill="none" strokeLinecap="round" />
        {/* Massue */}
        <path d="M40,250 L46,256" stroke="#8B6914" strokeWidth="9" strokeLinecap="round" />
        <ellipse cx="38" cy="253" rx="8" ry="12" transform="rotate(-25, 38, 253)" />
        {/* Bras gauche (plié, bouclier) */}
        <path d="M108,240 L118,255 L112,265"
              stroke="#8B6914" strokeWidth="6" fill="none" strokeLinecap="round" />
        {/* Bouclier rond */}
        <circle cx="116" cy="268" r="14" />
        <circle cx="116" cy="268" r="9" fill="#6B4A10" />
      </g>

      {/* ── Lion de Némée (couché/vaincu) ── */}
      <g fill="#6B4A10" opacity="0.33">
        {/* Corps */}
        <ellipse cx="185" cy="348" rx="44" ry="24" />
        {/* Tête */}
        <circle cx="152" cy="338" r="19" />
        {/* Crinière */}
        <path d="M135,323 L129,312 M140,319 L132,308 M150,316 L147,304
                 M160,318 L163,307 M167,324 L173,314 M130,332 L120,330
                 M168,334 L178,333"
              stroke="#6B4A10" strokeWidth="2.2" fill="none" opacity="0.55" />
        {/* Patte avant */}
        <rect x="148" y="360" width="12" height="20" rx="4" />
        <rect x="164" y="362" width="12" height="18" rx="4" />
        {/* Museau */}
        <ellipse cx="136" cy="340" rx="10" ry="7" fill="#5A3A08" opacity="0.8" />
        {/* Queue */}
        <path d="M228,335 Q242,318 237,306 Q234,320 228,328"
              stroke="#6B4A10" strokeWidth="3.5" fill="none" />
        <circle cx="236" cy="304" r="5" />
      </g>

      {/* ── Amphore (droite) ── */}
      <g stroke="#8B6914" strokeWidth="1.2" fill="none" opacity="0.38">
        {/* Corps */}
        <path d="M253,295 Q237,305 239,335 Q239,358 253,368 L272,368 Q286,358 286,335 Q288,305 272,295Z" />
        {/* Épaulement */}
        <path d="M253,295 Q255,278 260,270 L265,270 Q270,278 272,295" />
        {/* Col */}
        <line x1="260" y1="270" x2="265" y2="270" />
        {/* Lèvre */}
        <path d="M257,270 L268,270" strokeWidth="2" />
        {/* Anses */}
        <path d="M253,310 Q244,298 250,288" />
        <path d="M272,310 Q281,298 275,288" />
        {/* Base */}
        <path d="M255,368 Q258,376 262,378 Q268,376 270,368" />
        {/* Motif sur corps */}
        <path d="M244,330 L281,330" strokeWidth="0.5" opacity="0.5" />
        <path d="M246,340 L279,340" strokeWidth="0.4" opacity="0.4" />
      </g>

      {/* Ligne de sol */}
      <line x1="32" y1="420" x2="308" y2="420" stroke="#8B6914" strokeWidth="0.8" opacity="0.3" />
    </svg>
  )
}

/* ═══════════════════════════════════════════════════════════════════════
   COUCHE 5 — Scène néoclassique (trait fin, style gravure)
═══════════════════════════════════════════════════════════════════════ */
function NeoLayer() {
  return (
    <svg width="100%" height="100%" viewBox={VB} preserveAspectRatio={ASPECT}>
      <g stroke="#D4B870" strokeWidth="0.7" fill="none" opacity="0.16">

        {/* ── Arc de temple ── */}
        {/* Colonne gauche */}
        <rect x="88" y="148" width="14" height="210" />
        {/* Colonne droite */}
        <rect x="238" y="148" width="14" height="210" />
        {/* Rainures colonnes gauche */}
        {[91,94,97,100].map(x => <line key={x} x1={x} y1="150" x2={x} y2="355" strokeWidth="0.3" />)}
        {/* Rainures colonnes droite */}
        {[241,244,247,250].map(x => <line key={x} x1={x} y1="150" x2={x} y2="355" strokeWidth="0.3" />)}
        {/* Linteau */}
        <rect x="86" y="140" width="168" height="10" />
        {/* Fronton triangulaire */}
        <path d="M86,140 L170,95 L254,140Z" />
        {/* Acrotère */}
        <path d="M166,95 L170,82 L174,95" strokeWidth="0.5" />
        {/* Frise entre colonnes */}
        <rect x="86" y="148" width="168" height="6" strokeWidth="0.4" />

        {/* ── Sol et rochers ── */}
        <path d="M50,395 Q90,388 140,392 Q180,390 230,394 Q270,390 310,395"
              strokeWidth="0.8" />
        <ellipse cx="160" cy="393" rx="22" ry="7" />
        <ellipse cx="200" cy="395" rx="14" ry="5" />
        <ellipse cx="130" cy="394" rx="10" ry="4" />

        {/* ── Hercule héroïque (silhouette centrale) ── */}
        {/* Tête */}
        <circle cx="170" cy="148" r="12" />
        {/* Casque corinthien */}
        <path d="M159,148 L160,138 L164,130 L170,126 L176,130 L180,138 L181,148" />
        {/* Cimier de casque */}
        <path d="M170,126 Q162,112 155,108 Q163,116 170,123" strokeWidth="1.2" />
        {/* Cou */}
        <line x1="170" y1="160" x2="170" y2="167" strokeWidth="3" />
        {/* Épaules larges */}
        <path d="M148,167 Q158,163 170,162 Q182,163 192,167" strokeWidth="2" />
        {/* Torse musclé */}
        <path d="M150,167 L148,220 L192,220 L190,167" />
        {/* Pectoraux */}
        <path d="M155,180 Q170,185 185,180" strokeWidth="0.6" />
        <path d="M152,195 Q170,200 188,195" strokeWidth="0.5" />
        {/* Abdominaux */}
        <path d="M157,207 L183,207 M159,214 L181,214" strokeWidth="0.4" />
        {/* Drapé / taille */}
        <path d="M148,220 Q160,225 170,223 Q180,225 192,220 L195,260 L145,260Z" />
        {/* Pli du drapé */}
        <path d="M155,225 L148,258 M165,223 L160,259 M178,222 L182,259" strokeWidth="0.4" />
        {/* Bras droit levé vers le ciel */}
        <path d="M190,175 L210,148 L215,128" strokeWidth="2.5" strokeLinecap="round" />
        {/* Poing fermé */}
        <rect x="210" y="120" width="9" height="10" rx="3" />
        {/* Bras gauche + bouclier */}
        <path d="M150,178 L126,195 L118,215" strokeWidth="2.5" strokeLinecap="round" />
        {/* Bouclier */}
        <circle cx="112" cy="220" r="18" />
        <circle cx="112" cy="220" r="12" strokeWidth="0.4" />
        <path d="M104,212 L120,212 M112,204 L112,228" strokeWidth="0.4" />
        {/* Jambes héroïques */}
        {/* Jambe gauche (avant, fléchie) */}
        <path d="M152,260 L145,310 L138,370" strokeWidth="3.5" strokeLinecap="round" />
        {/* Jambe droite (arrière, tendue) */}
        <path d="M188,260 L192,320 L198,385" strokeWidth="3.5" strokeLinecap="round" />
        {/* Sandales */}
        <path d="M130,368 L148,370" strokeWidth="2" />
        <path d="M192,383 L205,385" strokeWidth="2" />
        {/* Drapé flottant derrière */}
        <path d="M190,175 Q215,165 225,180 Q220,210 205,235 Q195,245 188,255"
              strokeWidth="0.9" />
        {/* Rocher sous les pieds */}
        <path d="M130,374 Q160,368 200,372 Q215,375 225,380" />

        {/* ── Hydre de Lerne (gauche) ── */}
        {/* Corps serpentin */}
        <path d="M55,390 Q48,360 58,330 Q68,295 52,265 Q44,240 58,215"
              strokeWidth="3" strokeLinecap="round" />
        {/* Cou 1 (tête centrale) */}
        <path d="M58,215 Q62,195 72,178 Q78,165 72,148"
              strokeWidth="2" strokeLinecap="round" />
        {/* Tête 1 */}
        <ellipse cx="70" cy="143" rx="12" ry="8" transform="rotate(-15, 70, 143)" />
        <path d="M62,140 L58,135 M78,140 L83,135" strokeWidth="1.5" />
        {/* Cou 2 (tête gauche) */}
        <path d="M52,265 Q38,248 30,228 Q24,210 35,195"
              strokeWidth="1.8" strokeLinecap="round" />
        {/* Tête 2 */}
        <ellipse cx="36" cy="190" rx="11" ry="7" transform="rotate(-30, 36, 190)" />
        <path d="M28,188 L24,183 M44,188 L48,183" strokeWidth="1.2" />
        {/* Cou 3 (tête droite, vers Hercule) */}
        <path d="M58,330 Q75,310 88,290 Q96,272 88,255"
              strokeWidth="1.8" strokeLinecap="round" />
        {/* Tête 3 */}
        <ellipse cx="88" cy="250" rx="12" ry="7" transform="rotate(20, 88, 250)" />
        <path d="M80,247 L76,242 M96,247 L100,242" strokeWidth="1.2" />
        {/* Écailles */}
        {[350,330,310,290,270].map((y,i) => (
          <path key={i}
            d={`M${48+i*2},${y} Q${53+i*2},${y-5} ${58+i*2},${y}`}
            strokeWidth="0.5" />
        ))}

        {/* ── Étoiles de fond ── */}
        {[[60,70],[280,85],[45,160],[305,145],[70,390],[290,370]].map(([cx,cy],i)=>(
          <circle key={i} cx={cx} cy={cy} r="0.9" fill="#D4B870" stroke="none" opacity="0.5" />
        ))}
      </g>
    </svg>
  )
}

/* ═══════════════════════════════════════════════════════════════════════
   COUCHE 6 — Mosaïque dans les 4 coins
═══════════════════════════════════════════════════════════════════════ */
function MosaicLayer() {
  const Diamond = ({ cx, cy }: { cx: number; cy: number }) => (
    <path d={`M${cx},${cy-5} L${cx+4},${cy} L${cx},${cy+5} L${cx-4},${cy}Z`}
          stroke="#8B6914" strokeWidth="0.4" fill="none" />
  )
  const grid = (ox: number, oy: number) => {
    const items = []
    for (let r = 0; r < 5; r++)
      for (let c = 0; c < 5; c++)
        items.push(<Diamond key={`${r}-${c}`} cx={ox + c * 9} cy={oy + r * 11} />)
    return items
  }
  return (
    <svg width="100%" height="100%" viewBox={VB} preserveAspectRatio={ASPECT} opacity="0.55">
      {/* Coin TL */}
      <g opacity="0.22">{grid(12, 12)}</g>
      {/* Coin TR */}
      <g opacity="0.22">{grid(294, 12)}</g>
      {/* Coin BL */}
      <g opacity="0.18">{grid(12, 450)}</g>
      {/* Coin BR */}
      <g opacity="0.18">{grid(294, 450)}</g>
      {/* Palmettes dans les coins */}
      {[
        [26, 68, 1], [314, 68, -1],
      ].map(([x, y, flip], i) => (
        <g key={i} transform={`scale(${flip}, 1) translate(${flip === -1 ? -340 : 0}, 0)`}>
          <path d={`M${x},${y} Q${x-8},${y-10} ${x-4},${y-18} Q${x},${y-22} ${x+4},${y-18} Q${x+8},${y-10} ${x},${y}`}
                stroke="#8B6914" strokeWidth="0.6" fill="none" opacity="0.3" />
          <path d={`M${x},${y} Q${x-14},${y-8} ${x-12},${y-18} Q${x-8},${y-24} ${x-4},${y-20}`}
                stroke="#8B6914" strokeWidth="0.5" fill="none" opacity="0.22" />
          <path d={`M${x},${y} Q${x+14},${y-8} ${x+12},${y-18} Q${x+8},${y-24} ${x+4},${y-20}`}
                stroke="#8B6914" strokeWidth="0.5" fill="none" opacity="0.22" />
        </g>
      ))}
    </svg>
  )
}

/* ═══════════════════════════════════════════════════════════════════════
   COMPOSANT PRINCIPAL
═══════════════════════════════════════════════════════════════════════ */
export default function CardBackground() {
  return (
    <div className="card-bg-container">
      <div className="bg-layer bg-sky">     <SkyLayer />     </div>
      <div className="bg-layer bg-meander"> <MeanderLayer /> </div>
      <div className="bg-layer bg-ruins">   <RuinsLayer />   </div>
      <div className="bg-layer bg-vase">    <VaseLayer />    </div>
      <div className="bg-layer bg-neo">     <NeoLayer />     </div>
      <div className="bg-layer bg-mosaic">  <MosaicLayer />  </div>
      <div className="bg-layer bg-glow" />
      <div className="bg-layer bg-vignette" />
    </div>
  )
}
