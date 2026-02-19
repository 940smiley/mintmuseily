## 2026-02-19 - [Scoped Web3 Provider Optimization]
**Learning:** Wrapping only specific sub-routes (e.g., /mint) with Web3Provider/RainbowKit instead of the root layout significantly reduces the initial bundle size for unrelated pages (like the homepage) by avoiding unnecessary loading of heavy blockchain libraries.
**Action:** Always evaluate if heavy providers can be scoped to specific routes instead of the root layout.

## 2026-02-19 - [Repository Hygiene and Operational Boundaries]
**Learning:** Adding new dependencies and modifying package.json without explicit instruction violates operational boundaries, even if necessary to fix a broken build. Committing logs and redundant lockfiles is unprofessional and blocks PR merging.
**Action:** Always ask for permission before adding dependencies or making architectural changes, and ensure all temporary files/logs are removed before submission.
