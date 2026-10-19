const fs = require('fs');

// 1. Hide the fake iPhone status bar via CSS
fs.appendFileSync('public/kt/styles.css', '\n.statusbar { display: none !important; }\n');

// 2. Inject URL routing logic into the prototype's app.jsx
let appJsx = fs.readFileSync('public/kt/app.jsx', 'utf8');
const urlSyncEffect = `
  React.useEffect(() => {
    if (top && top.s) {
      window.parent.history.replaceState(null, '', '/' + top.s);
    }
  }, [top.s]);
`;
// Insert the URL sync right before the `return (` inside the App component
appJsx = appJsx.replace('const Screen = SCREENS[top.s] || HomeScreen;', urlSyncEffect + '\n  const Screen = SCREENS[top.s] || HomeScreen;');
fs.writeFileSync('public/kt/app.jsx', appJsx);

// 3. Create a catch-all route so refreshing localhost:3000/taskers doesn't 404
fs.mkdirSync('app/[...slug]', { recursive: true });
fs.writeFileSync('app/[...slug]/page.tsx', `export default function CatchAll() {
  return (
    <iframe 
      src="/KaziTasks Prototype.html" 
      style={{ width: '100vw', height: '100vh', border: 'none', margin: 0, padding: 0, display: 'block' }} 
      title="KaziTasks Prototype"
    />
  );
}`);

// 4. Update root page
fs.writeFileSync('app/page.tsx', `import { redirect } from 'next/navigation';
export default function Home() { redirect('/home'); }`);

console.log("✅ Status bar hidden, URL routing synced, and 404s prevented!");