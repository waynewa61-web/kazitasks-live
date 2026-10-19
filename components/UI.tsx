"use client";
import React from "react";
import { useRouter } from "next/navigation";

export function Avatar({ name, color = '#2A3458', size = 40 }: any) {
  const initials = name.split(' ').map((w: string) => w[0]).slice(0, 2).join('').toUpperCase();
  return (
    <div style={{ width: size, height: size, background: color, fontSize: size * 0.36, borderRadius: '50%', display: 'grid', placeItems: 'center', color: '#fff', fontWeight: 700, flex: 'none' }}>
      {initials}
    </div>
  );
}

export function Money({ v, size = 16 }: any) {
  return <span className="money" style={{ fontSize: size }}><small style={{ fontSize: '0.62em', color: 'var(--muted)', marginRight: 3 }}>UGX</small>{Number(v).toLocaleString()}</span>;
}

export function TopBar({ title, back = false }: any) {
  const router = useRouter();
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '16px var(--pad) 10px', minHeight: 52 }}>
      {back && <button onClick={() => router.back()} style={{ marginLeft: -8 }}>←</button>}
      <div className="grow">{title && <h1 style={{ fontSize: 17, fontWeight: 700, margin: 0 }}>{title}</h1>}</div>
    </div>
  );
}
