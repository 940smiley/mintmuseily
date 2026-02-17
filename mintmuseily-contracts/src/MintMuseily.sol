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
     * @dev Mints NFTs to the caller.
     * Follows Checks-Effects-Interactions pattern.
     * @param amount The number of NFTs to mint.
     */
    function mint(uint256 amount) external {
        require(amount > 0 && amount <= MAX_PER_MINT, "MintMuseily: Invalid amount");
        require(amount <= MAX_SUPPLY - tokenId, "MintMuseily: Exceeds max supply");

        uint256 startId = tokenId;
        tokenId += amount; // Effect before Interaction

        for (uint256 i = 0; i < amount; ) {
            _safeMint(msg.sender, startId + i); // Interaction
            unchecked {
                i++;
            }
        }
    }
}
