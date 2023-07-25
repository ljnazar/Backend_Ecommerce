const btnSubmit = document.getElementById('btnSubmit');
const btnback = document.getElementById('btnback');

btnSubmit.addEventListener('click', async e => {

    e.preventDefault();

    const data = {
        title: inputTitle.value,
        category: inputCategory.value,
        description: inputDescription.value,
        price: inputPrice.value,
        thumbnail: inputThumbnail.value,
        code: inputCode.value,
        stock: inputStock.value,
    }

    const sendData = await fetch('/api/products', {
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
        Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Producto Creado',
            showConfirmButton: false,
            timer: 1000
        });
        setTimeout(() => {
            location.href='/api/products';
        }, 1000);
    }else{
        sessionStorage.setItem("authError", 'Error');
        location.href = '/login';
    }
    const responseJson = await response.json();
    console.log(responseJson);
    if(responseJson.status === 'success'){
        Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Producto Creado',
            showConfirmButton: false,
            timer: 1000
        });
        setTimeout(() => {
            location.href='/api/products';
        }, 1000);
    }else{
        sessionStorage.setItem("authError", responseJson.cause);
        location.href = '/login';
    }

});

btnback.addEventListener('click', () => {
    location.href='/api/products';
});