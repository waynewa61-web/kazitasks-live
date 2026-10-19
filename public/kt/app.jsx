// App shell: router, state, mobile + desktop frames, tweaks
const TWEAK_DEFAULTS = window.__KT_TWEAKS;

const SCREENS = {
  home: HomeScreen, search: SearchScreen, notifs: NotifsScreen,
  findWork: FindWorkScreen, workDetail: WorkDetailScreen, myWork: MyWorkScreen, applicants: ApplicantsScreen, jobDetail: JobDetailScreen,
  post: PostChooser, postQuick: PostQuickScreen, postProject: PostProjectScreen,
  directory: DirectoryScreen, tasker: TaskerProfileScreen, services: ServicesScreen, service: ServiceDetailScreen, hire: HireScreen, saved: SavedScreen,
  wallet: WalletScreen, tx: TxScreen, project: ProjectScreen, milestone: MilestoneScreen,
  chats: ChatsScreen, chat: ConversationScreen, account: AccountScreen,
  welcome: WelcomeScreen, signup: SignupScreen, otp: OtpScreen, created: CreatedScreen, finish: FinishProfileScreen, referrals: ReferralsScreen, plans: PlansScreen,
};
const ONBOARD = ['welcome', 'signup', 'otp', 'created'];
const ROOTS = ['home', 'findWork', 'myWork', 'post', 'chats', 'account', 'directory'];
const WALLETS = {
  normal: { available: 1240000, escrow: 680000, incoming: 900000, pending: 0, reserve: 0 },
  low: { available: 45000, escrow: 180000, incoming: 0, pending: 0, reserve: 0 },
  empty: { available: 0, escrow: 0, incoming: 0, pending: 0, reserve: 0 },
};

function useLS(key, init) {
  const [v, setV] = React.useState(() => { try { const s = localStorage.getItem(key); return s ? JSON.parse(s) : init; } catch (e) { return init; } });
  React.useEffect(() => { try { localStorage.setItem(key, JSON.stringify(v)); } catch (e) {} }, [key, v]);
  return [v, setV];
}

function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const [stack, setStack] = useLS('kt_stack_v1', [{ s: 'home', p: {} }]);
  const [lang, setLang] = useLS('kt_lang', 'en');
  const [saved, setSaved] = React.useState(new Set(['w2', 's1']));
  const [applied, setApplied] = React.useState(new Set());
  const [wallet, setWallet] = React.useState(WALLETS[t.wallet] || WALLETS.normal);
  const [tx, setTx] = React.useState(KT_TX);
  const [notifs, setNotifs] = React.useState(KT_NOTIFS);
  const [chats, setChats] = React.useState(KT_CHATS);
  const [toastMsg, setToastMsg] = React.useState(null);
  const [sheet, setSheet] = React.useState(null);
  const scrollMem = React.useRef({});
  const mainRef = React.useRef(null);
  const desk = t.view === 'desktop';

  React.useEffect(() => { setWallet(WALLETS[t.wallet] || WALLETS.normal); }, [t.wallet]);
  React.useEffect(() => { document.documentElement.style.setProperty('--accent', t.accent); }, [t.accent]);

  const top = stack[stack.length - 1];
  const saveScroll = () => { const el = mainRef.current && mainRef.current.querySelector('.scroller'); if (el) scrollMem.current[stack.length - 1] = el.scrollTop; };
  const toast = (m) => { setToastMsg(m); clearTimeout(window.__ktT); window.__ktT = setTimeout(() => setToastMsg(null), 2200); };
  const addTx = (x) => setTx((l) => [{ id: 'x' + Date.now(), when: 'Just now', ...x }, ...l]);

  const kt = {
    desk, role: t.role, elig: t.elig, msState: t.milestone, lang, params: top.p, stackDepth: stack.length, saved, applied, wallet, tx, notifs, chats,
    setRole: (r) => setTweak('role', r), setElig: (e) => setTweak('elig', e), setMs: (m) => setTweak('milestone', m), setLang, setSheet,
    go: (s, p = {}) => { saveScroll(); setStack((st) => [...st, { s, p }]); },
    back: () => setStack((st) => st.length > 1 ? st.slice(0, -1) : st),
    reset: (s, p = {}) => { scrollMem.current = {}; setStack([{ s, p }]); },
    toast,
    toggleSave: (id) => setSaved((S) => { const n = new Set(S); if (n.has(id)) { n.delete(id); toast('Removed from saved'); } else { n.add(id); toast('Saved for later'); } return n; }),
    apply: (id) => setApplied((S) => new Set(S).add(id)),
    openChatWith: (tid) => { const c = chats.find((x) => x.with === tid); if (c) kt.go('chat', { id: c.id }); else { const nc = { id: 'c' + tid, with: tid, ctx: null, last: '', time: 'now', unread: 0, msgs: [] }; setChats((l) => [nc, ...l]); kt.go('chat', { id: nc.id }); } },
    readChat: (id) => setChats((l) => l.map((c) => c.id === id ? { ...c, unread: 0 } : c)),
    readNotif: (id) => setNotifs((l) => l.map((n) => n.id === id ? { ...n, unread: false } : n)),
    markAllRead: () => setNotifs((l) => l.map((n) => ({ ...n, unread: false }))),
    deposit: (a) => { setWallet((w) => ({ ...w, available: w.available + a })); addTx({ t: 'Deposit · MTN MoMo', sub: '•••903', amt: a, kind: 'in', st: 'Completed' }); },
    withdraw: (a) => { setWallet((w) => ({ ...w, available: w.available - a, pending: w.pending + a })); addTx({ t: 'Withdrawal · Airtel Money', sub: '•••211', amt: -a, kind: 'out', st: 'Pending' }); },
    lockEscrow: (a, src) => { setWallet((w) => ({ ...w, available: src === 'wallet' ? Math.max(0, w.available - a) : w.available, escrow: w.escrow + a })); addTx({ t: 'Payment secured', sub: src === 'wallet' ? 'From Wallet' : 'Via MTN MoMo', amt: -a, kind: 'escrow', st: 'In escrow' }); },
    releaseEscrow: (a) => { setWallet((w) => ({ ...w, escrow: Math.max(0, w.escrow - a) })); addTx({ t: 'Payment released', sub: 'Approved work', amt: -a, kind: 'release', st: 'Completed' }); },
  };

  // restore scroll on back
  React.useLayoutEffect(() => {
    const y = scrollMem.current[stack.length - 1];
    const el = mainRef.current && mainRef.current.querySelector('.scroller');
    if (el) el.scrollTop = y || 0;
  }, [stack.length, top.s]);

  
  React.useEffect(() => {
    if (top && top.s) {
      window.parent.history.replaceState(null, '', '/' + top.s);
    }
  }, [top.s]);

  const Screen = SCREENS[top.s] || HomeScreen;
  const onboarding = ONBOARD.includes(top.s);
  const isRoot = stack.length === 1 && ROOTS.includes(top.s);
  const workTab = t.role === 'client' ? 'myWork' : 'findWork';
  const tabOf = (s) => ({ home: 'home', findWork: 'work', myWork: 'work', post: 'post', chats: 'chats', account: 'account' }[s]);
  const unreadChats = chats.reduce((a, c) => a + c.unread, 0);
  const homeTop = top.s === 'home' && !desk;

  const tabbar = !desk && !onboarding && (
    <nav className="tabbar">
      {[['home', 'home', 'Home'], [workTab, 'work', 'Work'], ['post', 'plus', 'Post'], ['chats', 'chat', 'Chats'], ['account', 'user', 'Account']].map(([s, ic, l]) => (
        l === 'Post'
          ? <button key={l} onClick={() => kt.reset('post')}><span className="postbtn"><Icon n="plus" s={24} w={2.2} /></span><span style={{ marginTop: 1, color: tabOf(top.s) === 'post' ? 'var(--navy)' : undefined }}>Post</span></button>
          : <button key={l} className={tabOf(top.s) === tabOf(s) ? 'on' : ''} onClick={() => kt.reset(s)}><span style={{ position: 'relative' }}><Icon n={ic} s={23} />{l === 'Chats' && unreadChats > 0 && <span className="count badge" style={{ position: 'absolute', top: -4, right: -10 }}>{unreadChats}</span>}</span>{l}</button>
      ))}
    </nav>
  );

  const sidebarItems = t.role === 'client'
    ? [['home', 'home', 'Home'], ['directory', 'users', 'Find Taskers'], ['services', 'layers', 'Services'], ['myWork', 'work', 'My work'], ['chats', 'chat', 'Chats'], ['wallet', 'wallet', 'Wallet'], ['account', 'user', 'Account']]
    : [['home', 'home', 'Home'], ['findWork', 'search', 'Find work'], ['myWork', 'work', 'My work'], ['services', 'layers', 'My Services'], ['chats', 'chat', 'Chats'], ['wallet', 'wallet', 'Wallet'], ['account', 'user', 'Account']];
  const rootS = stack[0].s;
  const sidebar = desk && !onboarding && (
    <aside className="sidebar">
      <div className="logo"><img src="assets/kazitasks-logo.png" alt="KaziTasks" /></div>
      <div style={{ margin: '0 4px 12px' }}><div className="seg" style={{ background: 'rgba(255,255,255,.08)' }}>{[['client', 'Client'], ['tasker', 'Tasker']].map(([v, l]) => <button key={v} className={t.role === v ? 'on' : ''} style={t.role !== v ? { color: 'rgba(255,255,255,.65)' } : null} onClick={() => kt.setRole(v)}>{l}</button>)}</div></div>
      {sidebarItems.map(([s, ic, l]) => <button key={s} className={'nav' + (rootS === s ? ' on' : '')} onClick={() => kt.reset(s, s === 'services' && t.role === 'tasker' ? { mine: true } : {})}><Icon n={ic} s={19} />{l}{s === 'chats' && unreadChats > 0 && <span className="count" style={{ marginLeft: 'auto' }}>{unreadChats}</span>}</button>)}
      <button className="postcta" onClick={() => kt.reset('post')}><Icon n="plus" s={18} w={2.4} />Post work</button>
      <div className="sbfoot">
        <div style={{ color: '#fff', fontWeight: 700, fontSize: 13 }}>Plus plan</div>
        <div style={{ marginTop: 2 }}>43 credits left · renews Oct 2027</div>
      </div>
    </aside>
  );

  const deskTop = desk && !onboarding && (
    <div className="row" style={{ gap: 12, padding: '12px 32px', background: 'var(--surface)', borderBottom: '1px solid var(--line)', flex: 'none' }}>
      <button className="searchbar" style={{ maxWidth: 460, height: 40, background: 'var(--bg)' }} onClick={() => kt.go('search')}><Icon n="search" s={17} />Search Taskers, services or work</button>
      <div className="grow" />
      <button className="chip sm" onClick={() => setSheet('lang')}><Icon n="globe" s={14} />{KT_LANGS.find((l) => l[0] === lang)[1]}</button>
      <button className="iconbtn" onClick={() => kt.go('notifs')}><Icon n="bell" />{notifs.some((n) => n.unread) && <span className="dot" style={{ boxShadow: '0 0 0 2px var(--surface)' }} />}</button>
      <button className="row" style={{ gap: 8 }} onClick={() => kt.reset('account')}><Avatar name="Daniel Kato" color="#F7941D" size={34} /><span className="h-sm">Daniel</span></button>
    </div>
  );

  const app = (
    <KTCtx.Provider value={kt}>
      <div className={'app' + (desk ? ' desk' : '')}>
        
        <div className="body">
          {sidebar}
          <div className="main" ref={mainRef}>
            {deskTop}
            <Screen key={stack.length + top.s + JSON.stringify(top.p)} />
            </div>
          {tabbar}
        </div>
        {sheet === 'lang' && <LangSheet />}
        {toastMsg && <div className="toast"><Icon n="check" s={16} w={2.6} style={{ color: 'var(--accent)' }} />{toastMsg}</div>}
      </div>
    </KTCtx.Provider>
  );

  // phone scaling
  const [scale, setScale] = React.useState(1);
  React.useEffect(() => {
    const f = () => setScale(Math.min(1, (window.innerHeight - 70) / 864, (window.innerWidth - 24) / 410));
    f(); window.addEventListener('resize', f); return () => window.removeEventListener('resize', f);
  }, []);

  return (
    <div className={(t.direction === 'B' ? 'dirB ' : '') + (t.density === 'compact' ? 'compact' : '')} style={{ height: '100vh', width: '100vw', overflow: 'hidden' }}>
      <KTCtx.Provider value={kt}>
        <div className={'app' + (desk ? ' desk' : '')}>
          <div className="body">
            {sidebar}
            <div className="main" ref={mainRef}>
              {deskTop}
              <Screen key={stack.length + top.s + JSON.stringify(top.p)} />
              {tabbar}
            </div>
          </div>
          {sheet === 'lang' && <LangSheet />}
          {toastMsg && <div className="toast"><Icon n="check" s={16} w={2.6} style={{ color: 'var(--accent)' }} />{toastMsg}</div>}
        </div>
      </KTCtx.Provider>

      <TweaksPanel>
        <TweakSection label="Direction">
          <TweakRadio label="Visual direction" value={t.direction} options={[{ value: 'A', label: 'A · Crisp' }, { value: 'B', label: 'B · Warm' }]} onChange={(v) => setTweak('direction', v)} />
          <TweakColor label="Accent" value={t.accent} options={['#F7941D', '#E8730C', '#F2B01E', '#1E9E8A']} onChange={(v) => setTweak('accent', v)} />
          <TweakRadio label="Density" value={t.density} options={[{ value: 'comfortable', label: 'Comfortable' }, { value: 'compact', label: 'Compact' }]} onChange={(v) => setTweak('density', v)} />
          <TweakRadio label="View" value={t.view} options={[{ value: 'mobile', label: 'Mobile' }, { value: 'desktop', label: 'Desktop' }]} onChange={(v) => setTweak('view', v)} />
        </TweakSection>
        <TweakSection label="State">
          <TweakRadio label="Role" value={t.role} options={[{ value: 'client', label: 'Client' }, { value: 'tasker', label: 'Tasker' }]} onChange={(v) => setTweak('role', v)} />
          <TweakSelect label="Tasker eligibility" value={t.elig} options={[{ value: 'unverified', label: 'Identity not verified' }, { value: 'pending', label: 'Verification pending' }, { value: 'incomplete', label: 'Verified · profile incomplete' }, { value: 'ready', label: 'Verified · ready for work' }]} onChange={(v) => setTweak('elig', v)} />
          <TweakSelect label="Current milestone" value={t.milestone} options={Object.keys(MS_LABEL).map((k) => ({ value: k, label: MS_LABEL[k][0] }))} onChange={(v) => setTweak('milestone', v)} />
          <TweakRadio label="Wallet" value={t.wallet} options={[{ value: 'normal', label: 'Funded' }, { value: 'low', label: 'Low' }, { value: 'empty', label: 'Empty' }]} onChange={(v) => setTweak('wallet', v)} />
        </TweakSection>
        <TweakSection label="Jump to">
          <TweakButton label="Onboarding (welcome → OTP)" secondary onClick={() => kt.reset('welcome')} />
          <TweakButton label="Milestone review" secondary onClick={() => { kt.reset('home'); setTimeout(() => kt.go('milestone', { id: 'm2', idx: t.role === 'client' ? 0 : 1, side: t.role }), 0); }} />
          <TweakButton label="Wallet" secondary onClick={() => kt.reset('wallet')} />
        </TweakSection>
      </TweaksPanel>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);