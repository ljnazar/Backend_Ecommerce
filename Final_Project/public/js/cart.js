const substractButtons = document.querySelectorAll('[id^="btnSubstract"]');
const PlusButtons = document.querySelectorAll('[id^="btnPlus"]');
const counterSpans = document.querySelectorAll('[id^="counterSpan"]');
const stockSpans = document.querySelectorAll('[id^="stockSpan"]');
const addToCartButtons = document.querySelectorAll('[id^="btnAddToCart"]');

// Agregar event listeners a cada botón y contador individualmente
addToCartButtons.forEach((btnAddToCart) => {
    btnAddToCart.addEventListener('click', () => {
        const productIndex = btnAddToCart.dataset.productIndex;
        console.log(productIndex)
        // Realizar las acciones específicas del producto seleccionado
        // utilizando el índice del producto (productIndex)
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