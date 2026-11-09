'use client';
import { motion } from 'framer-motion';

const TRACES = [
  'M0 180 H180 L240 240 H520 L580 180 H900 L960 240 H1440',
  'M0 420 H140 L200 360 H460 L500 400 H820 L880 340 H1440',
  'M0 620 H220 L280 560 H640 L700 620 H1100 L1160 560 H1440',
  'M180 0 V120 L240 180 V320',
  'M720 0 V90 L780 150 V420 L840 480 V800',
  'M1180 0 V160 L1120 220 V500 L1180 560 V800',
  'M420 800 V640 L480 580 V300',
  'M980 800 V700 L920 640 V380',
];

const NODES = [
  [8, 22], [18, 52], [28, 14], [38, 68], [48, 34], [58, 78],
  [68, 20], [78, 56], [88, 40], [12, 84], [42, 10], [72, 88],
  [92, 72], [32, 44], [62, 48], [84, 16],
];

const PACKETS = [
  { d: 'M0 16 H520 L536 6 H980 L996 16 H1440', delay: '0s', color: '#0891B2' },
  { d: 'M0 16 H520 L536 6 H980 L996 16 H1440', delay: '2.4s', color: '#E4570E' },
];

export default function PcbBackdrop() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true" data-testid="hero-grid">
      <div className="hero-haze absolute inset-0" />

      {/* Even, same-hue atmosphere — no left/right color split */}
      <div className="hero-orb orb-a left-[8%] top-[12%] h-[380px] w-[380px] bg-cyan/18" />
      <div className="hero-orb orb-b right-[10%] top-[18%] h-[360px] w-[360px] bg-cyan/14" />
      <div className="hero-orb orb-c left-[42%] bottom-[8%] h-[340px] w-[340px] bg-cyan/12" />

      <motion.div
        className="absolute inset-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.75 }}
        transition={{ duration: 1.4 }}
      >
        <div className="grid-bg absolute inset-0" />
        <div className="grid-bright grid-scan absolute inset-0" />
        <div className="grid-bright grid-spot absolute inset-0" />
      </motion.div>

      <svg className="absolute inset-x-0 top-[84px] h-6 w-full lg:top-[100px]" viewBox="0 0 1440 24" preserveAspectRatio="none" data-testid="hero-top-trace">
        <path d="M0 16 H520 L536 6 H980 L996 16 H1440" fill="none" stroke="#CDD7E3" strokeWidth="1.5" vectorEffect="non-scaling-stroke" />
        <path d="M0 16 H520 L536 6 H980 L996 16 H1440" fill="none" stroke="#0891B2" strokeWidth="2" vectorEffect="non-scaling-stroke" className="trace-long" />
        <path d="M0 16 H520 L536 6 H980 L996 16 H1440" fill="none" stroke="#E4570E" strokeWidth="2" vectorEffect="non-scaling-stroke" className="trace-long" style={{ animationDelay: '-2.6s', animationDuration: '6.5s' }} />
        {PACKETS.map((p, i) => (
          <circle key={i} r="3.5" fill={p.color} className="signal-packet" style={{ offsetPath: `path('${p.d}')`, animationDelay: p.delay }}>
            <animate attributeName="r" values="2.5;4;2.5" dur="1.2s" repeatCount="indefinite" />
          </circle>
        ))}
      </svg>

      <div className="absolute inset-0 opacity-45">
        {NODES.map(([x, y], i) => (
          <span
            key={`${x}-${y}`}
            className="grid-node absolute h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan"
            style={{ left: `${x}%`, top: `${y}%`, animationDelay: `${i * 0.45}s` }}
          />
        ))}
        <svg className="absolute inset-0 h-full w-full" viewBox="0 0 1440 800" preserveAspectRatio="xMidYMid slice">
          {TRACES.map((d, i) => (
            <g key={d} fill="none">
              <path d={d} stroke="#CDD7E3" strokeWidth="1.5" />
              <path
                d={d}
                stroke={i % 3 === 0 ? '#E4570E' : '#0891B2'}
                strokeWidth="2"
                className="trace-pulse"
                style={{ animationDelay: `${i * -0.7}s`, animationDuration: `${4.8 + (i % 3)}s` }}
              />
            </g>
          ))}
        </svg>
      </div>
    </div>
  );
}
