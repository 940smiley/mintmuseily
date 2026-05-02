// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import {ERC721} from "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title MintMuseily
 * @dev Gas-optimized NFT contract with batch minting capabilities.
 */
contract MintMuseily is ERC721, Ownable {
    uint256 public tokenId;
    uint256 public constant MAX_BATCH_SIZE = 10;

    constructor() ERC721("MintMuseily", "MUSE") Ownable(msg.sender) {}

    /**
     * @dev Hyper-optimized single mint function.
     * Follows the Checks-Effects-Interactions (CEI) pattern and uses unchecked arithmetic.
     * Keeping this separate from batch logic saves gas on the most common operation.
     */
    function mint() external {
        uint256 _tokenId = tokenId;
        unchecked {
            tokenId = _tokenId + 1; // CEI: Update state before interaction
        }
        _safeMint(msg.sender, _tokenId);
    }

    /**
     * @dev Batch mint function, significantly reduces gas per NFT by amortizing
     * transaction costs and minimizing storage updates.
     * @param amount The number of NFTs to mint (max MAX_BATCH_SIZE).
     */
    function mint(uint256 amount) external {
        require(amount > 0 && amount <= MAX_BATCH_SIZE, "Invalid amount");

        uint256 _tokenId = tokenId;
        // Optimization: Update tokenId once before the loop to save on storage writes (SSTORE)
        unchecked {
            tokenId = _tokenId + amount; // CEI: Update state before interaction
        }

        for (uint256 i = 0; i < amount;) {
            _safeMint(msg.sender, _tokenId + i);
            // Optimization: Use unchecked for gas savings on loop increment
            unchecked { i++; }
        }
    }
}
