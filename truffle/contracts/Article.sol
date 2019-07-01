pragma solidity 0.5.8;

import './ExpandToken.sol';

contract Article {
    address public owner;
    string public title;
    string public hash;
    uint256 public amount;

    constructor(string memory _title, string memory _hash) public {
        owner = msg.sender;
        title = _title;
        hash = _hash;
        amount = 0;
    }

    function kill() public {
        require(msg.sender == owner);
        selfdestruct(msg.sender);
    }

    function give(uint256 _amount, ExpandToken token) public returns (bool) {
        amount+=_amount;
        token.transferFrom(msg.sender, owner, _amount);
        return true;
    }
}

