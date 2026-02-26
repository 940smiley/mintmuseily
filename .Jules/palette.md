## 2026-02-26 - Success Modal Focus Management
**Learning:** In blockchain applications, success modals are often the terminal feedback step. Automatically focusing the primary "Close" action and handling the 'Escape' key is critical for keyboard accessibility and a smooth "end of flow" experience.
**Action:** Always implement `useRef` and `useEffect` focus management in success modals to ensure screen reader and keyboard-only users can easily dismiss them.
