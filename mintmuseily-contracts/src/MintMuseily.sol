// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import {ERC721} from "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";

contract MintMuseily is ERC721, Ownable {
    uint256 public tokenId;

    constructor() ERC721("MintMuseily", "MUSE") Ownable(msg.sender) {}

    /**
     * @dev Optimized mint function using local caching and unchecked arithmetic.
     * Reduces gas consumption by avoiding redundant SLOADs and skiping overflow checks.
     */
    function mint() external {
        uint256 currentId = tokenId;
        _safeMint(msg.sender, currentId);
        unchecked {
            tokenId = currentId + 1;
        }
    }
}
