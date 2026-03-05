// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract MintMuseily is ERC721, Ownable {
    uint256 public tokenId;

    constructor() ERC721("MintMuseily", "MUSE") Ownable(msg.sender) {}

    /**
     * @dev Optimized single mint function.
     * Uses unchecked block for tokenId increment to save gas.
     */
    function mint() external {
        uint256 currentId = tokenId;
        unchecked {
            tokenId = currentId + 1;
        }
        _safeMint(msg.sender, currentId);
    }

    /**
     * @dev Optimized batch mint function.
     * Reduces gas per NFT by batching state updates and using unchecked increments.
     * @param amount The number of NFTs to mint.
     */
    function mint(uint256 amount) external {
        uint256 currentId = tokenId;
        unchecked {
            tokenId = currentId + amount;
        }

        for (uint256 i = 0; i < amount; ) {
            _safeMint(msg.sender, currentId);
            unchecked {
                currentId++;
                i++;
            }
        }
    }
}
