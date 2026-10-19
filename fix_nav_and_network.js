const fs = require('fs');

// 1. Force Next.js to allow network access (so your phone can see it)
let pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));
pkg.scripts.dev = "next dev -H 0.0.0.0";
fs.writeFileSync('package.json', JSON.stringify(pkg, null, 2));

// 2. Forcefully hide the Next.js Dev Bubble
let globals = fs.readFileSync('app/globals.css', 'utf8');
if (!globals.includes('nextjs-portal')) {
  globals += `\n\n/* Hide Next.js Dev Bubble */\nnextjs-portal { display: none !important; }\n#next-logo { display: none !important; }\n`;
  fs.writeFileSync('app/globals.css', globals);
}

fs.writeFileSync('next.config.mjs', `/** @type {import('next').NextConfig} */
const nextConfig = {
  devIndicators: {
    buildActivity: false,
  },
};
export default nextConfig;`);

// 3. Force the bottom navigation to ALWAYS show and stay at the bottom
let css = fs.readFileSync('public/kt/styles.css', 'utf8');
css += `
/* Force fixed bottom navigation */
.tabbar { 
  display: flex !important;
  position: fixed !important; 
  bottom: 0 !important; 
  left: 0 !important; 
  right: 0 !important; 
  background: var(--surface) !important;
  border-top: 1px solid var(--line) !important;
  padding: 10px 6px calc(10px + env(safe-area-inset-bottom)) !important;
  z-index: 99999 !important; 
}
/* Add padding to the bottom of screens so content isn't hidden behind the nav */
.scroller { 
  padding-bottom: 100px !important; 
}
/* Ensure the main container doesn't overflow */
html, body, .app, .app .body, .app .main { 
  max-height: 100vh !important; 
  overflow: hidden !important; 
}
`;
fs.writeFileSync('public/kt/styles.css', css);

// 4. Patch app.jsx to force the tabbar to render on ALL screens
let appJsx = fs.readFileSync('public/kt/app.jsx', 'utf8');
// Replace the conditional rendering of the tabbar
appJsx = appJsx.replace('const tabbar = !desk && isRoot && !onboarding && (', 'const tabbar = !desk && !onboarding && (');
// Ensure tabbar is placed outside the main scrolling div
appJsx = appJsx.replace('{tabbar}\n          </div>', '</div>\n          {tabbar}');

fs.writeFileSync('public/kt/app.jsx', appJsx);

console.log("✅ Navigation locked, Network opened, N-bubble hidden!");