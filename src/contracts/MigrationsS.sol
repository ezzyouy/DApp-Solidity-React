//SPDX-License-Identifier:MIT
pragma solidity >=0.4.22 <0.9.0;

contract MigrationsS {
    address public owner;
    uint public last_completed_migration;

    constructor() {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        if (msg.sender == owner) _;
    }

    function setCompleted(uint completed) public onlyOwner {
        last_completed_migration = completed;
    }

    function update(address new_address) public onlyOwner {
        MigrationsS updated = MigrationsS(new_address);
        updated.setCompleted(last_completed_migration);
    }
}
