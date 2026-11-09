'use client';
import { useEffect, useRef, useState } from 'react';

const rnd = (a, b, d = 1) => (Math.random() * (b - a) + a).toFixed(d);

const openLink = (url) => {
  if (typeof window !== 'undefined' && url) window.open(url, '_blank', 'noopener,noreferrer');
};

const commands = (about, settings) => ({
  help: () => [
    'AVAILABLE COMMANDS:',
    'sysinfo — system overview',
    'read_sensors — live sensor telemetry',
    'ping_nodes — mesh network latency',
    'view_specs — toolchain & specs',
    'whoami — operator identity',
    'contact — open email channel',
    'resume — download résumé',
    'clear — wipe console',
  ],
  sysinfo: () => [`OPERATOR ..... ${settings.name}`, `ROLE ......... ${settings.role}`, `BASE ......... ${settings.location}`, `EXPERIENCE ... ${about.stats?.[0]?.value ?? '10+'} years`, 'STATUS ....... nominal, accepting interrupts'],
  read_sensors: () => [`TEMP ....... ${rnd(36, 41)} °C`, `HUMIDITY ... ${rnd(40, 48)} %RH`, `VIBRATION .. ${rnd(0.01, 0.04, 3)} g RMS`, `BUS VOLTAGE ${rnd(3.28, 3.34, 2)} V`],
  ping_nodes: () => ['PINGING 6 MESH NODES ...', ...['GW-01', 'NODE-A3', 'NODE-B7', 'NODE-C1', 'LORA-RX', 'BLE-M2'].map((n) => `${n.padEnd(8, ' ')} ${rnd(2, 48, 1)} ms  ttl=64`), '6/6 nodes reachable, 0% loss'],
  view_specs: () => ['TOOLCHAIN:', ...(about.toolchain || []).map((t) => `· ${t}`)],
  whoami: () => [`${settings.name} — ${settings.role}.`, 'Writes C for a living, Verilog for fun, and reads datasheets cover to cover.'],
  contact: () => {
    if (!settings.email) return ['contact channel offline — set Email in Site Settings'];
    if (typeof window !== 'undefined') window.location.href = `mailto:${settings.email}`;
    return [`OPENING MAILTO://${settings.email}`, settings.availability ? `AVAILABILITY . ${settings.availability}` : 'CHANNEL ...... ready'];
  },
  resume: () => {
    if (!settings.resume) return ['resume payload missing — set Resume URL in Site Settings'];
    openLink(settings.resume);
    return [`FETCHING RESUME · ${settings.resume}`, 'transfer initiated — check your downloads'];
  },
});

const QUICK = ['help', 'contact', 'resume', 'view_specs'];

export default function Terminal({ about, settings }) {
  const cmds = commands(about, settings);
  const [lines, setLines] = useState(() => [
    { k: 'out', t: 'BOOT v3.2.1 — secure bootloader verified ✓' },
    { k: 'cmd', t: 'read_sensors' },
    ...['TEMP ....... 38.2 °C', 'HUMIDITY ... 44.1 %RH', 'VIBRATION .. 0.021 g RMS', 'BUS VOLTAGE 3.31 V'].map((t) => ({ k: 'out', t })),
    { k: 'cmd', t: 'help' },
    ...cmds.help().map((t) => ({ k: 'out', t })),
  ]);
  const [val, setVal] = useState('');
  const [hist, setHist] = useState([]);
  const [hi, setHi] = useState(-1);
  const body = useRef(null);
  const input = useRef(null);

  useEffect(() => {
    if (body.current) body.current.scrollTop = body.current.scrollHeight;
  }, [lines]);

  const run = (raw) => {
    const c = raw.trim().toLowerCase();
    if (!c) return;
    setHist((h) => [c, ...h]);
    setHi(-1);
    if (c === 'clear') { setLines([]); return; }
    const out = cmds[c] ? cmds[c]() : [`command not found: ${c}`, "type 'help' for available commands"];
    setLines((l) => [...l, { k: 'cmd', t: c }, ...out.map((t) => ({ k: cmds[c] ? 'out' : 'err', t }))]);
  };

  const onKey = (e) => {
    if (e.key === 'Enter') { run(val); setVal(''); }
    if (e.key === 'ArrowUp' && hist.length) { const n = Math.min(hi + 1, hist.length - 1); setHi(n); setVal(hist[n]); e.preventDefault(); }
    if (e.key === 'ArrowDown') { const n = Math.max(hi - 1, -1); setHi(n); setVal(n < 0 ? '' : hist[n]); }
  };

  return (
    <div data-testid="about-terminal" className="cut frame bg-mint/30 shadow-[0_0_80px_-20px_rgba(52,211,153,0.25)]">
      <div className="cut bg-[#070B11]" onClick={() => input.current?.focus()}>
        <div className="flex items-center justify-between border-b border-line px-5 py-3.5">
          <div className="flex gap-2"><span className="h-2.5 w-2.5 rounded-full bg-volt" /><span className="h-2.5 w-2.5 rounded-full bg-amber" /><span className="h-2.5 w-2.5 rounded-full bg-mint" /></div>
          <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-slate-400">{(settings.name || 'user').split(' ')[0].toLowerCase()}@lab-01: ~/console</span>
        </div>
        <div ref={body} data-lenis-prevent data-testid="terminal-output" className="h-[300px] overflow-y-auto px-5 py-4 font-mono text-[12.5px] leading-6 [scrollbar-color:#1E2A3D_transparent] md:h-[340px]">
          {lines.map((l, i) => (
            <div key={i} className={l.k === 'cmd' ? 'font-bold text-cyan' : l.k === 'err' ? 'text-volt' : 'whitespace-pre-wrap text-slate-300'}>
              {l.k === 'cmd' ? `> ${l.t}` : l.t}
            </div>
          ))}
        </div>
        <div className="border-t border-line px-5 py-4">
          <div className="flex items-center gap-2 font-mono text-[13px]">
            <span className="text-cyan">&gt;</span>
            <input
              ref={input}
              data-testid="terminal-input"
              value={val}
              onChange={(e) => setVal(e.target.value)}
              onKeyDown={onKey}
              placeholder="type a command…"
              spellCheck={false}
              aria-label="Terminal command"
              className="flex-1 bg-transparent text-slate-100 caret-cyan outline-none placeholder:text-slate-500"
            />
            <span className="caret h-4 w-2 bg-cyan" />
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            {QUICK.map((q) => (
              <button key={q} data-testid={`terminal-quick-${q}`} onClick={() => run(q)} className="border border-line px-3 py-1.5 font-mono text-[11px] text-cyan transition-colors duration-300 hover:border-cyan hover:bg-cyan/10">
                {q}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
