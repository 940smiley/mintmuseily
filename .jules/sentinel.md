## 2025-05-15 - [Security Enhancements in Minting Logic]
**Vulnerability:** Lack of supply limits, batch limits, and CEI pattern in MintMuseily.sol. Information leakage in frontend error messages.
**Learning:** Wagmi v2 writeContract requires explicit chain and account parameters in some environments when using strict TypeScript types.
**Prevention:** Always implement MAX_SUPPLY and MAX_PER_MINT in NFT contracts. Use error.shortMessage instead of error.message in frontend.

## 2025-05-15 - [CI Failure and Dependency Fixes]
**Vulnerability:** Broken CI (CodeQL actions scanner failure) and missing security-related peer dependencies.
**Learning:** CodeQL "actions" scanner can fail with exit code 32 if it finds GitHub Actions code in nested directories but not in the root .github/workflows. Missing peer dependencies like @tanstack/react-query can cause build failures in Wagmi v2.
**Prevention:** Always maintain a valid root .github/workflows directory in monorepos. Ensure all required peer dependencies are in package.json.
