const inputCart = document.getElementById('inputCart');
const inputCartID = document.getElementById('inputCartID');
const inputNewCart = document.getElementById('inputNewCart');
const inputDeleteCartID = document.getElementById('inputDeleteCartID');
const btnAddCart = document.getElementById('btnAddCart');
const btnUpdateCart = document.getElementById('btnUpdateCart');
const btnDeleteCart = document.getElementById('btnDeleteCart');
const paragraphRender = document.getElementById('paragraphRender');

btnAddCart.addEventListener('click', () => {
    fetch("/carts", {
    method: "post",
    headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
    },
    body: inputCart.value
    });
});

btnUpdateCart.addEventListener('click', () => {
    fetch(`/carts/${inputCartID.value}`, {
        method: "put",
        headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
        },
        body: inputNewCart.value
    });
});

btnDeleteCart.addEventListener('click', () => {
    fetch(`/carts/${inputDeleteCartID.value}`, {
        method: "delete",
        headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
        }
    });
});