// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract MintMuseily is ERC721, Ownable {
    uint256 public tokenId;

    constructor() ERC721("MintMuseily", "MUSE") Ownable(msg.sender) {}

    function mint() external {
        uint256 currentId = tokenId;
        unchecked {
            tokenId = currentId + 1;
        }
        _safeMint(msg.sender, currentId);
    }
}
