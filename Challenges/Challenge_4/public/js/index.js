const socket = io();

socket.on('messages', data => {
    document.querySelector('p').innerText = data;
})