"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Money } from "@/components/UI";
import { MapPin } from "lucide-react";

export default function TasksPage() {
  const [tasks, setTasks] = useState<any[]>([]);
  useEffect(() => { fetch("/api/tasks").then(r => r.json()).then(setTasks); }, []);

  return (
    <div className="scroller">
      <div style={{ padding: '16px var(--pad) 10px' }}><h1 style={{ fontSize: 17, fontWeight: 700, margin: 0 }}>Find work</h1></div>
      <div className="content">
        <div className="stack">
          {tasks.map(w => (
            <Link key={w.id} href={`/tasks/${w.id}`} className="card">
              <div className="row between" style={{ marginBottom: 8 }}>
                <span className="badge navy">{w.type}</span>
                <span className="t-xs">{w.location || 'Remote'}</span>
              </div>
              <div className="h-sm" style={{ fontSize: 15, lineHeight: 1.35 }}>{w.title}</div>
              <div className="row between" style={{ marginTop: 12, paddingTop: 12, borderTop: '1px solid var(--line-2)' }}>
                <Money v={w.fixedAmount || w.budgetMin || 0} size={16} />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
