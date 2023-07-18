// const btnCart = document.getElementById('btnCart');

// const cartId = sessionStorage.getItem("cartId");

// btnCart.addEventListener('click', async () => {

//     console.log('sdfsdfsdfsdf')

//     const sendData = await fetch(`/api/cart/${cartId}`, {
//         method: 'GET',
//         headers: {
//             'Accept': 'application/json',
//             'Content-Type': 'application/json'
//         }
//     });

//     const response = sendData;
//     const responseJson = await response.json();
//     //console.log(responseJson);
//     if(responseJson.status === 'success'){
//         location.href = '/api/cart';
//     }else{
//         errorMessage.innerHTML = `<p>${responseJson.cause}</p>`
//     }

// });