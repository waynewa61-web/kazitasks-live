// KaziTasks sample data — Ugandan names, places, UGX
const KT_COMMISSION = 0.10; // admin-configurable; shown as "current rate"

const KT_ME = { first: 'Daniel', last: 'Kato', handle: 'danielkato', phone: '+256 772 418 903', email: 'daniel.kato@gmail.com', loc: 'Ntinda, Kampala', color: '#2A3458', title: 'Brand & Print Designer', company: 'Kato Holdings Ltd' };

const KT_TASKERS = [
  { id: 't1', name: 'Grace Nakato', title: 'Graphic & Brand Designer', loc: 'Ntinda, Kampala', dist: '1.2 km', type: 'Individual', rating: 4.9, reviews: 87, jobs: 112, status: 'ready', avail: 'Available now', online: true, color: '#7B4FB8', skills: ['Logo design', 'Brand identity', 'Packaging', 'Canva'], langs: ['English', 'Luganda'], from: 80000, resp: '~1 hr', since: '2023', about: 'I help small businesses look as good as their products. 6 years designing logos, packaging and social media for shops, schools and NGOs across Kampala.' },
  { id: 't2', name: 'Brian Okello', title: 'Certified Electrician', loc: 'Kira, Wakiso', dist: '4.8 km', type: 'Individual', rating: 4.8, reviews: 64, jobs: 90, status: 'ready', avail: 'Available today', online: false, color: '#1E7F74', skills: ['House wiring', 'Solar installation', 'Fault finding'], langs: ['English', 'Luganda', 'Kiswahili'], from: 60000, resp: '~2 hrs', since: '2022', about: 'UEDCL-trained electrician. Domestic and small commercial wiring, solar systems and repairs. I bring my own tools and give a written quote before starting.' },
  { id: 't3', name: 'Sarah Atim', title: 'Data Analyst & Researcher', loc: 'Gulu City', dist: 'Remote', type: 'Individual', rating: 5.0, reviews: 31, jobs: 38, status: 'ready', avail: 'Available this week', online: true, color: '#B8572F', skills: ['Data entry', 'Survey analysis', 'Excel', 'KoboToolbox'], langs: ['English', 'Kiswahili'], from: 120000, resp: '~30 min', since: '2024', about: 'Field survey design, data cleaning and reporting for NGOs and research teams. Comfortable with Kobo, SPSS, Excel and Power BI.' },
  { id: 't4', name: 'Ssemakula Plumbing Works', title: 'Plumbing & Water Systems', loc: 'Nakawa, Kampala', dist: '3.1 km', type: 'Company', rating: 4.7, reviews: 142, jobs: 210, status: 'ready', avail: 'Available today', online: true, color: '#2F5BD3', skills: ['Plumbing', 'Water tanks', 'Drainage'], langs: ['English', 'Luganda'], from: 50000, resp: '~1 hr', since: '2021', about: 'A team of 7 plumbers serving homes, schools and hotels. Emergency call-outs within Kampala and Wakiso.' },
  { id: 't5', name: 'Joseph Mugisha', title: 'Full-stack Web Developer', loc: 'Kololo, Kampala', dist: '5.4 km', type: 'Individual', rating: 4.9, reviews: 46, jobs: 52, status: 'ready', avail: 'Booked until 2 Nov', online: false, color: '#3C4460', skills: ['React', 'Laravel', 'Mobile Money APIs', 'UI design'], langs: ['English', 'Runyankole'], from: 450000, resp: '~3 hrs', since: '2022', about: 'I build websites and booking systems for Ugandan businesses, with Mobile Money payments built in.' },
  { id: 't6', name: 'Aisha Namuli', title: 'Event & Product Photographer', loc: 'Entebbe', dist: '28 km', type: 'Individual', rating: 4.8, reviews: 58, jobs: 71, status: 'profile', avail: 'Weekends', online: false, color: '#C24D7A', skills: ['Events', 'Product photos', 'Editing'], langs: ['English', 'Luganda', 'French'], from: 200000, resp: '~4 hrs', since: '2023', about: 'Weddings, introductions and product photography.' },
  { id: 't7', name: 'Peter Ochieng', title: 'Home & Office Cleaning', loc: 'Mukono', dist: '14 km', type: 'Group', rating: 4.6, reviews: 39, jobs: 66, status: 'pending', avail: 'Available now', online: true, color: '#6B7B1E', skills: ['Deep cleaning', 'Office cleaning', 'Fumigation'], langs: ['English', 'Kiswahili'], from: 40000, resp: '~1 hr', since: '2024', about: 'A 4-person cleaning crew.' },
  { id: 't8', name: 'Kawempe Digital', title: 'Web & Marketing Agency', loc: 'Kawempe, Kampala', dist: '6.0 km', type: 'Agency', rating: 4.7, reviews: 23, jobs: 29, status: 'ready', avail: 'Taking new projects', online: false, color: '#A33B3B', skills: ['Websites', 'Social media', 'SEO'], langs: ['English', 'Luganda'], from: 900000, resp: '~1 day', since: '2023', about: 'Small agency for SMEs.' },
];

const KT_SERVICES = [
  { id: 's1', tasker: 't1', title: 'Logo + brand starter kit', cat: 'Design', from: 150000, days: 3, mode: 'Remote', desc: 'Logo in 3 concepts, colour palette, business card and social media profile images. Two rounds of changes included.' },
  { id: 's2', tasker: 't2', title: 'Home solar installation (up to 600W)', cat: 'Electrical', from: 350000, days: 1, mode: 'On-site', desc: 'Site visit, installation of panels, battery and inverter you provide or I source. Includes safety check.' },
  { id: 's3', tasker: 't4', title: 'Water tank installation & piping', cat: 'Plumbing', from: 180000, days: 1, mode: 'On-site', desc: 'Tank stand check, installation, piping to house and leak test.' },
  { id: 's4', tasker: 't3', title: 'Survey data cleaning & report', cat: 'Research', from: 250000, days: 5, mode: 'Remote', desc: 'Clean your Kobo/Excel dataset and deliver tables, charts and a short written summary.' },
  { id: 's5', tasker: 't5', title: 'Business website with Mobile Money', cat: 'Development', from: 1800000, days: 21, mode: 'Remote', desc: 'Up to 6 pages, booking/order form and MTN MoMo + Airtel Money checkout.' },
  { id: 's6', tasker: 't6', title: 'Product photos — 20 edited shots', cat: 'Photography', from: 200000, days: 2, mode: 'On-site', desc: 'Studio-style shots on white or lifestyle, edited and delivered same week.' },
];

const KT_WORK = [
  { id: 'w1', kind: 'quick', title: 'Design a menu board for a juice bar', client: 'Fresh Squeeze Kampala', loc: 'Kisementi, Kampala', mode: 'Remote', budget: 120000, pricing: 'Fixed', deadline: 'Fri, 24 Oct', cat: 'Design', skills: ['Graphic design', 'Print'], posted: '2h ago', applicants: 4, match: 96, verified: true, desc: 'We need a clean A1 menu board for 14 drinks and 6 snacks. Brand colours and logo will be shared. Print-ready PDF required.' },
  { id: 'w2', kind: 'project', title: 'Annual report design — 32 pages', client: 'Kyaninga Foundation', loc: 'Fort Portal', mode: 'Remote', budget: 1600000, pricing: 'Milestones', deadline: '30 Nov', cat: 'Design', skills: ['InDesign', 'Infographics', 'Print'], posted: '5h ago', applicants: 9, match: 91, verified: true, desc: 'Design our 2026 annual report: cover, 32 inner pages, infographics and a print-ready file. Content and photos provided.', milestones: [['Concept & cover', 400000], ['Full layout', 900000], ['Final print files', 300000]] },
  { id: 'w3', kind: 'quick', title: 'Business cards for 3 staff', client: 'Mbabazi & Co. Advocates', loc: 'Nakasero, Kampala', mode: 'Remote', budget: 60000, pricing: 'Fixed', deadline: 'Tue, 21 Oct', cat: 'Design', skills: ['Graphic design'], posted: 'Yesterday', applicants: 11, match: 88, verified: true, desc: 'Double-sided business cards, 3 names. Existing logo.' },
  { id: 'w4', kind: 'quick', title: 'Fix kitchen sink leak', client: 'Ruth K.', loc: 'Bukoto, Kampala', mode: 'On-site', budget: 70000, pricing: 'Fixed', deadline: 'Today', cat: 'Plumbing', skills: ['Plumbing'], posted: '35m ago', applicants: 2, match: 0, verified: false, desc: 'Sink pipe leaking under the counter.' },
  { id: 'w5', kind: 'project', title: 'School website with fees portal', client: 'Hilltop Primary School', loc: 'Mbarara', mode: 'Remote', budget: 4200000, pricing: 'Milestones', deadline: '15 Jan', cat: 'Development', skills: ['Web development', 'Mobile Money'], posted: '1d ago', applicants: 14, match: 62, verified: true, desc: 'Website and parent portal for school fees via Mobile Money.', milestones: [['Design', 800000], ['Build', 2400000], ['Launch', 1000000]] },
  { id: 'w6', kind: 'quick', title: 'Social media posters — 8 designs', client: 'Mama Rose Kitchen', loc: 'Ntinda, Kampala', mode: 'Remote', budget: 160000, pricing: 'Fixed', deadline: 'Mon, 27 Oct', cat: 'Design', skills: ['Canva', 'Social media'], posted: '3h ago', applicants: 6, match: 93, verified: true, desc: 'Weekly specials posters for Instagram & WhatsApp status.' },
];

// Client's own posted work
const KT_MY_POSTS = [
  { id: 'm1', kind: 'quick', title: 'Rewire 3-bedroom house (partial)', status: 'In progress', tasker: 't2', amount: 180000, loc: 'Ntinda, Kampala', deadline: 'Wed, 22 Oct' },
  { id: 'm2', kind: 'project', title: 'Company website + booking system', status: 'In progress', tasker: 't5', amount: 3000000, loc: 'Remote', deadline: '20 Dec', milestones: [
    { t: 'Design', amt: 500000, due: '24 Oct', d: 'Wireframes and visual design for 6 pages, approved in Figma.' },
    { t: 'Development', amt: 1500000, due: '18 Nov', d: 'Build pages, booking form and admin panel.' },
    { t: 'Testing', amt: 600000, due: '5 Dec', d: 'Test on phones, fix issues, MoMo sandbox tests.' },
    { t: 'Deployment', amt: 400000, due: '20 Dec', d: 'Go live on company domain and hand over.' },
  ] },
  { id: 'm3', kind: 'quick', title: 'Logo for our new bakery', status: 'Receiving applications', applicants: 6, amount: 200000, loc: 'Remote', deadline: 'Fri, 31 Oct' },
  { id: 'm4', kind: 'quick', title: 'Weekly office cleaning', status: 'Draft', amount: 0, loc: 'Ntinda, Kampala', deadline: '—' },
];

// Tasker's own active work
const KT_MY_JOBS = [
  { id: 'j1', kind: 'project', title: 'Annual report design — 32 pages', client: 'Kyaninga Foundation', status: 'In progress', amount: 1600000, milestones: [
    { t: 'Concept & cover', amt: 400000, due: '28 Oct', d: 'Two cover concepts and the design system for inner pages.' },
    { t: 'Full layout', amt: 900000, due: '18 Nov', d: 'All 32 pages laid out with infographics.' },
    { t: 'Final print files', amt: 300000, due: '30 Nov', d: 'Print-ready PDF with bleed, plus web PDF.' },
  ] },
  { id: 'j2', kind: 'quick', title: 'Social media posters — 8 designs', client: 'Mama Rose Kitchen', status: 'Submitted', amount: 160000 },
];

const KT_APPLICANTS = [
  { tasker: 't1', bid: 180000, days: 3, note: 'I design for 4 bakeries in Kampala — happy to share. I would start with 3 concepts inspired by your shop.', when: '2h ago' },
  { tasker: 't6', bid: 150000, days: 4, note: 'Photography + logo combo possible. I can also shoot your first products.', when: '5h ago' },
  { tasker: 't8', bid: 240000, days: 5, note: 'Our agency can deliver logo + full brand guide.', when: 'Yesterday' },
];

const KT_CHATS = [
  { id: 'c1', with: 't5', ctx: { kind: 'Project', title: 'Company website + booking system', ref: 'm2' }, last: 'Design files are uploaded for your review 👌', time: '10:42', unread: 2, msgs: [
    { me: false, t: 'Good morning Daniel. I have finished the homepage and booking screens.', at: '09:58' },
    { me: true, t: 'Morning Joseph! Great — can you share the mobile version too?', at: '10:05', st: 'seen' },
    { me: false, t: 'Yes, all 6 pages in mobile and desktop.', at: '10:40' },
    { me: false, file: 'Kato-website-design-v2.pdf', size: '4.2 MB', at: '10:41' },
    { me: false, t: 'Design files are uploaded for your review 👌', at: '10:42' },
  ] },
  { id: 'c2', with: 't2', ctx: { kind: 'Quick Task', title: 'Rewire 3-bedroom house (partial)', ref: 'm1' }, last: 'I will come with the breakers at 9am', time: 'Yesterday', unread: 0, msgs: [
    { me: true, t: 'Hi Brian, are we still on for tomorrow?', at: '16:10', st: 'seen' },
    { me: false, t: 'Yes sir. I will come with the breakers at 9am', at: '16:22' },
  ] },
  { id: 'c3', with: 't1', ctx: { kind: 'Application', title: 'Logo for our new bakery', ref: 'm3' }, last: 'Thank you for considering my application!', time: 'Mon', unread: 0, msgs: [
    { me: false, t: 'Thank you for considering my application!', at: '14:02' },
  ] },
  { id: 'c4', with: 't3', ctx: null, last: 'You: Will share the dataset by Friday', time: '12 Oct', unread: 0, msgs: [
    { me: true, t: 'Will share the dataset by Friday', at: '11:30', st: 'delivered' },
  ] },
];

const KT_NOTIFS = [
  { id: 'n1', kind: 'milestone', title: 'Milestone submitted for review', body: 'Joseph submitted “Design” on Company website + booking system.', time: '10m', go: ['project', { id: 'm2', side: 'client' }], unread: true },
  { id: 'n2', kind: 'chat', title: 'New message from Joseph Mugisha', body: 'Design files are uploaded for your review 👌', time: '12m', go: ['chat', { id: 'c1' }], unread: true },
  { id: 'n3', kind: 'apply', title: '3 new applications', body: 'Logo for our new bakery now has 6 applicants.', time: '2h', go: ['applicants', { id: 'm3' }], unread: true },
  { id: 'n4', kind: 'wallet', title: 'Deposit received', body: 'UGX 1,000,000 from MTN MoMo •••903 added to your Wallet.', time: 'Yesterday', go: ['wallet', {}] },
  { id: 'n5', kind: 'referral', title: 'Referral reward: +250 points', body: 'Esther completed her first task on KaziTasks.', time: 'Mon', go: ['referrals', {}] },
  { id: 'n6', kind: 'verify', title: 'Identity verified', body: 'Your National ID has been confirmed. You can now be hired.', time: '8 Oct', go: ['finish', {}] },
];

const KT_TX = [
  { id: 'x1', t: 'Milestone funded · Design', sub: 'Company website + booking system', amt: -500000, kind: 'escrow', when: '17 Oct, 09:14', st: 'In escrow' },
  { id: 'x2', t: 'Deposit · MTN MoMo', sub: '•••903', amt: 1000000, kind: 'in', when: '16 Oct, 18:40', st: 'Completed' },
  { id: 'x3', t: 'Payment released · Concept & cover', sub: 'Kyaninga Foundation', amt: 360000, kind: 'earn', when: '14 Oct, 12:02', st: 'Completed', gross: 400000 },
  { id: 'x4', t: 'Quick Task funded', sub: 'Rewire 3-bedroom house', amt: -180000, kind: 'escrow', when: '13 Oct, 08:30', st: 'In escrow' },
  { id: 'x5', t: 'Withdrawal · Airtel Money', sub: '•••211', amt: -300000, kind: 'out', when: '10 Oct, 15:21', st: 'Completed' },
  { id: 'x6', t: 'Annual plan · Plus', sub: 'Covers Client + Tasker', amt: -50000, kind: 'fee', when: '1 Oct, 10:00', st: 'Completed' },
];

const KT_PLANS = [
  { id: 'basic', name: 'Basic', price: 30000, credits: 20, apply: '10 applications / mo', post: '3 work posts / mo', extras: ['Tasker & Client profile', 'Wallet & secure payments'] },
  { id: 'plus', name: 'Plus', price: 50000, credits: 45, apply: '25 applications / mo', post: '8 work posts / mo', extras: ['Everything in Basic', 'Publish up to 3 Services'] },
  { id: 'pro', name: 'Professional', price: 95000, credits: 100, apply: '60 applications / mo', post: '20 work posts / mo', extras: ['Everything in Plus', 'Projects with milestones', 'Workspace with 3 collaborators', 'Boosted in Tasker Directory'] },
  { id: 'prem', name: 'Premium', price: 125000, credits: 160, apply: 'Unlimited applications', post: 'Unlimited work posts', extras: ['Everything in Professional', 'Unlimited collaborators', 'Top placement in search', 'Priority support'] },
];

const KT_CATS = ['Design', 'Electrical', 'Plumbing', 'Cleaning', 'Development', 'Research', 'Photography', 'Delivery', 'Construction', 'Consulting', 'Writing', 'Tutoring'];
const KT_SKILLS = ['Graphic design', 'Logo design', 'Brand identity', 'Print', 'Canva', 'InDesign', 'Illustrator', 'Social media', 'Infographics', 'Packaging', 'Photography', 'UI design'];
const KT_PLACES = ['Ntinda, Kampala', 'Kololo, Kampala', 'Nakawa, Kampala', 'Kira, Wakiso', 'Entebbe, Wakiso', 'Mukono Town', 'Gulu City', 'Mbarara City', 'Jinja City', 'Fort Portal', 'Mbale City', 'Lira City'];
const KT_LANGS = [['en', 'English'], ['lg', 'Luganda'], ['sw', 'Kiswahili'], ['fr', 'Français']];

const ugx = (n) => (n < 0 ? '−' : '') + Math.abs(Math.round(n)).toLocaleString('en-US');
const taskerById = (id) => KT_TASKERS.find((t) => t.id === id);
const initials = (n) => n.split(' ').filter(Boolean).slice(0, 2).map((w) => w[0]).join('').toUpperCase();

Object.assign(window, { KT_COMMISSION, KT_ME, KT_TASKERS, KT_SERVICES, KT_WORK, KT_MY_POSTS, KT_MY_JOBS, KT_APPLICANTS, KT_CHATS, KT_NOTIFS, KT_TX, KT_PLANS, KT_CATS, KT_SKILLS, KT_PLACES, KT_LANGS, ugx, taskerById, initials });
