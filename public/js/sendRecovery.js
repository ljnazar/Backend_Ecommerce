const btnSubmit = document.getElementById('btnSubmit');
const inputEmail = document.getElementById('email');

btnSubmit.addEventListener('click', async e => {

    e.preventDefault();

    const data = {
        email: email.value
    }

    const sendData = await fetch('/sendRecovery', {
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
        console.log('Email sent');
        location.href = '/restorePassword';
    }else{
        console.log(`Error code ${response.status}`);
        console.log(response);
    }

});