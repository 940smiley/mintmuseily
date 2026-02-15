## 2025-05-15 - Discrepancy between Project Specs and Implementation
**Vulnerability:** Naive ERC721 `mint` implementation lacked supply limits, batching limits, and did not follow the Checks-Effects-Interactions (CEI) pattern, despite project documentation suggesting otherwise.
**Learning:** Placeholders or early-stage implementations may omit critical security features even if they are defined in the project's memory or standards. Naive `_safeMint` placement after state updates (Effect) is essential to prevent potential reentrancy issues.
**Prevention:** Always verify that security standards (like CEI and supply caps) are actually implemented in the code, and do not rely solely on project descriptions or documentation as the source of truth for the current state.
