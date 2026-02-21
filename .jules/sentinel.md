## 2025-05-15 - [Checks-Effects-Interactions and Supply Limits]
**Vulnerability:** The MintMuseily contract lacked a supply limit and did not follow the Checks-Effects-Interactions (CEI) pattern, making it vulnerable to infinite minting and potential reentrancy issues.
**Learning:** Even simple NFT contracts should implement basic security patterns like CEI and enforce supply constraints to prevent state manipulation or resource exhaustion.
**Prevention:** Always update internal state before making external calls and define constants for maximum supply and transaction limits.
