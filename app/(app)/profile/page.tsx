"use client";
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
}