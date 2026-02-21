// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract MintMuseily is ERC721, Ownable {
    uint256 public tokenId;
    uint256 public constant MAX_SUPPLY = 10000;
    uint256 public constant MAX_PER_MINT = 10;

    constructor() ERC721("MintMuseily", "MUSE") Ownable(msg.sender) {}

    /**
     * @dev Mints NFTs to the sender.
     * Implements CEI pattern and enforces supply limits for security.
     * @param amount The number of tokens to mint.
     */
    function mint(uint256 amount) external {
        require(amount > 0 && amount <= MAX_PER_MINT, "Invalid amount");
        uint256 currentTokenId = tokenId;
        require(currentTokenId + amount <= MAX_SUPPLY, "Exceeds max supply");

        // Effect: update state before interactions (CEI pattern)
        tokenId = currentTokenId + amount;

        // Interaction: minting tokens
        for (uint256 i = 0; i < amount;) {
            _safeMint(msg.sender, currentTokenId + i);
            unchecked {
                i++;
            }
        }
    }
}
