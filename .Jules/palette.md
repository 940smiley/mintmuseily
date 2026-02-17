## 2026-02-12 - [Tailwind Import & Wagmi v2 Migration]
**Learning:** In Next.js App Router, `globals.css` must be explicitly imported in the root `layout.tsx` for Tailwind styles to take effect. Also, when working with Wagmi v2, `@tanstack/react-query` is a required peer dependency that might be missing in older setups, and `WagmiConfig` should be replaced by `WagmiProvider`.
**Action:** Always check `layout.tsx` for CSS imports if styles are missing, and ensure all Wagmi v2 peer dependencies are present in `package.json`.
