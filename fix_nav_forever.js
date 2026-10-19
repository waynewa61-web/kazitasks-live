const fs = require('fs');

// 1. Force the bottom nav to stay fixed at the bottom
let css = fs.readFileSync('public/kt/styles.css', 'utf8');
css += `
/* Make bottom nav permanently fixed to the bottom of the screen */
.tabbar { 
  position: fixed !important; 
  bottom: 0 !important; 
  left: 0 !important; 
  right: 0 !important; 
  background: var(--surface) !important;
  z-index: 9999 !important;
  padding-bottom: env(safe-area-inset-bottom, 16px) !important; /* Handles iPhone/Android home bars */
}
/* Add padding to the scroller so content isn't hidden behind the nav */
.scroller { 
  padding-bottom: 90px !important; 
}
/* Hide the Next.js dev bubble */
#next-logo, [data-nextjs-toast], nextjs-portal {
  display: none !important;
}
`;
fs.writeFileSync('public/kt/styles.css', css);

// 2. Ensure Next.js config disables the dev bubble
const nextConfig = `/** @type {import('next').NextConfig} */
const nextConfig = {
  devIndicators: {
    buildActivity: false,
    appIsrStatus: false
  },
};
export default nextConfig;`;
fs.writeFileSync('next.config.mjs', nextConfig);

console.log("✅ Bottom nav fixed and dev bubble hidden!");