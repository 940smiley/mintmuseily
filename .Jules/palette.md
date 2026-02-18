## 2026-02-18 - [Accessibility & Styling Foundations]
**Learning:** In projects using Tailwind CSS v4 with Next.js 13.5, the global CSS must be explicitly imported in the root layout to enable any utility-first styling. Without this, all UX/UI improvements are invisible. Additionally, semantic HTML like <label> and ARIA roles are critical for form accessibility in Web3 dApps.
**Action:** Always verify that globals.css is imported in layout.tsx and use semantic labels for all interactive inputs.
