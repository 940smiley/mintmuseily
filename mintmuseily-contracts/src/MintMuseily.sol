// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract MintMuseily is ERC721, Ownable {
    uint256 public tokenId;

    constructor() ERC721("MintMuseily", "MUSE") Ownable(msg.sender) {}

    /**
     * @dev Backward compatible mint function.
     */
    function mint() external {
        _mintInternal(msg.sender, 1);
    }

    /**
     * @dev Optimized mint function that supports batching.
     * Batching is more gas-efficient than multiple individual transactions.
     * Uses unchecked increment and local variable caching for further gas savings.
     */
    function mint(uint256 amount) external {
        _mintInternal(msg.sender, amount);
    }

    /**
     * @dev Internal mint function to avoid code duplication and optimize gas.
     */
    function _mintInternal(address to, uint256 amount) internal {
        require(amount > 0 && amount <= 10, "Invalid amount: must be between 1 and 10");

        uint256 currId = tokenId;

        // Effect: Update tokenId before interaction (CEI)
        unchecked {
            tokenId = currId + amount;
        }

        // Interaction: Mint the tokens
        for (uint256 i = 0; i < amount; i++) {
            _safeMint(to, currId + i);
        }
    }
}
