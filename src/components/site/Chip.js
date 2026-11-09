const PINS = Array.from({ length: 12 }, (_, i) => 70 + i * 24);

export default function Chip() {
  return (
    <svg viewBox="0 0 480 480" className="w-full drop-shadow-[0_28px_50px_rgba(8,145,178,0.18)]" data-testid="hero-chip">
      <defs>
        <linearGradient id="die" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#1A2A3D" />
          <stop offset="1" stopColor="#0B1524" />
        </linearGradient>
        <filter id="softGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="4" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <g stroke="#0891B2" strokeWidth="1" opacity="0.45" fill="none">
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
        <path key={k} d={d} stroke={i % 2 ? '#E4570E' : '#0891B2'} strokeWidth="2" fill="none" className="trace-pulse" style={{ animationDuration: `${2.4 + i * 0.5}s`, strokeDasharray: '10 90' }} />
      ))}
      <g fill="#7B8B9E">
        {PINS.map((p) => (
          <g key={p}>
            <rect x={p - 4} y="78" width="8" height="14" />
            <rect x={p - 4} y="388" width="8" height="14" />
            <rect x="78" y={p - 4} width="14" height="8" />
            <rect x="388" y={p - 4} width="14" height="8" />
          </g>
        ))}
      </g>
      <path d="M92 92 H360 L388 120 V388 H92 Z" fill="url(#die)" stroke="#2A3F55" strokeWidth="2" filter="url(#softGlow)" />
      <path d="M130 130 H330 L350 150 V350 H130 Z" fill="none" stroke="#22D3EE" strokeOpacity="0.35" strokeDasharray="3 5" />
      <circle cx="118" cy="362" r="7" fill="none" stroke="#9AABBC" />
      <text x="150" y="215" fill="#F8FAFC" fontFamily="var(--font-display)" fontSize="30">ST-M4</text>
      <text x="150" y="245" fill="#67E8F9" fontFamily="var(--font-mono)" fontSize="12" letterSpacing="3">CORTEX · RTOS</text>
      <text x="150" y="300" fill="#9AABBC" fontFamily="var(--font-mono)" fontSize="10" letterSpacing="2">REV.C  2614  TW</text>
      <text x="150" y="318" fill="#9AABBC" fontFamily="var(--font-mono)" fontSize="10" letterSpacing="2">LQFP-144 / 0x1F4A</text>
      <circle cx="340" cy="140" r="5" fill="#E4570E">
        <animate attributeName="opacity" values="1;0.25;1" dur="1.6s" repeatCount="indefinite" />
      </circle>
    </svg>
  );
}
