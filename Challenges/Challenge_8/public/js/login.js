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

    
    location.href = '/';





    //const response = await sendData.json(); 

    //console.log(response);

    // const { accessToken } = response;

    // if(accessToken) {
    //     localStorage.setItem('accessToken', accessToken);
    //     location.href = '/';
    // }
    // else {
    //     location.href = '/login-error';
    // }
});