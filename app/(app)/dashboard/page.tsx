"use client";
import Link from "next/link";
import { Avatar } from "@/components/UI";
import { Search, Plus, Briefcase } from "lucide-react";

export default function Dashboard() {
  return (
    <div className="scroller">
      <div className="navyband" style={{ paddingTop: 16 }}>
        <div className="row between" style={{ marginBottom: 16 }}>
          <div style={{ display: 'flex', background: 'rgba(255,255,255,.12)', borderRadius: 11, padding: 3, width: 196 }}>
            <button style={{ flex: 1, height: 34, borderRadius: 9, fontSize: 13, fontWeight: 700, background: 'var(--surface)', color: 'var(--ink)' }}>Client</button>
            <button style={{ flex: 1, height: 34, borderRadius: 9, fontSize: 13, fontWeight: 700, color: 'rgba(255,255,255,.75)' }}>Tasker</button>
          </div>
          <Avatar name="Daniel Kato" color="#F7941D" size={34} />
        </div>
        <p style={{ fontSize: 14, opacity: .7, fontWeight: 500 }}>Good morning, Daniel</p>
        <h2 className="h-xl" style={{ marginTop: 2 }}>What do you need done?</h2>
        <div style={{ marginTop: 16, height: 46, borderRadius: 12, background: 'var(--surface)', padding: '0 14px', display: 'flex', alignItems: 'center', gap: 10, color: 'var(--muted)' }}>
          <Search size={19} /> Try “plumber” or “logo design”
        </div>
      </div>
      
      <div className="content" style={{ paddingTop: 16 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          <Link href="/tasks/new" className="card">
            <div style={{ width: 36, height: 36, borderRadius: 10, background: 'var(--surface-2)', color: 'var(--accent)', display: 'grid', placeItems: 'center' }}><Plus size={19} /></div>
            <div className="h-sm" style={{ marginTop: 12 }}>Quick Task</div>
            <div className="t-xs" style={{ marginTop: 2 }}>Repairs, cleaning, design</div>
          </Link>
          <Link href="/tasks/new" className="card">
            <div style={{ width: 36, height: 36, borderRadius: 10, background: 'var(--surface-2)', color: 'var(--navy)', display: 'grid', placeItems: 'center' }}><Briefcase size={19} /></div>
            <div className="h-sm" style={{ marginTop: 12 }}>Project</div>
            <div className="t-xs" style={{ marginTop: 2 }}>Milestones, staged pay</div>
          </Link>
        </div>
      </div>
    </div>
  );
}
