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
        /*.then(result => result.json())
        .then(json => console.log(json));*/

    
    //location.href = '/';





    const response = await sendData;
    console.log(response);
    if(response.status === 200){
        //const jsonResponse = await response.json();
        //console.log(jsonResponse);
        //console.log(jsonResponse.message);
        console.log('Logged in');
        location.href = '/';
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
    // const jsonResponse = await response.json();
    // console.log(jsonResponse);
    // console.log(jsonResponse.message);
    // console.log(jsonResponse[0]);
    // console.log(jsonResponse.state);

    //console.log(response.url);

    //location.href = '/';

    // const { accessToken } = response;

    // if(accessToken) {
    //     localStorage.setItem('accessToken', accessToken);
    //     location.href = '/';
    // }
    // else {
    //     location.href = '/faillogin';
    // }
});