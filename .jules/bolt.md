# Bolt's Journal - Critical Learnings

## 2025-05-14 - Scoped Web3 Providers Trade-off
**Learning:** Moving heavy Web3 providers from the root layout to specific sub-routes significantly reduces initial bundle size for unrelated pages (e.g., from ~10,000 to ~500 modules). However, it causes wallet disconnection when navigating away from the scoped route. In apps where global connection state is expected, this is a major UX regression.
**Action:** Prefer root-level providers for global state but optimize their internal implementation (e.g., `useMemo` for providers, `WagmiProvider` migration) and focus on other efficiency wins like smart contract gas optimization.

## 2025-05-14 - Solidity Gas Optimization Patterns
**Learning:** Caching state variables in local memory and using `unchecked` blocks for increments in loops and counter updates provides measurable gas savings. For batch minting, these patterns are essential to keep transaction costs low for users.
**Action:** Always apply caching and `unchecked` increments in Solidity functions that modify counters.
