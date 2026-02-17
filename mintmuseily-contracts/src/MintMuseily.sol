// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract MintMuseily is ERC721, Ownable {
    uint256 public tokenId;
    uint256 public constant MAX_SUPPLY = 10000;

    constructor() ERC721("MintMuseily", "MUSE") Ownable(msg.sender) {}

    /**
     * @dev Optimized mint function using gas-saving techniques.
     * Caches storage variables and uses unchecked blocks for arithmetic.
     */
    function mint() external {
        uint256 currentId = tokenId;
        require(currentId < MAX_SUPPLY, "Max supply reached");

        _safeMint(msg.sender, currentId);

        unchecked {
            tokenId = currentId + 1;
        }
    }
}
