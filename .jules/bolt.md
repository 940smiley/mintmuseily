## 2024-05-15 - Solidity Gas Optimization
**Learning:** In 'MintMuseily.sol', caching the 'tokenId' state variable into a local stack variable before use and update reduces gas costs by minimizing SLOAD operations. Additionally, using 'unchecked' for increments that cannot realistically overflow saves gas by skipping redundant checks.
**Action:** Always cache state variables to the stack if they are accessed multiple times in a function, and use 'unchecked' arithmetic for simple counters.
