## 2025-05-15 - React Component Memoization
**Learning:** Pure components like `NFTCard` and `SuccessModal` are prone to unnecessary re-renders in dynamic layouts. Wrapping them with `React.memo` is a low-risk, high-reward optimization that improves UI responsiveness.
**Action:** Always identify static or prop-driven components that are part of frequently updated parents and memoize them to minimize the virtual DOM diffing overhead.
