## 2026-03-05 - Web3 Security Headers Enhancement
**Vulnerability:** Missing standard security headers (CSP, X-Frame-Options, etc.) which leaves the application vulnerable to XSS and Clickjacking.
**Learning:** Web3 applications require specific CSP rules to allow connections to decentralized providers like WalletConnect and RPC nodes (Alchemy, Infura) while maintaining a strict 'self' policy.
**Prevention:** Always implement a baseline set of security headers in `next.config.js` and tailor the `connect-src` and `img-src` to the specific Web3 providers used in the project.
