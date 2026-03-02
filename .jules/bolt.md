## 2026-03-02 - [Strict Scope Enforcement]
**Learning:** Performance optimizations should be isolated from structural changes or dependency upgrades to maintain a clean and safe audit trail, especially in sensitive environments like smart contracts and Web3 frontends.
**Action:** Limit PRs to a single, measurable optimization (< 50 lines) and avoid modifying `package.json` or adding logs.
