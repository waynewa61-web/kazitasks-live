// Shared UI primitives for KaziTasks
const KTCtx = React.createContext(null);
const useKT = () => React.useContext(KTCtx);

const ICONS = {
  home: 'M3 10.5 12 3l9 7.5V20a1 1 0 0 1-1 1h-5v-6h-6v6H4a1 1 0 0 1-1-1z',
  work: 'M4 7h16a1 1 0 0 1 1 1v11a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V8a1 1 0 0 1 1-1zM9 7V5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2M3 12.5h18',
  plus: 'M12 5v14M5 12h14',
  chat: 'M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.6A8 8 0 1 1 21 12z',
  user: 'M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM4 21a8 8 0 0 1 16 0',
  search: 'M11 18a7 7 0 1 0 0-14 7 7 0 0 0 0 14zM20 20l-4-4',
  bell: 'M6 9a6 6 0 1 1 12 0c0 6 2.5 7.5 2.5 7.5h-17S6 15 6 9zM10 20a2 2 0 0 0 4 0',
  back: 'M15 5l-7 7 7 7',
  chev: 'M9 6l6 6-6 6',
  down: 'M6 9l6 6 6-6',
  close: 'M6 6l12 12M18 6 6 18',
  check: 'M5 12.5l4.5 4.5L19 7.5',
  shield: 'M12 3l8 3v6c0 4.5-3.4 8.3-8 9-4.6-.7-8-4.5-8-9V6z',
  shieldck: 'M12 3l8 3v6c0 4.5-3.4 8.3-8 9-4.6-.7-8-4.5-8-9V6zM8.5 12l2.5 2.5 4.5-5',
  wallet: 'M4 7h15a1 1 0 0 1 1 1v11a1 1 0 0 1-1 1H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h12v3M16 13.5h.01',
  lock: 'M6 11h12v9H6zM8.5 11V8a3.5 3.5 0 0 1 7 0v3',
  pin: 'M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21zM12 12a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z',
  star: 'M12 3.5l2.6 5.4 5.9.8-4.3 4.1 1 5.8L12 16.8l-5.2 2.8 1-5.8L3.5 9.7l5.9-.8z',
  clock: 'M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM12 7v5l3 2',
  cal: 'M4 6h16v14H4zM4 10h16M8 3v4M16 3v4',
  file: 'M6 3h8l4 4v14H6zM14 3v4h4',
  clip: 'M20 11.5l-8 8a5 5 0 0 1-7-7l8.5-8.5a3.5 3.5 0 0 1 5 5L10 17.5a2 2 0 0 1-3-3l7.5-7.5',
  send: 'M4 12l16-8-6 17-3-7z',
  filter: 'M4 6h16M7 12h10M10 18h4',
  bookmark: 'M7 3h10v18l-5-4-5 4z',
  share: 'M12 4v11M7.5 8.5 12 4l4.5 4.5M5 13v6h14v-6',
  gift: 'M4 10h16v10H4zM3 7h18v3H3zM12 7v13M12 7S10.5 3 8 3.8 8 7 12 7zm0 0s1.5-4 4-3.2S16 7 12 7z',
  crown: 'M4 18h16l1-10-5 4-4-7-4 7-5-4z',
  globe: 'M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM3 12h18M12 3c2.5 2.5 3.5 5.5 3.5 9s-1 6.5-3.5 9c-2.5-2.5-3.5-5.5-3.5-9s1-6.5 3.5-9z',
  id: 'M3 6h18v12H3zM8.5 13a2 2 0 1 0 0-4 2 2 0 0 0 0 4zM5.5 16a3 3 0 0 1 6 0M14 10h4M14 13h4',
  camera: 'M4 8h3l2-3h6l2 3h3v11H4zM12 16.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z',
  up: 'M12 19V5M6 11l6-6 6 6',
  dn: 'M12 5v14M6 13l6 6 6-6',
  swap: 'M7 4 3 8l4 4M3 8h14M17 20l4-4-4-4M21 16H7',
  eye: 'M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12zM12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z',
  eyeoff: 'M3 3l18 18M10.6 5.1A10 10 0 0 1 12 5c6.4 0 10 7 10 7a17 17 0 0 1-3 3.8M6.6 6.6C3.7 8.4 2 12 2 12s3.6 7 10 7c1.6 0 3-.4 4.3-1',
  bolt: 'M13 3 5 13.5h6L10 21l8-10.5h-6z',
  layers: 'M12 3 3 8l9 5 9-5zM3 13l9 5 9-5',
  users: 'M9 11a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7zM2.5 20a6.5 6.5 0 0 1 13 0M16 4.3a3.5 3.5 0 0 1 0 6.4M18 14.2a6.5 6.5 0 0 1 3.5 5.8',
  settings: 'M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-2.9 1.2V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-2.9-1.2l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1A1.7 1.7 0 0 0 3 14H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.2-2.9l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1A1.7 1.7 0 0 0 10 3V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 2.9 1.2l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1A1.7 1.7 0 0 0 21 10h.1a2 2 0 1 1 0 4z',
  more: 'M5 12h.01M12 12h.01M19 12h.01',
  phone: 'M7 3h10v18H7zM11 18h2',
  copy: 'M8 8h12v12H8zM4 16V4h12',
  reply: 'M9 7 4 12l5 5M4 12h11a5 5 0 0 1 5 5v2',
  trash: 'M4 7h16M9 7V4h6v3M6 7l1 14h10l1-14',
  flag: 'M5 21V4h11l-1.5 4L16 12H5',
  revise: 'M4 12a8 8 0 0 1 14-5.3M20 4v4h-4M20 12a8 8 0 0 1-14 5.3M4 20v-4h4',
  sparkle: 'M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z',
  map: 'M3 6l6-3 6 3 6-3v15l-6 3-6-3-6 3zM9 3v15M15 6v15',
  logout: 'M15 4h4v16h-4M10 8l-4 4 4 4M6 12h10',
  ticks: 'M2 12.5l4 4L15 7M10 15.5l1 1L21 7',
  tick: 'M5 12.5l4.5 4.5L19 7.5',
  mic: 'M12 3a3 3 0 0 1 3 3v6a3 3 0 0 1-6 0V6a3 3 0 0 1 3-3zM5 11a7 7 0 0 0 14 0M12 18v3',
  briefcase: 'M4 7h16v13H4zM9 7V4h6v3',
  doc: 'M6 3h12v18H6zM9 8h6M9 12h6M9 16h4',
};
function Icon({ n, s = 20, w = 1.8, style, className }) {
  const filled = n === 'star';
  return (
    <svg width={s} height={s} viewBox="0 0 24 24" fill={filled ? 'currentColor' : 'none'} stroke={filled ? 'none' : 'currentColor'} strokeWidth={w} strokeLinecap="round" strokeLinejoin="round" style={style} className={className} aria-hidden="true">
      <path d={ICONS[n] || ''} />
    </svg>
  );
}

function Avatar({ name, color = '#2A3458', size = 40, online, sq }) {
  return (
    <div className={'av' + (sq ? ' sq' : '')} style={{ width: size, height: size, background: color, fontSize: size * 0.36 }}>
      {initials(name)}
      {online && <span className="online" />}
    </div>
  );
}

function Money({ v, size = 16, cur = true, color, sign }) {
  return (
    <span className="money" style={{ fontSize: size, color }}>
      {cur && <small>UGX</small>}{sign && v > 0 ? '+' : ''}{ugx(v)}
    </span>
  );
}

function Stars({ r, n }) {
  return <span className="stars"><Icon n="star" s={13} />{r.toFixed(1)}{n != null && <span className="t-mut" style={{ fontWeight: 500 }}>({n})</span>}</span>;
}

const ELIG = {
  ready: { label: 'Verified · Ready for Work', cls: 'ok', short: 'Verified' },
  profile: { label: 'Verified · Profile Incomplete', cls: 'warn', short: 'Profile incomplete' },
  incomplete: { label: 'Verified · Profile Incomplete', cls: 'warn', short: 'Profile incomplete' },
  pending: { label: 'Verification Pending', cls: 'info', short: 'Pending' },
  unverified: { label: 'Identity Not Verified', cls: 'neutral', short: 'Not verified' },
};
function EligBadge({ s, short }) {
  const e = ELIG[s] || ELIG.unverified;
  return <span className={'badge ' + e.cls}>{(s === 'ready' || s === 'profile' || s === 'incomplete') && <Icon n="shieldck" s={12} w={2.2} />}{short ? e.short : e.label}</span>;
}

function TopBar({ title, sub, back = true, right, line, transparent, style }) {
  const kt = useKT();
  return (
    <div className={'topbar' + (line ? ' sticky-line' : '')} style={{ ...(transparent ? { background: 'transparent' } : {}), ...style }}>
      {back && <button className="iconbtn" onClick={kt.back} aria-label="Back" style={{ marginLeft: -8 }}><Icon n="back" s={22} /></button>}
      <div className="grow" style={{ minWidth: 0 }}>
        {title && <h1>{title}</h1>}
        {sub && <div className="sub">{sub}</div>}
      </div>
      {right}
    </div>
  );
}

function Sheet({ onClose, children, title }) {
  return (
    <>
      <div className="scrim" onClick={onClose} />
      <div className="sheet" role="dialog">
        <div className="grab" />
        <div className="sbody">
          {title && <div className="row between" style={{ marginBottom: 12 }}><h2 className="h-lg">{title}</h2><button className="iconbtn" onClick={onClose} style={{ marginRight: -8 }}><Icon n="close" /></button></div>}
          {children}
        </div>
      </div>
    </>
  );
}

function Seg({ value, options, onChange }) {
  return <div className="seg">{options.map(([v, l]) => <button key={v} className={value === v ? 'on' : ''} onClick={() => onChange(v)}>{l}</button>)}</div>;
}

function Chips({ options, value = [], onChange, multi = true }) {
  const toggle = (o) => {
    if (!multi) return onChange(o);
    onChange(value.includes(o) ? value.filter((x) => x !== o) : [...value, o]);
  };
  return <div className="row wrap" style={{ gap: 8 }}>{options.map((o) => {
    const on = multi ? value.includes(o) : value === o;
    return <button key={o} className={'chip sm' + (on ? ' on' : '')} onClick={() => toggle(o)}>{on && multi && <Icon n="check" s={13} w={2.5} />}{o}</button>;
  })}</div>;
}

// Multi-select with search → removable chips
function ChipPicker({ label, options, value, onChange, placeholder = 'Search…' }) {
  const [q, setQ] = React.useState('');
  const [open, setOpen] = React.useState(false);
  const matches = options.filter((o) => !value.includes(o) && o.toLowerCase().includes(q.toLowerCase())).slice(0, 6);
  return (
    <div className="field">
      {label && <label>{label}</label>}
      {value.length > 0 && <div className="row wrap" style={{ gap: 6 }}>{value.map((v) => <span key={v} className="chip sm on">{v}<button className="x" onClick={() => onChange(value.filter((x) => x !== v))}><Icon n="close" s={12} w={2.4} /></button></span>)}</div>}
      <div className="inputwrap"><Icon n="search" s={18} /><input className="input" placeholder={placeholder} value={q} onFocus={() => setOpen(true)} onBlur={() => setTimeout(() => setOpen(false), 150)} onChange={(e) => { setQ(e.target.value); setOpen(true); }} /></div>
      {open && (
        <div className="list" style={{ marginTop: -2 }}>
          {matches.map((m) => <button key={m} className="li" onMouseDown={() => { onChange([...value, m]); setQ(''); }}><span className="grow" style={{ fontSize: 14 }}>{m}</span><Icon n="plus" s={16} /></button>)}
          {q && !options.some((o) => o.toLowerCase() === q.toLowerCase()) && <button className="li" onMouseDown={() => { onChange([...value, q]); setQ(''); }}><span className="grow t-sm">Other: “{q}”</span><Icon n="plus" s={16} /></button>}
        </div>
      )}
    </div>
  );
}

function LocationPicker({ value, onChange, label = 'Location' }) {
  const [q, setQ] = React.useState(value || '');
  const [open, setOpen] = React.useState(false);
  React.useEffect(() => setQ(value || ''), [value]);
  const m = KT_PLACES.filter((p) => p.toLowerCase().includes(q.toLowerCase())).slice(0, 5);
  return (
    <div className="field">
      <label>{label}</label>
      <div className="inputwrap"><Icon n="pin" s={18} /><input className="input" value={q} placeholder="Search district, city or area" onFocus={() => setOpen(true)} onBlur={() => setTimeout(() => setOpen(false), 150)} onChange={(e) => { setQ(e.target.value); setOpen(true); }} /></div>
      {open && (
        <div className="list">
          <button className="li" onMouseDown={() => { onChange('Ntinda, Kampala'); setOpen(false); }}><Icon n="map" s={18} style={{ color: 'var(--info)' }} /><span className="grow" style={{ fontSize: 14, fontWeight: 600, color: 'var(--info)' }}>Use my current location</span></button>
          {m.map((p) => <button key={p} className="li" onMouseDown={() => { onChange(p); setOpen(false); }}><Icon n="pin" s={16} style={{ color: 'var(--faint)' }} /><span className="grow" style={{ fontSize: 14 }}>{p}</span></button>)}
        </div>
      )}
    </div>
  );
}

// PIN entry (4 digits, masked, reveal toggle)
function PinPad({ onDone, label = 'Enter your Wallet PIN', sub }) {
  const [pin, setPin] = React.useState('');
  const [show, setShow] = React.useState(false);
  const press = (d) => {
    if (pin.length >= 4) return;
    const p = pin + d; setPin(p);
    if (p.length === 4) setTimeout(() => onDone(p), 280);
  };
  return (
    <div>
      <div style={{ textAlign: 'center' }}>
        <div style={{ width: 48, height: 48, borderRadius: 14, background: 'color-mix(in oklch, var(--navy) 8%, white)', color: 'var(--navy)', display: 'grid', placeItems: 'center', margin: '0 auto 10px' }}><Icon n="lock" s={22} /></div>
        <h3 className="h-md">{label}</h3>
        {sub && <p className="t-xs" style={{ marginTop: 4 }}>{sub}</p>}
      </div>
      <div className="pindots">{[0, 1, 2, 3].map((i) => <i key={i} className={(pin[i] ? 'f' : '') + (show ? '' : ' m')}>{show ? pin[i] : ''}</i>)}</div>
      <div style={{ textAlign: 'center' }}><button className="link t-xs" onClick={() => setShow(!show)} style={{ display: 'inline-flex', gap: 5, alignItems: 'center' }}><Icon n={show ? 'eyeoff' : 'eye'} s={14} />{show ? 'Hide PIN' : 'Show PIN'}</button></div>
      <div className="pinpad">
        {['1', '2', '3', '4', '5', '6', '7', '8', '9'].map((d) => <button key={d} onClick={() => press(d)}>{d}</button>)}
        <button style={{ fontSize: 13, background: 'transparent' }} className="t-mut">Forgot?</button>
        <button onClick={() => press('0')}>0</button>
        <button onClick={() => setPin(pin.slice(0, -1))} style={{ background: 'transparent' }}><Icon n="back" s={20} /></button>
      </div>
    </div>
  );
}

// Escrow "money journey" — novel touch, shown only at key moments
function MoneyJourney({ step = 1, amount, payee = 'Tasker', compact }) {
  const nodes = [
    { ic: 'wallet', b: 'Your Wallet', s: 'Available' },
    { ic: 'lock', b: 'Secured', s: 'Held safely' },
    { ic: 'check', b: 'Approved', s: 'You confirm' },
    { ic: 'user', b: payee, s: 'Gets paid' },
  ];
  const pct = (step / (nodes.length - 1)) * 100;
  return (
    <div className="journey" style={compact ? { paddingTop: 6 } : null}>
      <div className="track" style={compact ? { top: 26 } : null}>
        <div className="fill" style={{ width: pct + '%' }} />
        <div className="token" style={{ left: pct + '%' }}>Ush</div>
      </div>
      <div className="nodes">
        {nodes.map((n, i) => (
          <div key={i} className={'node' + (i <= step ? ' on' : '') + (i === step ? ' cur' : '')}>
            <div className="ic"><Icon n={n.ic} s={18} /></div>
            <b>{n.b}</b>
            {!compact && <span>{n.s}</span>}
          </div>
        ))}
      </div>
    </div>
  );
}

function Empty({ icon = 'search', title, body, action }) {
  return <div className="empty"><div className="ic"><Icon n={icon} s={24} /></div><div className="h-sm" style={{ color: 'var(--ink)' }}>{title}</div>{body && <p style={{ marginTop: 4 }}>{body}</p>}{action && <div style={{ marginTop: 14 }}>{action}</div>}</div>;
}

function KindBadge({ kind }) {
  return kind === 'project'
    ? <span className="badge navy"><Icon n="layers" s={11} w={2.2} />Project</span>
    : <span className="badge acc"><Icon n="bolt" s={11} w={2.2} />Quick Task</span>;
}

Object.assign(window, { KTCtx, useKT, Icon, Avatar, Money, Stars, EligBadge, ELIG, TopBar, Sheet, Seg, Chips, ChipPicker, LocationPicker, PinPad, MoneyJourney, Empty, KindBadge });
