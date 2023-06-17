// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

struct Message {
    string from;
    string message;
}

contract Messenger {
    //name to address
    mapping(string => address) private nameToAddress;
    //name to address
    mapping(address => string) private addressToName;
    //check address registered
    mapping(address => bool) private addressToBool;
    //address to messages mapping
    mapping(address => Message[]) private userMessages;

    event newMessage(address indexed _receiver, Message _message);

    function send(
        string calldata to,
        string calldata data
    ) public returns (bool) {
        Message memory _message = Message(addressToName[msg.sender], data);
        userMessages[nameToAddress[to]].push(_message);
        emit newMessage(nameToAddress[to], _message);
        return true;
    }

    function register(string calldata name) public {
        //require(name);
        nameToAddress[name] = msg.sender;
        addressToBool[msg.sender] = true;
        addressToName[msg.sender] = name;
    }

    function getMessages() public view returns (Message[] memory) {
        return userMessages[msg.sender];
    }

    function isRegistered() public view returns (string memory) {
        if (addressToBool[msg.sender]) {
            return addressToName[msg.sender];
        }
        return "NONE";
    }
}
