// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import {ERC721} from "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title MintMuseily
 * @dev Hyper-optimized ERC721 contract with efficient single and batch minting.
 */
contract MintMuseily is ERC721, Ownable {
    uint256 public tokenId;

    constructor() ERC721("MintMuseily", "MUSE") Ownable(msg.sender) {}

    /**
     * @dev Hyper-optimized single mint.
     * Uses unchecked increment and local variable caching for maximum gas efficiency.
     * Follows the Checks-Effects-Interactions pattern.
     */
    function mint() external {
        uint256 currentId = tokenId;

        // Effect: update state before interactions
        unchecked {
            tokenId = currentId + 1;
        }

        // Interaction: safeMint
        _safeMint(msg.sender, currentId);
    }

    /**
     * @dev Optimized batch minting.
     * Reduces gas per token by amortizing transaction base costs and using unchecked loops.
     * @param amount The number of tokens to mint.
     */
    function mint(uint256 amount) external {
        require(amount > 0, "Amount must be > 0");
        uint256 currentId = tokenId;

        // Effect: update state before external calls
        unchecked {
            tokenId = currentId + amount;
        }

        for (uint256 i = 0; i < amount;) {
            _safeMint(msg.sender, currentId + i);
            unchecked {
                i++;
            }
        }
    }
}
