## 2025-05-14 - Information Disclosure via Error Messages
**Vulnerability:** Displaying raw `error.message` in the UI can leak sensitive internal details, such as RPC endpoints, stack traces, or internal logic.
**Learning:** Web3 libraries like `viem` provide a `shortMessage` property that contains a sanitized, human-readable error. Using this property instead of `message` significantly reduces the risk of information disclosure.
**Prevention:** Always sanitize error objects before displaying them to the user. Use fallback generic messages for unknown error structures.
