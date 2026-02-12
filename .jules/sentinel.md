## 2024-05-22 - [CEI and Error Sanitization]
**Vulnerability:** Smart contract violated Checks-Effects-Interactions (CEI) pattern by incrementing token ID after minting, and frontend leaked detailed error messages.
**Learning:** Reentrancy protection for the same token ID is handled by OpenZeppelin's _mint, but CEI remains a best practice. Frontend error objects can leak internal stack traces if not sanitized.
**Prevention:** Always increment state variables before external calls. Use 'shortMessage' from viem/wagmi error objects for user-facing displays.
