## 2025-05-15 - [Scoped Provider Pattern]
**Learning:** In Next.js App Router, wrapping the root layout with heavy client-side providers (like Wagmi/RainbowKit) forces those libraries into the global bundle, even for pages that don't use them. Moving these providers to a route-specific layout significantly reduces the initial bundle size for other routes.
**Action:** Always identify which routes actually need heavy providers and scope them accordingly using route layouts.
