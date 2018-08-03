pragma solidity 0.4.24;

contract Article {
    address public owner;
    string public title;
    string public hash;

    constructor(string _title, string _hash) public {
        owner = msg.sender;
        title = _title;
        hash = _hash;
    }

    function kill() public {
        if (msg.sender == owner) {
            selfdestruct(owner);
        }
    }
}
