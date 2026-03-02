## 2026-03-02 - Accessible Success Feedback Pattern
**Learning:** For blockchain transactions, using `useWaitForTransactionReceipt` provides more reliable UX than just checking `isSuccess` from `useWriteContract`, as it ensures the transaction is actually mined. Focus management and Escape key handling are essential for accessible modals in this flow.
**Action:** Always use `useWaitForTransactionReceipt` for terminal UI feedback and implement full ARIA/focus support in modals.
