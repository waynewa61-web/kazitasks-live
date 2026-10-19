"use client";
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
}