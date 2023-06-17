import messengerJson from './build/contracts/Messenger.json' assert { type: "json" };
import { ethers } from "https://cdnjs.cloudflare.com/ajax/libs/ethers/6.5.1/ethers.min.js";

const CONTRACT_ADDRESS = "0xcC602d519f636DbB778c95aCb1a6204d54Acbf14"
const provider = new ethers.BrowserProvider(window.ethereum);
await provider.send("eth_requestAccounts", []);
const signer = await provider.getSigner();
const address = await signer.getAddress()
const contract = new ethers.Contract(CONTRACT_ADDRESS, messengerJson.abi, signer);

// const register = async (name) => {
//     const _void = await contract.register(name);
//     const messeges = await contract.getMessages();
//     console.log(messeges);
// }

//register('d33pt1');
//register('5ury@');

const sendMessage = async (to, message) => {
    const _bool = await contract.send(to, message);
    console.log(_bool);
}

// function showMessages(message) {
//     console.log(message);
// }

const friends = document.querySelector('#friends');
const messageData = document.querySelector('#messageData');
const populateFriendsList = async (messages) => {
    messages.forEach(message => {
        const friend = document.createElement('li');
        friend.innerHTML = message.from;
        friend.addEventListener('click', function (data) {
            return function () {
                messageData.innerHTML = data;
            };
        }(message.message));
        friends.appendChild(friend);
    });
}

const getMessages = async () => {
    const messages = await contract.getMessages();
    populateFriendsList(messages);
}

getMessages();

const sendButton = document.querySelector('#send');
sendButton.addEventListener('click', function (data) {
    return function () {
        send();
    };
}());

function send() {
    const to = document.querySelector('#to').value;
    const message = document.querySelector('#message').value;
    sendMessage(to, message);
}


const registrationForm = document.querySelector('[data-model]');
const isRegistered = async () => {
    const name = await contract.isRegistered();
    if (name == 'NONE') {
        registrationForm.show();
    } else {
        document.querySelector('#greeting').innerHTML = 'Welcome ' + name;
    }
}
isRegistered();

const registerButton = document.querySelector('#register');
registerButton.addEventListener('click', function () {
    return function () {
        const name = document.querySelector('#userName');
        contract.register(name.value);
        registrationForm.close();
    };
}());

contract.on('newMessage', function (_address, _message) {
    console.log(_address, _message);
    if (address === _address) {
        populateFriendsList([_message]);
    }
});
