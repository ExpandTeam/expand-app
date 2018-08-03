pragma solidity 0.4.24;

import './ExpandToken.sol';

contract Article {
    address public owner;
    string public title;
    string public hash;
    uint256 public amount;

    constructor(string _title, string _hash) public {
        owner = msg.sender;
        title = _title;
        hash = _hash;
        amount = 0;
    }

    function kill() public {
        if (msg.sender == owner) {
            selfdestruct(owner);
        }
    }

    function give(uint256 _amount, ExpandToken token) public returns (bool) {
        token.transferFrom(msg.sender, owner, _amount);
        amount+=_amount;
        return true;
    }
}
