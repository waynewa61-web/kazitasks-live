// Cards used across discovery surfaces
function WorkCard({ w, compact }) {
  const kt = useKT();
  const saved = kt.saved.has(w.id);
  return (
    <div className="card click" onClick={() => kt.go('workDetail', { id: w.id })} style={compact ? { width: 280, flex: 'none' } : null}>
      <div className="row between" style={{ marginBottom: 8 }}>
        <div className="row" style={{ gap: 6 }}><KindBadge kind={w.kind} />{w.match > 85 && kt.role === 'tasker' && <span className="badge ok">{w.match}% match</span>}</div>
        <button className="iconbtn" style={{ width: 32, height: 32, margin: -6, color: saved ? 'var(--accent)' : 'var(--faint)' }} onClick={(e) => { e.stopPropagation(); kt.toggleSave(w.id); }} aria-label="Save for later">
          <svg width="18" height="18" viewBox="0 0 24 24" fill={saved ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"><path d="M7 3h10v18l-5-4-5 4z" /></svg>
        </button>
      </div>
      <div className="h-sm pretty" style={{ fontSize: 15, lineHeight: 1.35 }}>{w.title}</div>
      <div className="t-xs" style={{ marginTop: 4 }}>{w.client}{w.verified && <span style={{ color: 'var(--ok)', fontWeight: 600 }}> · Verified client</span>}</div>
      <div className="row wrap" style={{ gap: 12, marginTop: 10 }}>
        <span className="tag"><Icon n="pin" s={13} />{w.mode === 'Remote' ? 'Remote' : w.loc}</span>
        <span className="tag"><Icon n="cal" s={13} />{w.deadline}</span>
        {!compact && <span className="tag"><Icon n="users" s={13} />{w.applicants} applied</span>}
      </div>
      <div className="row between" style={{ marginTop: 12, paddingTop: 12, borderTop: '1px solid var(--line-2)' }}>
        <Money v={w.budget} size={16} />
        <span className="t-xs">{w.pricing} · {w.posted}</span>
      </div>
    </div>
  );
}

function TaskerCard({ t, compact }) {
  const kt = useKT();
  return (
    <div className="card click" onClick={() => kt.go('tasker', { id: t.id })} style={compact ? { width: 240, flex: 'none' } : null}>
      <div className="row" style={{ gap: 12, alignItems: 'flex-start' }}>
        <Avatar name={t.name} color={t.color} size={48} online={t.online} sq={t.type !== 'Individual'} />
        <div className="grow">
          <div className="h-sm" style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{t.name}</div>
          <div className="t-xs" style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{t.title}</div>
          <div className="row" style={{ gap: 8, marginTop: 5 }}><Stars r={t.rating} n={t.reviews} /><span className="t-xs">· {t.jobs} jobs</span></div>
        </div>
      </div>
      <div className="row wrap" style={{ gap: 6, marginTop: 12 }}>
        <EligBadge s={t.status} short />
        {t.type !== 'Individual' && <span className="badge neutral">{t.type}</span>}
      </div>
      <div className="row between" style={{ marginTop: 10 }}>
        <span className="tag"><Icon n="pin" s={13} />{t.loc.split(',')[0]} · {t.dist}</span>
        {!compact && <span className="tag" style={{ color: t.avail.startsWith('Booked') ? 'var(--muted)' : 'var(--ok)' }}>● {t.avail}</span>}
      </div>
      {!compact && (
        <div className="row" style={{ gap: 8, marginTop: 12 }}>
          <button className="btn ghost sm grow" onClick={(e) => { e.stopPropagation(); kt.openChatWith(t.id); }}><Icon n="chat" s={16} />Message</button>
          <button className="btn primary sm grow" onClick={(e) => { e.stopPropagation(); kt.go('hire', { tasker: t.id }); }}>Hire</button>
        </div>
      )}
    </div>
  );
}

function ServiceCard({ s, compact }) {
  const kt = useKT();
  const t = taskerById(s.tasker);
  return (
    <div className="card click" onClick={() => kt.go('service', { id: s.id })} style={{ padding: 0, overflow: 'hidden', ...(compact ? { width: 236, flex: 'none' } : {}) }}>
      <div className="ph" style={{ height: compact ? 104 : 130, borderRadius: 0 }}>{s.cat.toLowerCase()} portfolio image</div>
      <div style={{ padding: '12px 14px 14px' }}>
        <div className="row" style={{ gap: 8 }}>
          <Avatar name={t.name} color={t.color} size={22} sq={t.type !== 'Individual'} />
          <span className="t-xs grow" style={{ fontWeight: 600, color: 'var(--ink-2)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{t.name}</span>
          <Stars r={t.rating} />
        </div>
        <div className="h-sm pretty" style={{ marginTop: 8, lineHeight: 1.35, minHeight: 38 }}>{s.title}</div>
        <div className="row between" style={{ marginTop: 10 }}>
          <span className="t-xs">From <Money v={s.from} size={14} /></span>
          <span className="tag"><Icon n="clock" s={13} />{s.days}d</span>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { WorkCard, TaskerCard, ServiceCard });
