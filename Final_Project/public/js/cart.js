const btnback = document.getElementById('btnback');
const btnPurchase = document.getElementById('btnPurchase');

btnback.addEventListener('click', () => {
    location.href='/api/products';
});

const cartId = sessionStorage.getItem("cartId");

btnPurchase.addEventListener('click', () => {
    location.href=`/api/cart/${cartId}/purchase`;
});