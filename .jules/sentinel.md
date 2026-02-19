## 2026-02-19 - Contract Security and Web Headers
**Vulnerability:** Lack of supply limits, reentrancy risk (CEI violation), and missing security headers.
**Learning:** Smart contracts should always enforce supply caps and follow Checks-Effects-Interactions pattern, even if reentrancy seems unlikely with standard libraries. Web applications require basic security headers to prevent common attacks like clickjacking.
**Prevention:** Use constants for supply limits, update state before external calls, and configure security headers in Next.js config.
