## 2026-02-24 - [Accessible Success Modals]
**Learning:** Success modals in Web3 apps often trigger as the final step of an async transaction. Providing immediate focus on the primary action (Close) and supporting keyboard navigation (Escape key) significantly improves the experience for keyboard-only and screen reader users who might otherwise be lost when the modal suddenly appears.
**Action:** Always implement focus management and Escape key listeners in modals, and use appropriate ARIA roles (`dialog`, `aria-modal="true"`).
