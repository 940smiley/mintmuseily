## 2025-05-14 - Fix CEI violation and prevent Gas DoS in MintMuseily

**Vulnerability:** The `mint()` function in `MintMuseily.sol` was incrementing the `tokenId` after the `_safeMint` interaction, violating the Checks-Effects-Interactions (CEI) pattern.

**Learning:** Smart contracts must prioritize state updates before external interactions, especially when using `_safeMint` which includes a callback to the receiver. Gas DoS risks in loop-based functions (like the newly added batch mint) must be mitigated by enforcing strict limits.

**Prevention:** Always implement the CEI pattern: perform all checks first, then update state (effects), and finally interact with other contracts. Enforce reasonable limits on any loop-based operations to prevent out-of-gas errors.
