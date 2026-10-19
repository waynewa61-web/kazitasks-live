// Find Work, Work Detail + Apply, Post Quick Task / Project, My Work, Applicants, Quick Task job detail

function FindWorkScreen() {
  const kt = useKT();
  const [kind, setKind] = React.useState('all');
  const [mode, setMode] = React.useState([]);
  const [cat, setCat] = React.useState(null);
  const [filters, setFilters] = React.useState(false);
  const list = KT_WORK.filter((w) => (kind === 'all' || w.kind === kind) && (!mode.length || mode.includes(w.mode)) && (!cat || w.cat === cat));
  return (
    <>
      <TopBar title="Find work" back={kt.stackDepth > 1} right={<><button className="iconbtn" onClick={() => kt.go('saved')} aria-label="Saved"><Icon n="bookmark" /></button>{!kt.desk && <button className="btn soft sm" onClick={() => kt.go('myWork')}>My work</button>}</>} />
      <div className="scroller" data-screen-label="Find Work">
        <div className="content">
          <button className="searchbar" onClick={() => kt.go('search')}><Icon n="search" s={18} />Search by skill, service or keyword</button>
          <div className="row" style={{ gap: 8, marginTop: 12, overflowX: 'auto', scrollbarWidth: 'none' }}>
            <button className="chip" onClick={() => setFilters(true)}><Icon n="filter" s={15} />Filters</button>
            {[['all', 'All'], ['quick', 'Quick Tasks'], ['project', 'Projects']].map(([v, l]) => <button key={v} className={'chip' + (kind === v ? ' on' : '')} onClick={() => setKind(v)}>{l}</button>)}
            {['Remote', 'On-site'].map((m) => <button key={m} className={'chip' + (mode.includes(m) ? ' on' : '')} onClick={() => setMode(mode.includes(m) ? mode.filter((x) => x !== m) : [...mode, m])}>{m}</button>)}
          </div>
          <div className="row between" style={{ margin: '18px 0 10px' }}>
            <span className="t-xs"><b style={{ color: 'var(--ink)' }}>{list.length}</b> opportunities{cat ? ` in ${cat}` : ''}</span>
            <span className="t-xs">Sorted by best match</span>
          </div>
          <div className={kt.desk ? 'dgrid' : 'stack'}>{list.map((w) => <WorkCard key={w.id} w={w} />)}</div>
          {!list.length && <Empty title="Nothing matches those filters" body="Clear a filter or save this search to get notified." />}
        </div>
      </div>
      {filters && (
        <Sheet title="Filters" onClose={() => setFilters(false)}>
          <div className="stack" style={{ gap: 18 }}>
            <div className="field"><label>Category</label><Chips multi={false} options={KT_CATS.slice(0, 8)} value={cat} onChange={(c) => setCat(cat === c ? null : c)} /></div>
            <LocationPicker value="Ntinda, Kampala" onChange={() => {}} />
            <div className="field"><label>Budget (UGX)</label><div className="grid2"><input className="input" placeholder="Min" defaultValue="50,000" /><input className="input" placeholder="Max" /></div></div>
            <div className="field"><label>Deadline</label><Chips multi={false} options={['Today', 'This week', 'This month', 'Any']} value="Any" onChange={() => {}} /></div>
            <div className="row" style={{ gap: 10 }}><button className="btn ghost grow" onClick={() => { setCat(null); setMode([]); setKind('all'); }}>Clear</button><button className="btn primary grow" onClick={() => setFilters(false)}>Show {list.length} results</button></div>
          </div>
        </Sheet>
      )}
    </>
  );
}

function WorkDetailScreen() {
  const kt = useKT();
  const w = KT_WORK.find((x) => x.id === kt.params.id) || KT_WORK[0];
  const [apply, setApply] = React.useState(false);
  const applied = kt.applied.has(w.id);
  const isTasker = kt.role === 'tasker';
  const body = (
    <>
      <div className="row" style={{ gap: 6 }}><KindBadge kind={w.kind} /><span className="badge neutral">{w.cat}</span></div>
      <h2 className="h-lg pretty" style={{ marginTop: 10 }}>{w.title}</h2>
      <div className="row" style={{ gap: 10, marginTop: 12 }}>
        <Avatar name={w.client} color="#3C4460" size={36} sq />
        <div className="grow"><div className="h-sm" style={{ fontSize: 13.5 }}>{w.client}</div><div className="t-xs">{w.verified ? 'Verified client · 12 jobs posted · 4.8★' : 'New client'}</div></div>
      </div>
      <div className="card" style={{ marginTop: 16, display: 'grid', gridTemplateColumns: '1fr 1fr', rowGap: 14 }}>
        <div><div className="t-xs">Budget</div><Money v={w.budget} size={16} /></div>
        <div><div className="t-xs">Pricing</div><div className="h-sm">{w.pricing}</div></div>
        <div><div className="t-xs">Location</div><div className="h-sm">{w.mode === 'Remote' ? 'Remote' : w.loc}</div></div>
        <div><div className="t-xs">Deadline</div><div className="h-sm">{w.deadline}</div></div>
      </div>
      <div className="sec"><div className="eyebrow">Description</div><p className="t-sm pretty" style={{ marginTop: 8, fontSize: 14 }}>{w.desc}</p></div>
      <div className="sec"><div className="eyebrow" style={{ marginBottom: 8 }}>Skills needed</div><div className="row wrap" style={{ gap: 6 }}>{w.skills.map((s) => <span key={s} className="chip sm">{s}</span>)}</div></div>
      {w.milestones && (
        <div className="sec"><div className="eyebrow" style={{ marginBottom: 8 }}>Proposed milestones</div>
          <div className="list">{w.milestones.map(([t, a], i) => <div key={i} className="li" style={{ cursor: 'default' }}><span className="badge neutral">{i + 1}</span><span className="grow" style={{ fontSize: 14, fontWeight: 600 }}>{t}</span><Money v={a} size={14} /></div>)}</div>
        </div>
      )}
      <div className="sec notice navy"><Icon n="shieldck" s={18} /><span>Payment is secured by the client before work starts. You get paid when the work is approved.</span></div>
      <p className="t-xs" style={{ marginTop: 14 }}>{w.applicants} Taskers applied · Posted {w.posted}</p>
    </>
  );
  const cta = isTasker ? (
    applied ? <div className="row" style={{ gap: 10 }}><span className="badge ok" style={{ height: 32, padding: '0 12px' }}><Icon n="check" s={14} w={2.4} />Applied</span><span className="t-xs grow">The client will review and reply. Being shortlisted is not yet a hire.</span></div>
      : <div className="row" style={{ gap: 10 }}>
        <button className="btn ghost" onClick={() => kt.toggleSave(w.id)} style={{ width: 52, padding: 0 }} aria-label="Save"><svg width="20" height="20" viewBox="0 0 24 24" fill={kt.saved.has(w.id) ? 'var(--accent)' : 'none'} stroke={kt.saved.has(w.id) ? 'var(--accent)' : 'currentColor'} strokeWidth="1.8"><path d="M7 3h10v18l-5-4-5 4z" /></svg></button>
        <button className="btn primary grow" onClick={() => kt.elig === 'ready' ? setApply(true) : kt.go('finish')}>{kt.elig !== 'ready' ? 'Finish profile to apply' : w.kind === 'project' ? 'Send proposal' : 'Apply'}</button>
      </div>
  ) : <div className="notice info"><Icon n="swap" s={18} />Switch to Tasker to apply for this work.</div>;
  return (
    <>
      <TopBar title="" right={<><button className="iconbtn" onClick={() => kt.toast('Link copied')}><Icon n="share" /></button></>} />
      {kt.desk ? (
        <div className="scroller" data-screen-label="Work Detail"><div className="content"><div className="dsplit"><div>{body}</div><div className="side card">{cta}</div></div></div></div>
      ) : (
        <>
          <div className="scroller" data-screen-label="Work Detail"><div className="content">{body}</div></div>
          <div style={{ padding: '12px 16px 26px', background: 'var(--surface)', borderTop: '1px solid var(--line)' }}>{cta}</div>
        </>
      )}
      {apply && <ApplySheet w={w} onClose={() => setApply(false)} />}
    </>
  );
}

function ApplySheet({ w, onClose }) {
  const kt = useKT();
  const [bid, setBid] = React.useState(String(w.budget));
  const net = (+bid.replace(/\D/g, '') || 0) * (1 - KT_COMMISSION);
  return (
    <Sheet title={w.kind === 'project' ? 'Send proposal' : 'Apply for this task'} onClose={onClose}>
      <div className="stack" style={{ gap: 16 }}>
        <div className="field"><label>Your price (UGX)</label><input className="input money" value={Number(bid.replace(/\D/g, '') || 0).toLocaleString()} onChange={(e) => setBid(e.target.value)} /><span className="hint">You’ll receive about <b>UGX {ugx(net)}</b> after the current KaziTasks fee.</span></div>
        <div className="field"><label>Delivery time</label><Chips multi={false} options={['1 day', '3 days', '1 week', '2 weeks']} value="3 days" onChange={() => {}} /></div>
        <div className="field"><label>Message to client</label><textarea className="ta" defaultValue="Hello! I've designed menus for 3 cafés in Kampala and can deliver a print-ready A1 file by Thursday." /></div>
        <button className="fab-sim"><Icon n="clip" s={16} /><span><b>Attach samples</b> · PDF, JPG up to 10 MB</span></button>
        <div className="row between t-xs"><span>Uses 2 credits · 43 left</span><span>Plus plan</span></div>
        <button className="btn primary block" onClick={() => { kt.apply(w.id); onClose(); kt.toast('Application sent'); }}>Submit application</button>
      </div>
    </Sheet>
  );
}

// ---------- Post Work ----------
function PostChooser() {
  const kt = useKT();
  const [k, setK] = React.useState('quick');
  return (
    <>
      <TopBar title="Post work" back={kt.stackDepth > 1} />
      <div className="scroller" data-screen-label="Post Work">
        <div className={'content' + (kt.desk ? ' narrow' : '')}>
          {kt.role === 'tasker' && <div className="notice info" style={{ marginBottom: 14 }}><Icon n="swap" s={18} /><span>You’re posting as a <b>Client</b>. Same account, same wallet.</span></div>}
          <p className="t-sm" style={{ marginBottom: 14 }}>What kind of work is this?</p>
          <div className="stack">
            <button className={'opt' + (k === 'quick' ? ' on' : '')} onClick={() => setK('quick')}>
              <span className="radio" /><div className="grow"><div className="row between"><span className="h-sm" style={{ fontSize: 15 }}>Quick Task</span><Icon n="bolt" s={20} style={{ color: 'var(--accent)' }} /></div><p className="t-sm" style={{ marginTop: 4 }}>Short, simple work with one payment. Repairs, cleaning, a logo, a delivery.</p></div>
            </button>
            <button className={'opt' + (k === 'project' ? ' on' : '')} onClick={() => setK('project')}>
              <span className="radio" /><div className="grow"><div className="row between"><span className="h-sm" style={{ fontSize: 15 }}>Project</span><Icon n="layers" s={20} style={{ color: 'var(--navy)' }} /></div><p className="t-sm" style={{ marginTop: 4 }}>Larger work in stages. Receive proposals, set milestones and pay as each stage is approved.</p></div>
            </button>
          </div>
          <div className="sechead"><h3 className="h-sm">Drafts</h3></div>
          <div className="list"><button className="li" onClick={() => kt.go('postQuick', { draft: true })}><Icon n="doc" s={18} style={{ color: 'var(--muted)' }} /><div className="grow"><div className="h-sm" style={{ fontSize: 13.5 }}>Weekly office cleaning</div><div className="t-xs">Quick Task · edited 2 days ago</div></div><Icon n="chev" s={18} className="chev" /></button></div>
          <button className="btn primary block" style={{ marginTop: 24 }} onClick={() => kt.go(k === 'quick' ? 'postQuick' : 'postProject')}>Continue</button>
        </div>
      </div>
    </>
  );
}

function FormFooter({ step, steps, onBack, onNext, nextLabel = 'Continue', onDraft }) {
  const kt = useKT();
  return (
    <div style={{ padding: '12px 16px 26px', background: 'var(--surface)', borderTop: '1px solid var(--line)', ...(kt.desk ? { padding: '14px 32px' } : {}) }}>
      <div className="row" style={{ gap: 10, maxWidth: kt.desk ? 720 : 'none', margin: '0 auto' }}>
        {step > 0 ? <button className="btn ghost" onClick={onBack}>Back</button> : <button className="btn ghost" onClick={onDraft}>Save draft</button>}
        <button className="btn primary grow" onClick={onNext}>{nextLabel}</button>
      </div>
    </div>
  );
}

function PostQuickScreen() {
  const kt = useKT();
  const [step, setStep] = React.useState(0);
  const [f, setF] = React.useState({ title: kt.params.draft ? 'Weekly office cleaning' : '', cat: kt.params.cat || 'Design', skills: kt.params.skills || [], mode: 'On-site', loc: 'Ntinda, Kampala', deadline: 'This week', pricing: 'Fixed price', amount: '150000', pay: 'wallet', desc: kt.params.desc || '' });
  const set = (k, v) => setF({ ...f, [k]: v });
  const steps = ['What', 'Where & when', 'Budget & payment', 'Review'];
  const toTasker = kt.params.tasker ? taskerById(kt.params.tasker) : null;
  return (
    <>
      <TopBar title={toTasker ? `Custom request to ${toTasker.name.split(' ')[0]}` : 'Quick Task'} sub={`Step ${step + 1} of 4 · ${steps[step]}`} />
      <div style={{ padding: kt.desk ? '0 32px' : '0 16px 6px' }}><div className="stepper" style={{ maxWidth: kt.desk ? 720 : 'none', margin: '0 auto', paddingTop: kt.desk ? 12 : 0 }}>{steps.map((s, i) => <i key={s} className={i <= step ? 'on' : ''} />)}</div></div>
      <div className="scroller" data-screen-label="Post Quick Task">
        <div className={'content' + (kt.desk ? ' narrow' : '')} style={{ paddingTop: 16 }}>
          {step === 0 && <div className="stack" style={{ gap: 18 }}>
            <div className="field"><label>Task title</label><input className="input" placeholder="e.g. Fix leaking kitchen sink" value={f.title} onChange={(e) => set('title', e.target.value)} /></div>
            <div className="field"><label>Category</label><Chips multi={false} options={KT_CATS.slice(0, 9)} value={f.cat} onChange={(v) => set('cat', v)} /></div>
            <ChipPicker label="Skills or service needed" options={KT_SKILLS} value={f.skills} onChange={(v) => set('skills', v)} placeholder="Search skills" />
            <div className="field"><label>Describe the task</label><textarea className="ta" placeholder="What needs to be done? Any special instructions?" value={f.desc} onChange={(e) => set('desc', e.target.value)} /></div>
            <button className="fab-sim"><Icon n="camera" s={18} /><span><b>Add photos or files</b> · helps Taskers quote accurately</span></button>
          </div>}
          {step === 1 && <div className="stack" style={{ gap: 18 }}>
            <div className="field"><label>Work arrangement</label><Seg value={f.mode} options={[['On-site', 'On-site'], ['Remote', 'Remote'], ['Either', 'Either']]} onChange={(v) => set('mode', v)} /></div>
            {f.mode !== 'Remote' && <LocationPicker value={f.loc} onChange={(v) => set('loc', v)} />}
            <div className="field"><label>When do you need it done?</label><Chips multi={false} options={['Today', 'Tomorrow', 'This week', 'Pick a date']} value={f.deadline} onChange={(v) => set('deadline', v)} /></div>
          </div>}
          {step === 2 && <div className="stack" style={{ gap: 18 }}>
            <div className="field"><label>Pricing</label><Seg value={f.pricing} options={[['Fixed price', 'Fixed price'], ['Hourly', 'Per hour'], ['Quote', 'Ask for quotes']]} onChange={(v) => set('pricing', v)} /></div>
            {f.pricing !== 'Quote' && <div className="field"><label>Budget (UGX)</label><input className="input money" style={{ fontSize: 20 }} value={Number(f.amount.replace(/\D/g, '') || 0).toLocaleString()} onChange={(e) => set('amount', e.target.value)} /><div className="row" style={{ gap: 6 }}>{[50000, 100000, 150000, 300000].map((a) => <button key={a} className="chip sm" onClick={() => set('amount', String(a))}>{ugx(a / 1000)}k</button>)}</div></div>}
            <div className="field"><label>How will you pay?</label>
              <div className="stack" style={{ gap: 8 }}>
                <button className={'opt' + (f.pay === 'wallet' ? ' on' : '')} onClick={() => set('pay', 'wallet')}><span className="radio" /><div className="grow"><div className="row between"><span className="h-sm">Pay securely with KaziTasks</span><span className="badge ok">Protected</span></div><p className="t-xs" style={{ marginTop: 3 }}>Wallet or Mobile Money. Held safely until you approve the work.</p></div></button>
                <button className={'opt' + (f.pay === 'cash' ? ' on' : '')} onClick={() => set('pay', 'cash')}><span className="radio" /><div className="grow"><span className="h-sm">Cash / outside KaziTasks</span><p className="t-xs" style={{ marginTop: 3 }}>Pay the Tasker directly.</p></div></button>
              </div>
            </div>
            {f.pay === 'cash' && <div className="notice warn"><Icon n="shield" s={18} /><span>KaziTasks cannot provide escrow protection for money paid outside the platform. Ratings and messaging still apply.</span></div>}
            <p className="t-xs">You won’t be charged now. Money is secured only when you hire someone.</p>
          </div>}
          {step === 3 && <div className="stack">
            <div className="card">
              <KindBadge kind="quick" />
              <div className="h-md" style={{ marginTop: 10 }}>{f.title || 'Untitled task'}</div>
              <p className="t-sm" style={{ marginTop: 4 }}>{f.desc || 'No description yet.'}</p>
              <div className="divider" style={{ margin: '14px 0 6px' }} />
              <div className="kv"><span>Category</span><b>{f.cat}</b></div>
              <div className="kv"><span>Skills</span><b>{f.skills.join(', ') || '—'}</b></div>
              <div className="kv"><span>Where</span><b>{f.mode === 'Remote' ? 'Remote' : f.loc}</b></div>
              <div className="kv"><span>When</span><b>{f.deadline}</b></div>
              <div className="kv"><span>Budget</span><Money v={+f.amount.replace(/\D/g, '') || 0} size={14} /></div>
              <div className="kv"><span>Payment</span><b>{f.pay === 'wallet' ? 'Secure (escrow)' : 'Cash / outside'}</b></div>
            </div>
            <p className="t-xs">Posting uses 1 credit · 44 left on your Plus plan.</p>
          </div>}
        </div>
      </div>
      <FormFooter step={step} steps={4} onDraft={() => { kt.toast('Saved to drafts'); kt.back(); }} onBack={() => setStep(step - 1)} nextLabel={step === 3 ? (toTasker ? 'Send request' : 'Post task') : 'Continue'} onNext={() => step < 3 ? setStep(step + 1) : (kt.toast(toTasker ? 'Request sent to ' + toTasker.name.split(' ')[0] : 'Task posted · Taskers are being notified'), kt.reset('work'))} />
    </>
  );
}

function PostProjectScreen() {
  const kt = useKT();
  const [step, setStep] = React.useState(0);
  const [ms, setMs] = React.useState([['Design', 500000], ['Development', 1500000], ['Testing', 600000], ['Deployment', 400000]]);
  const total = ms.reduce((a, m) => a + (+m[1] || 0), 0);
  const steps = ['Overview', 'Milestones', 'Review'];
  return (
    <>
      <TopBar title="Project" sub={`Step ${step + 1} of 3 · ${steps[step]}`} />
      <div style={{ padding: kt.desk ? '0 32px' : '0 16px 6px' }}><div className="stepper" style={{ maxWidth: kt.desk ? 720 : 'none', margin: '0 auto', paddingTop: kt.desk ? 12 : 0 }}>{steps.map((s, i) => <i key={s} className={i <= step ? 'on' : ''} />)}</div></div>
      <div className="scroller" data-screen-label="Post Project">
        <div className={'content' + (kt.desk ? ' narrow' : '')} style={{ paddingTop: 16 }}>
          {step === 0 && <div className="stack" style={{ gap: 18 }}>
            <div className="field"><label>Project title</label><input className="input" defaultValue="Company website + booking system" /></div>
            <div className="field"><label>Category</label><Chips multi={false} options={['Development', 'Design', 'Research', 'Consulting', 'Construction']} value="Development" onChange={() => {}} /></div>
            <div className="field"><label>Goals & deliverables</label><textarea className="ta" defaultValue="6-page website for Kato Holdings with online booking and Mobile Money payment. Must work well on phones." /></div>
            <div className="field"><label>Receive</label><Seg value="prop" options={[['prop', 'Proposals'], ['invite', 'Invite only']]} onChange={() => {}} /></div>
            <div className="grid2"><div className="field"><label>Start</label><input className="input" defaultValue="1 Nov 2026" /></div><div className="field"><label>Finish by</label><input className="input" defaultValue="20 Dec 2026" /></div></div>
          </div>}
          {step === 1 && <div className="stack">
            <div className="notice navy"><Icon n="shieldck" s={18} /><span>You fund one milestone at a time. Taskers only start a milestone after it’s funded.</span></div>
            {ms.map((m, i) => (
              <div key={i} className="card tight row" style={{ gap: 10 }}>
                <span className="badge neutral" style={{ width: 24, justifyContent: 'center' }}>{i + 1}</span>
                <input className="input grow" style={{ height: 40, border: 0, padding: 0, fontWeight: 600 }} value={m[0]} onChange={(e) => setMs(ms.map((x, j) => j === i ? [e.target.value, x[1]] : x))} />
                <input className="input money" style={{ height: 40, width: 120, textAlign: 'right' }} value={Number(m[1]).toLocaleString()} onChange={(e) => setMs(ms.map((x, j) => j === i ? [x[0], +e.target.value.replace(/\D/g, '')] : x))} />
                <button className="iconbtn" style={{ width: 32, height: 32 }} onClick={() => setMs(ms.filter((_, j) => j !== i))}><Icon n="close" s={16} /></button>
              </div>
            ))}
            <button className="btn soft block sm" onClick={() => setMs([...ms, ['New milestone', 0]])}><Icon n="plus" s={16} />Add milestone</button>
            <div className="card row between"><span className="t-sm">Project total</span><Money v={total} size={18} /></div>
            <div className="card row between" style={{ background: 'var(--surface-2)' }}><span className="t-sm">Due when you hire<br /><span className="t-xs">Milestone 1 only</span></span><Money v={ms[0] ? ms[0][1] : 0} size={16} /></div>
          </div>}
          {step === 2 && <div className="card">
            <KindBadge kind="project" />
            <div className="h-md" style={{ marginTop: 10 }}>Company website + booking system</div>
            <div className="kv" style={{ marginTop: 6 }}><span>Milestones</span><b>{ms.length}</b></div>
            <div className="kv"><span>Timeline</span><b>1 Nov – 20 Dec</b></div>
            <div className="kv"><span>Receiving</span><b>Proposals</b></div>
            <div className="kv total"><span>Total</span><Money v={total} size={16} /></div>
          </div>}
        </div>
      </div>
      <FormFooter step={step} onDraft={() => { kt.toast('Saved to drafts'); kt.back(); }} onBack={() => setStep(step - 1)} nextLabel={step === 2 ? 'Post project' : 'Continue'} onNext={() => step < 2 ? setStep(step + 1) : (kt.toast('Project posted'), kt.reset('work'))} />
    </>
  );
}

// ---------- My Work ----------
const STATUS_CLS = { 'In progress': 'info', 'Receiving applications': 'acc', 'Draft': 'neutral', 'Submitted': 'warn', 'Completed': 'ok' };
function MyWorkScreen() {
  const kt = useKT();
  const [tab, setTab] = React.useState('active');
  const client = kt.role === 'client';
  const items = client ? KT_MY_POSTS : KT_MY_JOBS;
  const filtered = items.filter((p) => tab === 'active' ? p.status !== 'Draft' && p.status !== 'Completed' : tab === 'drafts' ? p.status === 'Draft' : p.status === 'Completed');
  return (
    <>
      <TopBar title="My work" back={kt.stackDepth > 1} right={!client && <button className="btn soft sm" onClick={() => kt.go('findWork')}><Icon n="search" s={16} />Find work</button>} />
      <div className="scroller" data-screen-label="My Work">
        <div className="content">
          <div className="tabs" style={{ marginBottom: 14 }}>
            {(client ? [['active', 'Active'], ['drafts', 'Drafts'], ['done', 'Completed']] : [['active', 'Active'], ['apps', 'Applications'], ['done', 'Completed']]).map(([v, l]) => <button key={v} className={tab === v ? 'on' : ''} onClick={() => setTab(v)}>{l}</button>)}
          </div>
          {tab === 'apps' ? (
            <div className="list">{[['w1', 'Shortlisted', 'acc'], ['w3', 'Under review', 'neutral'], ['w6', 'Declined', 'bad']].map(([id, s, c]) => { const w = KT_WORK.find((x) => x.id === id); return <button key={id} className="li" onClick={() => kt.go('workDetail', { id })}><div className="grow"><div className="h-sm" style={{ fontSize: 13.5 }}>{w.title}</div><div className="t-xs">{w.client} · UGX {ugx(w.budget)}</div></div><span className={'badge ' + c}>{s}</span></button>; })}</div>
          ) : filtered.length === 0 ? <Empty icon="briefcase" title="Nothing here yet" body={client ? 'Completed work will show here with your reviews.' : 'Finished jobs and earnings will appear here.'} /> : (
            <div className={kt.desk ? 'dgrid' : 'stack'}>{filtered.map((p) => {
              const t = p.tasker ? taskerById(p.tasker) : null;
              const go = () => p.status === 'Draft' ? kt.go('postQuick', { draft: true }) : p.status === 'Receiving applications' ? kt.go('applicants', { id: p.id }) : p.kind === 'project' ? kt.go('project', { id: p.id, side: client ? 'client' : 'tasker' }) : kt.go('jobDetail', { id: p.id });
              return (
                <div key={p.id} className="card click" onClick={go}>
                  <div className="row between"><KindBadge kind={p.kind} /><span className={'badge ' + STATUS_CLS[p.status]}>{p.status}</span></div>
                  <div className="h-sm" style={{ marginTop: 10, fontSize: 15 }}>{p.title}</div>
                  <div className="row between" style={{ marginTop: 10 }}>
                    {t ? <div className="row" style={{ gap: 8 }}><Avatar name={t.name} color={t.color} size={24} /><span className="t-xs" style={{ fontWeight: 600 }}>{t.name}</span></div>
                      : p.client ? <span className="t-xs" style={{ fontWeight: 600 }}>{p.client}</span>
                        : <span className="t-xs">{p.applicants ? `${p.applicants} applicants` : 'Not posted'}</span>}
                    {p.amount > 0 && <Money v={p.amount} size={14} />}
                  </div>
                </div>
              );
            })}</div>
          )}
        </div>
      </div>
    </>
  );
}

// ---------- Applicants (client) ----------
function ApplicantsScreen() {
  const kt = useKT();
  const p = KT_MY_POSTS.find((x) => x.id === kt.params.id) || KT_MY_POSTS[2];
  return (
    <>
      <TopBar title="Applicants" sub={p.title} />
      <div className="scroller" data-screen-label="Applicants">
        <div className={'content' + (kt.desk ? ' narrow' : '')}>
          <div className="row" style={{ gap: 8, marginBottom: 14 }}><button className="chip sm on">Best match</button><button className="chip sm">Lowest price</button><button className="chip sm">Top rated</button></div>
          <div className="stack">{KT_APPLICANTS.map((a) => {
            const t = taskerById(a.tasker);
            return (
              <div key={a.tasker} className="card">
                <div className="row" style={{ gap: 12, alignItems: 'flex-start' }}>
                  <button onClick={() => kt.go('tasker', { id: t.id })}><Avatar name={t.name} color={t.color} size={44} online={t.online} sq={t.type !== 'Individual'} /></button>
                  <div className="grow">
                    <div className="row between"><span className="h-sm">{t.name}</span><Money v={a.bid} size={15} /></div>
                    <div className="row" style={{ gap: 8, marginTop: 3 }}><Stars r={t.rating} n={t.reviews} /><span className="t-xs">· {a.days} days · {a.when}</span></div>
                    <div style={{ marginTop: 6 }}><EligBadge s={t.status} short /></div>
                  </div>
                </div>
                <p className="t-sm pretty" style={{ marginTop: 10 }}>“{a.note}”</p>
                <div className="row" style={{ gap: 8, marginTop: 12 }}>
                  <button className="btn ghost sm" onClick={() => kt.go('tasker', { id: t.id })}>Profile</button>
                  <button className="btn ghost sm grow" onClick={() => kt.openChatWith(t.id)}><Icon n="chat" s={15} />Message</button>
                  <button className="btn primary sm grow" disabled={t.status !== 'ready'} onClick={() => kt.go('hire', { tasker: t.id, title: p.title, amount: a.bid })}>Hire</button>
                </div>
              </div>
            );
          })}</div>
        </div>
      </div>
    </>
  );
}

// ---------- Quick Task job detail (escrow + approve) ----------
function JobDetailScreen() {
  const kt = useKT();
  const id = kt.params.id;
  const isClientJob = id === 'm1';
  const p = isClientJob ? KT_MY_POSTS[0] : KT_MY_JOBS[1];
  const t = isClientJob ? taskerById(p.tasker) : null;
  const [st, setSt] = React.useState(isClientJob ? 'progress' : 'submitted');
  const [pin, setPin] = React.useState(false);
  const net = p.amount * (1 - KT_COMMISSION);
  const step = st === 'paid' ? 3 : st === 'submitted' ? 2 : 1;
  return (
    <>
      <TopBar title="Quick Task" right={<button className="iconbtn" onClick={() => isClientJob ? kt.openChatWith(t.id) : kt.go('chats')}><Icon n="chat" /></button>} />
      <div className="scroller" data-screen-label="Quick Task Detail">
        <div className={'content' + (kt.desk ? ' narrow' : '')}>
          <div className="row between"><KindBadge kind="quick" /><span className={'badge ' + (st === 'paid' ? 'ok' : st === 'submitted' ? 'warn' : 'info')}>{st === 'paid' ? 'Completed' : st === 'submitted' ? 'Submitted' : 'In progress'}</span></div>
          <h2 className="h-lg" style={{ marginTop: 10 }}>{p.title}</h2>
          <div className="row" style={{ gap: 10, marginTop: 12 }}>
            <Avatar name={t ? t.name : p.client} color={t ? t.color : '#B8572F'} size={36} sq={!t} />
            <div className="grow"><div className="h-sm" style={{ fontSize: 13.5 }}>{t ? t.name : p.client}</div><div className="t-xs">{isClientJob ? 'Your Tasker' : 'Your client'}</div></div>
          </div>
          <div className="card" style={{ marginTop: 16 }}>
            <div className="row between"><span className="eyebrow">Payment</span><span className="badge ok"><Icon n="lock" s={11} w={2.4} />{st === 'paid' ? 'Released' : 'Secured'}</span></div>
            <MoneyJourney step={step} payee={isClientJob ? 'Brian' : 'You'} />
            <div className="kv" style={{ marginTop: 6 }}><span>Task amount</span><Money v={p.amount} size={14} /></div>
            {!isClientJob && <><div className="kv"><span>KaziTasks fee</span><span className="money" style={{ fontSize: 14 }}>−{ugx(p.amount * KT_COMMISSION)}</span></div><div className="kv total"><span>You receive</span><Money v={net} size={15} /></div></>}
          </div>
          {isClientJob && st === 'progress' && <div className="notice info sec"><Icon n="clock" s={18} />Brian is working on this. You’ll be asked to review when he submits.</div>}
          {st === 'submitted' && isClientJob && <div className="card sec"><div className="h-sm">Brian marked this as done</div><p className="t-sm" style={{ marginTop: 4 }}>“All 3 rooms rewired, new breakers fitted in DB board. Tested every socket.”</p><div className="row" style={{ gap: 8, marginTop: 10 }}><div className="ph" style={{ width: 72, height: 56 }}>photo</div><div className="ph" style={{ width: 72, height: 56 }}>photo</div></div></div>}
          {!isClientJob && st === 'submitted' && <div className="notice warn sec"><Icon n="clock" s={18} />Submitted Sat 18 Oct. Mama Rose Kitchen is reviewing. Funds stay secured until approval.</div>}
          {st === 'paid' && <div className="notice ok sec"><Icon n="check" s={18} />Approved. UGX {ugx(p.amount)} released{isClientJob ? ' to Brian' : ''}. Leave a review to help others.</div>}
          {isClientJob && st === 'progress' && <button className="fab-sim" style={{ marginTop: 14 }} onClick={() => setSt('submitted')}><Icon n="sparkle" s={16} /><span><b>Demo:</b> simulate Tasker submitting work</span></button>}
        </div>
      </div>
      {isClientJob && st === 'submitted' && (
        <div style={{ padding: '12px 16px 26px', background: 'var(--surface)', borderTop: '1px solid var(--line)' }}>
          <div className="row" style={{ gap: 10, maxWidth: kt.desk ? 720 : 'none', margin: '0 auto' }}><button className="btn ghost" onClick={() => { setSt('progress'); kt.toast('Revision requested · funds stay secured'); }}>Request changes</button><button className="btn accent grow" onClick={() => setPin(true)}>Approve & release</button></div>
        </div>
      )}
      {pin && <Sheet onClose={() => setPin(false)}><p className="t-sm" style={{ textAlign: 'center', marginBottom: 6 }}>Release <b>UGX {ugx(p.amount)}</b> to {t.name}</p><PinPad onDone={() => { setPin(false); setSt('paid'); kt.releaseEscrow(p.amount); kt.toast('Payment released'); }} /></Sheet>}
    </>
  );
}

Object.assign(window, { FindWorkScreen, WorkDetailScreen, PostChooser, PostQuickScreen, PostProjectScreen, MyWorkScreen, ApplicantsScreen, JobDetailScreen });
