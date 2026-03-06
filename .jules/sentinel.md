## 2025-05-14 - Security Headers Implementation
**Vulnerability:** Lack of security headers (CSP, X-Frame-Options, etc.) making the application vulnerable to XSS and Clickjacking.
**Learning:** Next.js applications should explicitly define security headers in `next.config.js` to protect against common web vulnerabilities.
**Prevention:** Always implement a strict Content Security Policy and other security headers at the infrastructure or application configuration level.
