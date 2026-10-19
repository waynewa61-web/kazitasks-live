const fs = require('fs');

// 1. Bulletproof the Bottom Nav CSS
let css = fs.readFileSync('app/globals.css', 'utf8');
css += `
/* Force Bottom Nav to space perfectly */
.tabbar { 
  display: flex !important; 
  justify-content: space-around !important; 
  align-items: center !important;
  padding: 8px 0 24px 0 !important; 
  background: var(--surface) !important;
  border-top: 1px solid var(--line) !important;
}
.tabbar a { 
  flex: 1 !important; 
  display: flex !important; 
  flex-direction: column !important; 
  align-items: center !important; 
  justify-content: center !important; 
  gap: 4px !important; 
  text-decoration: none !important; 
  color: var(--faint) !important; 
  font-size: 10.5px !important; 
  font-weight: 600 !important; 
  padding: 0 !important;
}
.tabbar a.on { color: var(--navy) !important; }
`;
fs.writeFileSync('app/globals.css', css);

// 2. Build the Wallet Page
fs.mkdirSync('app/(app)/wallet', { recursive: true });
fs.writeFileSync('app/(app)/wallet/page.tsx', `"use client";
import { useEffect, useState } from "react";
import { Money } from "@/components/UI";
import { ArrowDownLeft, ArrowUpRight, Lock } from "lucide-react";

export default function WalletPage() {
  const [data, setData] = useState<any>(null);
  useEffect(() => { fetch("/api/wallet").then(r => r.json()).then(setData); }, []);

  return (
    <div className="scroller">
      <div style={{ padding: '16px var(--pad) 10px' }}><h1 className="h-md">KaziTasks Wallet</h1></div>
      <div className="content">
        <div className="hero">
          <div style={{ fontSize: 12.5, opacity: .7, fontWeight: 600 }}>Available to use</div>
          <div style={{ marginTop: 4 }}><Money v={data?.wallet?.balance || 1240000} size={34} /></div>
          <div className="row" style={{ gap: 10, marginTop: 18 }}>
            <button className="btn accent sm grow"><ArrowDownLeft size={16} /> Deposit</button>
            <button className="btn sm grow" style={{ background: 'rgba(255,255,255,.12)', color: '#fff' }}><ArrowUpRight size={16} /> Withdraw</button>
          </div>
        </div>
        
        <div className="sechead"><h3 className="h-md">Balances</h3></div>
        <div className="list">
          <div className="li">
            <div style={{ width: 40, height: 40, borderRadius: 12, background: 'var(--ok-bg)', color: 'var(--ok)', display: 'grid', placeItems: 'center' }}><Lock size={19} /></div>
            <div className="grow"><div className="h-sm">Secured in escrow</div><div className="t-xs">Held for active work</div></div>
            <Money v={data?.wallet?.escrow || 680000} size={14} />
          </div>
        </div>

        <div className="sechead"><h3 className="h-md">Recent Activity</h3></div>
        <div className="list">
          <div className="li">
            <div style={{ width: 40, height: 40, borderRadius: 12, background: 'var(--surface-2)', color: 'var(--navy)', display: 'grid', placeItems: 'center' }}><ArrowDownLeft size={19} /></div>
            <div className="grow"><div className="h-sm">Deposit received</div><div className="t-xs">Today, 10:24 AM</div></div>
            <Money v={500000} size={14} />
          </div>
        </div>
      </div>
    </div>
  );
}`);

// 3. Build the Profile Page
fs.mkdirSync('app/(app)/profile', { recursive: true });
fs.writeFileSync('app/(app)/profile/page.tsx', `"use client";
import { Avatar } from "@/components/UI";
import { ShieldCheck, ChevronRight, User, Wallet, Globe } from "lucide-react";

export default function AccountPage() {
  return (
    <div className="scroller">
      <div style={{ padding: '16px var(--pad) 10px' }}><h1 className="h-md">Account</h1></div>
      <div className="content">
        <div className="card row" style={{ gap: 14 }}>
          <Avatar name="Daniel Kato" color="#F7941D" size={58} />
          <div className="grow"><div className="h-md">Daniel Kato</div><div className="t-xs">Kato Holdings Ltd · Ntinda</div></div>
        </div>
        
        <div className="sechead"><h3 className="h-md">Settings</h3></div>
        <div className="list">
          <div className="li"><User size={19} color="var(--navy)" /><div className="grow t-sm" style={{ fontWeight: 600 }}>Edit Profile</div><ChevronRight size={18} /></div>
          <div className="li"><ShieldCheck size={19} color="var(--navy)" /><div className="grow t-sm" style={{ fontWeight: 600 }}>Verification</div><span className="badge ok">Verified</span><ChevronRight size={18} /></div>
          <div className="li"><Globe size={19} color="var(--navy)" /><div className="grow t-sm" style={{ fontWeight: 600 }}>Language</div><span className="t-xs">English</span><ChevronRight size={18} /></div>
        </div>
      </div>
    </div>
  );
}`);

// 4. Build the Chats Page
fs.mkdirSync('app/(app)/messages', { recursive: true });
fs.writeFileSync('app/(app)/messages/page.tsx', `"use client";
import { Avatar } from "@/components/UI";

export default function ChatsPage() {
  return (
    <div className="scroller">
      <div style={{ padding: '16px var(--pad) 10px' }}><h1 className="h-md">Chats</h1></div>
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
    </div>
  );
}`);

// 5. Build the Post Task Page
fs.mkdirSync('app/(app)/tasks/new', { recursive: true });
fs.writeFileSync('app/(app)/tasks/new/page.tsx', `"use client";
export default function PostTask() {
  return (
    <div className="scroller">
      <div style={{ padding: '16px var(--pad) 10px' }}><h1 className="h-md">Post Work</h1></div>
      <div className="content">
        <div className="stack">
          <div className="field"><label>Task Title</label><input className="input" placeholder="e.g. Fix leaking kitchen sink" /></div>
          <div className="field"><label>Description</label><textarea className="input" style={{ height: 100, padding: 12 }} placeholder="Describe what needs to be done..."></textarea></div>
          <button className="btn primary block">Post Task</button>
        </div>
      </div>
    </div>
  );
}`);

console.log("✅ All missing pages built and Nav fixed!");