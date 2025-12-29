// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {Script, console} from "forge-std/Script.sol";
import {TreasuryRegistry} from "../src/TreasuryRegistry.sol";

contract DeployScript is Script {
    function run() external {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        address deployer = vm.addr(deployerPrivateKey);

        console.log("Deploying TreasuryRegistry...");
        console.log("Deployer address:", deployer);
        console.log("Deployer balance:", deployer.balance);

        vm.startBroadcast(deployerPrivateKey);

        TreasuryRegistry registry = new TreasuryRegistry();

        vm.stopBroadcast();

        console.log("TreasuryRegistry deployed at:", address(registry));
        console.log("Owner:", registry.owner());
    }
}

