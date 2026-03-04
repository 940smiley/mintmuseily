// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import {ERC721} from "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";

contract MintMuseily is ERC721, Ownable {
    uint256 public tokenId;

    constructor() ERC721("MintMuseily", "MUSE") Ownable(msg.sender) {}

    /**
     * @dev Mints a new token.
     * Gas optimization: Uses unchecked increment for tokenId since it's practically
     * impossible to overflow a uint256 through sequential increments.
     */
    function mint() external {
        _safeMint(msg.sender, tokenId);
        unchecked {
            tokenId++;
        }
    }
}
