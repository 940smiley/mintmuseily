## 2025-05-14 - Implementing Security Headers in Next.js
**Vulnerability:** Missing security headers (X-Frame-Options, CSP, etc.) leaves the application vulnerable to clickjacking and XSS.
**Learning:** Content-Security-Policy (CSP) needs to be carefully tuned for Web3 applications to allow connections to various RPC providers and wallet services (WalletConnect, Alchemy, Infura). Overly restrictive CSP can break blockchain interactions.
**Prevention:** Use standard security headers by default in `next.config.js` and maintain an allowlist of trusted RPC and wallet domains in the CSP.
