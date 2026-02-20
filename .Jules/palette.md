## 2026-02-20 - [Accessible Modal Focus Management]
**Learning:** For blockchain-based applications, success modals are critical for providing immediate feedback. However, they often break keyboard navigation if they don't explicitly handle focus. Automatically focusing the primary action (e.g., "Close" or "Awesome") when the modal opens significantly improves the experience for keyboard users.
**Action:** Always include a `useRef` and `useEffect` pattern in modal components to ensure focus is trapped or at least moved to the primary action upon opening.
