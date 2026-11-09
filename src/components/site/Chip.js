const PINS = Array.from({ length: 12 }, (_, i) => 70 + i * 24);

export default function Chip() {
  return (
    <svg viewBox="0 0 480 480" className="w-full drop-shadow-[0_30px_60px_rgba(34,211,238,0.12)]" data-testid="hero-chip">
      <defs>
        <linearGradient id="die" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#152033" />
          <stop offset="1" stopColor="#0A0F18" />
        </linearGradient>
      </defs>
      <g stroke="#22D3EE" strokeWidth="1" opacity="0.35" fill="none">
        {PINS.map((p, i) => (
          <g key={p}>
            <path d={`M${p} 92 V${20 + (i % 4) * 8}`} />
            <path d={`M${p} 388 V${460 - (i % 4) * 8}`} />
            <path d={`M92 ${p} H${20 + (i % 3) * 10}`} />
            <path d={`M388 ${p} H${460 - (i % 3) * 10}`} />
          </g>
        ))}
      </g>
      {[[PINS[2], 'M118 92 V20'], [PINS[7], 'M388 238 H460'], [PINS[9], 'M286 388 V460'], [PINS[4], 'M92 166 H20']].map(([k, d], i) => (
        <path key={k} d={d} stroke={i % 2 ? '#F2662B' : '#22D3EE'} strokeWidth="2" fill="none" className="trace-pulse" style={{ animationDuration: `${2.4 + i * 0.5}s`, strokeDasharray: '10 90' }} />
      ))}
      <g fill="#8B98AB">
        {PINS.map((p) => (
          <g key={p}>
            <rect x={p - 4} y="78" width="8" height="14" />
            <rect x={p - 4} y="388" width="8" height="14" />
            <rect x="78" y={p - 4} width="14" height="8" />
            <rect x="388" y={p - 4} width="14" height="8" />
          </g>
        ))}
      </g>
      <path d="M92 92 H360 L388 120 V388 H92 Z" fill="url(#die)" stroke="#2A3A52" strokeWidth="2" />
      <path d="M130 130 H330 L350 150 V350 H130 Z" fill="none" stroke="#22D3EE" strokeOpacity="0.25" strokeDasharray="3 5" />
      <circle cx="118" cy="362" r="7" fill="none" stroke="#8B98AB" />
      <text x="150" y="215" fill="#F8FAFC" fontFamily="var(--font-display)" fontSize="30">AC-M7</text>
      <text x="150" y="245" fill="#22D3EE" fontFamily="var(--font-mono)" fontSize="12" letterSpacing="3">CORTEX · RTOS</text>
      <text x="150" y="300" fill="#8B98AB" fontFamily="var(--font-mono)" fontSize="10" letterSpacing="2">REV.C  2614  TW</text>
      <text x="150" y="318" fill="#8B98AB" fontFamily="var(--font-mono)" fontSize="10" letterSpacing="2">LQFP-144 / 0x1F4A</text>
      <circle cx="340" cy="140" r="5" fill="#F2662B">
        <animate attributeName="opacity" values="1;0.2;1" dur="1.6s" repeatCount="indefinite" />
      </circle>
    </svg>
  );
}
