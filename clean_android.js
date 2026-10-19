const fs = require('fs');

// 1. Remove the fake iOS status bar from app.jsx
let appJsx = fs.readFileSync('public/kt/app.jsx', 'utf8');
const iosBarRegex = /\{!desk && \(\s*<div className="statusbar"[\s\S]*?<\/div>\s*\)\}/;
appJsx = appJsx.replace(iosBarRegex, '');
fs.writeFileSync('public/kt/app.jsx', appJsx);

// 2. Disable the Next.js dev indicator (the orange 'N' bubble)
let nextConfig = fs.readFileSync('next.config.mjs', 'utf8');
if (!nextConfig.includes('devIndicators')) {
  nextConfig = `/** @type {import('next').NextConfig} */
const nextConfig = {
  devIndicators: {
    buildActivity: false,
  },
};
export default nextConfig;`;
  fs.writeFileSync('next.config.mjs', nextConfig);
}

console.log("✅ Fake iPhone status bar removed and dev indicator hidden!");