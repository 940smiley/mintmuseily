// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract MintMuseily is ERC721, Ownable {
    uint256 public tokenId;
    uint256 public constant MAX_BATCH_SIZE = 10;

    constructor() ERC721("MintMuseily", "MUSE") Ownable(msg.sender) {}

    /**
     * @dev Mints multiple tokens to the caller.
     * Follows Checks-Effects-Interactions (CEI) pattern and implements batch limits.
     * @param amount The number of tokens to mint.
     */
    function mint(uint256 amount) external {
        require(amount > 0, "Amount must be greater than 0");
        require(amount <= MAX_BATCH_SIZE, "Exceeds max batch size");

        for (uint256 i = 0; i < amount; i++) {
            uint256 currentId = tokenId;
            // Effect: Increment tokenId before interaction
            tokenId++;
            // Interaction: _safeMint can call external contracts
            _safeMint(msg.sender, currentId);
        }
    }
}
