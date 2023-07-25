const btnSubmit = document.getElementById('btnSubmit');
// const inputEmail = document.getElementById('email');
// const inputPassword = document.getElementById('password');
const errorMessage = document.getElementById('errorMessage');

const authError = sessionStorage.getItem("authError");
if(authError) errorMessage.innerHTML = `<p>${authError}</p>`;

btnSubmit.addEventListener('click', async e => {

    e.preventDefault();

    const data = {
        email: email.value,
        password: password.value
    }

    const sendData = await fetch('/login', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });

    const response = sendData;
    const responseJson = await response.json();
    //console.log(responseJson);
    if(responseJson.status === 'success'){
        sessionStorage.setItem("cartId", responseJson.cartId);
        location.href = '/api/products';
    }else{
        errorMessage.innerHTML = `<p>${responseJson.cause}</p>`
    }

});

