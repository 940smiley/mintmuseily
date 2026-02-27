// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import {ERC721} from "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";

contract MintMuseily is ERC721, Ownable {
    uint256 public tokenId;
    uint256 public constant MAX_BATCH_SIZE = 10;

    constructor() ERC721("MintMuseily", "MUSE") Ownable(msg.sender) {}

    /**
     * @dev Optimized single mint function. Saves gas by caching state and using unchecked increments.
     * Follows Checks-Effects-Interactions pattern.
     */
    function mint() external {
        uint256 currentId = tokenId;
        unchecked {
            tokenId = currentId + 1;
        }
        _safeMint(msg.sender, currentId);
    }

    /**
     * @dev Batch minting function to save gas on multiple mints.
     * @param amount The number of NFTs to mint (max 10).
     */
    function mint(uint256 amount) external {
        require(amount > 0 && amount <= MAX_BATCH_SIZE, "Invalid amount");

        uint256 startId = tokenId;
        unchecked {
            tokenId = startId + amount;
        }

        for (uint256 i = 0; i < amount;) {
            _safeMint(msg.sender, startId + i);
            unchecked {
                i++;
            }
        }
    }
}
