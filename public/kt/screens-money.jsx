// Wallet, Deposit, Withdraw, Transaction detail, Project (milestones), Milestone detail

function WalletScreen() {
  const kt = useKT();
  const w = kt.wallet;
  const [hide, setHide] = React.useState(false);
  const [sheet, setSheet] = React.useState(null);
  const total = w.available + w.escrow + w.incoming + w.pending + w.reserve;
  const empty = total === 0;
  const parts = [['Available', w.available, 'var(--accent)'], ['In escrow', w.escrow, '#8C9BD4'], ['Pending release', w.incoming, '#5C6A9E'], ['Pending withdrawal', w.pending, '#C9CEE0']];
  const show = (v, size = 15, c) => hide ? <span className="money" style={{ fontSize: size, color: c }}>•••••</span> : <Money v={v} size={size} color={c} />;
  return (
    <>
      <TopBar title="KaziTasks Wallet" back={kt.stackDepth > 1} right={<button className="iconbtn" onClick={() => setHide(!hide)}><Icon n={hide ? 'eyeoff' : 'eye'} /></button>} />
      <div className="scroller" data-screen-label="Wallet">
        <div className={'content' + (kt.desk ? ' narrow' : '')}>
          <div className="hero">
            <div className="ring" />
            <div style={{ fontSize: 12.5, opacity: .7, fontWeight: 600 }}>Available to use</div>
            <div style={{ marginTop: 4 }}>{hide ? <span className="money" style={{ fontSize: 34 }}>•••••••</span> : <span className="money" style={{ fontSize: 34 }}><small style={{ color: 'rgba(255,255,255,.6)' }}>UGX</small>{ugx(w.available)}</span>}</div>
            <div style={{ fontSize: 12.5, opacity: .7, marginTop: 4 }}>Total funds {hide ? '•••' : 'UGX ' + ugx(total)}</div>
            {!empty && <div style={{ display: 'flex', height: 6, borderRadius: 3, overflow: 'hidden', marginTop: 16, gap: 2 }}>{parts.filter((p) => p[1] > 0).map(([l, v, c]) => <i key={l} style={{ flex: v, background: c }} />)}</div>}
            <div className="row" style={{ gap: 10, marginTop: 18 }}>
              <button className="btn accent sm grow" onClick={() => setSheet('deposit')}><Icon n="dn" s={16} />Deposit</button>
              <button className="btn sm grow" style={{ background: 'rgba(255,255,255,.12)', color: '#fff' }} onClick={() => setSheet('withdraw')}><Icon n="up" s={16} />Withdraw</button>
            </div>
          </div>

          {empty ? (
            <div className="card sec"><Empty icon="wallet" title="Your Wallet is empty" body="Deposit with Mobile Money to hire Taskers instantly, or earn by completing work." action={<button className="btn primary sm" onClick={() => setSheet('deposit')}>Deposit money</button>} /></div>
          ) : (
            <div className="list sec">
              {parts.slice(1).map(([l, v, c], i) => (
                <div key={l} className="li" style={{ cursor: 'default' }}>
                  <span style={{ width: 10, height: 10, borderRadius: 3, background: c, flex: 'none' }} />
                  <div className="grow"><div className="h-sm" style={{ fontSize: 13.5 }}>{l}</div><div className="t-xs">{['Held for work you’ve hired', 'Earnings awaiting client approval', 'Being sent to your phone'][i]}</div></div>
                  {show(v, 14)}
                </div>
              ))}
              {w.reserve > 0 && <div className="li" style={{ cursor: 'default' }}><span style={{ width: 10, height: 10, borderRadius: 3, background: '#E5E7EE' }} /><div className="grow"><div className="h-sm" style={{ fontSize: 13.5 }}>Project reserve</div><div className="t-xs">Set aside for upcoming milestones</div></div>{show(w.reserve, 14)}</div>}
            </div>
          )}
          <p className="t-xs" style={{ marginTop: 8, display: 'flex', gap: 6, alignItems: 'center' }}><Icon n="lock" s={13} />Only the Available balance can be withdrawn.</p>

          <div className="sechead"><h3 className="h-md">Activity</h3><a>Statement</a></div>
          {empty ? <Empty icon="clock" title="No activity yet" /> : (
            <div className="list">{kt.tx.map((x) => (
              <button key={x.id} className="li" onClick={() => kt.go('tx', { id: x.id })}>
                <span className={'badge ' + ({ in: 'ok', earn: 'ok', escrow: 'info', out: 'neutral', fee: 'neutral', release: 'acc' }[x.kind])} style={{ width: 36, height: 36, borderRadius: 10, justifyContent: 'center', padding: 0, flex: 'none' }}><Icon n={{ in: 'dn', earn: 'dn', escrow: 'lock', out: 'up', fee: 'crown', release: 'check' }[x.kind]} s={17} /></span>
                <div className="grow" style={{ minWidth: 0 }}><div className="h-sm" style={{ fontSize: 13.5, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{x.t}</div><div className="t-xs">{x.when}</div></div>
                <div style={{ textAlign: 'right' }}><span className="money" style={{ fontSize: 14, color: x.amt > 0 ? 'var(--ok)' : 'var(--ink)' }}>{x.amt > 0 ? '+' : '−'}{ugx(Math.abs(x.amt))}</span><div className="t-xs">{x.st}</div></div>
              </button>
            ))}</div>
          )}

          <div className="list sec">
            <button className="li" onClick={() => kt.toast('PIN change — demo')}><Icon n="lock" s={18} style={{ color: 'var(--muted)' }} /><span className="grow t-sm" style={{ fontWeight: 600 }}>Change Wallet PIN</span><Icon n="chev" s={18} className="chev" /></button>
            <button className="li"><Icon n="phone" s={18} style={{ color: 'var(--muted)' }} /><span className="grow t-sm" style={{ fontWeight: 600 }}>Mobile Money numbers</span><span className="t-xs">2</span><Icon n="chev" s={18} className="chev" /></button>
          </div>
        </div>
      </div>
      {sheet === 'deposit' && <DepositSheet onClose={() => setSheet(null)} />}
      {sheet === 'withdraw' && <WithdrawSheet onClose={() => setSheet(null)} />}
    </>
  );
}

function DepositSheet({ onClose }) {
  const kt = useKT();
  const [amt, setAmt] = React.useState(500000);
  const [net, setNet] = React.useState('mtn');
  const [stage, setStage] = React.useState('form');
  return (
    <Sheet title={stage === 'form' ? 'Deposit money' : null} onClose={onClose}>
      {stage === 'form' ? (
        <div className="stack" style={{ gap: 16 }}>
          <div className="field"><label>Amount (UGX)</label><input className="input money" style={{ fontSize: 22, height: 56 }} value={amt.toLocaleString()} onChange={(e) => setAmt(+e.target.value.replace(/\D/g, '') || 0)} /><div className="row" style={{ gap: 6 }}>{[100000, 250000, 500000, 1000000].map((a) => <button key={a} className={'chip sm' + (amt === a ? ' on' : '')} onClick={() => setAmt(a)}>{a >= 1e6 ? '1M' : a / 1000 + 'k'}</button>)}</div></div>
          <div className="field"><label>From</label>
            <div className="stack" style={{ gap: 8 }}>
              {[['mtn', 'MTN Mobile Money', '•••903'], ['airtel', 'Airtel Money', '•••211'], ['card', 'Bank card', 'Visa / Mastercard']].map(([v, l, s]) => <button key={v} className={'opt' + (net === v ? ' on' : '')} onClick={() => setNet(v)} style={{ padding: 12 }}><span className="radio" /><div className="grow"><div className="h-sm">{l}</div><div className="t-xs">{s}</div></div></button>)}
            </div>
          </div>
          <button className="btn primary block" onClick={() => { setStage('wait'); setTimeout(() => { kt.deposit(amt); setStage('ok'); }, 1600); }}>Deposit UGX {ugx(amt)}</button>
        </div>
      ) : stage === 'wait' ? (
        <div style={{ textAlign: 'center', padding: '24px 0' }}><div style={{ width: 56, height: 56, borderRadius: '50%', border: '3px solid var(--line)', borderTopColor: 'var(--accent)', margin: '0 auto', animation: 'spin 1s linear infinite' }} /><style>{'@keyframes spin{to{transform:rotate(360deg)}}'}</style><h3 className="h-md" style={{ marginTop: 16 }}>Check your phone</h3><p className="t-sm" style={{ marginTop: 4 }}>Enter your Mobile Money PIN to approve UGX {ugx(amt)}.</p></div>
      ) : (
        <div style={{ textAlign: 'center', padding: '20px 0 4px' }}><div style={{ width: 56, height: 56, borderRadius: '50%', background: 'var(--ok-bg)', color: 'var(--ok)', display: 'grid', placeItems: 'center', margin: '0 auto' }}><Icon n="check" s={28} w={2.4} /></div><h3 className="h-md" style={{ marginTop: 14 }}>UGX {ugx(amt)} added</h3><p className="t-sm" style={{ marginTop: 4 }}>Your available balance is now UGX {ugx(kt.wallet.available)}.</p><button className="btn primary block" style={{ marginTop: 18 }} onClick={onClose}>Done</button></div>
      )}
    </Sheet>
  );
}

function WithdrawSheet({ onClose }) {
  const kt = useKT();
  const max = kt.wallet.available;
  const [amt, setAmt] = React.useState(Math.min(300000, max));
  const [stage, setStage] = React.useState('form');
  const over = amt > max;
  return (
    <Sheet title={stage === 'form' ? 'Withdraw' : null} onClose={onClose}>
      {stage === 'form' && <div className="stack" style={{ gap: 16 }}>
        <div className="field"><label>Amount (UGX)</label><input className="input money" style={{ fontSize: 22, height: 56, borderColor: over ? 'var(--bad)' : undefined }} value={amt.toLocaleString()} onChange={(e) => setAmt(+e.target.value.replace(/\D/g, '') || 0)} />
          <div className="row between"><span className="hint" style={{ color: over ? 'var(--bad)' : undefined }}>{over ? 'More than your available balance' : `Available: UGX ${ugx(max)}`}</span><button className="link t-xs" onClick={() => setAmt(max)}>Withdraw all</button></div></div>
        <div className="notice navy"><Icon n="lock" s={18} /><span>Money in escrow and pending release can’t be withdrawn until the work is approved.</span></div>
        <div className="field"><label>Send to</label><button className="opt on" style={{ padding: 12 }}><span className="radio" /><div className="grow"><div className="h-sm">Airtel Money</div><div className="t-xs">Daniel Kato · •••211</div></div></button></div>
        <button className="btn primary block" disabled={over || !amt} onClick={() => setStage('pin')}>Continue</button>
      </div>}
      {stage === 'pin' && <PinPad sub={`Withdraw UGX ${ugx(amt)} to Airtel •••211`} onDone={() => { kt.withdraw(amt); setStage('ok'); }} />}
      {stage === 'ok' && <div style={{ textAlign: 'center', padding: '20px 0 4px' }}><div style={{ width: 56, height: 56, borderRadius: '50%', background: 'var(--info-bg)', color: 'var(--info)', display: 'grid', placeItems: 'center', margin: '0 auto' }}><Icon n="up" s={26} w={2.2} /></div><h3 className="h-md" style={{ marginTop: 14 }}>Withdrawal on its way</h3><p className="t-sm" style={{ marginTop: 4 }}>UGX {ugx(amt)} is pending. You’ll get an SMS when it arrives, usually within minutes.</p><button className="btn primary block" style={{ marginTop: 18 }} onClick={onClose}>Done</button></div>}
    </Sheet>
  );
}

function TxScreen() {
  const kt = useKT();
  const x = kt.tx.find((t) => t.id === kt.params.id) || kt.tx[0];
  const gross = x.gross || Math.abs(x.amt);
  return (
    <>
      <TopBar title="Transaction" />
      <div className="scroller" data-screen-label="Transaction Detail">
        <div className={'content' + (kt.desk ? ' narrow' : '')}>
          <div className="card" style={{ textAlign: 'center', padding: '24px 16px' }}>
            <div className="t-xs">{x.t}</div>
            <div className="money" style={{ fontSize: 30, marginTop: 6, color: x.amt > 0 ? 'var(--ok)' : 'var(--ink)' }}>{x.amt > 0 ? '+' : '−'}{ugx(Math.abs(x.amt))}</div>
            <span className={'badge ' + (x.st === 'Completed' ? 'ok' : 'info')} style={{ marginTop: 8 }}>{x.st}</span>
          </div>
          {x.kind === 'escrow' && <div className="card sec"><MoneyJourney step={1} payee="Tasker" compact /><p className="t-xs" style={{ marginTop: 10, textAlign: 'center' }}>Held safely until you approve the work.</p></div>}
          <div className="card sec">
            <div className="kv"><span>Reference</span><span className="mono">KZT-{x.id.toUpperCase()}-88214</span></div>
            <div className="kv"><span>Date</span><b>{x.when}</b></div>
            <div className="kv"><span>Details</span><b style={{ textAlign: 'right' }}>{x.sub}</b></div>
            {x.kind === 'earn' && <><div className="kv"><span>Milestone amount</span><Money v={gross} size={14} /></div><div className="kv"><span>KaziTasks fee</span><span className="money" style={{ fontSize: 14 }}>−{ugx(gross - x.amt)}</span></div><div className="kv total"><span>You received</span><Money v={x.amt} size={15} /></div></>}
          </div>
          <button className="btn ghost block sec"><Icon n="flag" s={16} />Report a problem</button>
        </div>
      </div>
    </>
  );
}

// ---------- Project + Milestones ----------
const MS_LABEL = { notfunded: ['Not funded', 'neutral'], funded: ['Funded', 'info'], progress: ['In progress', 'info'], submitted: ['Submitted', 'warn'], revision: ['Revision requested', 'bad'], resubmitted: ['Resubmitted', 'warn'], approved: ['Approved', 'ok'], paid: ['Paid', 'ok'] };

function useProject() {
  const kt = useKT();
  const side = kt.params.side || (kt.role === 'client' ? 'client' : 'tasker');
  const p = side === 'client' ? KT_MY_POSTS.find((x) => x.id === 'm2') : KT_MY_JOBS.find((x) => x.id === 'j1');
  const cur = side === 'client' ? 0 : 1;
  const states = p.milestones.map((_, i) => i < cur ? 'paid' : i === cur ? kt.msState : 'notfunded');
  return { side, p, cur, states, other: side === 'client' ? taskerById('t5') : { name: 'Kyaninga Foundation', color: '#1E7F74' } };
}

function ProjectScreen() {
  const kt = useKT();
  const { side, p, states, other } = useProject();
  const [tab, setTab] = React.useState('milestones');
  const paid = p.milestones.reduce((a, m, i) => a + (states[i] === 'paid' ? m.amt : 0), 0);
  const secured = p.milestones.reduce((a, m, i) => a + (['funded', 'progress', 'submitted', 'revision', 'resubmitted', 'approved'].includes(states[i]) ? m.amt : 0), 0);
  return (
    <>
      <TopBar title="Project" sub={p.title} right={<button className="iconbtn" onClick={() => side === 'client' ? kt.openChatWith('t5') : kt.go('chats')}><Icon n="chat" /></button>} />
      <div className="scroller" data-screen-label="Project">
        <div className={'content' + (kt.desk ? ' narrow' : '')}>
          <div className="card">
            <div className="row" style={{ gap: 12 }}>
              <Avatar name={other.name} color={other.color} size={40} sq={side === 'tasker'} />
              <div className="grow"><div className="h-sm">{p.title}</div><div className="t-xs">{side === 'client' ? 'with ' + other.name : 'for ' + other.name}</div></div>
            </div>
            <div style={{ display: 'flex', height: 8, borderRadius: 4, overflow: 'hidden', marginTop: 16, background: 'var(--line-2)' }}>
              <i style={{ width: (paid / p.amount * 100) + '%', background: 'var(--ok)' }} />
              <i style={{ width: (secured / p.amount * 100) + '%', background: 'var(--accent)' }} />
            </div>
            <div className="row" style={{ marginTop: 10, gap: 16, flexWrap: 'wrap' }}>
              <span className="t-xs"><b style={{ color: 'var(--ok)' }}>●</b> Paid {ugx(paid)}</span>
              <span className="t-xs"><b style={{ color: 'var(--accent)' }}>●</b> Secured {ugx(secured)}</span>
              <span className="t-xs" style={{ marginLeft: 'auto' }}>of UGX {ugx(p.amount)}</span>
            </div>
          </div>
          <div className="tabs" style={{ marginTop: 16 }}>{[['milestones', 'Milestones'], ['files', 'Files'], ['team', 'Workspace'], ['activity', 'Activity']].map(([v, l]) => <button key={v} className={tab === v ? 'on' : ''} onClick={() => setTab(v)}>{l}</button>)}</div>
          <div style={{ paddingTop: 16 }}>
            {tab === 'milestones' && p.milestones.map((m, i) => {
              const s = states[i]; const [lab, cls] = MS_LABEL[s];
              const last = i === p.milestones.length - 1;
              return (
                <div key={i} className="ms-step">
                  <div className="rail"><span className={'dotc' + (s === 'paid' || s === 'approved' ? ' done' : s !== 'notfunded' ? ' act' : '')}>{s === 'paid' || s === 'approved' ? <Icon n="check" s={14} w={3} /> : i + 1}</span>{!last && <span className="ln" />}</div>
                  <button className="card click grow" style={{ marginBottom: 12, textAlign: 'left' }} onClick={() => kt.go('milestone', { id: p.id, idx: i, side })}>
                    <div className="row between"><span className="h-sm">{m.t}</span><Money v={m.amt} size={14} /></div>
                    <div className="row between" style={{ marginTop: 6 }}><span className={'badge ' + cls}>{lab}</span><span className="t-xs">Due {m.due}</span></div>
                  </button>
                </div>
              );
            })}
            {tab === 'files' && <div className="list">{['Kato-website-design-v2.pdf', 'Brand-assets.zip', 'Sitemap.png'].map((f) => <div key={f} className="li"><Icon n="file" s={18} style={{ color: 'var(--navy)' }} /><span className="grow t-sm" style={{ fontWeight: 600 }}>{f}</span><span className="t-xs">Oct</span></div>)}</div>}
            {tab === 'team' && <div className="stack">
              <div className="list">{[['Daniel Kato', 'Owner · Client', '#F7941D'], ['Joseph Mugisha', 'Lead Tasker', '#3C4460'], ['Esther Nambi', 'Collaborator · can approve', '#7B4FB8']].map(([n, r, c]) => <div key={n} className="li"><Avatar name={n} color={c} size={36} /><div className="grow"><div className="h-sm" style={{ fontSize: 13.5 }}>{n}</div><div className="t-xs">{r}</div></div></div>)}</div>
              <button className="btn soft block sm"><Icon n="plus" s={16} />Invite collaborator</button>
            </div>}
            {tab === 'activity' && <div className="stack" style={{ gap: 14 }}>{[['Joseph uploaded Kato-website-design-v2.pdf', '10:41'], ['Milestone 1 funded · UGX 500,000 secured', '17 Oct'], ['Joseph accepted the project', '16 Oct'], ['Daniel hired Joseph Mugisha', '16 Oct']].map(([a, d]) => <div key={a} className="row" style={{ gap: 10, alignItems: 'flex-start' }}><span style={{ width: 8, height: 8, borderRadius: 4, background: 'var(--line)', marginTop: 6 }} /><span className="grow t-sm">{a}</span><span className="t-xs">{d}</span></div>)}</div>}
          </div>
        </div>
      </div>
    </>
  );
}

function MilestoneScreen() {
  const kt = useKT();
  const { side, p, cur, states, other } = useProject();
  const idx = kt.params.idx ?? cur;
  const m = p.milestones[idx];
  const s = states[idx];
  const isCur = idx === cur;
  const [lab, cls] = MS_LABEL[s];
  const [sheet, setSheet] = React.useState(null);
  const [note, setNote] = React.useState('');
  const fee = m.amt * KT_COMMISSION;
  const jStep = { notfunded: 0, funded: 1, progress: 1, submitted: 1, revision: 1, resubmitted: 1, approved: 2, paid: 3 }[s];
  const client = side === 'client';
  const set = (v, msg) => { kt.setMs(v); msg && kt.toast(msg); };

  let action = null;
  if (isCur) {
    if (client) {
      if (s === 'notfunded') action = <button className="btn primary block" onClick={() => setSheet('fund')}><Icon n="lock" s={18} />Fund milestone · UGX {ugx(m.amt)}</button>;
      else if (s === 'submitted' || s === 'resubmitted') action = <div className="row" style={{ gap: 10 }}><button className="btn ghost" onClick={() => setSheet('revise')}>Request changes</button><button className="btn accent grow" onClick={() => setSheet('approve')}>Approve & release</button></div>;
      else if (s === 'approved') action = <div className="notice ok"><Icon n="check" s={18} />Approved — payment is being released.</div>;
      else if (s === 'funded' || s === 'progress' || s === 'revision') action = <div className="notice info"><Icon n="clock" s={18} />{other.name.split(' ')[0]} is working on this milestone. Funds stay secured.</div>;
    } else {
      if (s === 'notfunded') action = <div className="notice warn"><Icon n="lock" s={18} /><span>Waiting for the client to fund this milestone. Don’t start until it’s secured.</span></div>;
      else if (s === 'funded') action = <button className="btn primary block" onClick={() => set('progress', 'Milestone started')}>Start work</button>;
      else if (s === 'progress' || s === 'revision') action = <button className="btn primary block" onClick={() => setSheet('submit')}>{s === 'revision' ? 'Resubmit work' : 'Submit for approval'}</button>;
      else if (s === 'submitted' || s === 'resubmitted') action = <div className="notice warn"><Icon n="clock" s={18} />Submitted. Waiting for client approval — funds are secured.</div>;
    }
  }

  return (
    <>
      <TopBar title={`Milestone ${idx + 1}`} sub={p.title} />
      <div className="scroller" data-screen-label="Milestone Detail">
        <div className={'content' + (kt.desk ? ' narrow' : '')}>
          <div className="row between"><span className={'badge ' + cls}>{lab}</span><span className="t-xs">Due {m.due}</span></div>
          <h2 className="h-lg" style={{ marginTop: 8 }}>{m.t}</h2>
          <p className="t-sm pretty" style={{ marginTop: 6, fontSize: 14 }}>{m.d}</p>

          <div className="card sec">
            <div className="row between"><span className="eyebrow">Payment</span>{s !== 'notfunded' && <span className="badge ok"><Icon n="lock" s={11} w={2.4} />{s === 'paid' ? 'Released' : 'Secured'}</span>}</div>
            <MoneyJourney step={jStep} payee={client ? other.name.split(' ')[0] : 'You'} />
            <div className="kv" style={{ marginTop: 6 }}><span>Milestone amount</span><Money v={m.amt} size={14} /></div>
            {!client && <><div className="kv"><span>KaziTasks fee (current rate)</span><span className="money" style={{ fontSize: 14 }}>−{ugx(fee)}</span></div><div className="kv total"><span>You receive</span><Money v={m.amt - fee} size={15} /></div></>}
          </div>

          {(s === 'submitted' || s === 'resubmitted' || s === 'approved' || s === 'paid' || s === 'revision') && (
            <div className="card sec">
              <div className="eyebrow" style={{ marginBottom: 10 }}>{s === 'resubmitted' ? 'Resubmission' : 'Submission'}</div>
              <p className="t-sm">“All 6 pages designed in mobile and desktop. Booking flow included. Ready for your feedback.”</p>
              <div className="list" style={{ marginTop: 10 }}><div className="li"><Icon n="file" s={18} style={{ color: 'var(--navy)' }} /><span className="grow t-sm" style={{ fontWeight: 600 }}>Kato-website-design-v2.pdf</span><span className="t-xs">4.2 MB</span></div></div>
              {s === 'revision' && <div className="notice warn" style={{ marginTop: 10 }}><Icon n="revise" s={18} /><span><b>Changes requested:</b> {note || 'Please use our navy as the primary button colour and add a Luganda toggle to the header.'}</span></div>}
            </div>
          )}

          <div className="sec">{action}</div>

          {isCur && (
            <div className="card sec" style={{ background: 'var(--surface-2)' }}>
              <div className="eyebrow" style={{ marginBottom: 8 }}>Milestone lifecycle</div>
              <div className="row wrap" style={{ gap: 4 }}>{Object.keys(MS_LABEL).map((k, i) => <React.Fragment key={k}><span className={'badge ' + (k === s ? MS_LABEL[k][1] : 'neutral')} style={k === s ? null : { opacity: .55 }}>{MS_LABEL[k][0]}</span>{i < 7 && <span className="t-xs">›</span>}</React.Fragment>)}</div>
              <p className="t-xs" style={{ marginTop: 8 }}>Switch Client/Tasker or use Tweaks to see each state from both sides.</p>
            </div>
          )}
        </div>
      </div>

      {sheet === 'fund' && <Sheet onClose={() => setSheet(null)}><p className="t-sm" style={{ textAlign: 'center' }}>Secure <b>UGX {ugx(m.amt)}</b> for “{m.t}”</p><p className="t-xs" style={{ textAlign: 'center', marginTop: 2 }}>From Wallet · Available UGX {ugx(kt.wallet.available)}</p><PinPad onDone={() => { setSheet(null); kt.lockEscrow(m.amt, 'wallet'); set('funded', 'Milestone funded · Joseph can start'); }} /></Sheet>}
      {sheet === 'approve' && <Sheet onClose={() => setSheet(null)}>
        <h3 className="h-md" style={{ textAlign: 'center' }}>Release payment?</h3>
        <MoneyJourney step={2} payee={other.name.split(' ')[0]} compact />
        <p className="t-xs" style={{ textAlign: 'center', margin: '10px 0 4px' }}>UGX {ugx(m.amt)} goes to {other.name}. This can’t be undone.</p>
        <PinPad label="Confirm with Wallet PIN" onDone={() => { setSheet(null); set('approved'); kt.releaseEscrow(m.amt); setTimeout(() => kt.setMs('paid'), 1400); kt.toast('Payment released to Joseph'); }} />
      </Sheet>}
      {sheet === 'revise' && <Sheet title="Request changes" onClose={() => setSheet(null)}>
        <div className="stack" style={{ gap: 14 }}>
          <div className="notice navy"><Icon n="lock" s={18} />UGX {ugx(m.amt)} stays secured until you approve.</div>
          <textarea className="ta" placeholder="What should be changed?" value={note} onChange={(e) => setNote(e.target.value)} />
          <button className="fab-sim"><Icon n="clip" s={16} /><span><b>Attach reference</b></span></button>
          <button className="btn primary block" onClick={() => { setSheet(null); set('revision', 'Changes requested'); }}>Send request</button>
        </div>
      </Sheet>}
      {sheet === 'submit' && <Sheet title="Submit for approval" onClose={() => setSheet(null)}>
        <div className="stack" style={{ gap: 14 }}>
          <textarea className="ta" defaultValue="All 32 pages laid out with infographics. Ready for your review." />
          <button className="fab-sim"><Icon n="clip" s={16} /><span><b>Kyaninga-AR-layout.pdf</b> · 18 MB attached</span></button>
          <button className="btn primary block" onClick={() => { setSheet(null); set(s === 'revision' ? 'resubmitted' : 'submitted', 'Submitted · client notified'); }}>Submit</button>
        </div>
      </Sheet>}
    </>
  );
}

Object.assign(window, { WalletScreen, TxScreen, ProjectScreen, MilestoneScreen, MS_LABEL });
