// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {Test, console} from "forge-std/Test.sol";
import {TreasuryRegistry} from "../src/TreasuryRegistry.sol";

contract TreasuryRegistryTest is Test {
    TreasuryRegistry public registry;
    address public owner;
    address public user1;
    address public user2;
    address public treasury1;
    address public treasury2;

    event TreasuryRegistered(
        address indexed treasury,
        string name,
        string category,
        address indexed registrant
    );

    event TreasuryVerified(address indexed treasury, bool verified);

    function setUp() public {
        owner = address(this);
        user1 = address(0x1);
        user2 = address(0x2);
        treasury1 = address(0x100);
        treasury2 = address(0x200);

        registry = new TreasuryRegistry();
    }

    function test_RegisterTreasury() public {
        vm.prank(user1);
        registry.registerTreasury(treasury1, "Test DAO", "DAO");

        TreasuryRegistry.Treasury memory treasury = registry.getTreasury(
            treasury1
        );
        assertEq(treasury.treasury, treasury1);
        assertEq(treasury.name, "Test DAO");
        assertEq(treasury.category, "DAO");
        assertEq(treasury.verified, false);
        assertEq(treasury.registrant, user1);
        assertTrue(treasury.registeredAt > 0);
    }

    function test_RegisterTreasury_EmitsEvent() public {
        vm.expectEmit(true, false, false, true);
        emit TreasuryRegistered(treasury1, "Test DAO", "DAO", user1);

        vm.prank(user1);
        registry.registerTreasury(treasury1, "Test DAO", "DAO");
    }

    function test_RegisterTreasury_RevertIfZeroAddress() public {
        vm.expectRevert("TreasuryRegistry: zero address");
        registry.registerTreasury(address(0), "Test", "DAO");
    }

    function test_RegisterTreasury_RevertIfAlreadyRegistered() public {
        vm.prank(user1);
        registry.registerTreasury(treasury1, "Test DAO", "DAO");

        vm.expectRevert("TreasuryRegistry: already registered");
        vm.prank(user2);
        registry.registerTreasury(treasury1, "Another Name", "Grant");
    }

    function test_RegisterTreasury_RevertIfEmptyName() public {
        vm.expectRevert("TreasuryRegistry: empty name");
        registry.registerTreasury(treasury1, "", "DAO");
    }

    function test_UpdateTreasury() public {
        vm.prank(user1);
        registry.registerTreasury(treasury1, "Test DAO", "DAO");

        vm.prank(user1);
        registry.updateTreasury(treasury1, "Updated Name", "Grant");

        TreasuryRegistry.Treasury memory treasury = registry.getTreasury(
            treasury1
        );
        assertEq(treasury.name, "Updated Name");
        assertEq(treasury.category, "Grant");
    }

    function test_UpdateTreasury_RevertIfNotRegistrant() public {
        vm.prank(user1);
        registry.registerTreasury(treasury1, "Test DAO", "DAO");

        vm.expectRevert("TreasuryRegistry: not registrant");
        vm.prank(user2);
        registry.updateTreasury(treasury1, "Updated Name", "Grant");
    }

    function test_VerifyTreasury() public {
        vm.prank(user1);
        registry.registerTreasury(treasury1, "Test DAO", "DAO");

        registry.verifyTreasury(treasury1, true);

        TreasuryRegistry.Treasury memory treasury = registry.getTreasury(
            treasury1
        );
        assertTrue(treasury.verified);
    }

    function test_VerifyTreasury_RevertIfNotOwner() public {
        vm.prank(user1);
        registry.registerTreasury(treasury1, "Test DAO", "DAO");

        vm.expectRevert("TreasuryRegistry: not owner");
        vm.prank(user1);
        registry.verifyTreasury(treasury1, true);
    }

    function test_GetTreasuryCount() public {
        assertEq(registry.getTreasuryCount(), 0);

        vm.prank(user1);
        registry.registerTreasury(treasury1, "Test DAO", "DAO");
        assertEq(registry.getTreasuryCount(), 1);

        vm.prank(user2);
        registry.registerTreasury(treasury2, "Test Grant", "Grant");
        assertEq(registry.getTreasuryCount(), 2);
    }

    function test_GetAllTreasuries() public {
        vm.prank(user1);
        registry.registerTreasury(treasury1, "Test DAO", "DAO");

        vm.prank(user2);
        registry.registerTreasury(treasury2, "Test Grant", "Grant");

        address[] memory allTreasuries = registry.getAllTreasuries();
        assertEq(allTreasuries.length, 2);
        assertEq(allTreasuries[0], treasury1);
        assertEq(allTreasuries[1], treasury2);
    }

    function test_GetTreasuries() public {
        vm.prank(user1);
        registry.registerTreasury(treasury1, "Test DAO", "DAO");

        vm.prank(user2);
        registry.registerTreasury(treasury2, "Test Grant", "Grant");

        TreasuryRegistry.Treasury[] memory result = registry.getTreasuries(
            0,
            2
        );
        assertEq(result.length, 2);
        assertEq(result[0].treasury, treasury1);
        assertEq(result[1].treasury, treasury2);
    }
}

