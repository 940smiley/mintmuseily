## 2025-03-02 - Information Leakage via Error Messages
**Vulnerability:** Displaying `error.message` directly in the UI can leak internal stack traces and implementation details to end-users.
**Learning:** React applications using blockchain libraries (like wagmi) often receive complex error objects. Displaying the raw message can expose sensitive data if not sanitized.
**Prevention:** Always sanitize error messages before displaying them in the UI. Use a user-friendly field like `shortMessage` if available, or fall back to a generic error message.

## 2025-03-02 - Missing Security Headers
**Vulnerability:** The application lacked essential security headers (X-Frame-Options, X-Content-Type-Options, etc.), making it vulnerable to clickjacking and other common web attacks.
**Learning:** Next.js provides an `async headers()` function in `next.config.js` that can be used to easily implement these security enhancements.
**Prevention:** Include standard security headers and a well-defined Content-Security-Policy (CSP) in all web applications.
