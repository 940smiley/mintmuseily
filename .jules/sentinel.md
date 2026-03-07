## 2025-05-15 - Security Enhancement: Web Defense-in-Depth
**Vulnerability:** Missing security headers (CSP, X-Frame-Options, etc.) and potential information disclosure in error messages.
**Learning:** Default Next.js configurations often lack strict security headers, and raw error objects from Web3 libraries can contain sensitive internal details.
**Prevention:** Always implement a comprehensive Content Security Policy and sanitize error messages before displaying them in the UI.
