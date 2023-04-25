const inputProduct = document.getElementById('inputProduct');
const inputProductID = document.getElementById('inputProductID');
const inputNewProduct = document.getElementById('inputNewProduct');
const inputDeleteProductID = document.getElementById('inputDeleteProductID');
const btnAddProduct = document.getElementById('btnAddProduct');
const btnUpdateProduct = document.getElementById('btnUpdateProduct');
const btnDeleteProduct = document.getElementById('btnDeleteProduct');
const paragraphRender = document.getElementById('paragraphRender');

///////////////////////////////////////
const btnTest = document.getElementById('btnTest');
btnTest.addEventListener('click', async() => {
    await fetch('/login', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({email: 'asd@asd', password: '123'})
    });
});
///////////////////////////////////////

btnAddProduct.addEventListener('click', async () => {
    await fetch("/home/admin/products", {
        method: "post",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(inputProduct.value)
        //body: inputProduct.value
    });
});

btnUpdateProduct.addEventListener('click', async () => {
    await fetch(`/home/admin/products/${inputProductID.value}`, {
        method: "put",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: inputNewProduct.value
    });
});

btnDeleteProduct.addEventListener('click', async () => {
    await fetch(`/home/admin/products/63fa40e4d0cbc98026432e36`, {
        method: "delete",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    });
});