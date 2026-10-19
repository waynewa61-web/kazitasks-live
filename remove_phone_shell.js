const fs = require('fs');

// 1. Overwrite app.jsx to remove the phone frame
const appJsx = fs.readFileSync('public/kt/app.jsx', 'utf8');

// Find the return statement and replace it
const newReturn = `  return (
    <div className={(t.direction === 'B' ? 'dirB ' : '') + (t.density === 'compact' ? 'compact' : '')} style={{ height: '100vh', width: '100vw', background: '#E3E5EB' }}>
      <KTCtx.Provider value={kt}>
        <div className={'app' + (desk ? ' desk' : '')} style={{ maxWidth: desk ? '100%' : '480px', margin: '0 auto', minHeight: '100vh', boxShadow: '0 0 40px rgba(0,0,0,0.1)' }}>
          {!desk && (
            <div className="statusbar" style={{ background: homeTop ? 'var(--navy)' : top.s === 'welcome' || top.s === 'created' ? 'var(--surface)' : 'var(--bg)', color: homeTop ? '#fff' : 'var(--ink)' }}>
              <span>9:41</span><span className="notch" /><span className="sb-r"><svg width="17" height="11" viewBox="0 0 17 11" fill="currentColor"><rect x="0" y="7" width="3" height="4" rx="1" /><rect x="4.5" y="5" width="3" height="6" rx="1" /><rect x="9" y="2.5" width="3" height="8.5" rx="1" /><rect x="13.5" y="0" width="3" height="11" rx="1" /></svg><span className="bat" /></span>
            </div>
          )}
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

// Replace the return block in app.jsx
const startIndex = appJsx.indexOf('  return (');
if (startIndex !== -1) {
  const newAppJsx = appJsx.substring(0, startIndex) + newReturn;
  fs.writeFileSync('public/kt/app.jsx', newAppJsx);
}

// 2. Fix the CSS to allow full screen height
let css = fs.readFileSync('public/kt/styles.css', 'utf8');
css = css.replace('.app{display:flex;flex-direction:column;height:100%;position:relative;background:var(--bg)}', '.app{display:flex;flex-direction:column;height:100vh;position:relative;background:var(--bg)}');
css = css.replace('.phone{', '.phone-hidden{'); // hide the phone frame
fs.writeFileSync('public/kt/styles.css', css);

// 3. Re-write app/page.tsx
fs.writeFileSync('app/page.tsx', `export default function Home() {
  return (
    <iframe 
      src="/KaziTasks Prototype.html" 
      style={{ width: '100vw', height: '100vh', border: 'none', margin: 0, padding: 0, display: 'block' }} 
      title="KaziTasks Prototype"
    />
  );
}`);

console.log("✅ Phone frame removed! App now fills the screen.");
