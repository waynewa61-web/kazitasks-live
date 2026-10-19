const fs = require('fs');

// 1. Create the exact styles.css from your prototype
const css = `@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap');

:root{
  --navy:#2A3458; --navy-d:#1B2340; --navy-dd:#121830;
  --accent:#F7941D; --accent-ink:#1B2238;
  --ink:#1A2036; --ink-2:#3C4460; --muted:#6E7591; --faint:#9AA0B6;
  --line:#E5E7EE; --line-2:#EEF0F4;
  --bg:#F4F5F8; --surface:#FFFFFF; --surface-2:#F8F9FB;
  --ok:#1E9E6A; --ok-bg:#E6F5EE; --warn:#C27A0E; --warn-bg:#FDF2DF; --bad:#C8423A; --bad-bg:#FBE9E7; --info:#2F5BD3; --info-bg:#E9EFFC;
  --r-sm:8px; --r:12px; --r-lg:16px; --r-pill:999px;
  --pad:16px; --gap:12px; --row:14px;
  --font:'Plus Jakarta Sans', system-ui, sans-serif;
  --mono:'JetBrains Mono', ui-monospace, monospace;
}
*{box-sizing:border-box}
html,body{margin:0;height:100%;background:#E3E5EB;font-family:var(--font);color:var(--ink);-webkit-font-smoothing:antialiased}
a { color: inherit; text-decoration: none; }
button{font-family:inherit;color:inherit;cursor:pointer;border:0;background:none;padding:0}
input,textarea,select{font-family:inherit;color:inherit}

.app{display:flex;flex-direction:column;height:100%;min-height:100vh;position:relative;background:var(--bg); max-width: 480px; margin: 0 auto; box-shadow: 0 0 40px rgba(0,0,0,0.1);}
.app .body{flex:1;display:flex;min-height:0}
.app .main{flex:1;display:flex;flex-direction:column;min-width:0;position:relative}
.scroller{flex:1;overflow-y:auto;overflow-x:hidden;scrollbar-width:none}
.scroller::-webkit-scrollbar{display:none}
.content{padding:0 var(--pad) 28px}
.topbar{display:flex;align-items:center;gap:8px;padding:16px var(--pad) 10px;min-height:52px;flex:none;background:var(--bg);position:relative;z-index:3}
.topbar h1{font-size:17px;font-weight:700;margin:0;flex:1;letter-spacing:-.01em;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.topbar .sub{font-size:12px;color:var(--muted);font-weight:500}
.iconbtn{width:40px;height:40px;border-radius:var(--r-pill);display:grid;place-items:center;flex:none;position:relative;color:var(--ink)}
.iconbtn:hover{background:rgba(42,52,88,.06)}

.tabbar{display:flex;background:var(--surface);border-top:1px solid var(--line);padding:6px 6px 22px;flex:none;position:relative;z-index:4;justify-content:space-around}
.tabbar button, .tabbar a{flex:1;display:flex;flex-direction:column;align-items:center;gap:3px;font-size:10.5px;font-weight:600;color:var(--faint);padding:4px 0}
.tabbar button.on, .tabbar a.on{color:var(--navy)}
.tabbar .postbtn{width:46px;height:46px;border-radius:15px;background:var(--navy);color:#fff;display:grid;place-items:center;margin-top:-18px;box-shadow:0 8px 18px -6px rgba(27,35,64,.55)}

.h-xl{font-size:26px;font-weight:800;letter-spacing:-.025em;line-height:1.15;margin:0}
.h-lg{font-size:20px;font-weight:700;letter-spacing:-.02em;line-height:1.2;margin:0}
.h-md{font-size:16px;font-weight:700;letter-spacing:-.01em;margin:0}
.h-sm{font-size:14px;font-weight:700;margin:0}
.t-sm{font-size:13px;color:var(--ink-2);line-height:1.5}
.t-xs{font-size:12px;color:var(--muted)}
.mono{font-family:var(--mono);font-size:11px;letter-spacing:.02em}
.eyebrow{font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.08em;color:var(--muted)}
.money{font-variant-numeric:tabular-nums;font-weight:700;letter-spacing:-.01em}
.money small{font-size:.62em;font-weight:600;color:var(--muted);margin-right:3px;letter-spacing:.02em}

.row{display:flex;align-items:center;gap:var(--gap)}
.between{justify-content:space-between}
.grow{flex:1;min-width:0}
.wrap{flex-wrap:wrap}
.sec{margin-top:22px}
.sechead{display:flex;align-items:baseline;justify-content:space-between;margin:22px 0 10px}
.sechead a,.link{font-size:13px;font-weight:600;color:var(--navy);cursor:pointer}
.hscroll{display:flex;gap:var(--gap);overflow-x:auto;margin:0 calc(-1 * var(--pad));padding:2px var(--pad) 6px;scrollbar-width:none}
.hscroll::-webkit-scrollbar{display:none}
.grid2{display:grid;grid-template-columns:1fr 1fr;gap:var(--gap)}
.stack{display:flex;flex-direction:column;gap:var(--gap)}
.divider{height:1px;background:var(--line);margin:4px 0}

.card{background:var(--surface);border:1px solid var(--line);border-radius:var(--r);padding:var(--pad)}
.card.click{cursor:pointer;transition:border-color .15s, box-shadow .15s}
.card.click:hover{border-color:#CDD2DE;box-shadow:0 4px 14px -8px rgba(27,35,64,.18)}
.list{background:var(--surface);border:1px solid var(--line);border-radius:var(--r);overflow:hidden}
.li{display:flex;align-items:center;gap:12px;padding:var(--row) var(--pad);border-bottom:1px solid var(--line-2);cursor:pointer;text-align:left;width:100%}
.li:last-child{border-bottom:0}
.li:hover{background:var(--surface-2)}

.btn{display:inline-flex;align-items:center;justify-content:center;gap:8px;height:48px;padding:0 20px;border-radius:12px;font-weight:700;font-size:15px;white-space:nowrap;transition:transform .08s, background .15s}
.btn:active{transform:scale(.98)}
.btn.sm{height:36px;padding:0 14px;font-size:13px;border-radius:10px}
.btn.block{width:100%}
.btn.primary{background:var(--navy);color:#fff}
.btn.accent{background:var(--accent);color:var(--accent-ink)}
.btn.ghost{background:var(--surface);color:var(--ink);border:1px solid var(--line)}
.btn.soft{background:rgba(42,52,88,.07);color:var(--navy)}

.chip{display:inline-flex;align-items:center;gap:6px;height:34px;padding:0 13px;border-radius:var(--r-pill);border:1px solid var(--line);background:var(--surface);font-size:13px;font-weight:600;color:var(--ink-2);white-space:nowrap;flex:none}
.chip.on{background:var(--navy);border-color:var(--navy);color:#fff}
.chip.sm{height:28px;padding:0 10px;font-size:12px}
.badge{display:inline-flex;align-items:center;gap:4px;height:22px;padding:0 8px;border-radius:6px;font-size:11px;font-weight:700;white-space:nowrap;letter-spacing:.01em}
.badge.ok{background:var(--ok-bg);color:var(--ok)}
.badge.warn{background:var(--warn-bg);color:var(--warn)}
.badge.bad{background:var(--bad-bg);color:var(--bad)}
.badge.info{background:var(--info-bg);color:var(--info)}
.badge.neutral{background:var(--line-2);color:var(--ink-2)}
.badge.navy{background:var(--navy);color:#fff}
.badge.acc{background:color-mix(in oklch, var(--accent) 18%, white);color:color-mix(in oklch, var(--accent) 60%, black)}
.count{min-width:18px;height:18px;border-radius:9px;background:var(--accent);color:var(--accent-ink);font-size:10.5px;font-weight:800;display:inline-grid;place-items:center;padding:0 5px}

.av{border-radius:50%;display:grid;place-items:center;font-weight:700;color:#fff;flex:none;position:relative;letter-spacing:-.02em}
.av.sq{border-radius:28%}

.field{display:flex;flex-direction:column;gap:6px}
.field label{font-size:13px;font-weight:600;color:var(--ink-2)}
.input{height:48px;border:1px solid var(--line);border-radius:var(--r-sm);background:var(--surface);padding:0 14px;font-size:15px;outline:none;width:100%}
.input:focus{border-color:var(--navy);box-shadow:0 0 0 3px rgba(42,52,88,.1)}
.seg{display:flex;background:rgba(42,52,88,.06);border-radius:11px;padding:3px;gap:2px}
.seg button{flex:1;height:34px;border-radius:9px;font-size:13px;font-weight:700;color:var(--muted);white-space:nowrap;padding:0 10px}
.seg button.on{background:var(--surface);color:var(--ink);box-shadow:0 1px 3px rgba(20,30,60,.12)}
.hero{border-radius:var(--r-lg);padding:18px;color:#fff;background:var(--navy);position:relative;overflow:hidden}
.navyband{background:var(--navy);color:#fff;padding:0 var(--pad) 22px;margin:0 calc(-1*var(--pad))}
.notice{display:flex;gap:10px;padding:12px 14px;border-radius:var(--r);font-size:13px;line-height:1.45;align-items:flex-start}
.notice.navy{background:color-mix(in oklch, var(--navy) 6%, white);color:var(--navy)}
.notice.ok{background:var(--ok-bg);color:#14684A}
.notice.warn{background:var(--warn-bg);color:#7A4C06}
`;
fs.writeFileSync('app/globals.css', css);

// 2. Create the main Prototype component
fs.mkdirSync('components', { recursive: true });
fs.writeFileSync('components/Prototype.tsx', `"use client";
import React, { useState, useEffect } from "react";
import { Home, Briefcase, PlusSquare, MessageCircle, User, Search, Wallet, ChevronLeft, Lock, ShieldCheck, ArrowDownLeft, ArrowUpRight } from "lucide-react";

const Icon = ({ n, size = 20, style }: any) => {
  const icons: any = { home: Home, work: Briefcase, plus: PlusSquare, chat: MessageCircle, user: User, search: Search, wallet: Wallet, back: ChevronLeft, lock: Lock, shieldck: ShieldCheck, dn: ArrowDownLeft, up: ArrowUpRight };
  const Comp = icons[n] || Home;
  return <Comp size={size} style={style} />;
};

const Avatar = ({ name, color = '#2A3458', size = 40 }: any) => {
  const initials = name.split(' ').map((w: string) => w[0]).slice(0, 2).join('').toUpperCase();
  return <div style={{ width: size, height: size, background: color, fontSize: size * 0.36, borderRadius: '50%', display: 'grid', placeItems: 'center', color: '#fff', fontWeight: 700, flex: 'none' }}>{initials}</div>;
};

const Money = ({ v, size = 16 }: any) => <span className="money" style={{ fontSize: size }}><small>UGX</small>{Number(v).toLocaleString()}</span>;

const TaskCard = ({ title, type, amount, onClick }: any) => (
  <div className="card click" onClick={onClick}>
    <div className="row between" style={{ marginBottom: 8 }}>
      <span className="badge navy">{type}</span>
      <span className="t-xs">Remote</span>
    </div>
    <div className="h-sm pretty" style={{ fontSize: 15, lineHeight: 1.35 }}>{title}</div>
    <div className="row between" style={{ marginTop: 12, paddingTop: 12, borderTop: '1px solid var(--line-2)' }}>
      <Money v={amount} size={16} />
    </div>
  </div>
);

export default function Prototype() {
  const [tab, setTab] = useState('home');
  const [wallet, setWallet] = useState({ available: 1240000, escrow: 680000, pending: 0 });

  useEffect(() => {
    fetch('/api/wallet').then(r => r.json()).then(d => {
      if (d.wallet) setWallet({ available: d.wallet.balance || 0, escrow: d.wallet.escrow || 0, pending: 0 });
    }).catch(() => {});
  }, []);

  return (
    <div className="app">
      <div className="body">
        <div className="main">
          <div className="scroller">
            
            {tab === 'home' && (
              <>
                <div className="navyband" style={{ paddingTop: 16 }}>
                  <div className="row between" style={{ marginBottom: 16 }}>
                    <div className="seg" style={{ width: 196, background: 'rgba(255,255,255,.12)' }}>
                      <button className="on">Client</button>
                      <button style={{ color: 'rgba(255,255,255,.75)' }}>Tasker</button>
                    </div>
                    <Avatar name="Daniel Kato" color="#F7941D" size={34} />
                  </div>
                  <p style={{ fontSize: 14, opacity: .7, fontWeight: 500 }}>Good morning, Daniel</p>
                  <h2 className="h-xl" style={{ marginTop: 2 }}>What do you need done?</h2>
                  <button className="searchbar" style={{ marginTop: 16, border: 0, height: 46, borderRadius: 12, background: 'var(--surface)', padding: '0 14px', display: 'flex', alignItems: 'center', gap: 10, color: 'var(--muted)', width: '100%' }}>
                    <Icon n="search" size={19} /> Try “plumber” or “logo design”
                  </button>
                </div>
                
                <div className="content" style={{ paddingTop: 16 }}>
                  <div className="grid2">
                    <div className="card click" onClick={() => setTab('post')}>
                      <div style={{ width: 36, height: 36, borderRadius: 10, background: 'var(--surface-2)', color: 'var(--accent)', display: 'grid', placeItems: 'center' }}><Icon n="plus" size={19} /></div>
                      <div className="h-sm" style={{ marginTop: 12 }}>Quick Task</div>
                      <div className="t-xs" style={{ marginTop: 2 }}>Repairs, cleaning, design</div>
                    </div>
                    <div className="card click" onClick={() => setTab('post')}>
                      <div style={{ width: 36, height: 36, borderRadius: 10, background: 'var(--surface-2)', color: 'var(--navy)', display: 'grid', placeItems: 'center' }}><Icon n="work" size={19} /></div>
                      <div className="h-sm" style={{ marginTop: 12 }}>Project</div>
                      <div className="t-xs" style={{ marginTop: 2 }}>Milestones, staged pay</div>
                    </div>
                  </div>

                  <div className="sechead"><h3 className="h-md">Wallet Summary</h3></div>
                  <div className="card click" onClick={() => setTab('wallet')} style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                    <div style={{ width: 40, height: 40, borderRadius: 12, background: 'var(--surface-2)', color: 'var(--navy)', display: 'grid', placeItems: 'center' }}><Icon n="wallet" /></div>
                    <div className="grow">
                      <div className="t-xs">Available Balance</div>
                      <Money v={wallet.available} size={18} />
                    </div>
                    <Icon n="back" size={18} style={{ color: 'var(--faint)', transform: 'rotate(180deg)' }} />
                  </div>
                </div>
              </>
            )}

            {tab === 'work' && (
              <>
                <div className="topbar"><h1>Find work</h1></div>
                <div className="content">
                  <div className="row" style={{ gap: 8, marginTop: 12, overflowX: 'auto' }}>
                    <button className="chip on">All</button>
                    <button className="chip">Quick Tasks</button>
                    <button className="chip">Projects</button>
                  </div>
                  <div className="stack" style={{ marginTop: 18 }}>
                    <TaskCard title="Design a menu board for a juice bar" type="Quick Task" amount={120000} onClick={() => alert('Task details coming soon!')} />
                    <TaskCard title="Annual report design — 32 pages" type="Project" amount={1600000} onClick={() => alert('Task details coming soon!')} />
                  </div>
                </div>
              </>
            )}

            {tab === 'post' && (
              <>
                <div className="topbar"><h1>Post work</h1></div>
                <div className="content">
                  <div className="stack" style={{ marginTop: 12 }}>
                    <div className="field"><label>Task Title</label><input className="input" placeholder="e.g. Fix leaking kitchen sink" /></div>
                    <div className="field"><label>Description</label><textarea className="input" style={{ height: 100, padding: 12 }} placeholder="Describe what needs to be done..."></textarea></div>
                    <button className="btn primary block">Post Task</button>
                  </div>
                </div>
              </>
            )}

            {tab === 'chats' && (
              <>
                <div className="topbar"><h1>Chats</h1></div>
                <div className="content">
                  <div className="list">
                    <div className="li">
                      <Avatar name="Joseph Mugisha" color="#3C4460" size={46} />
                      <div className="grow">
                        <div className="row between"><span className="h-sm">Joseph Mugisha</span><span className="t-xs">10:42</span></div>
                        <div className="t-xs">Design files are uploaded for your review 👌</div>
                      </div>
                    </div>
                    <div className="li">
                      <Avatar name="Brian Okello" color="#1E7F74" size={46} />
                      <div className="grow">
                        <div className="row between"><span className="h-sm">Brian Okello</span><span className="t-xs">Yesterday</span></div>
                        <div className="t-xs">I will come with the breakers at 9am</div>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}

            {tab === 'wallet' && (
              <>
                <div className="topbar"><h1>KaziTasks Wallet</h1></div>
                <div className="content">
                  <div className="hero">
                    <div style={{ fontSize: 12.5, opacity: .7, fontWeight: 600 }}>Available to use</div>
                    <div style={{ marginTop: 4 }}><Money v={wallet.available} size={34} /></div>
                    <div className="row" style={{ gap: 10, marginTop: 18 }}>
                      <button className="btn accent sm grow"><Icon n="dn" size={16} /> Deposit</button>
                      <button className="btn sm grow" style={{ background: 'rgba(255,255,255,.12)', color: '#fff' }}><Icon n="up" size={16} /> Withdraw</button>
                    </div>
                  </div>
                  <div className="sechead"><h3 className="h-md">Balances</h3></div>
                  <div className="list">
                    <div className="li">
                      <div style={{ width: 40, height: 40, borderRadius: 12, background: 'var(--ok-bg)', color: 'var(--ok)', display: 'grid', placeItems: 'center' }}><Icon n="lock" size={19} /></div>
                      <div className="grow"><div className="h-sm">Secured in escrow</div><div className="t-xs">Held for active work</div></div>
                      <Money v={wallet.escrow} size={14} />
                    </div>
                  </div>
                </div>
              </>
            )}

            {tab === 'account' && (
              <>
                <div className="topbar"><h1>Account</h1></div>
                <div className="content">
                  <div className="card row" style={{ gap: 14 }}>
                    <Avatar name="Daniel Kato" color="#F7941D" size={58} />
                    <div className="grow"><div className="h-md">Daniel Kato</div><div className="t-xs">Kato Holdings Ltd · Ntinda</div></div>
                  </div>
                  <div className="list sec">
                    <div className="li"><Icon n="user" size={19} /><span className="grow t-sm" style={{ fontWeight: 600 }}>Edit Profile</span><Icon n="back" size={18} style={{ transform: 'rotate(180deg)' }} /></div>
                    <div className="li"><Icon n="shieldck" size={19} /><span className="grow t-sm" style={{ fontWeight: 600 }}>Verification</span><span className="badge ok">Verified</span></div>
                  </div>
                </div>
              </>
            )}

          </div>
          
          <nav className="tabbar">
            <button className={tab === 'home' ? 'on' : ''} onClick={() => setTab('home')}><Icon n="home" size={23} />Home</button>
            <button className={tab === 'work' ? 'on' : ''} onClick={() => setTab('work')}><Icon n="work" size={23} />Work</button>
            <button onClick={() => setTab('post')}><span className="postbtn"><Icon n="plus" size={24} /></span><span style={{ marginTop: 4 }}>Post</span></button>
            <button className={tab === 'chats' ? 'on' : ''} onClick={() => setTab('chats')}><Icon n="chat" size={23} />Chats</button>
            <button className={tab === 'account' ? 'on' : ''} onClick={() => setTab('account')}><Icon n="user" size={23} />Account</button>
          </nav>
        </div>
      </div>
    </div>
  );
}
`);

// 3. Rewrite the root page to render the Prototype
fs.writeFileSync('app/page.tsx', `import Prototype from "@/components/Prototype";\nexport default function Home() { return <Prototype />; }`);

console.log("✅ Prototype fully restored and wired to Next.js!");