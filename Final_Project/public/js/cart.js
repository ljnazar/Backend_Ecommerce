const substractButtons = document.querySelectorAll('[id^="btnSubstract"]');
const PlusButtons = document.querySelectorAll('[id^="btnPlus"]');
const counterSpans = document.querySelectorAll('[id^="counterSpan"]');
const stockSpans = document.querySelectorAll('[id^="stockSpan"]');
const titlesProducts = document.querySelectorAll('[id^="titleProduct"]');
const addToCartButtons = document.querySelectorAll('[id^="btnAddToCart"]');

const cartId = localStorage.getItem("cartId");

// Agregar event listeners a cada botón y contador individualmente
addToCartButtons.forEach((btnAddToCart) => {
    btnAddToCart.addEventListener('click', () => {
        const productIndex = btnAddToCart.dataset.productIndex;
        console.log(titlesProducts[productIndex].innerText);
        console.log(counterSpans[productIndex].innerText);
        console.log(cartId);
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