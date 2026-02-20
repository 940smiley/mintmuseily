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
     * @dev Optimized mint function with batch support.
     * Uses local variable caching and unchecked blocks for gas efficiency.
     */
    function mint(uint256 amount) external {
        require(amount > 0 && amount <= MAX_PER_MINT, "Invalid amount");
        uint256 currentId = tokenId;
        require(currentId + amount <= MAX_SUPPLY, "Exceeds max supply");

        for (uint256 i = 0; i < amount; ) {
            _safeMint(msg.sender, currentId + i);
            unchecked {
                i++;
            }
        }

        unchecked {
            tokenId = currentId + amount;
        }
    }
}
