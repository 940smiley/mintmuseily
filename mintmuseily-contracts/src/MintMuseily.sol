// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract MintMuseily is ERC721, Ownable {
    uint256 public tokenId;
    uint256 public constant MAX_BATCH_SIZE = 10;

    constructor() ERC721("MintMuseily", "MUSE") Ownable(msg.sender) {}

    /**
     * @dev Mint a single token.
     * Follows Checks-Effects-Interactions (CEI) pattern to prevent reentrancy issues
     * by updating state (tokenId) before external interaction (_safeMint).
     */
    function mint() external {
        uint256 currentId = tokenId;
        unchecked {
            tokenId = currentId + 1;
        }
        _safeMint(msg.sender, currentId);
    }

    /**
     * @dev Batch mint tokens.
     * Implements a batch limit (MAX_BATCH_SIZE) to prevent Gas DoS attacks
     * and follows the CEI pattern for secure state updates.
     */
    function mint(uint256 amount) external {
        require(amount > 0, "Amount must be greater than 0");
        require(amount <= MAX_BATCH_SIZE, "Exceeds max batch size");

        uint256 currentId = tokenId;
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
