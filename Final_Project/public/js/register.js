const btnSubmit = document.getElementById('btnSubmit');
const inputEmail = document.getElementById('email');
const inputPassword = document.getElementById('password');
const errorMessage = document.getElementById('errorMessage');

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
    //console.log(responseJson);
    if(responseJson.status === 'success'){
        Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Usuario registrado',
            showConfirmButton: false,
            timer: 1500
        });
        setTimeout(() => {
            location.href = '/login';
        }, 1500);
    }else{
        errorMessage.innerText = responseJson.cause;
    }

});