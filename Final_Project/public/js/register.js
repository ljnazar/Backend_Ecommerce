const btnSubmit = document.getElementById('btnSubmit');
const inputEmail = document.getElementById('email');
const inputPassword = document.getElementById('password');

btnSubmit.addEventListener('click', async e => {

    e.preventDefault();

    const data = {
        first_name: first_name.value,
        last_name: last_name.value,
        password: password.value,
        email: email.value,
    }

    const sendData = await fetch('/register', {
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
    if(response.status === 201){
        console.log('registered ok');
        location.href = '/login';
    }else{
        console.log(`Error code ${response.status}`);
        console.log(response);
    }

});