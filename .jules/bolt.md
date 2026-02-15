## 2025-05-14 - [Gas Optimization in Solidity]
**Learning:** Using 'unchecked' blocks for arithmetic increments and caching storage variables in local memory can significantly reduce gas costs for frequently called functions like 'mint'.
**Action:** Always look for storage caching and unchecked increment opportunities in Solidity 0.8.x contracts.

## 2025-05-14 - [Task Scope Awareness]
**Learning:** Performance optimizations must strictly adhere to project boundaries (no breaking changes, no unauthorized dependency changes) even if those changes would improve performance or fix bugs.
**Action:** Verify that any optimization is non-breaking and doesn't introduce new dependencies without explicit permission.
