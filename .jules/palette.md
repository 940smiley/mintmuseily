## 2026-03-04 - [Success Modal Accessibility]
**Learning:** In blockchain applications, success modals often signify the end of a long async process (the "Confirmed" state). Ensuring they automatically focus the primary 'Close' button and handle the 'Escape' key is critical for keyboard-only users who might have been waiting for the confirmation.
**Action:** Always implement focus management and Escape key listeners in `SuccessModal` components.

## 2026-03-04 - [Wagmi v2 Migration and Dependency Management]
**Learning:** Migrating to Wagmi v2/RainbowKit v2 in a Next.js environment requires careful handling of peer dependencies like `autoprefixer`, `postcss`, and `@tanstack/react-query`. Additionally, certain Web3 SDKs (like MetaMask) may require polyfills or specific packages like `@react-native-async-storage/async-storage` even in browser environments to avoid build-time errors.
**Action:** Ensure all peer dependencies are explicitly installed and Web3 providers are updated to their v2 equivalents (`WagmiProvider` vs `WagmiConfig`).
