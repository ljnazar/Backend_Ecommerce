const btnAddProduct = document.getElementById('btnAddProduct');
const btnAdminUsers = document.getElementById('btnAdminUsers');
const idProducts = document.querySelectorAll('[id^="idProduct"]');
const modifyProductButtons = document.querySelectorAll('[id^="btnModifyProduct"]');
const removeProductButtons = document.querySelectorAll('[id^="btnRemoveProduct"]');

const thumbnailProducts = document.querySelectorAll('[id="thumbnail"]');
const titleProducts = document.querySelectorAll('[id="title"]');
const categoryProducts = document.querySelectorAll('[id="category"]');
const descriptionProducts = document.querySelectorAll('[id="description"]');
const stockProducts = document.querySelectorAll('[id="stock"]');
const priceProducts = document.querySelectorAll('[id="price"]');

const thumbnailDivs = document.querySelectorAll('[id="thumbnailDiv"]');
const titleDivs = document.querySelectorAll('[id="titleDiv"]');
const categoryDivs = document.querySelectorAll('[id="categoryDiv"]');
const descriptionDivs = document.querySelectorAll('[id="descriptionDiv"]');
const stockDivs = document.querySelectorAll('[id="stockDiv"]');
const priceDivs = document.querySelectorAll('[id="priceDiv"]');
const stockAndPriceDivs = document.querySelectorAll('[id="stockAndPriceDiv"]');
const buttonsDivs = document.querySelectorAll('[id="buttonsDiv"]');

sessionStorage.setItem("authError", '');

btnAdminUsers.addEventListener('click', async () => {

    const sendQuery = await fetch('/api/users', {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    });

    const response = sendQuery;
    console.log(response);
    if(response.status === 200){
        location.href='/api/users';
    }else{
        sessionStorage.setItem("authError", 'Error');
        location.href = '/login';
    }
    const responseJson = await response.json();
    if(responseJson.status === 'success'){
        location.href='/api/users';
    }else{
        sessionStorage.setItem("authError", responseJson.cause);
        location.href = '/login';
    }

});

btnAddProduct.addEventListener('click', async () => {

    const sendQuery = await fetch('/api/products/admin/createProduct', {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    });

    const response = sendQuery;
    console.log(response);
    if(response.status === 200){
        location.href='/api/products/admin/createProduct';
    }else{
        sessionStorage.setItem("authError", 'Error');
        location.href = '/login';
    }
    const responseJson = await response.json();
    if(responseJson.status === 'success'){
        location.href='/api/products/admin/createProduct';
    }else{
        sessionStorage.setItem("authError", responseJson.cause);
        location.href = '/login';
    }

});

removeProductButtons.forEach((btnRemoveProduct) => {
    btnRemoveProduct.addEventListener('click', async () => {
        
        const productIndex = btnRemoveProduct.dataset.productIndex;
        const productId = idProducts[productIndex].innerText;
        
        const sendQuery = await fetch(`/api/products/${productId}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });

        const response = sendQuery;
        //console.log(response);
        if(response.status === 200){
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Producto Eliminado',
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
                title: 'Producto Eliminado',
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
});

modifyProductButtons.forEach((btnModifyProduct, index) => {
    btnModifyProduct.addEventListener('click', () => {

        const productIndex = btnModifyProduct.dataset.productIndex;
        const productId = idProducts[productIndex].innerText;

        const thumbnail = thumbnailProducts[index];
        const title = titleProducts[index];
        const category = categoryProducts[index];
        const description = descriptionProducts[index];
        const stock = stockProducts[index];
        const price = priceProducts[index];

        const thumbnailDiv = thumbnailDivs[index];
        const titleDiv = titleDivs[index];
        const categoryDiv = categoryDivs[index];
        const descriptionDiv = descriptionDivs[index];
        const stockDiv = stockDivs[index];
        const priceDiv = priceDivs[index];
        const stockAndPriceDiv = stockAndPriceDivs[index];
        const buttonsDiv = buttonsDivs[index];

        const thumbnailUrl = thumbnail.getAttribute('src');
        const titleText = title.innerText;
        const categoryText = category.innerText;
        const descriptionText = description.innerText;
        const stockText = stock.innerText;
        const priceText = price.innerText.slice(1);

        stockAndPriceDiv.classList.remove('d-flex');
        titleDiv.classList.remove('d-flex');
        thumbnailDiv.classList.add('ms-3');
        thumbnailDiv.classList.add('mt-2');

        thumbnailDiv.innerHTML = `
            <label class="d-block" >URL Imagen</label>
            <input type="text" id="inputThumbnail" value="${thumbnailUrl}">`;
        titleDiv.innerHTML = `
            <label class="d-block">Titulo</label>
            <input type="text" id="inputTitle" value="${titleText}">`;
        categoryDiv.innerHTML = `
            <label class="d-block">Categoria</label>
            <input type="text" id="inputCategory" value="${categoryText}">`;
        descriptionDiv.innerHTML = `
            <label class="d-block">Descripción</label>
            <input type="text" id="inputDescription" value="${descriptionText}">`;
        stockDiv.innerHTML = `
            <label class="d-block">Stock</label>
            <input type="text" id="inputStock" value="${stockText}">`;
        priceDiv.innerHTML = `
            <label class="d-block">Precio</label>
            <input type="text" id="inputPrice" value="${priceText}">`;

        buttonsDiv.innerHTML = `
            <button class="ms-3" id="btnApply" data-product-index="{{@index}}">Aplicar</button>
            <button class="ms-3" id="btnCancel" data-product-index="{{@index}}">Cancelar</button>`;
        
        const applyModifyButtons = document.querySelectorAll('[id^="btnApply"]');
        const cancelModifyButtons = document.querySelectorAll('[id^="btnCancel"]');
        
        applyModifyButtons.forEach((btnApplyModify) => {
            btnApplyModify.addEventListener('click', async () => {
                
                const data = {
                    thumbnail: inputThumbnail.value,
                    title: inputTitle.value,
                    category: inputCategory.value,
                    description: inputDescription.value,
                    stock: inputStock.value,
                    price: inputPrice.value
                };

                const sendData = await fetch(`/api/products/${productId}`, {
                    method: 'PUT',
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
                        title: 'Producto Modificado',
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
                        title: 'Producto Modificado',
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
        });

        cancelModifyButtons.forEach((btnCancelModify) => {
            btnCancelModify.addEventListener('click', () => {
                location.href = '/api/products';
            });
        });


    });
});

