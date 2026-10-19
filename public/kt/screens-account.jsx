// Chats, Conversation, Account, Onboarding (welcome → signup → OTP), Finish Profile, Referrals, Subscriptions

function ChatRow({ c }) {
  const kt = useKT();
  const t = taskerById(c.with);
  return (
    <button className="li" onClick={() => kt.go('chat', { id: c.id })}>
      <Avatar name={t.name} color={t.color} size={46} online={t.online} sq={t.type !== 'Individual'} />
      <div className="grow" style={{ minWidth: 0 }}>
        <div className="row between"><span className="h-sm" style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{t.name}</span><span className="t-xs" style={{ flex: 'none', color: c.unread ? 'var(--accent)' : undefined, fontWeight: c.unread ? 700 : 500 }}>{c.time}</span></div>
        {c.ctx && <div className="t-xs" style={{ fontWeight: 600, color: 'var(--navy)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{c.ctx.kind} · {c.ctx.title}</div>}
        <div className="row between" style={{ gap: 8 }}><span className="t-sm" style={{ fontSize: 13, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', color: c.unread ? 'var(--ink)' : 'var(--muted)', fontWeight: c.unread ? 600 : 400 }}>{c.last}</span>{c.unread > 0 && <span className="count">{c.unread}</span>}</div>
      </div>
    </button>
  );
}

function ChatsScreen() {
  const kt = useKT();
  const [q, setQ] = React.useState('');
  const list = kt.chats.filter((c) => taskerById(c.with).name.toLowerCase().includes(q.toLowerCase()));
  return (
    <>
      <TopBar title="Chats" back={kt.stackDepth > 1} />
      <div className="scroller" data-screen-label="Chats">
        <div className={'content' + (kt.desk ? ' narrow' : '')}>
          <div className="searchbar"><Icon n="search" s={18} /><input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search chats" style={{ border: 0, outline: 0, flex: 1, fontSize: 14, background: 'transparent' }} /></div>
          <div className="list" style={{ marginTop: 12 }}>{list.map((c) => <ChatRow key={c.id} c={c} />)}</div>
        </div>
      </div>
    </>
  );
}

function ConversationScreen() {
  const kt = useKT();
  const c = kt.chats.find((x) => x.id === kt.params.id) || kt.chats[0];
  const t = taskerById(c.with);
  const [msgs, setMsgs] = React.useState(c.msgs);
  const [txt, setTxt] = React.useState('');
  const [menu, setMenu] = React.useState(null);
  const [reply, setReply] = React.useState(null);
  const ref = React.useRef(null);
  React.useEffect(() => { kt.readChat(c.id); }, []);
  React.useEffect(() => { if (ref.current) ref.current.scrollTop = ref.current.scrollHeight; }, [msgs]);
  const send = () => {
    if (!txt.trim()) return;
    const m = { me: true, t: txt, at: 'now', st: 'delivered', reply };
    setMsgs([...msgs, m]); setTxt(''); setReply(null);
    setTimeout(() => setMsgs((ms) => ms.map((x) => x === m ? { ...x, st: 'seen' } : x)), 1500);
  };
  const ctxGo = () => {
    if (!c.ctx) return;
    if (c.ctx.ref === 'm2') kt.go('project', { id: 'm2', side: 'client' });
    else if (c.ctx.ref === 'm1') kt.go('jobDetail', { id: 'm1' });
    else kt.go('applicants', { id: c.ctx.ref });
  };
  return (
    <>
      <div className="topbar sticky-line" style={{ background: 'var(--surface)' }}>
        <button className="iconbtn" onClick={kt.back} style={{ marginLeft: -8 }}><Icon n="back" s={22} /></button>
        <button className="row grow" style={{ gap: 10, textAlign: 'left' }} onClick={() => kt.go('tasker', { id: t.id })}>
          <Avatar name={t.name} color={t.color} size={38} online={t.online} sq={t.type !== 'Individual'} />
          <div className="grow" style={{ minWidth: 0 }}><div className="h-sm" style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{t.name}</div><div className="t-xs" style={{ color: t.online ? 'var(--ok)' : undefined }}>{t.online ? 'Online' : 'Last seen today at 08:12'}</div></div>
        </button>
        <button className="iconbtn"><Icon n="more" s={22} w={3} /></button>
      </div>
      {c.ctx && (
        <button onClick={ctxGo} className="row" style={{ gap: 10, padding: '10px 16px', background: 'color-mix(in oklch, var(--navy) 5%, white)', borderBottom: '1px solid var(--line)', textAlign: 'left', width: '100%' }}>
          <KindBadge kind={c.ctx.kind === 'Project' ? 'project' : 'quick'} />
          <span className="grow t-xs" style={{ fontWeight: 600, color: 'var(--ink-2)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{c.ctx.kind === 'Application' ? 'Applied to: ' : ''}{c.ctx.title}</span>
          <span className="link" style={{ fontSize: 12 }}>Open</span>
        </button>
      )}
      <div className="scroller" ref={ref} data-screen-label="Conversation" style={{ padding: '16px 14px', display: 'flex', flexDirection: 'column', gap: 6, background: 'var(--bg)' }}>
        <div className="t-xs" style={{ textAlign: 'center', margin: '0 0 8px' }}><span className="badge neutral">Today</span></div>
        {msgs.map((m, i) => (
          <div key={i} className={'bubble ' + (m.me ? 'me' : 'them')} onContextMenu={(e) => { e.preventDefault(); setMenu(i); }} onDoubleClick={() => setMenu(i)}>
            {m.reply && <div style={{ fontSize: 12, padding: '4px 8px', borderLeft: '3px solid var(--accent)', background: 'rgba(255,255,255,.12)', borderRadius: 6, marginBottom: 4, opacity: .85 }}>{m.reply}</div>}
            {m.file ? <div className="row" style={{ gap: 10 }}><div style={{ width: 38, height: 38, borderRadius: 9, background: 'var(--bad-bg)', color: 'var(--bad)', display: 'grid', placeItems: 'center', fontSize: 10, fontWeight: 800 }}>PDF</div><div><div style={{ fontWeight: 600, fontSize: 13 }}>{m.file}</div><div className="t-xs">{m.size}</div></div></div> : m.t}
            <div className="meta">{m.at}{m.me && <Icon n={m.st === 'seen' || m.st === 'delivered' ? 'ticks' : 'tick'} s={14} style={{ color: m.st === 'seen' ? 'var(--accent)' : 'inherit' }} />}</div>
            {menu === i && (
              <div className="list" style={{ position: 'absolute', top: '100%', [m.me ? 'right' : 'left']: 0, zIndex: 10, width: 160, marginTop: 4, boxShadow: '0 10px 30px -10px rgba(0,0,0,.3)' }}>
                {[['reply', 'Reply'], ['copy', 'Copy'], ['share', 'Forward'], ['trash', 'Delete']].map(([ic, l]) => <button key={l} className="li" style={{ color: l === 'Delete' ? 'var(--bad)' : 'var(--ink)', padding: '10px 12px' }} onClick={(e) => { e.stopPropagation(); setMenu(null); if (l === 'Reply') setReply(m.t || m.file); else if (l === 'Delete') setMsgs(msgs.filter((_, j) => j !== i)); else kt.toast(l === 'Copy' ? 'Copied' : 'Choose a chat to forward'); }}><Icon n={ic} s={16} /><span style={{ fontSize: 13.5, fontWeight: 600 }}>{l}</span></button>)}
              </div>
            )}
          </div>
        ))}
        <p className="t-xs" style={{ textAlign: 'center', marginTop: 10 }}>Tip: double-click a message for reply, copy & more</p>
      </div>
      {menu !== null && <div style={{ position: 'absolute', inset: 0, zIndex: 5 }} onClick={() => setMenu(null)} />}
      {reply && <div className="row" style={{ gap: 8, padding: '8px 14px', background: 'var(--surface)', borderTop: '1px solid var(--line)' }}><Icon n="reply" s={16} style={{ color: 'var(--accent)' }} /><span className="grow t-xs" style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>Replying to: {reply}</span><button onClick={() => setReply(null)}><Icon n="close" s={16} /></button></div>}
      <div className="composer">
        <button className="iconbtn" style={{ color: 'var(--muted)' }}><Icon n="clip" /></button>
        <textarea className="ta" rows={1} placeholder="Message" value={txt} onChange={(e) => setTxt(e.target.value)} onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send(); } }} />
        <button className="iconbtn" style={{ background: txt ? 'var(--navy)' : 'var(--line-2)', color: txt ? '#fff' : 'var(--muted)', width: 42, height: 42 }} onClick={send}><Icon n={txt ? 'send' : 'mic'} s={19} /></button>
      </div>
    </>
  );
}

// ---------- Account ----------
function AccountScreen() {
  const kt = useKT();
  const items = [
    [['user', kt.role === 'client' ? 'Client profile' : 'Tasker profile', () => kt.role === 'tasker' ? kt.go('tasker', { id: 't1' }) : kt.toast('Client profile — demo')], ['shieldck', 'Verification & Finish Profile', () => kt.go('finish'), <EligBadge s={kt.elig} short />], ['bookmark', 'Saved for later', () => kt.go('saved')]],
    [['wallet', 'KaziTasks Wallet', () => kt.go('wallet')], ['crown', 'Subscription', () => kt.go('plans'), <span className="badge acc">Plus</span>], ['gift', 'Referrals & points', () => kt.go('referrals'), <span className="t-xs" style={{ fontWeight: 700 }}>1,350 pts</span>]],
    [['globe', 'Language', () => kt.setSheet('lang'), <span className="t-xs">{KT_LANGS.find((l) => l[0] === kt.lang)[1]}</span>], ['bell', 'Notifications', () => kt.go('notifs')], ['settings', 'Settings & security', () => kt.toast('Settings — demo')]],
  ];
  return (
    <>
      <TopBar title="Account" back={kt.stackDepth > 1} />
      <div className="scroller" data-screen-label="Account">
        <div className={'content' + (kt.desk ? ' narrow' : '')}>
          <div className="card row" style={{ gap: 14 }}>
            <Avatar name="Daniel Kato" color="#F7941D" size={58} />
            <div className="grow"><div className="h-md">Daniel Kato</div><div className="t-xs">{kt.role === 'client' ? 'Kato Holdings Ltd' : 'Brand & Print Designer'} · Ntinda</div><div style={{ marginTop: 6 }}><span className="mono" style={{ color: 'var(--muted)' }}>kazitaskshr.com/@danielkato</span></div></div>
          </div>
          <div className="card sec">
            <div className="row between"><div><div className="h-sm">Using KaziTasks as</div><div className="t-xs">One account, one wallet, one subscription</div></div></div>
            <div style={{ marginTop: 12 }}><Seg value={kt.role} options={[['client', 'Client'], ['tasker', 'Tasker']]} onChange={kt.setRole} /></div>
          </div>
          {items.map((g, i) => <div key={i} className="list sec">{g.map(([ic, l, fn, r]) => <button key={l} className="li" onClick={fn}><Icon n={ic} s={19} style={{ color: 'var(--navy)' }} /><span className="grow t-sm" style={{ fontWeight: 600, color: 'var(--ink)' }}>{l}</span>{r}<Icon n="chev" s={18} className="chev" /></button>)}</div>)}
          <div className="list sec"><button className="li" onClick={() => kt.reset('welcome')}><Icon n="logout" s={19} style={{ color: 'var(--bad)' }} /><span className="grow t-sm" style={{ fontWeight: 600, color: 'var(--bad)' }}>Log out · view onboarding</span></button></div>
        </div>
      </div>
    </>
  );
}

function LangSheet() {
  const kt = useKT();
  return (
    <Sheet title="Language" onClose={() => kt.setSheet(null)}>
      <div className="stack" style={{ gap: 8 }}>{KT_LANGS.map(([c, l]) => <button key={c} className={'opt' + (kt.lang === c ? ' on' : '')} onClick={() => { kt.setLang(c); kt.setSheet(null); kt.toast(c === 'en' ? 'Language set' : 'Translations coming soon · saved'); }}><span className="radio" /><span className="h-sm grow">{l}</span></button>)}</div>
    </Sheet>
  );
}

// ---------- Onboarding ----------
function WelcomeScreen() {
  const kt = useKT();
  return (
    <div className="scroller" data-screen-label="Welcome" style={{ display: 'flex', flexDirection: 'column', background: 'var(--surface)' }}>
      <div style={{ padding: kt.desk ? '60px 0 0' : '30px 24px 0', textAlign: 'center' }}><img src="assets/kazitasks-logo.png" alt="KaziTasks — Jobs for ALL" style={{ width: 220 }} /></div>
      <div style={{ flex: 1, padding: '10px 24px', display: 'flex', flexDirection: 'column', justifyContent: 'center', maxWidth: 440, margin: '0 auto', width: '100%' }}>
        <div className="ph" style={{ height: 200, borderRadius: 20 }}>hero photo — Ugandan tasker at work</div>
        <h1 className="h-xl" style={{ marginTop: 26, fontSize: 28 }}>Find work. Find trusted people. Get paid safely.</h1>
        <p className="t-sm" style={{ marginTop: 10, fontSize: 15 }}>Post a task, hire a verified Tasker, or offer your skills — your money is protected until the work is approved.</p>
      </div>
      <div style={{ padding: '16px 24px 34px', maxWidth: 440, margin: '0 auto', width: '100%' }} className="stack">
        <button className="btn primary block" onClick={() => kt.go('signup')}>Create account</button>
        <button className="btn ghost block" onClick={() => kt.reset('home')}>I already have an account</button>
        <button className="t-xs" style={{ margin: '6px auto 0', display: 'flex', gap: 6, alignItems: 'center' }} onClick={() => kt.setSheet('lang')}><Icon n="globe" s={14} />English · Luganda · Kiswahili · Français</button>
      </div>
    </div>
  );
}

function SignupScreen() {
  const kt = useKT();
  const [type, setType] = React.useState('Individual');
  const [agree, setAgree] = React.useState(true);
  return (
    <>
      <TopBar title="Create account" />
      <div className="scroller" data-screen-label="Sign Up">
        <div className={'content' + (kt.desk ? ' narrow' : '')}>
          <p className="t-sm" style={{ marginBottom: 18 }}>Takes a minute. You can add skills, ID and portfolio later.</p>
          <div className="stack" style={{ gap: 16 }}>
            <div className="grid2"><div className="field"><label>First name</label><input className="input" defaultValue="Daniel" /></div><div className="field"><label>Last name</label><input className="input" defaultValue="Kato" /></div></div>
            <div className="field"><label>Phone number</label><div className="row" style={{ gap: 8 }}><div className="input" style={{ width: 92, display: 'flex', alignItems: 'center', gap: 4, fontWeight: 600 }}>🇺🇬 +256</div><input className="input grow" defaultValue="772 418 903" /></div></div>
            <div className="field"><label>Email</label><input className="input" defaultValue="daniel.kato@gmail.com" /></div>
            <div className="field"><label>Password</label><input className="input" type="password" defaultValue="kazitasks2026" /></div>
            <div className="field"><label>Account type</label><Chips multi={false} options={['Individual', 'Company', 'Group', 'Agency']} value={type} onChange={setType} /><span className="hint">Use KaziTasks to hire, to work, or both — switch anytime.</span></div>
            <button className="row" style={{ gap: 10, textAlign: 'left', alignItems: 'flex-start' }} onClick={() => setAgree(!agree)}><span style={{ width: 20, height: 20, borderRadius: 6, border: '2px solid ' + (agree ? 'var(--navy)' : '#C5CAD8'), background: agree ? 'var(--navy)' : 'transparent', color: '#fff', display: 'grid', placeItems: 'center', flex: 'none' }}>{agree && <Icon n="check" s={13} w={3} />}</span><span className="t-sm">I agree to the KaziTasks <span className="link">Terms</span> and <span className="link">Privacy Policy</span></span></button>
            <div className="notice navy"><Icon n="gift" s={18} /><span>Invited by <b>Esther Nambi</b> — your referral is applied automatically.</span></div>
            <button className="btn primary block" disabled={!agree} onClick={() => kt.go('otp')}>Continue</button>
          </div>
        </div>
      </div>
    </>
  );
}

function OtpScreen() {
  const kt = useKT();
  const [code, setCode] = React.useState(['', '', '', '', '', '']);
  const refs = React.useRef([]);
  const full = code.every((c) => c);
  const set = (i, v) => { const d = v.replace(/\D/g, '').slice(-1); const n = [...code]; n[i] = d; setCode(n); if (d && i < 5) refs.current[i + 1].focus(); };
  return (
    <>
      <TopBar title="" />
      <div className="scroller" data-screen-label="OTP">
        <div className={'content' + (kt.desk ? ' narrow' : '')} style={{ paddingTop: 10 }}>
          <h2 className="h-xl">Enter the code</h2>
          <p className="t-sm" style={{ marginTop: 6 }}>We sent a 6-digit code by SMS to <b>+256 772 418 903</b></p>
          <div className="otp" style={{ marginTop: 28 }}>{code.map((c, i) => <input key={i} ref={(el) => refs.current[i] = el} inputMode="numeric" value={c} onChange={(e) => set(i, e.target.value)} onKeyDown={(e) => { if (e.key === 'Backspace' && !c && i) refs.current[i - 1].focus(); }} />)}</div>
          <button className="link t-xs" style={{ display: 'block', margin: '18px auto 0' }} onClick={() => setCode(['4', '8', '2', '1', '9', '0'])}>Auto-fill demo code</button>
          <p className="t-xs" style={{ textAlign: 'center', marginTop: 10 }}>Resend in 0:42</p>
          <button className="btn primary block" style={{ marginTop: 28 }} disabled={!full} onClick={() => kt.go('created')}>Verify</button>
        </div>
      </div>
    </>
  );
}

function CreatedScreen() {
  const kt = useKT();
  return (
    <div className="scroller" data-screen-label="Account Created" style={{ background: 'var(--surface)' }}>
      <div className={'content' + (kt.desk ? ' narrow' : '')} style={{ paddingTop: 60, textAlign: 'center' }}>
        <div style={{ width: 80, height: 80, borderRadius: '50%', background: 'var(--ok-bg)', color: 'var(--ok)', display: 'grid', placeItems: 'center', margin: '0 auto' }}><Icon n="check" s={40} w={2.4} /></div>
        <h2 className="h-xl" style={{ marginTop: 20 }}>Welcome to KaziTasks, Daniel</h2>
        <p className="t-sm" style={{ marginTop: 8 }}>What would you like to do first?</p>
        <div className="stack" style={{ marginTop: 26, textAlign: 'left' }}>
          <button className="opt" onClick={() => { kt.setRole('client'); kt.reset('home'); }}><Icon n="search" style={{ color: 'var(--navy)' }} /><div className="grow"><div className="h-sm">I need work done</div><div className="t-xs">Post a task or find a Tasker</div></div><Icon n="chev" s={18} style={{ color: 'var(--faint)' }} /></button>
          <button className="opt" onClick={() => { kt.setRole('tasker'); kt.setElig('unverified'); kt.reset('home'); }}><Icon n="briefcase" style={{ color: 'var(--navy)' }} /><div className="grow"><div className="h-sm">I want to find work</div><div className="t-xs">Build your profile and get verified</div></div><Icon n="chev" s={18} style={{ color: 'var(--faint)' }} /></button>
        </div>
      </div>
    </div>
  );
}

// ---------- Finish Profile / Verification ----------
function FinishProfileScreen() {
  const kt = useKT();
  const s = kt.elig;
  const [open, setOpen] = React.useState(null);
  const [skills, setSkills] = React.useState(['Graphic design', 'Logo design', 'Print']);
  const [langs, setLangs] = React.useState(['English', 'Luganda']);
  const idDone = s === 'ready' || s === 'incomplete';
  const pct = { unverified: 45, pending: 82, incomplete: 74, ready: 100 }[s];
  const rows = [
    ['photo', 'Profile photo', true, 'camera'],
    ['basics', 'Title & introduction', true, 'user'],
    ['skills', 'Skills, categories & services', true, 'layers'],
    ['langs', 'Languages & location', true, 'globe'],
    ['exp', 'Work experience', s === 'ready' || s === 'pending', 'briefcase'],
    ['portfolio', 'Portfolio (at least 2)', s === 'ready' || s === 'pending', 'doc'],
    ['id', 'Identity verification (NIN)', idDone, 'id'],
  ];
  return (
    <>
      <TopBar title="Finish profile" />
      <div className="scroller" data-screen-label="Finish Profile">
        <div className={'content' + (kt.desk ? ' narrow' : '')}>
          <div className="card">
            <div className="row between"><EligBadge s={s} /><span className="money" style={{ fontSize: 22 }}>{pct}%</span></div>
            <div style={{ position: 'relative', marginTop: 14 }}>
              <div className="bar" style={{ height: 8 }}><i style={{ width: pct + '%' }} /></div>
              <div style={{ position: 'absolute', left: '90%', top: -4, bottom: -4, width: 2, background: 'var(--navy)' }} />
            </div>
            <div className="row between t-xs" style={{ marginTop: 6 }}><span>Visible in Tasker Directory</span><span style={{ fontWeight: 700, color: 'var(--navy)' }}>90% + ID = Ready for work</span></div>
          </div>
          <div className="list sec">
            {rows.map(([k, l, done, ic]) => (
              <React.Fragment key={k}>
                <button className="li" onClick={() => setOpen(open === k ? null : k)}>
                  <span style={{ width: 32, height: 32, borderRadius: 10, display: 'grid', placeItems: 'center', background: done ? 'var(--ok-bg)' : 'var(--line-2)', color: done ? 'var(--ok)' : 'var(--muted)', flex: 'none' }}><Icon n={done ? 'check' : ic} s={16} w={done ? 2.6 : 1.8} /></span>
                  <span className="grow t-sm" style={{ fontWeight: 600, color: 'var(--ink)' }}>{l}</span>
                  {k === 'id' && s === 'pending' && <span className="badge info">Reviewing</span>}
                  <Icon n={open === k ? 'down' : 'chev'} s={18} className="chev" />
                </button>
                {open === k && (
                  <div style={{ padding: '4px 16px 16px', borderBottom: '1px solid var(--line-2)' }}>
                    {k === 'skills' && <ChipPicker options={KT_SKILLS} value={skills} onChange={setSkills} placeholder="Add a skill" />}
                    {k === 'langs' && <div className="stack"><Chips options={['English', 'Luganda', 'Kiswahili', 'French', 'Runyankole', 'Acholi']} value={langs} onChange={setLangs} /><LocationPicker value="Ntinda, Kampala" onChange={() => {}} /></div>}
                    {k === 'id' && (idDone ? <div className="notice ok"><Icon n="shieldck" s={18} />National ID verified on 8 Oct 2026.</div> : s === 'pending' ? <div className="notice info"><Icon n="clock" s={18} />We received your National ID. Checks usually finish within 24 hours.</div> : (
                      <div className="stack">
                        <div className="field"><label>National Identification Number (NIN)</label><input className="input mono" style={{ fontSize: 15 }} placeholder="CM 0000 0000 0000" /></div>
                        <div className="grid2"><button className="fab-sim" style={{ flexDirection: 'column', padding: 16 }}><Icon n="id" s={22} /><b>ID front</b></button><button className="fab-sim" style={{ flexDirection: 'column', padding: 16 }}><Icon n="id" s={22} /><b>ID back</b></button></div>
                        <button className="fab-sim"><Icon n="camera" s={18} /><span><b>Take a selfie</b> to match your ID</span></button>
                        <button className="btn primary block sm" onClick={() => { kt.setElig('pending'); kt.toast('Submitted for verification'); }}>Submit for verification</button>
                        <p className="t-xs">Your ID is used only to confirm who you are. It’s never shown on your profile.</p>
                      </div>
                    ))}
                    {['photo', 'basics', 'exp', 'portfolio'].includes(k) && <button className="fab-sim"><Icon n="plus" s={16} /><span><b>{done ? 'Edit' : 'Add'} {l.toLowerCase()}</b></span></button>}
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

// ---------- Referrals ----------
function ReferralsScreen() {
  const kt = useKT();
  const people = [['Esther Nambi', 500, ['Signed up', 'Profile done', 'First work']], ['Moses Opio', 250, ['Signed up', 'Profile done']], ['Halima Nassali', 100, ['Signed up']], ['Ivan Tumusiime', 0, []]];
  return (
    <>
      <TopBar title="Grow your Kazi Network" />
      <div className="scroller" data-screen-label="Referrals">
        <div className={'content' + (kt.desk ? ' narrow' : '')}>
          <div className="hero">
            <div className="ring" />
            <div style={{ fontSize: 12.5, opacity: .7, fontWeight: 600 }}>Your points</div>
            <div className="money" style={{ fontSize: 34, marginTop: 2 }}>1,350</div>
            <p style={{ fontSize: 13, opacity: .8, marginTop: 6, maxWidth: 260 }}>Invite people you’d trust with work. Earn up to 500 points each as they get active.</p>
            <div className="row" style={{ gap: 8, marginTop: 16, background: 'rgba(255,255,255,.1)', borderRadius: 10, padding: '6px 6px 6px 12px' }}>
              <span className="mono grow" style={{ fontSize: 12, opacity: .9 }}>kazitaskshr.com/i/daniel</span>
              <button className="btn accent xs" onClick={() => kt.toast('Invite link copied')}>Copy</button>
            </div>
          </div>
          <div className="sechead"><h3 className="h-md">How you earn</h3></div>
          <div className="card" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', textAlign: 'center', gap: 4 }}>
            {[['100', 'Verified signup'], ['+150', 'Completes profile'], ['+250', 'First work done']].map(([p, l], i) => <div key={l} style={{ borderLeft: i ? '1px solid var(--line-2)' : 0 }}><div className="money" style={{ fontSize: 18, color: 'color-mix(in oklch, var(--accent) 70%, black)' }}>{p}</div><div className="t-xs" style={{ marginTop: 2 }}>{l}</div></div>)}
          </div>
          <p className="t-xs" style={{ marginTop: 8 }}>Friends join with your link — no code to type. Points values may change.</p>
          <div className="sechead"><h3 className="h-md">Your invites</h3><span className="t-xs">4 people</span></div>
          <div className="list">{people.map(([n, pts, st]) => (
            <div key={n} className="li" style={{ cursor: 'default' }}>
              <Avatar name={n} color={['#7B4FB8', '#1E7F74', '#B8572F', '#6E7591'][people.findIndex((p) => p[0] === n)]} size={38} />
              <div className="grow"><div className="h-sm" style={{ fontSize: 13.5 }}>{n}</div><div className="row" style={{ gap: 3, marginTop: 5 }}>{[0, 1, 2].map((i) => <i key={i} style={{ width: 28, height: 4, borderRadius: 2, background: i < st.length ? 'var(--accent)' : 'var(--line)' }} />)}<span className="t-xs" style={{ marginLeft: 6 }}>{st[st.length - 1] || 'Invited'}</span></div></div>
              <span className="money" style={{ fontSize: 14 }}>{pts}</span>
            </div>
          ))}</div>
          <button className="btn ghost block sec" onClick={() => kt.toast('Contacts access — demo')}><Icon n="users" s={18} />Find people already on KaziTasks</button>
          <p className="t-xs" style={{ textAlign: 'center', marginTop: 8 }}>We only check numbers you choose. Nothing is uploaded or messaged without you.</p>
        </div>
      </div>
    </>
  );
}

// ---------- Subscriptions ----------
function PlansScreen() {
  const kt = useKT();
  const [sel, setSel] = React.useState('plus');
  const cur = 'plus';
  return (
    <>
      <TopBar title="Subscription" />
      <div className="scroller" data-screen-label="Subscription">
        <div className={'content' + (kt.desk ? '' : '')}>
          <div className="notice navy"><Icon n="swap" s={18} /><span>One annual plan covers <b>both</b> your Client and Tasker roles.</span></div>
          <div className="card sec row" style={{ gap: 14 }}>
            <div className="grow"><div className="t-xs">Credits this month</div><div className="money" style={{ fontSize: 22 }}>43 <span className="t-xs" style={{ fontWeight: 500 }}>of 45</span></div></div>
            <div style={{ textAlign: 'right' }}><div className="t-xs">Plus renews</div><div className="h-sm">1 Oct 2027</div></div>
          </div>
          <div className={kt.desk ? '' : 'stack'} style={kt.desk ? { display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 14, marginTop: 22 } : { marginTop: 22 }}>
            {KT_PLANS.map((p) => (
              <button key={p.id} className={'opt' + (sel === p.id ? ' on' : '')} onClick={() => setSel(p.id)} style={{ flexDirection: 'column', gap: 8, padding: 16 }}>
                <div className="row between" style={{ width: '100%' }}><span className="h-md">{p.name}</span>{p.id === cur ? <span className="badge acc">Current</span> : p.id === 'pro' ? <span className="badge navy">Popular</span> : null}</div>
                <div><Money v={p.price} size={22} /><span className="t-xs"> / year</span></div>
                <div className="t-sm" style={{ fontWeight: 600 }}>{p.credits} credits / month</div>
                <div className="t-xs">{p.apply} · {p.post}</div>
                <div className="stack" style={{ gap: 4, marginTop: 4 }}>{p.extras.map((e) => <span key={e} className="t-xs row" style={{ gap: 6, color: 'var(--ink-2)' }}><Icon n="check" s={13} w={2.6} style={{ color: 'var(--ok)' }} />{e}</span>)}</div>
              </button>
            ))}
          </div>
          <button className="btn primary block" style={{ marginTop: 20 }} disabled={sel === cur} onClick={() => kt.toast('Upgrade — pay from Wallet or Mobile Money')}>{sel === cur ? 'Current plan' : `Switch to ${KT_PLANS.find((p) => p.id === sel).name}`}</button>
          <p className="t-xs" style={{ textAlign: 'center', marginTop: 8 }}>Prices and limits set by KaziTasks and may change.</p>
        </div>
      </div>
    </>
  );
}

Object.assign(window, { ChatRow, ChatsScreen, ConversationScreen, AccountScreen, LangSheet, WelcomeScreen, SignupScreen, OtpScreen, CreatedScreen, FinishProfileScreen, ReferralsScreen, PlansScreen });
