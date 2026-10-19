const fs = require('fs');

// 1. Fix next.config.mjs (Allows React, Fonts, and hides the 'N' bubble)
const nextConfig = `/** @type {import('next').NextConfig} */
const nextConfig = {
  devIndicators: {
    buildActivity: false,
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline' https://unpkg.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' blob: data: https://api.dicebear.com;",
          },
        ],
      },
    ];
  },
};
export default nextConfig;`;
fs.writeFileSync('next.config.mjs', nextConfig);

// 2. Fix CSS to lock the bottom nav and hide the iPhone bar
let css = fs.readFileSync('public/kt/styles.css', 'utf8');
css += `
/* Force full-screen height and fix scrolling */
html, body { height: 100%; overflow: hidden; }
.app { height: 100vh !important; height: 100dvh !important; display: flex; flex-direction: column; width: 100vw; max-width: 100vw !important; }
.app .body { flex: 1; display: flex; min-height: 0; }
.app .main { flex: 1; display: flex; flex-direction: column; min-height: 0; }
.scroller { flex: 1; overflow-y: auto; -webkit-overflow-scrolling: touch; }
.tabbar { flex: none; z-index: 9999 !important; padding-bottom: env(safe-area-inset-bottom, 16px) !important; }
.statusbar { display: none !important; }
.phone { display: none !important; }
`;
fs.writeFileSync('public/kt/styles.css', css);

// 3. Fix app.jsx (Remove the fake phone frame entirely)
let appJsx = fs.readFileSync('public/kt/app.jsx', 'utf8');

// Replace the return statement in App() to just output the app, not the phone frame.
const returnRegex = /return \(\s*<div className=\{[^}]+\}\s+style=\{\{\s*height:\s*'100%'\s*\}\}>\s*<div className="stagewrap">[\s\S]*?<TweaksPanel>[\s\S]*?<\/TweaksPanel>\s*<\/div>\s*\);/g;

const newReturn = `return (
    <div className={(t.direction === 'B' ? 'dirB ' : '') + (t.density === 'compact' ? 'compact' : '')} style={{ height: '100vh', width: '100vw', overflow: 'hidden' }}>
      <KTCtx.Provider value={kt}>
        <div className={'app' + (desk ? ' desk' : '')} style={{ margin: '0 auto', height: '100vh' }}>
          <div className="body">
            {sidebar}
            <div className="main" ref={mainRef}>
              {deskTop}
              <Screen key={stack.length + top.s + JSON.stringify(top.p)} />
              {tabbar}
            </div>
          </div>
          {sheet === 'lang' && <LangSheet />}
          {toastMsg && <div className="toast"><Icon n="check" s={16} w={2.6} style={{ color: 'var(--accent)' }} />{toastMsg}</div>}
        </div>
      </KTCtx.Provider>
      <TweaksPanel>
        <TweakSection label="Direction">
          <TweakRadio label="Visual direction" value={t.direction} options={[{ value: 'A', label: 'A · Crisp' }, { value: 'B', label: 'B · Warm' }]} onChange={(v) => setTweak('direction', v)} />
          <TweakColor label="Accent" value={t.accent} options={['#F7941D', '#E8730C', '#F2B01E', '#1E9E8A']} onChange={(v) => setTweak('accent', v)} />
          <TweakRadio label="Density" value={t.density} options={[{ value: 'comfortable', label: 'Comfortable' }, { value: 'compact', label: 'Compact' }]} onChange={(v) => setTweak('density', v)} />
          <TweakRadio label="View" value={t.view} options={[{ value: 'mobile', label: 'Mobile' }, { value: 'desktop', label: 'Desktop' }]} onChange={(v) => setTweak('view', v)} />
        </TweakSection>
        <TweakSection label="State">
          <TweakRadio label="Role" value={t.role} options={[{ value: 'client', label: 'Client' }, { value: 'tasker', label: 'Tasker' }]} onChange={(v) => setTweak('role', v)} />
          <TweakSelect label="Tasker eligibility" value={t.elig} options={[{ value: 'unverified', label: 'Identity not verified' }, { value: 'pending', label: 'Verification pending' }, { value: 'incomplete', label: 'Verified · profile incomplete' }, { value: 'ready', label: 'Verified · ready for work' }]} onChange={(v) => setTweak('elig', v)} />
          <TweakSelect label="Current milestone" value={t.milestone} options={Object.keys(MS_LABEL).map((k) => ({ value: k, label: MS_LABEL[k][0] }))} onChange={(v) => setTweak('milestone', v)} />
          <TweakRadio label="Wallet" value={t.wallet} options={[{ value: 'normal', label: 'Funded' }, { value: 'low', label: 'Low' }, { value: 'empty', label: 'Empty' }]} onChange={(v) => setTweak('wallet', v)} />
        </TweakSection>
        <TweakSection label="Jump to">
          <TweakButton label="Onboarding (welcome → OTP)" secondary onClick={() => kt.reset('welcome')} />
          <TweakButton label="Milestone review" secondary onClick={() => { kt.reset('home'); setTimeout(() => kt.go('milestone', { id: 'm2', idx: t.role === 'client' ? 0 : 1, side: t.role }), 0); }} />
          <TweakButton label="Wallet" secondary onClick={() => kt.reset('wallet')} />
        </TweakSection>
      </TweaksPanel>
    </div>
  );`;

appJsx = appJsx.replace(returnRegex, newReturn);
fs.writeFileSync('public/kt/app.jsx', appJsx);

// 4. Fix the iframe to be full screen
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

console.log("✅ Everything fixed! Bottom nav restored, CSP fixed, and iPhone frame removed.");