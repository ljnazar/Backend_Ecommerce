const btnSubmit = document.getElementById('btnSubmit');
const inputEmail = document.getElementById('email');
const inputPassword = document.getElementById('password');

btnSubmit.addEventListener('click', async e => {

    e.preventDefault();

    const data = {
        email: email.value,
        newPassword: password.value
    }

    const sendData = await fetch('/restorePassword', {
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
        console.log('updated password');
        location.href = '/login';
    }else{
        console.log(`Error code ${response.status}`);
        console.log(response);
    }

});