"use client";
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
}