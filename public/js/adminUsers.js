const btnCleanupUsers = document.getElementById('btnCleanupUsers');
const message = document.getElementById('message');
const idUsers = document.querySelectorAll('[id^="idUser"]');
const updateRoleButtons = document.querySelectorAll('[id^="btnUpdateRole"]');
const removeUserButtons = document.querySelectorAll('[id^="btnRemoveUser"]');
const firstNameUsers = document.querySelectorAll('[id="firstName"]');
const emailUsers = document.querySelectorAll('[id="email"]');
const roleUsers = document.querySelectorAll('[id="role"]');
const btnback = document.getElementById('btnback');

updateRoleButtons.forEach((btnUpdateUser, index) => {
    btnUpdateUser.addEventListener('click', async () => {
        
        const userIndex = btnUpdateUser.dataset.userIndex;
        const userId = idUsers[userIndex].innerText;

        const data = {
            role: roleUsers[index].value
        };
        
        const sendQuery = await fetch(`/api/users/${userId}`, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        const response = sendQuery;
        //console.log(response);
        if(response.status === 200){
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Rol Actualizado',
                showConfirmButton: false,
                timer: 1000
            });
            setTimeout(() => {
                location.href='/api/users';
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
                title: 'Rol Actualizado',
                showConfirmButton: false,
                timer: 1000
            });
            setTimeout(() => {
                location.href='/api/users';
            }, 1000);
        }else{
            sessionStorage.setItem("authError", responseJson.cause);
            location.href = '/login';
        }

    });
});

removeUserButtons.forEach((btnRemoveUser) => {
    btnRemoveUser.addEventListener('click', async () => {
        
        const userIndex = btnRemoveUser.dataset.userIndex;
        const userId = idUsers[userIndex].innerText;
        
        const sendQuery = await fetch(`/api/users/${userId}`, {
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
                title: 'Ususario Eliminado',
                showConfirmButton: false,
                timer: 1000
            });
            setTimeout(() => {
                location.href='/api/users/';
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
                title: 'Usuario Eliminado',
                showConfirmButton: false,
                timer: 1000
            });
            setTimeout(() => {
                location.href='/api/users/';
            }, 1000);
        }else{
            sessionStorage.setItem("authError", responseJson.cause);
            location.href = '/login';
        }

    });
});

btnCleanupUsers.addEventListener('click', async () => {
    message.innerHTML = `<h6 class="mt-3">Funcionalidad en cleanupInactiveUsers (Sin parte visual)</h6>`;
});

btnback.addEventListener('click', () => {
    location.href='/api/products';
});