const btnSubmit = document.getElementById('btnSubmit');
const inputEmail = document.getElementById('email');
const inputPassword = document.getElementById('password');

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
    console.log(responseJson);
    if(response.status === 200){
        console.log('Logged in');
        localStorage.setItem("cartId", responseJson.cartId);
        location.href = '/api/products';
    }else if(response.status === 401){
        console.log(`Error code ${response.status} - Not authenticated`);
        console.log(response);
    }else if(response.status === 403){
        console.log(`Error code ${response.status} - Not authorized`);
        console.log(response);
    }else{
        console.log(`Error code ${response.status}`);
        console.log(response);
    }

});