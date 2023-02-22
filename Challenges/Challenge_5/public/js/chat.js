const socket = io();

const inputUser = document.getElementById('inputUser');
const inputMessage = document.getElementById('inputMessage');
const btnSendMessage = document.getElementById('btnSendMessage');
const paragraphRender = document.getElementById('paragraphRender');

btnSendMessage.addEventListener('click', () => {
    //console.log({ user: inputUser.value, message: inputMessage.value });
    socket.emit('sendMessage', { user: inputUser.value, message: inputMessage.value });
});

socket.on('viewMessages', message => {
    let objString = JSON.stringify(message);
    paragraphRender.innerText = objString;
});
