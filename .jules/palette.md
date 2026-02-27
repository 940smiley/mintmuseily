## 2026-02-27 - Success Modal Accessibility
**Learning:** Success modals in blockchain applications should automatically focus the primary action (e.g., 'Close') when opened and handle the 'Escape' key. This is crucial as these modals often mark the end of a transaction flow for keyboard-only and screen reader users.
**Action:** Use `useEffect` with `ref.current.focus()` and a global `keydown` listener for 'Escape' in all modal components.

## 2026-02-27 - Form Accessibility in Minting UI
**Learning:** Interactive form elements like the NFT mint amount input must be explicitly associated with a `<label>` using `htmlFor`. This improves both screen reader support and the hit area usability for all users.
**Action:** Always wrap or associate inputs with semantic `<label>` elements, even in simple "micro" interfaces.
