const tableContainer  = document.getElementById('tableContent');
const btnSearch = document.getElementById('btnSearch');
const inputText  = document.getElementById('textInput');



function ShowUsers(data) {
    if(data) {
        if(tableContainer.children.length > 0) {
            [...tableContainer.children].forEach(element => {
                element.remove();
            });
        }
        if(data.length == 0){
            let newRow = document.createElement('tr');
            newRow.innerHTML = `<td>Not Found</td>
                              <td>Not Found</td>
                              <td>Not Found</td>
                              <td>Not Found</td>
                              <td>Not Found</td>`;
            tableContainer.appendChild(newRow);
        }
        data.forEach(element => {
            let loopTableRow = document.createElement('tr');
            loopTableRow.innerHTML = `<td>${element.id ?? 'Not Found'}</td>
                              <td>${element.name ?? 'Not Found'}</td>
                              <td>${element.username ?? 'Not Found'}</td>
                              <td>${element.email ?? 'Not Found'}</td>
                              <td><a href="/pages/pages.html?id=${element.id}" class="btn btn-secondary">More<a/></td>`;
            tableContainer.appendChild(loopTableRow);
        });
    }
}

const form = document.querySelector('form'); // Asegúrate de seleccionar tu formulario

form.addEventListener('submit', (e) => {
    e.preventDefault(); // Evita el envío predeterminado
});


function StartSearchButton(data) {
    function SearchUser() {
        let userNameSearched = inputText.value;
            if(userNameSearched.trim() && !Number(userNameSearched.trim())) {
                let user = data.filter(u => u.name.toLowerCase().includes(userNameSearched.toLowerCase()) || u.username.toLowerCase().includes(userNameSearched.toLowerCase()));
                
                ShowUsers(user);
            }
            else if(!userNameSearched) {
                ShowUsers(data);
            }
            else{
                inputText.focus();
                const myModal = new bootstrap.Modal(document.getElementById('myModal'));
                myModal.show()
            }
    }
    
    btnSearch.addEventListener('click', (e)=> {
        e.preventDefault();
        SearchUser();        
    }, false)

    inputText.addEventListener('keydown', (e)=> {
        console.log(e)
        if(e.key === 'Enter'){
            e.preventDefault();
            SearchUser();
        }
    }, false)
}

async function StartApp() {
    try{
        let data;
        if (typeof(Storage) == 'undefined' ){
            data = await APIConection();
            localStorage.setItem('userData', JSON.stringify(data));
        }
        else {
            data = JSON.parse(localStorage.getItem('userData'));
        }
        StartSearchButton(data);
        ShowUsers(data);
        
    }
    catch(exc) {
        console.log(`Error al inciar apliación: ${exc}`)
    }
}



document.addEventListener('DOMContentLoaded', StartApp, false);