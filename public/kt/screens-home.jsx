// Home (Client + Tasker), Search, Notifications

function RoleSwitch() {
  const kt = useKT();
  return (
    <div className="seg" style={{ width: 196, background: kt.desk ? 'rgba(42,52,88,.06)' : 'rgba(255,255,255,.12)' }}>
      {[['client', 'Client'], ['tasker', 'Tasker']].map(([v, l]) => (
        <button key={v} className={kt.role === v ? 'on' : ''} onClick={() => kt.setRole(v)} style={kt.role !== v && !kt.desk ? { color: 'rgba(255,255,255,.75)' } : null}>{l}</button>
      ))}
    </div>
  );
}

function HomeHeader() {
  const kt = useKT();
  const unread = kt.notifs.filter((n) => n.unread).length;
  if (kt.desk) return null;
  return (
    <div className="navyband" style={{ paddingTop: 6 }}>
      <div className="row between" style={{ marginBottom: 16 }}>
        <RoleSwitch />
        <div className="row" style={{ gap: 2 }}>
          <button className="iconbtn" style={{ color: '#fff' }} onClick={() => kt.go('notifs')} aria-label="Notifications"><Icon n="bell" />{unread > 0 && <span className="dot" style={{ boxShadow: '0 0 0 2px var(--navy)' }} />}</button>
          <button onClick={() => kt.go('account')} style={{ marginLeft: 4 }}><Avatar name="Daniel Kato" color="#F7941D" size={34} /></button>
        </div>
      </div>
      <p style={{ fontSize: 14, opacity: .7, fontWeight: 500 }}>Good morning, Daniel</p>
      <h2 className="h-xl" style={{ marginTop: 2 }}>{kt.role === 'client' ? 'What do you need done?' : 'Ready for your next job?'}</h2>
      <button className="searchbar" style={{ marginTop: 16, border: 0 }} onClick={() => kt.go('search')}>
        <Icon n="search" s={19} />{kt.role === 'client' ? 'Try “plumber” or “logo design”' : 'Search work, skills, services'}
      </button>
    </div>
  );
}

function WalletStrip() {
  const kt = useKT();
  const w = kt.wallet;
  return (
    <div className="card click" onClick={() => kt.go('wallet')} style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
      <div style={{ width: 40, height: 40, borderRadius: 12, background: 'color-mix(in oklch, var(--navy) 8%, white)', color: 'var(--navy)', display: 'grid', placeItems: 'center' }}><Icon n="wallet" /></div>
      <div className="grow">
        <div className="t-xs">KaziTasks Wallet · Available</div>
        <Money v={w.available} size={18} />
      </div>
      {kt.role === 'client'
        ? <div style={{ textAlign: 'right' }}><div className="t-xs">Secured in escrow</div><div className="row" style={{ gap: 4, justifyContent: 'flex-end' }}><Icon n="lock" s={13} style={{ color: 'var(--muted)' }} /><Money v={w.escrow} size={13} cur={false} /></div></div>
        : <div style={{ textAlign: 'right' }}><div className="t-xs">Pending release</div><div className="row" style={{ gap: 4, justifyContent: 'flex-end' }}><Icon n="lock" s={13} style={{ color: 'var(--muted)' }} /><Money v={w.incoming} size={13} cur={false} /></div></div>}
      <Icon n="chev" s={18} style={{ color: 'var(--faint)' }} />
    </div>
  );
}

function ClientHome() {
  const kt = useKT();
  const proj = KT_MY_POSTS.find((p) => p.id === 'm2');
  const ms = kt.msState;
  const review = ms === 'submitted' || ms === 'resubmitted';
  return (
    <>
      {/* Post work */}
      <div className="grid2" style={{ marginTop: kt.desk ? 0 : -2 }}>
        <button className="card click" onClick={() => kt.go('postQuick')} style={{ textAlign: 'left' }}>
          <div style={{ width: 36, height: 36, borderRadius: 10, background: 'color-mix(in oklch, var(--accent) 18%, white)', color: 'color-mix(in oklch, var(--accent) 60%, black)', display: 'grid', placeItems: 'center' }}><Icon n="bolt" s={19} /></div>
          <div className="h-sm" style={{ marginTop: 12 }}>Quick Task</div>
          <div className="t-xs" style={{ marginTop: 2 }}>Repairs, cleaning, design, delivery</div>
        </button>
        <button className="card click" onClick={() => kt.go('postProject')} style={{ textAlign: 'left' }}>
          <div style={{ width: 36, height: 36, borderRadius: 10, background: 'color-mix(in oklch, var(--navy) 10%, white)', color: 'var(--navy)', display: 'grid', placeItems: 'center' }}><Icon n="layers" s={19} /></div>
          <div className="h-sm" style={{ marginTop: 12 }}>Project</div>
          <div className="t-xs" style={{ marginTop: 2 }}>Milestones, proposals, staged pay</div>
        </button>
      </div>

      {/* Needs attention */}
      <div className="sechead"><h3 className="h-md">Needs your attention</h3><a onClick={() => kt.go('work')}>My work</a></div>
      <div className="stack">
        {review && (
          <div className="card click" onClick={() => kt.go('milestone', { id: 'm2', idx: 0, side: 'client' })} style={{ borderColor: 'color-mix(in oklch, var(--accent) 50%, white)' }}>
            <div className="row" style={{ gap: 12 }}>
              <Avatar name="Joseph Mugisha" color="#3C4460" size={40} />
              <div className="grow">
                <div className="h-sm">Review milestone: Design</div>
                <div className="t-xs">{proj.title}</div>
              </div>
              <Money v={500000} size={14} />
            </div>
            <div className="row" style={{ gap: 8, marginTop: 12 }}>
              <button className="btn ghost sm grow" onClick={(e) => { e.stopPropagation(); kt.openChatWith('t5'); }}>Message</button>
              <button className="btn accent sm grow">Review work</button>
            </div>
          </div>
        )}
        <div className="list">
          <button className="li" onClick={() => kt.go('applicants', { id: 'm3' })}>
            <div style={{ width: 40, height: 40, borderRadius: 12, background: 'var(--info-bg)', color: 'var(--info)', display: 'grid', placeItems: 'center' }}><Icon n="users" s={19} /></div>
            <div className="grow"><div className="h-sm">6 applicants</div><div className="t-xs">Logo for our new bakery</div></div>
            <span className="count">3 new</span><Icon n="chev" s={18} className="chev" />
          </button>
          <button className="li" onClick={() => kt.go('jobDetail', { id: 'm1' })}>
            <Avatar name="Brian Okello" color="#1E7F74" size={40} />
            <div className="grow"><div className="h-sm">In progress · Due Wed</div><div className="t-xs">Rewire 3-bedroom house (partial)</div></div>
            <Icon n="chev" s={18} className="chev" />
          </button>
          {!review && (
            <button className="li" onClick={() => kt.go('project', { id: 'm2', side: 'client' })}>
              <Avatar name="Joseph Mugisha" color="#3C4460" size={40} />
              <div className="grow"><div className="h-sm">Project · Milestone 1</div><div className="t-xs">{proj.title}</div></div>
              <Icon n="chev" s={18} className="chev" />
            </button>
          )}
        </div>
      </div>

      <div className="sec"><WalletStrip /></div>

      <div className="sechead"><h3 className="h-md">Trusted Taskers near you</h3><a onClick={() => kt.go('directory')}>See all</a></div>
      <div className="hscroll">{KT_TASKERS.filter((t) => t.status === 'ready').slice(0, 5).map((t) => <TaskerCard key={t.id} t={t} compact />)}</div>

      <div className="sechead"><h3 className="h-md">Services you may need</h3><a onClick={() => kt.go('services')}>Browse</a></div>
      <div className="hscroll">{KT_SERVICES.slice(0, 5).map((s) => <ServiceCard key={s.id} s={s} compact />)}</div>

      <div className="sechead"><h3 className="h-md">Recent chats</h3><a onClick={() => kt.go('chats')}>All chats</a></div>
      <div className="list">{KT_CHATS.slice(0, 2).map((c) => <ChatRow key={c.id} c={c} />)}</div>
    </>
  );
}

function EligibilityCard() {
  const kt = useKT();
  const s = kt.elig;
  if (s === 'ready') return null;
  const conf = {
    unverified: { pct: 45, t: 'Verify your identity to start working', b: 'Clients can see your profile, but you can be hired only after identity verification and 90% profile completion.', cta: 'Verify identity' },
    pending: { pct: 82, t: 'We’re checking your ID', b: 'Usually under 24 hours. Meanwhile, finish your portfolio to reach 90%.', cta: 'Finish profile' },
    incomplete: { pct: 74, t: 'You’re verified — finish your profile', b: 'Reach 90% to apply for work. Add portfolio and work experience.', cta: 'Finish profile' },
  }[s];
  return (
    <div className="card" style={{ marginTop: kt.desk ? 0 : -2 }}>
      <div className="row between"><EligBadge s={s} /><span className="money" style={{ fontSize: 14 }}>{conf.pct}%</span></div>
      <div className="bar" style={{ marginTop: 10 }}><i style={{ width: conf.pct + '%' }} /></div>
      <div className="h-sm" style={{ marginTop: 12 }}>{conf.t}</div>
      <p className="t-sm pretty" style={{ marginTop: 3 }}>{conf.b}</p>
      <button className="btn primary sm" style={{ marginTop: 12 }} onClick={() => kt.go('finish')}>{conf.cta}</button>
    </div>
  );
}

function TaskerHome() {
  const kt = useKT();
  const recs = KT_WORK.filter((w) => w.match > 80);
  return (
    <>
      <EligibilityCard />
      <div className={kt.elig === 'ready' ? '' : 'sec'}><WalletStrip /></div>

      <div className="sechead"><h3 className="h-md">Your active work</h3><a onClick={() => kt.go('work')}>My work</a></div>
      <div className="list">
        <button className="li" onClick={() => kt.go('project', { id: 'j1', side: 'tasker' })}>
          <Avatar name="Kyaninga Foundation" color="#1E7F74" size={40} sq />
          <div className="grow"><div className="h-sm">Annual report design</div><div className="t-xs">Milestone 2 of 3 · Full layout · Due 18 Nov</div></div>
          <span className="badge info">In progress</span>
        </button>
        <button className="li" onClick={() => kt.go('jobDetail', { id: 'j2' })}>
          <Avatar name="Mama Rose" color="#B8572F" size={40} sq />
          <div className="grow"><div className="h-sm">Social media posters</div><div className="t-xs">Waiting for client approval</div></div>
          <span className="badge warn">Submitted</span>
        </button>
      </div>

      <div className="sechead"><h3 className="h-md">Recommended for you</h3><a onClick={() => kt.go('findWork')}>Find work</a></div>
      <p className="t-xs" style={{ marginTop: -6, marginBottom: 10 }}>Based on Graphic design, Print and Ntinda</p>
      <div className={kt.desk ? 'dgrid' : 'stack'}>{recs.slice(0, kt.desk ? 4 : 3).map((w) => <WorkCard key={w.id} w={w} />)}</div>

      <div className="sechead"><h3 className="h-md">My Services</h3><a onClick={() => kt.go('services', { mine: true })}>Manage</a></div>
      <div className="card row" style={{ gap: 12 }}>
        <div className="ph" style={{ width: 64, height: 52, flex: 'none' }}>logo kit</div>
        <div className="grow"><div className="h-sm">Logo + brand starter kit</div><div className="t-xs">From UGX 150,000 · 3 days · 214 views this week</div></div>
        <span className="badge ok">Live</span>
      </div>

      <div className="sechead"><h3 className="h-md">Grow your Kazi Network</h3></div>
      <div className="card row click" style={{ gap: 14 }} onClick={() => kt.go('referrals')}>
        <div style={{ width: 44, height: 44, borderRadius: 12, background: 'color-mix(in oklch, var(--accent) 18%, white)', color: 'color-mix(in oklch, var(--accent) 60%, black)', display: 'grid', placeItems: 'center', flex: 'none' }}><Icon n="gift" /></div>
        <div className="grow"><div className="h-sm">Invite people you trust</div><div className="t-xs">Earn up to 500 points for each active referral</div></div>
        <Icon n="chev" s={18} style={{ color: 'var(--faint)' }} />
      </div>
    </>
  );
}

function HomeScreen() {
  const kt = useKT();
  return (
    <div className="scroller" data-screen-label="Home">
      <HomeHeader />
      {kt.desk && (
        <div className="content" style={{ paddingTop: 28 }}>
          <p className="t-xs" style={{ fontSize: 14 }}>Good morning, Daniel</p>
          <h2 className="h-xl" style={{ marginTop: 2, marginBottom: 20 }}>{kt.role === 'client' ? 'What do you need done?' : 'Ready for your next job?'}</h2>
        </div>
      )}
      <div className="content" style={{ paddingTop: kt.desk ? 0 : 16 }}>
        {kt.role === 'client' ? <ClientHome /> : <TaskerHome />}
      </div>
    </div>
  );
}

// ---------- Unified Search ----------
function SearchScreen() {
  const kt = useKT();
  const [q, setQ] = React.useState(kt.params.q || '');
  const [tab, setTab] = React.useState('all');
  const ql = q.trim().toLowerCase();
  const hit = (str) => str.toLowerCase().includes(ql);
  const taskers = ql ? KT_TASKERS.filter((t) => hit(t.name + t.title + t.skills.join(' '))) : [];
  const services = ql ? KT_SERVICES.filter((s) => hit(s.title + s.cat + s.desc)) : [];
  const work = ql ? KT_WORK.filter((w) => hit(w.title + w.cat + w.skills.join(' '))) : [];
  const total = taskers.length + services.length + work.length;
  const recent = ['plumber', 'logo design', 'solar', 'data entry'];
  return (
    <>
      <div className="topbar">
        <button className="iconbtn" onClick={kt.back} style={{ marginLeft: -8 }}><Icon n="back" s={22} /></button>
        <div className="searchbar grow" style={{ cursor: 'auto' }}>
          <Icon n="search" s={18} />
          <input autoFocus value={q} onChange={(e) => setQ(e.target.value)} placeholder="Taskers, services or work" style={{ border: 0, outline: 0, flex: 1, fontSize: 15, background: 'transparent' }} />
          {q && <button onClick={() => setQ('')}><Icon n="close" s={16} /></button>}
        </div>
      </div>
      <div className="scroller" data-screen-label="Search">
        <div className={'content' + (kt.desk ? ' narrow' : '')}>
          {!ql ? (
            <>
              <div className="eyebrow" style={{ margin: '8px 0 10px' }}>Recent</div>
              <div className="row wrap" style={{ gap: 8 }}>{recent.map((r) => <button key={r} className="chip" onClick={() => setQ(r)}><Icon n="clock" s={14} />{r}</button>)}</div>
              <div className="eyebrow" style={{ margin: '24px 0 10px' }}>Popular categories</div>
              <div className="grid2">{KT_CATS.slice(0, 8).map((c) => <button key={c} className="card click" style={{ textAlign: 'left', padding: '12px 14px', fontWeight: 700, fontSize: 14 }} onClick={() => setQ(c)}>{c}</button>)}</div>
            </>
          ) : (
            <>
              <div className="tabs" style={{ marginBottom: 14 }}>
                {[['all', 'All', total], ['taskers', 'Taskers', taskers.length], ['services', 'Services', services.length], ['work', 'Work', work.length]].map(([v, l, n]) => (
                  <button key={v} className={tab === v ? 'on' : ''} onClick={() => setTab(v)}>{l}<span className="t-xs" style={{ fontWeight: 600 }}>{n}</span></button>
                ))}
              </div>
              {total === 0 && <Empty title={`No results for “${q}”`} body="Try a broader word, or post the work and let Taskers come to you." action={<button className="btn primary sm" onClick={() => kt.go('postQuick')}>Post a Quick Task</button>} />}
              {(tab === 'all' || tab === 'taskers') && taskers.length > 0 && <>
                {tab === 'all' && <div className="sechead" style={{ marginTop: 4 }}><h3 className="h-sm">Taskers</h3><a onClick={() => setTab('taskers')}>See {taskers.length}</a></div>}
                <div className={kt.desk ? 'dgrid' : 'stack'}>{taskers.slice(0, tab === 'all' ? 2 : 99).map((t) => <TaskerCard key={t.id} t={t} />)}</div>
              </>}
              {(tab === 'all' || tab === 'services') && services.length > 0 && <>
                {tab === 'all' && <div className="sechead"><h3 className="h-sm">Services</h3><a onClick={() => setTab('services')}>See {services.length}</a></div>}
                <div className={tab === 'all' ? 'hscroll' : 'grid2'}>{services.map((s) => <ServiceCard key={s.id} s={s} compact={tab === 'all'} />)}</div>
              </>}
              {(tab === 'all' || tab === 'work') && work.length > 0 && <>
                {tab === 'all' && <div className="sechead"><h3 className="h-sm">Available work</h3><a onClick={() => setTab('work')}>See {work.length}</a></div>}
                <div className={kt.desk ? 'dgrid' : 'stack'}>{work.slice(0, tab === 'all' ? 2 : 99).map((w) => <WorkCard key={w.id} w={w} />)}</div>
              </>}
            </>
          )}
        </div>
      </div>
    </>
  );
}

// ---------- Notifications ----------
const NOTIF_IC = { milestone: ['flag', 'acc'], chat: ['chat', 'info'], apply: ['users', 'info'], wallet: ['wallet', 'ok'], referral: ['gift', 'acc'], verify: ['shieldck', 'ok'] };
function NotifsScreen() {
  const kt = useKT();
  return (
    <>
      <TopBar title="Notifications" right={<button className="link" style={{ fontSize: 13 }} onClick={kt.markAllRead}>Mark all read</button>} />
      <div className="scroller" data-screen-label="Notifications">
        <div className={'content' + (kt.desk ? ' narrow' : '')}>
          <div className="list">
            {kt.notifs.map((n) => {
              const [ic, cls] = NOTIF_IC[n.kind];
              return (
                <button key={n.id} className="li" style={{ alignItems: 'flex-start', background: n.unread ? 'color-mix(in oklch, var(--accent) 5%, white)' : undefined }} onClick={() => { kt.readNotif(n.id); kt.go(n.go[0], n.go[1]); }}>
                  <span className={'badge ' + cls} style={{ width: 36, height: 36, borderRadius: 10, justifyContent: 'center', padding: 0, flex: 'none' }}><Icon n={ic} s={17} /></span>
                  <div className="grow">
                    <div className="row between"><span className="h-sm" style={{ fontSize: 13.5 }}>{n.title}</span><span className="t-xs" style={{ flex: 'none' }}>{n.time}</span></div>
                    <p className="t-sm" style={{ marginTop: 2, fontSize: 13 }}>{n.body}</p>
                  </div>
                  {n.unread && <span style={{ width: 8, height: 8, borderRadius: 4, background: 'var(--accent)', marginTop: 6, flex: 'none' }} />}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}

Object.assign(window, { HomeScreen, SearchScreen, NotifsScreen, RoleSwitch, WalletStrip });
