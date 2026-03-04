# Bolt's Journal

## 2025-05-15 - Solidity unchecked increment
**Learning:** In Solidity 0.8.x, sequential increments of a counter like `tokenId` in an NFT contract can be safely wrapped in an `unchecked` block to save gas. Since a `uint256` is sufficiently large, reaching an overflow is practically impossible.
**Action:** Use `unchecked` blocks for counters and loop increments in Solidity 0.8+ to optimize gas usage without sacrificing security.

## 2025-05-15 - Strict Boundary Enforcement
**Learning:** The "Never modify package.json" and "Ask first for architectural changes" rules are strictly enforced in this repository. Even if dependencies are needed to resolve build errors in the environment, they should not be committed unless explicitly instructed.
**Action:** Perform environment fixes locally for verification but restore `package.json` and lockfiles before submission. Focus strictly on ONE optimization as requested.
