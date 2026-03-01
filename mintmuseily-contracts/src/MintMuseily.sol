// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import {ERC721} from "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";

contract MintMuseily is ERC721, Ownable {
    uint256 public tokenId;

    constructor() ERC721("MintMuseily", "MUSE") Ownable(msg.sender) {}

    /**
     * @dev Optimized single mint function.
     */
    function mint() external {
        uint256 currentId = tokenId;
        _safeMint(msg.sender, currentId);
        unchecked {
            tokenId = currentId + 1;
        }
    }

    /**
     * @dev Gas-optimized batch minting function.
     * Uses a local cache for tokenId and an unchecked block for the loop to minimize gas costs.
     * @param amount The number of tokens to mint.
     */
    function mint(uint256 amount) external {
        uint256 currentId = tokenId;
        for (uint256 i = 0; i < amount;) {
            _safeMint(msg.sender, currentId);
            unchecked {
                currentId++;
                i++;
            }
        }
        tokenId = currentId;
    }
}
