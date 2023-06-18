const substractButtons = document.querySelectorAll('[id^="btnSubstract"]');
const PlusButtons = document.querySelectorAll('[id^="btnPlus"]');
const counterSpans = document.querySelectorAll('[id^="counterSpan"]');
const stockSpans = document.querySelectorAll('[id^="stockSpan"]');
const idProducts = document.querySelectorAll('[id^="idProduct"]');
const addToCartButtons = document.querySelectorAll('[id^="btnAddToCart"]');

const cartId = localStorage.getItem("cartId");

addToCartButtons.forEach((btnAddToCart) => {
    btnAddToCart.addEventListener('click', async () => {
        const productIndex = btnAddToCart.dataset.productIndex;
        if (stockSpans[productIndex].innerText <= 0 || counterSpans[productIndex].innerText <= 0) return null;
        const productId = idProducts[productIndex].innerText;
        const quantity = counterSpans[productIndex].innerText

        const data = {
            quantity: quantity
        }
    
        const sendData = await fetch(`/api/cart/${cartId}/product/${productId}`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
    
        const response = sendData;
        const responseJson = await response.json()
        console.log(responseJson);
    });
});

substractButtons.forEach((btnSubstract, index) => {
    btnSubstract.addEventListener('click', () => {
        const stockSpan = stockSpans[index];
        const counterSpan = counterSpans[index];
        if (stockSpan.innerText <= 0) return null;
        if (counterSpan.innerText == 0) return null;
        counterSpan.innerHTML--;
    });
});

PlusButtons.forEach((btnPlus, index) => {
    btnPlus.addEventListener('click', () => {
        const stockSpan = stockSpans[index];
        const counterSpan = counterSpans[index];
        if (stockSpan.innerText <= 0) return null;
        if (counterSpan.innerText == stockSpan.innerText) return null;
        counterSpan.innerHTML++;
    });
});