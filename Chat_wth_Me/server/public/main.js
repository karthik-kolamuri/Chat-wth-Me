const socket = io();
let client_total = document.querySelector('.clients-total');
const message_container = document.querySelector('.message-container');
const messageBtn = document.querySelector('.message-input');
const sendBtn = document.querySelector('.send-button');
let dataSent=false;


socket.on('number-client', (number) => {
    console.log('number',number);
    client_total.textContent =`Total Clients: ${number}`;
});

sendBtn.addEventListener('click', sendMessage);

socket.on('receiveMessage', (message) => {
    if(dataSent){
        dataSent=false;
        return; // Ignore the message if it was sent by this client
    }else{
        const li = document.createElement('li');
    li.classList.add('message-left');
    const p = document.createElement('p');
    p.classList.add('message');
    p.innerHTML = message;
    const span = document.createElement('span');
    span.innerHTML = 'bluebird ● 26 July 10:40';
    p.appendChild(span);
    li.appendChild(p);
    message_container.appendChild(li);
    }
    
});

function sendMessage(event) {
    dataSent=true;
    if (event) event.preventDefault(); // Prevent default behavior (e.g., form submission)
    console.log('sendMessage');
    console.log(messageBtn);
    const inputMessage = messageBtn.value;
    console.log(inputMessage);

    const li = document.createElement('li');
    li.classList.add('message-right');

    const p = document.createElement('p');
    p.classList.add('message');
    p.textContent = inputMessage;
    const span = document.createElement('span');
    span.textContent = 'bluebird ● 26 July 10:40';
    p.appendChild(span);
    li.appendChild(p);
    message_container.appendChild(li);

    socket.emit('sendMessage', inputMessage);
    messageBtn.value = ''; // Clear the input field after sending
}