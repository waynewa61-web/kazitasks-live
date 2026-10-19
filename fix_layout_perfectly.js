const fs = require('fs');

// 1. Forcefully hide the Next.js Dev Bubble in the root global CSS
let globals = fs.readFileSync('app/globals.css', 'utf8');
if (!globals.includes('nextjs-portal')) {
  globals += `\n\n/* Hide Next.js Dev Bubble */\nnextjs-portal { display: none !important; }\n#next-logo { display: none !important; }\n`;
  fs.writeFileSync('app/globals.css', globals);
}

// 2. Fix next.config.mjs
fs.writeFileSync('next.config.mjs', `/** @type {import('next').NextConfig} */
const nextConfig = {
  devIndicators: {
    buildActivity: false,
  },
};
export default nextConfig;`);

// 3. Overwrite styles.css to strictly lock the layout
let css = fs.readFileSync('public/kt/styles.css', 'utf8');
// Remove the phone frame styles that are interfering
css = css.replace(/\.phone\s*\{[^}]+\}/g, '.phone { display: none !important; }');
css = css.replace(/\.statusbar\s*\{[^}]+\}/g, '.statusbar { display: none !important; }');

// Append absolute layout rules
css += `
/* Absolute fix for height and scrolling */
html, body { margin: 0; padding: 0; height: 100%; overflow: hidden; }
.app { display: flex; flex-direction: column; height: 100vh !important; height: 100dvh !important; width: 100vw; max-width: 100vw !important; overflow: hidden; }
.app .body { display: flex; flex: 1; min-height: 0; overflow: hidden; }
.app .main { display: flex; flex-direction: column; flex: 1; min-height: 0; position: relative; }
.scroller { flex: 1; overflow-y: auto; -webkit-overflow-scrolling: touch; }
.tabbar { flex: none; position: relative; z-index: 9999 !important; padding-bottom: env(safe-area-inset-bottom, 16px) !important; }
`;
fs.writeFileSync('public/kt/styles.css', css);

// 4. Completely rewrite app.jsx to remove the phone frame and clean up the return statement
let appJsx = fs.readFileSync('public/kt/app.jsx', 'utf8');

const startIndex = appJsx.indexOf('  return (');
if (startIndex !== -1) {
  const newAppJsx = appJsx.substring(0, startIndex) + `  return (
    <div className={(t.direction === 'B' ? 'dirB ' : '') + (t.density === 'compact' ? 'compact' : '')} style={{ height: '100vh', width: '100vw', overflow: 'hidden' }}>
      <KTCtx.Provider value={kt}>
        <div className={'app' + (desk ? ' desk' : '')}>
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
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);`;

  fs.writeFileSync('public/kt/app.jsx', newAppJsx);
}

console.log("✅ Layout forcefully fixed, bottom nav restored, and Next.js bubble hidden!");