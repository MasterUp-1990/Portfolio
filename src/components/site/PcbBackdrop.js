const TRACES = [
  'M0 420 H140 L200 360 H460 L500 400 H760',
  'M1440 220 H1180 L1140 260 H900 L860 300 H700',
  'M1440 560 H1240 L1190 510 H980 L940 470 H820',
  'M300 0 V80 L340 120',
  'M1100 800 V640 L1060 600 H960',
  'M0 680 H260 L300 720 H620',
];

const NODES = [[62, 12], [70, 30], [88, 18], [94, 46], [76, 72], [66, 88], [90, 82], [82, 6], [97, 64], [58, 60]];

export default function PcbBackdrop() {
  return (
    <div className="pointer-events-none absolute inset-0" aria-hidden="true" data-testid="hero-grid">
      <div className="grid-bg absolute inset-0 [mask-image:linear-gradient(to_bottom,black_75%,transparent)]" />
      <div className="grid-bright grid-scan absolute inset-0" />
      <div className="grid-bright grid-spot absolute inset-0" />
      <svg className="absolute inset-x-0 top-[84px] h-6 w-full lg:top-[100px]" viewBox="0 0 1440 24" preserveAspectRatio="none" data-testid="hero-top-trace">
        <path d="M0 16 H520 L536 6 H980 L996 16 H1440" fill="none" stroke="#1E2A3D" strokeWidth="1.5" vectorEffect="non-scaling-stroke" />
        <path d="M0 16 H520 L536 6 H980 L996 16 H1440" fill="none" stroke="#22D3EE" strokeWidth="2" vectorEffect="non-scaling-stroke" className="trace-long" />
        <path d="M0 16 H520 L536 6 H980 L996 16 H1440" fill="none" stroke="#F2662B" strokeWidth="2" vectorEffect="non-scaling-stroke" className="trace-long" style={{ animationDelay: '-2.6s', animationDuration: '7s' }} />
      </svg>
      <div className="absolute inset-0 hidden lg:block" style={{ maskImage: 'linear-gradient(90deg, transparent 0%, transparent 54%, black 66%)', WebkitMaskImage: 'linear-gradient(90deg, transparent 0%, transparent 54%, black 66%)' }}>
        {NODES.map(([x, y], i) => (
          <span key={`${x}-${y}`} className="grid-node absolute h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 bg-cyan" style={{ left: `${x}%`, top: `${y}%`, animationDelay: `${i * 0.7}s` }} />
        ))}
        <svg className="absolute inset-0 h-full w-full" viewBox="0 0 1440 800" preserveAspectRatio="xMidYMid slice">
          {TRACES.map((d, i) => (
            <g key={d} fill="none">
              <path d={d} stroke="#1E2A3D" strokeWidth="1.5" />
              <path d={d} stroke={i % 3 === 0 ? '#F2662B' : '#22D3EE'} strokeWidth="2" className="trace-pulse" style={{ animationDelay: `${i * -0.9}s`, animationDuration: `${5 + (i % 3)}s` }} />
            </g>
          ))}
          {[[260, 160], [560, 120], [200, 360], [1140, 260], [1190, 510], [300, 720]].map(([x, y]) => (
            <circle key={`${x}-${y}`} cx={x} cy={y} r="4" fill="#06080D" stroke="#22D3EE" strokeWidth="1.5" opacity="0.6" />
          ))}
        </svg>
      </div>
    </div>
  );
}
