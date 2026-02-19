// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import {ERC721} from "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";

contract MintMuseily is ERC721, Ownable {
    uint256 public tokenId;
    uint256 public constant MAX_SUPPLY = 10000;
    uint256 public constant MAX_PER_MINT = 10;

    constructor() ERC721("MintMuseily", "MUSE") Ownable(msg.sender) {}

    function mint(uint256 amount) external {
        require(amount > 0 && amount <= MAX_PER_MINT, "Exceeds max per mint");
        require(tokenId + amount <= MAX_SUPPLY, "Exceeds max supply");

        for (uint256 i = 0; i < amount; ) {
            uint256 currentId = tokenId;
            tokenId++;
            _safeMint(msg.sender, currentId);
            unchecked {
                i++;
            }
        }
    }
}
