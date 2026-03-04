## 2025-03-11 - Security Enhancements for MintMuseily
**Vulnerability:** Lack of security headers and verbose error reporting.
**Learning:** Next.js applications require explicit configuration for security headers to protect against common web attacks like clickjacking and XSS. Additionally, default error reporting can leak internal contract/blockchain details if not sanitized.
**Prevention:** Always implement a robust Content-Security-Policy and other security headers in `next.config.js`. Use `shortMessage` or sanitized error messages in the frontend to prevent information leakage and ensure accessibility with `role="alert"`.
