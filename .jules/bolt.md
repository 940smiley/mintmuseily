## 2025-05-15 - Gas optimization in MintMuseily.sol
**Learning:** In Solidity 0.8.x, sequential increments in minting loops (even single mints) can be wrapped in an `unchecked` block to save gas on redundant overflow checks. Caching state variables like `tokenId` and following the CEI pattern also optimizes SLOAD/SSTORE operations.
**Action:** Implement `unchecked` increments and local variable caching for state updates in the `mint()` function.
