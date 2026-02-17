# Bolt's Journal

## 2025-05-14 - Gas optimization in Solidity
**Learning:** In Solidity 0.8.x, `unchecked` blocks for increments and caching state variables in memory can measurably reduce gas costs for frequently called functions like `mint`.
**Action:** Use `unchecked` and local variable caching for state variable updates.
