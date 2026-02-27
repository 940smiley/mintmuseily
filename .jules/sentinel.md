# Sentinel Journal 🛡️

This journal records critical security learnings and vulnerability patterns discovered in the MintMuseily codebase.

## 2025-02-27 - Error Information Leakage in MintPage
**Vulnerability:** The application was directly displaying `error.message` from Wagmi/Viem, which can contain internal stack traces, RPC URLs, or implementation details.
**Learning:** Raw blockchain error objects are often verbose and not suitable for user-facing UI in production.
**Prevention:** Use `error.shortMessage` from Viem/Wagmi and provide a generic fallback to ensure internal details are never exposed to the end user.
