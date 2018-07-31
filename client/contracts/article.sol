pragma solidity 0.4.24;

contract Article {
    address public owner;
    string public title;
    string public body;

    constructor(string _title, string _body) public {
        owner = msg.sender;
        title = _title;
        body = _body;
    }

    function kill() public {
        if (msg.sender == owner) {
            selfdestruct(owner);
        }
    }
}
