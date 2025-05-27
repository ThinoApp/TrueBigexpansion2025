export const WorldMap = () => (
  <svg
    viewBox="0 0 1000 500"
    className="world-map"
    style={{
      position: 'absolute',
      width: '100%',
      height: '100%',
      opacity: 0.15,
    }}
  >
    {/* Europe */}
    <path
      d="M470 80 L520 70 L540 80 L560 75 L580 85 L570 100 L580 110 L560 120 L530 115 L520 125 L500 120 L485 110 L460 115 L450 100 L470 80"
      fill="rgba(255,255,255,0.2)"
    />
    
    {/* Afrique */}
    <path
      d="M460 140 L500 130 L520 140 L540 135 L560 150 L570 180 L560 220 L540 260 L520 280 L500 290 L480 280 L460 260 L450 230 L440 200 L450 170 L460 140"
      fill="rgba(255,255,255,0.2)"
    />
    
    {/* Madagascar */}
    <path
      d="M570 220 L580 230 L585 250 L580 270 L570 280 L565 260 L570 220"
      fill="rgba(255,255,255,0.2)"
    />

    {/* La Réunion */}
    <circle cx="590" cy="270" r="5" fill="rgba(255,255,255,0.3)" />
    
    {/* Mayotte */}
    <circle cx="565" cy="250" r="4" fill="rgba(255,255,255,0.3)" />
    
    {/* Maurice */}
    <circle cx="600" cy="265" r="4" fill="rgba(255,255,255,0.3)" />

    {/* France métropolitaine */}
    <path
      d="M460 100 L470 95 L480 98 L485 105 L480 110 L470 108 L460 100"
      fill="rgba(255,255,255,0.3)"
    />
  </svg>
); 