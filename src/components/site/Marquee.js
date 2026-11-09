export default function Marquee({ items = [] }) {
  const row = [...items, ...items];
  return (
    <section data-testid="skills-marquee-container" aria-label="Core skills" className="marquee relative overflow-hidden border-y border-line bg-panel/70 py-7 md:py-9">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-paper to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-paper to-transparent" />
      <div className="marquee-track flex w-max items-center">
        {row.map((s, i) => (
          <span key={`${s}-${i}`} data-testid={i < items.length ? `marquee-item-${i}` : undefined} className="flex items-center whitespace-nowrap">
            <span className={`px-8 font-display text-xl uppercase md:text-3xl ${i % 2 ? 'outline-text' : 'text-ink'}`}>{s}</span>
            <svg viewBox="0 0 20 20" className="h-4 w-4 shrink-0 md:h-5 md:w-5" aria-hidden="true">
              <rect x="4" y="4" width="12" height="12" fill="none" stroke={i % 3 === 0 ? '#F2662B' : '#22D3EE'} strokeWidth="1.5" transform="rotate(45 10 10)" />
              <circle cx="10" cy="10" r="2" fill={i % 3 === 0 ? '#F2662B' : '#22D3EE'} />
            </svg>
          </span>
        ))}
      </div>
    </section>
  );
}
