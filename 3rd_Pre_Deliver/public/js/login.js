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
    //console.log(response);
    if(response.status === 200){
        console.log('Logged in');
        location.href = '/home';
    }else if(response.status === 401){
        console.log(`Error code ${response.status} - Not authenticated`);
        location.href = '/faillogin';
    }else if(response.status === 403){
        console.log(`Error code ${response.status} - Not authorized`);
        location.href = '/faillogin';
    }else{
        console.log(`Error code ${response.status}`);
        location.href = '/faillogin';
    }

});