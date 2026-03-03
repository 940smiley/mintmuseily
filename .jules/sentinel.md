## 2025-05-15 - Next.js Security Headers and Environment Validation
**Vulnerability:** Missing security headers (CSP, X-Frame-Options, etc.) and lack of fail-fast validation for critical Web3 environment variables.
**Learning:** In a Web3 Next.js application, missing environment variables for RPC providers can lead to silent failures or unhandled runtime exceptions. Standard security headers are often overlooked in default Next.js configurations but are critical for defense-in-depth, especially when interacting with third-party wallets.
**Prevention:** Always implement a central `Web3Provider` that validates required environment variables on initialization and configure comprehensive security headers in `next.config.js`.
