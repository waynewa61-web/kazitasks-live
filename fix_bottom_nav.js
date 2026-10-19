const fs = require('fs');

// 1. Force the app to take exactly the screen height and lock the bottom nav
let css = fs.readFileSync('public/kt/styles.css', 'utf8');

// Remove the old padding that was meant for the iPhone
css = css.replace('padding:6px 6px 22px;', 'padding:10px 6px 16px;');

// Add strict height controls for real browser environments
css += `
/* Force full-screen height and fix scrolling */
html, body { height: 100%; overflow: hidden; }
.app { height: 100vh; height: 100dvh; display: flex; flex-direction: column; }
.app .body { flex: 1; display: flex; min-height: 0; overflow: hidden; }
.app .main { flex: 1; display: flex; flex-direction: column; min-height: 0; }
.scroller { flex: 1; overflow-y: auto; -webkit-overflow-scrolling: touch; }
.tabbar { flex: none; z-index: 50; }
`;
fs.writeFileSync('public/kt/styles.css', css);

// 2. Fix the iframe styling in Next.js so it doesn't double-scroll
const iframeLayout = `export default function CatchAll() {
  return (
    <iframe 
      src="/KaziTasks Prototype.html" 
      style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100dvh', border: 'none', margin: 0, padding: 0 }} 
      title="KaziTasks Prototype"
    />
  );
}`;
fs.writeFileSync('app/[...slug]/page.tsx', iframeLayout);
fs.writeFileSync('app/page.tsx', iframeLayout);

console.log("✅ Bottom navigation fixed and locked to the screen!");