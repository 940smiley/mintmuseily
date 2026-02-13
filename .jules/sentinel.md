## 2025-05-15 - [Security Enhancements in Minting Logic]
**Vulnerability:** Lack of supply limits, batch limits, and CEI pattern in MintMuseily.sol. Information leakage in frontend error messages.
**Learning:** Wagmi v2 writeContract requires explicit chain and account parameters in some environments when using strict TypeScript types.
**Prevention:** Always implement MAX_SUPPLY and MAX_PER_MINT in NFT contracts. Use error.shortMessage instead of error.message in frontend.
