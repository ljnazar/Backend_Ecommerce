const btnAdminProducts = document.getElementById('btnAdminProducts');
const btnAdminUsers = document.getElementById('btnAdminUsers');

sessionStorage.setItem("authError", '');

btnAdminProducts.addEventListener('click', async () => {

    const sendQuery = await fetch('/api/products/admin', {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    });

    const response = sendQuery;
    console.log(response);
    if(response.status === 200){
        location.href='/api/products/admin';
    }else{
        sessionStorage.setItem("authError", 'Error');
        location.href = '/login';
    }
    const responseJson = await response.json();
    if(responseJson.status === 'success'){
        location.href='/api/products/admin';
    }else{
        sessionStorage.setItem("authError", responseJson.cause);
        location.href = '/login';
    }

});

btnAdminUsers.addEventListener('click', async () => {

    const sendQuery = await fetch('/api/products/admin', {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    });

    const response = sendQuery;
    console.log(response);
    if(response.status === 200){
        location.href='/api/products/admin';
    }else{
        sessionStorage.setItem("authError", 'Error');
        location.href = '/login';
    }
    const responseJson = await response.json();
    if(responseJson.status === 'success'){
        location.href='/api/products/admin';
    }else{
        sessionStorage.setItem("authError", responseJson.cause);
        location.href = '/login';
    }

});




