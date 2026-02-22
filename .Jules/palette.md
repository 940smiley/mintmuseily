## 2025-05-14 - [Focus Management in Web3 Modals]
**Learning:** In blockchain applications, transaction success often triggers a modal. Automatically focusing the primary action (e.g., "Close" or "View on Explorer") is critical for keyboard-only users who might otherwise be stranded in a background focus trap after a complex interaction.
**Action:** Use `useRef` and `useEffect` to shift focus to the primary modal action button upon mounting.
