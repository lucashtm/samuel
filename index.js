const form = document.getElementById('user-form');
const usersList = document.getElementById('users-list');

form.addEventListener('submit', event => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const name = formData.get('name');
    const job = formData.get('job');

    // CRIA USUÁRIO
    fetch('https://reqres.in/api/users', {
        method: 'post',
        body: {
            name,
            job
        }
    }).then( response => {
        if(response.status === 201){
            response.json().then( data => {
                usersList.innerHTML += `<li>
                    <p>${name}</p>
                    <p>${job}</p>
                    <p>${data.id}</p>
                    <p>${data.createdAt}</p>
                </li>`;
                console.log(data);
            });
        }else{
            reject();
        }
    }).catch(error => {
        console.log('Houve um erro')
    });

    //BUSCA LISTAGEM DE USUÁRIOS
    fetch('https://reqres.in/api/users').then(response => {
        response.json().then(data => {
            const users = data.data;
            users.forEach(user => {
                usersList.innerHTML += `<li>
                    <p>Email: ${user.email}</p>
                    <p>Name: ${user.first_name} ${user.last_name}</p>
                    <img src="${user.avatar}">
                </li>`;
            });
            console.log(users);
        });
    })
});