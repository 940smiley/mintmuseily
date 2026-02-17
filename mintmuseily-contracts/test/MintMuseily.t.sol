// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.19;

import {Test} from "forge-std/Test.sol";
import {ERC721Holder} from "@openzeppelin/contracts/token/ERC721/utils/ERC721Holder.sol";
import {MintMuseily} from "../src/MintMuseily.sol";

contract MintMuseilyTest is Test, ERC721Holder {
    MintMuseily public mintMuseily;

    function setUp() public {
        mintMuseily = new MintMuseily();
    }

    function test_Mint() public {
        mintMuseily.mint(1);
        assertEq(mintMuseily.tokenId(), 1);
        assertEq(mintMuseily.balanceOf(address(this)), 1);
    }

    function test_MintBatch() public {
        mintMuseily.mint(5);
        assertEq(mintMuseily.tokenId(), 5);
        assertEq(mintMuseily.balanceOf(address(this)), 5);
    }

    function test_RevertIfExceedMaxPerMint() public {
        vm.expectRevert("MintMuseily: Invalid amount");
        mintMuseily.mint(11);
    }

    function test_RevertIfExceedMaxSupply() public {
        // Mint up to 10000
        // We can use vm.store or just a loop if we have to, but let's try to be efficient.
        // For testing purposes, we can't easily jump tokenId unless we change it.
        // But we can test the logic by minting in batches.

        // Let's just test the boundary with one large batch if we can,
        // but MAX_PER_MINT prevents that.

        // We'll use a loop to get close to the limit.
        for (uint256 i = 0; i < 1000; i++) {
            mintMuseily.mint(10);
        }
        assertEq(mintMuseily.tokenId(), 10000);

        vm.expectRevert("MintMuseily: Exceeds max supply");
        mintMuseily.mint(1);
    }
}
