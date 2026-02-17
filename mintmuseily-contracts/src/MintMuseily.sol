// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract MintMuseily is ERC721, Ownable {
    uint256 public tokenId;

    constructor() ERC721("MintMuseily", "MUSE") Ownable(msg.sender) {}

    /**
     * @dev Mints a specified amount of tokens to the caller.
     * @param amount The number of tokens to mint.
     *
     * Security:
     * - Input validation: amount must be > 0 and <= 20 to prevent gas DoS.
     * - CEI pattern: increment tokenId before calling _safeMint to prevent potential reentrancy.
     */
    function mint(uint256 amount) external {
        require(amount > 0, "Amount must be greater than 0");
        require(amount <= 20, "Exceeds max mint per transaction");

        for (uint256 i = 0; i < amount; i++) {
            uint256 currentTokenId = tokenId;
            tokenId++;
            _safeMint(msg.sender, currentTokenId);
        }
    }
}
