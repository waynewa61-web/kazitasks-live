// Tasker Directory, Tasker Profile, Services, Service detail, Hire flow, Saved

function DirectoryScreen() {
  const kt = useKT();
  const [cat, setCat] = React.useState('All');
  const [onlyReady, setOnlyReady] = React.useState(false);
  const [near, setNear] = React.useState(false);
  const cats = ['All', 'Design', 'Electrical', 'Plumbing', 'Cleaning', 'Development', 'Photography'];
  const map = { Design: 'Design', Electrical: 'Electric', Plumbing: 'Plumb', Cleaning: 'Clean', Development: 'Develop|Web', Photography: 'Photo' };
  const list = KT_TASKERS.filter((t) => (cat === 'All' || new RegExp(map[cat], 'i').test(t.title)) && (!onlyReady || t.status === 'ready') && (!near || !/km/.test(t.dist) || parseFloat(t.dist) < 6));
  return (
    <>
      <TopBar title="Find Taskers" sub="8,214 verified professionals" />
      <div className="scroller" data-screen-label="Tasker Directory">
        <div className="content">
          <button className="searchbar" onClick={() => kt.go('search')}><Icon n="search" s={18} />Name, skill or service</button>
          <div className="row" style={{ gap: 8, marginTop: 12, overflowX: 'auto', scrollbarWidth: 'none' }}>
            <button className={'chip' + (near ? ' on' : '')} onClick={() => setNear(!near)}><Icon n="pin" s={14} />Near me</button>
            <button className={'chip' + (onlyReady ? ' on' : '')} onClick={() => setOnlyReady(!onlyReady)}><Icon n="shieldck" s={14} />Ready for work</button>
            <button className="chip"><Icon n="star" s={13} />4.5+</button>
            <button className="chip"><Icon n="globe" s={14} />Luganda</button>
          </div>
          <div className="row" style={{ gap: 18, marginTop: 14, overflowX: 'auto', scrollbarWidth: 'none', borderBottom: '1px solid var(--line)' }}>
            {cats.map((c) => <button key={c} onClick={() => setCat(c)} style={{ padding: '8px 0 10px', fontSize: 13.5, fontWeight: 700, color: cat === c ? 'var(--ink)' : 'var(--muted)', borderBottom: '2px solid ' + (cat === c ? 'var(--accent)' : 'transparent'), marginBottom: -1, whiteSpace: 'nowrap' }}>{c}</button>)}
          </div>
          <div className={kt.desk ? 'dgrid' : 'stack'} style={{ marginTop: 14 }}>{list.map((t) => <TaskerCard key={t.id} t={t} />)}</div>
          {!list.length && <Empty title="No Taskers match" body="Try removing a filter." />}
        </div>
      </div>
    </>
  );
}

function TaskerProfileScreen() {
  const kt = useKT();
  const t = taskerById(kt.params.id) || KT_TASKERS[0];
  const [tab, setTab] = React.useState('about');
  const svcs = KT_SERVICES.filter((s) => s.tasker === t.id);
  const canHire = t.status === 'ready';
  const reviews = [
    ['Mbabazi & Co.', 5, 'Fast and very professional. The logo was exactly what we wanted after one round of changes.', 'Sep 2026'],
    ['Ruth K.', 5, 'Great communication on WhatsApp and here. Delivered a day early.', 'Aug 2026'],
    ['Hilltop Primary', 4, 'Good work on our banners. Would hire again.', 'Jul 2026'],
  ];
  const actions = (
    <div className="row" style={{ gap: 8 }}>
      <button className="btn ghost" style={{ width: 52, padding: 0 }} onClick={() => kt.openChatWith(t.id)} aria-label="Message"><Icon n="chat" /></button>
      <button className="btn ghost grow" onClick={() => kt.go('postQuick', { tasker: t.id })}>Request custom work</button>
      <button className="btn primary grow" disabled={!canHire} onClick={() => kt.go('hire', { tasker: t.id })}>Hire</button>
    </div>
  );
  const header = (
    <div className="card" style={{ textAlign: 'center', paddingTop: 22 }}>
      <div style={{ display: 'inline-block' }}><Avatar name={t.name} color={t.color} size={84} online={t.online} sq={t.type !== 'Individual'} /></div>
      <h2 className="h-lg" style={{ marginTop: 12 }}>{t.name}</h2>
      <p className="t-sm">{t.title}</p>
      <div className="row" style={{ justifyContent: 'center', gap: 6, marginTop: 10 }}><EligBadge s={t.status} />{t.type !== 'Individual' && <span className="badge neutral">{t.type}</span>}</div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', marginTop: 18, borderTop: '1px solid var(--line-2)', paddingTop: 14 }}>
        <div><div className="money" style={{ fontSize: 17 }}>{t.rating.toFixed(1)}<span style={{ color: 'var(--accent)' }}>★</span></div><div className="t-xs">{t.reviews} reviews</div></div>
        <div style={{ borderLeft: '1px solid var(--line-2)', borderRight: '1px solid var(--line-2)' }}><div className="money" style={{ fontSize: 17 }}>{t.jobs}</div><div className="t-xs">Jobs done</div></div>
        <div><div className="money" style={{ fontSize: 17 }}>{t.resp}</div><div className="t-xs">Responds</div></div>
      </div>
      {!canHire && <div className="notice warn" style={{ marginTop: 14, textAlign: 'left' }}><Icon n="clock" s={18} /><span>{t.name.split(' ')[0]} can’t be hired yet — {t.status === 'pending' ? 'identity verification is pending' : 'their profile is still being completed'}. You can still message them.</span></div>}
    </div>
  );
  const body = (
    <>
      <div className="tabs" style={{ marginTop: 18 }}>
        {[['about', 'About'], ['services', `Services ${svcs.length}`], ['portfolio', 'Portfolio'], ['reviews', 'Reviews']].map(([v, l]) => <button key={v} className={tab === v ? 'on' : ''} onClick={() => setTab(v)}>{l}</button>)}
      </div>
      <div style={{ paddingTop: 16 }}>
        {tab === 'about' && <div className="stack" style={{ gap: 18 }}>
          <p className="t-sm pretty" style={{ fontSize: 14 }}>{t.about}</p>
          <div className="list">
            <div className="li" style={{ cursor: 'default' }}><Icon n="pin" s={18} style={{ color: 'var(--muted)' }} /><span className="grow t-sm">{t.loc}</span><span className="t-xs">{t.dist}</span></div>
            <div className="li" style={{ cursor: 'default' }}><Icon n="clock" s={18} style={{ color: 'var(--muted)' }} /><span className="grow t-sm">{t.avail}</span></div>
            <div className="li" style={{ cursor: 'default' }}><Icon n="globe" s={18} style={{ color: 'var(--muted)' }} /><span className="grow t-sm">{t.langs.join(', ')}</span></div>
            <div className="li" style={{ cursor: 'default' }}><Icon n="id" s={18} style={{ color: 'var(--muted)' }} /><span className="grow t-sm">Identity {t.status === 'pending' ? 'pending' : 'verified'} · Member since {t.since}</span></div>
          </div>
          <div><div className="eyebrow" style={{ marginBottom: 8 }}>Skills</div><div className="row wrap" style={{ gap: 6 }}>{t.skills.map((s) => <span key={s} className="chip sm">{s}</span>)}</div></div>
          <button className="card row click" style={{ gap: 12, textAlign: 'left' }} onClick={() => kt.toast('Profile link copied')}>
            <Icon n="share" s={18} style={{ color: 'var(--navy)' }} /><span className="grow mono" style={{ fontSize: 12.5, color: 'var(--ink-2)' }}>kazitaskshr.com/@{t.name.split(' ')[0].toLowerCase()}</span><span className="link">Copy</span>
          </button>
        </div>}
        {tab === 'services' && (svcs.length ? <div className="grid2">{svcs.map((s) => <ServiceCard key={s.id} s={s} />)}</div> : <Empty icon="layers" title="No published services" body="Request custom work instead." />)}
        {tab === 'portfolio' && <div className="grid2">{['Bakery rebrand', 'School banners', 'Juice packaging', 'NGO report'].map((p) => <div key={p}><div className="ph" style={{ aspectRatio: '4/3' }}>portfolio image</div><div className="t-xs" style={{ marginTop: 6, fontWeight: 600, color: 'var(--ink-2)' }}>{p}</div></div>)}</div>}
        {tab === 'reviews' && <div className="stack">{reviews.map(([n, r, b, d]) => <div key={n} className="card"><div className="row between"><span className="h-sm">{n}</span><span className="t-xs">{d}</span></div><div style={{ color: 'var(--accent)', fontSize: 13, marginTop: 2 }}>{'★'.repeat(r)}<span style={{ color: 'var(--line)' }}>{'★'.repeat(5 - r)}</span></div><p className="t-sm" style={{ marginTop: 6 }}>{b}</p></div>)}</div>}
      </div>
    </>
  );
  return (
    <>
      <TopBar title="" right={<><button className="iconbtn" onClick={() => kt.toggleSave(t.id)}><svg width="20" height="20" viewBox="0 0 24 24" fill={kt.saved.has(t.id) ? 'var(--accent)' : 'none'} stroke={kt.saved.has(t.id) ? 'var(--accent)' : 'currentColor'} strokeWidth="1.8"><path d="M7 3h10v18l-5-4-5 4z" /></svg></button><button className="iconbtn" onClick={() => kt.toast('Profile link copied')}><Icon n="share" /></button></>} />
      {kt.desk ? (
        <div className="scroller" data-screen-label="Tasker Profile"><div className="content"><div className="dsplit"><div>{body}</div><div className="side stack">{header}{actions}</div></div></div></div>
      ) : (
        <>
          <div className="scroller" data-screen-label="Tasker Profile"><div className="content">{header}{body}</div></div>
          <div style={{ padding: '12px 16px 26px', background: 'var(--surface)', borderTop: '1px solid var(--line)' }}>{actions}</div>
        </>
      )}
    </>
  );
}

function ServicesScreen() {
  const kt = useKT();
  const [cat, setCat] = React.useState('All');
  const list = KT_SERVICES.filter((s) => cat === 'All' || s.cat === cat);
  return (
    <>
      <TopBar title={kt.params.mine ? 'My Services' : 'Ready-to-Hire Services'} />
      <div className="scroller" data-screen-label="Services">
        <div className="content">
          {kt.params.mine && <div className="notice navy" style={{ marginBottom: 14 }}><Icon n="sparkle" s={18} /><span>Publish what you’re ready to do, with a starting price. Clients can hire you directly or request custom work.</span></div>}
          <div className="row" style={{ gap: 8, overflowX: 'auto', scrollbarWidth: 'none', marginBottom: 14 }}>{['All', 'Design', 'Electrical', 'Plumbing', 'Research', 'Development', 'Photography'].map((c) => <button key={c} className={'chip' + (cat === c ? ' on' : '')} onClick={() => setCat(c)}>{c}</button>)}</div>
          <div className={kt.desk ? 'dgrid' : 'grid2'}>{list.map((s) => <ServiceCard key={s.id} s={s} />)}</div>
        </div>
      </div>
    </>
  );
}

function ServiceDetailScreen() {
  const kt = useKT();
  const s = KT_SERVICES.find((x) => x.id === kt.params.id) || KT_SERVICES[0];
  const t = taskerById(s.tasker);
  const actions = (
    <div className="row" style={{ gap: 8 }}>
      <button className="btn ghost grow" onClick={() => kt.go('postQuick', { tasker: t.id, cat: s.cat, desc: `Based on your service “${s.title}”: ` })}>Request custom work</button>
      <button className="btn primary grow" onClick={() => kt.go('hire', { tasker: t.id, title: s.title, amount: s.from, service: true })}>Hire this service</button>
    </div>
  );
  return (
    <>
      <TopBar title="" right={<button className="iconbtn" onClick={() => kt.toggleSave(s.id)}><svg width="20" height="20" viewBox="0 0 24 24" fill={kt.saved.has(s.id) ? 'var(--accent)' : 'none'} stroke={kt.saved.has(s.id) ? 'var(--accent)' : 'currentColor'} strokeWidth="1.8"><path d="M7 3h10v18l-5-4-5 4z" /></svg></button>} />
      <div className="scroller" data-screen-label="Service Detail">
        <div className={'content' + (kt.desk ? ' narrow' : '')}>
          <div className="ph" style={{ height: 190, borderRadius: 'var(--r)' }}>service cover / portfolio</div>
          <div className="row" style={{ gap: 6, marginTop: 8 }}>{[1, 2, 3].map((i) => <div key={i} className="ph" style={{ flex: 1, height: 52 }}>img</div>)}</div>
          <span className="badge neutral" style={{ marginTop: 16 }}>{s.cat}</span>
          <h2 className="h-lg pretty" style={{ marginTop: 8 }}>{s.title}</h2>
          <div className="card" style={{ marginTop: 14, display: 'grid', gridTemplateColumns: '1fr 1fr 1fr' }}>
            <div><div className="t-xs">Starting at</div><Money v={s.from} size={15} /></div>
            <div><div className="t-xs">Delivery</div><div className="h-sm">{s.days} day{s.days > 1 ? 's' : ''}</div></div>
            <div><div className="t-xs">Where</div><div className="h-sm">{s.mode}</div></div>
          </div>
          <p className="t-sm pretty" style={{ marginTop: 16, fontSize: 14 }}>{s.desc}</p>
          <div className="sechead"><h3 className="h-sm">Offered by</h3></div>
          <button className="card row click" style={{ gap: 12, textAlign: 'left', width: '100%' }} onClick={() => kt.go('tasker', { id: t.id })}>
            <Avatar name={t.name} color={t.color} size={44} online={t.online} sq={t.type !== 'Individual'} />
            <div className="grow"><div className="h-sm">{t.name}</div><div className="row" style={{ gap: 8, marginTop: 3 }}><Stars r={t.rating} n={t.reviews} /><EligBadge s={t.status} short /></div></div>
            <button className="iconbtn" onClick={(e) => { e.stopPropagation(); kt.openChatWith(t.id); }}><Icon n="chat" /></button>
          </button>
          {kt.desk && <div style={{ marginTop: 20 }}>{actions}</div>}
        </div>
      </div>
      {!kt.desk && <div style={{ padding: '12px 16px 26px', background: 'var(--surface)', borderTop: '1px solid var(--line)' }}>{actions}</div>}
    </>
  );
}

// ---------- Hire flow: confirm → secure payment (PIN) → started ----------
function HireScreen() {
  const kt = useKT();
  const t = taskerById(kt.params.tasker) || KT_TASKERS[0];
  const title = kt.params.title || 'Logo for our new bakery';
  const amount = kt.params.amount || t.from;
  const [stage, setStage] = React.useState('confirm'); // confirm | pin | done
  const [src, setSrc] = React.useState(kt.wallet.available >= amount ? 'wallet' : 'momo');
  const enough = kt.wallet.available >= amount;
  return (
    <>
      <TopBar title={stage === 'done' ? '' : 'Hire & secure payment'} back={stage !== 'done'} />
      <div className="scroller" data-screen-label="Hire">
        <div className={'content' + (kt.desk ? ' narrow' : '')}>
          {stage !== 'done' ? (
            <>
              <div className="card row" style={{ gap: 12 }}>
                <Avatar name={t.name} color={t.color} size={44} sq={t.type !== 'Individual'} />
                <div className="grow"><div className="h-sm">{t.name}</div><div className="t-xs">{title}</div></div>
                <EligBadge s={t.status} short />
              </div>
              <div className="card sec">
                <div className="eyebrow">How your payment is protected</div>
                <MoneyJourney step={0} payee={t.name.split(' ')[0]} />
                <p className="t-sm pretty" style={{ marginTop: 8 }}>Your money is held by KaziTasks — {t.name.split(' ')[0]} can see it’s secured, but is paid only after you approve the work.</p>
              </div>
              <div className="card sec">
                <div className="kv"><span>Agreed amount</span><Money v={amount} size={14} /></div>
                <div className="kv"><span>Service charge</span><span className="money" style={{ fontSize: 14 }}>0</span></div>
                <div className="kv total"><span>To secure now</span><Money v={amount} size={17} /></div>
              </div>
              <div className="eyebrow" style={{ margin: '20px 0 8px' }}>Pay from</div>
              <div className="stack" style={{ gap: 8 }}>
                <button className={'opt' + (src === 'wallet' ? ' on' : '')} onClick={() => enough && setSrc('wallet')} style={!enough ? { opacity: .55 } : null}><span className="radio" /><div className="grow"><div className="h-sm">KaziTasks Wallet</div><div className="t-xs">Available UGX {ugx(kt.wallet.available)}{!enough && ' · not enough'}</div></div><Icon n="wallet" style={{ color: 'var(--navy)' }} /></button>
                <button className={'opt' + (src === 'momo' ? ' on' : '')} onClick={() => setSrc('momo')}><span className="radio" /><div className="grow"><div className="h-sm">Mobile Money</div><div className="t-xs">MTN MoMo •••903 · confirm on your phone</div></div><Icon n="phone" style={{ color: 'var(--navy)' }} /></button>
              </div>
              <button className="btn primary block" style={{ marginTop: 22 }} onClick={() => setStage('pin')}><Icon n="lock" s={18} />Secure UGX {ugx(amount)} & hire</button>
              <p className="t-xs" style={{ textAlign: 'center', marginTop: 10 }}>Changes or disputes? Funds stay secured until resolved.</p>
            </>
          ) : (
            <div style={{ textAlign: 'center', paddingTop: 20 }}>
              <div style={{ width: 72, height: 72, borderRadius: '50%', background: 'var(--ok-bg)', color: 'var(--ok)', display: 'grid', placeItems: 'center', margin: '0 auto' }}><Icon n="check" s={36} w={2.4} /></div>
              <h2 className="h-xl" style={{ marginTop: 18 }}>{t.name.split(' ')[0]} is hired</h2>
              <p className="t-sm pretty" style={{ marginTop: 6, maxWidth: 300, marginInline: 'auto' }}>UGX {ugx(amount)} is secured. {t.name.split(' ')[0]} has been notified and can start now.</p>
              <div className="card" style={{ marginTop: 20, textAlign: 'left' }}><MoneyJourney step={1} payee={t.name.split(' ')[0]} /></div>
              <div className="stack" style={{ marginTop: 20 }}>
                <button className="btn primary block" onClick={() => kt.openChatWith(t.id, true)}>Message {t.name.split(' ')[0]}</button>
                <button className="btn ghost block" onClick={() => kt.reset('work')}>Go to My work</button>
              </div>
            </div>
          )}
        </div>
      </div>
      {stage === 'pin' && <Sheet onClose={() => setStage('confirm')}><PinPad sub={`Secure UGX ${ugx(amount)} for ${t.name}`} onDone={() => { kt.lockEscrow(amount, src); setStage('done'); }} /></Sheet>}
    </>
  );
}

function SavedScreen() {
  const kt = useKT();
  const w = KT_WORK.filter((x) => kt.saved.has(x.id));
  const s = KT_SERVICES.filter((x) => kt.saved.has(x.id));
  const t = KT_TASKERS.filter((x) => kt.saved.has(x.id));
  return (
    <>
      <TopBar title="Saved for later" />
      <div className="scroller" data-screen-label="Saved">
        <div className="content">
          {!w.length && !s.length && !t.length && <Empty icon="bookmark" title="Nothing saved yet" body="Tap the bookmark on work, services or Taskers to keep them here." />}
          {w.length > 0 && <><div className="sechead" style={{ marginTop: 4 }}><h3 className="h-sm">Work</h3></div><div className="stack">{w.map((x) => <WorkCard key={x.id} w={x} />)}</div></>}
          {s.length > 0 && <><div className="sechead"><h3 className="h-sm">Services</h3></div><div className="grid2">{s.map((x) => <ServiceCard key={x.id} s={x} />)}</div></>}
          {t.length > 0 && <><div className="sechead"><h3 className="h-sm">Taskers</h3></div><div className="stack">{t.map((x) => <TaskerCard key={x.id} t={x} />)}</div></>}
        </div>
      </div>
    </>
  );
}

Object.assign(window, { DirectoryScreen, TaskerProfileScreen, ServicesScreen, ServiceDetailScreen, HireScreen, SavedScreen });
