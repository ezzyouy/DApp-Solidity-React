//SPDX-License-Identifier:MIT
pragma solidity >=0.4.22 <0.9.0;

import "./RWD.sol";
import "./Tether.sol";

contract DecentralBank {
    string public name = "Decentral Bank";
    address public owner;
    Tether public tether;
    RWD public rwd;

    address[] public stackers;

    mapping(address => uint) public stakingBalance;
    mapping(address => bool) public hasStaked;
    mapping(address => bool) public isStaked;

    constructor(RWD _rwd, Tether _tether) {
        rwd = _rwd;
        tether = _tether;
    }

    function depositToken(uint _amount) public {
        require(_amount > 0, "amount cannot be 0");
        unchecked {
            tether.tranferFrom(msg.sender, address(this), _amount);
            stakingBalance[msg.sender] += _amount;
        }

        if (!hasStaked[msg.sender]) {
            stackers.push(msg.sender);
        }

        isStaked[msg.sender] = true;
        hasStaked[msg.sender] = true;
    }
}
