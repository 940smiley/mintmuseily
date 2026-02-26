## 2025-02-26 - Gas-Optimized Batch Minting
**Learning:** Batching minting operations in Solidity significantly reduces gas costs per NFT by amortizing transaction overhead and minimizing storage writes (`SSTORE` on `tokenId`). Using the Checks-Effects-Interactions (CEI) pattern with `unchecked` arithmetic and storage caching further optimizes performance.
**Action:** Always implement batching for frequently called state-changing functions and cache storage variables in local memory when used in loops or multiple times in a function.
