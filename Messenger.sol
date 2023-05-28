// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

import "hardhat/console.sol";

struct Message {
    address from;
    string message;
}

contract Messenger {

    Message public message;
    mapping(string=>address) private registry;
    mapping(address=>Message[]) private userMessages;

    function send(string calldata name, string calldata data)
    public returns(bool)  {
        console.log(1);
        Message memory _message = Message(msg.sender, data);

        console.log(2);
        userMessages[registry[name]].push(_message);

        console.log(3);
        return true;
    }

    function register(string calldata name) 
    public {
        registry[name] = msg.sender;
    }

    function getMessages()
    public view returns (Message[] memory messages) {
        return userMessages[msg.sender];
    }

}
