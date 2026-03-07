// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract MintMuseily is ERC721, Ownable {
    uint256 public tokenId;

    constructor() ERC721("MintMuseily", "MUSE") Ownable(msg.sender) {}

    function mint() external {
        // Cache tokenId to a local variable to save gas (reduces SLOAD operations)
        uint256 currTokenId = tokenId;
        _safeMint(msg.sender, currTokenId);

        // Use unchecked to save gas on the increment (overflow is practically impossible for tokenId)
        unchecked {
            tokenId = currTokenId + 1;
        }
    }
}
