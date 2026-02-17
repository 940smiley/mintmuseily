## 2025-05-14 - [Provider Scoping for Bundle Size]
**Learning:** Wrapping the entire application in Web3 providers (Wagmi, RainbowKit) causes heavy blockchain libraries to be included in the shared bundle, penalizing even non-Web3 pages like the landing page.
**Action:** Move Web3 providers to the specific route layouts that actually require blockchain connectivity to optimize the initial bundle size for other parts of the application.
