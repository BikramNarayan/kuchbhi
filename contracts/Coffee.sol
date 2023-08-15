// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

contract coffeekachakkar {
    struct Memo {
        string name;
        string message;
        uint timestamp;
        address from;
    }
    Memo[] memos;
    address payable owner;

    constructor() {
        owner = payable(msg.sender);
    }


    function buyCoffee(
        string memory coffeeName,
        string memory coffeeMessage
    ) public payable {
        require(msg.value > 0, "Please pay the desired amount");
        owner.transfer(msg.value);
        memos.push(
            Memo(coffeeName, coffeeMessage, block.timestamp, msg.sender)
        );
    }

    function getMemos() public view returns (Memo[] memory) {
        return memos;
    }
}
