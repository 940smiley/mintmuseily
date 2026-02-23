## 2025-05-14 - Standard Security Headers for Next.js
**Vulnerability:** Missing standard security headers (X-Frame-Options, CSP frame-ancestors, etc.) leaves the application vulnerable to clickjacking and other web attacks.
**Learning:** Next.js allows centralized security header management in `next.config.js` using the `headers()` async function.
**Prevention:** Always implement a baseline set of security headers to mitigate common web vulnerabilities like clickjacking and sniffing.
