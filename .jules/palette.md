## 2026-03-03 - Accessible Modal and Transaction Feedback
**Learning:** For Web3 applications, users need explicit feedback for both the "Requesting" (wallet signature) and "Confirming" (on-chain transaction) phases. Using `useWaitForTransactionReceipt` to trigger a `SuccessModal` ensures the user only sees success once the transaction is actually mined.
**Action:** Always implement a two-stage loading indicator (e.g., Requesting/Confirming) and use transaction receipts to trigger success states. Ensure modals are accessible with `role="dialog"`, focus management, and Escape key support.
