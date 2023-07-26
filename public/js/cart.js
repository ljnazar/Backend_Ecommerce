const btnback = document.getElementById('btnback');
const btnPurchase = document.getElementById('btnPurchase');
const btnCleanCart = document.getElementById('btnCleanCart');

btnback.addEventListener('click', () => {
    location.href='/api/products';
});

const cartId = sessionStorage.getItem("cartId");

btnPurchase.addEventListener('click', () => {
    location.href=`/api/cart/${cartId}/purchase`;
});

btnCleanCart.addEventListener('click', async () => {
    
    const sendQuery = await fetch(`/api/cart/${cartId}`, {
        method: 'DELETE',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    });

    const response = sendQuery;
    //console.log(response);
    if(response.status === 200){
        location.href=`/api/cart/${cartId}`;
    }else{
        sessionStorage.setItem("authError", 'Error');
        location.href = '/login';
    }
    const responseJson = await response.json();
    console.log(responseJson);
    if(responseJson.status === 'success'){
        location.href=`/api/cart/${cartId}`;
    }else{
        sessionStorage.setItem("authError", responseJson.cause);
        location.href = '/login';
    }

});
