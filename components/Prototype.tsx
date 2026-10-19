"use client";
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
