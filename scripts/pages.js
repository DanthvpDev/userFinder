const personalInfoContainer = document.getElementById('personalInfo');
const contactInfoContainer = document.getElementById('contactInfo');
const companyInfoContainer = document.getElementById('companyInfo');
const headline = document.getElementById('headline');

function AddHeadline(data) {
    headline.textContent = `${data}'s Information` ;
}

function GetCity(data) {
    return data.city;
}

function ShowUserPersonalInfo(user, cardName, listSubject, dataContainer) {
    dataContainer.innerHTML = `<h3 class="pt-1 mb-2 border-2 border-bottom border-secondary">${cardName}</h3>`;
    
    listSubject.forEach(element => {
        let newSection = document.createElement('section');
        newSection.innerHTML = `
                    <h4>${element}</h4>
                    <p>${element == 'City' ? GetCity(user.address) : user[element.toLowerCase()]}</p>
            `
            dataContainer.appendChild(newSection)
    });
}

function ShowCompanyInfo(companyInfo, cardName, dataContainer) {
    dataContainer.innerHTML = `<h3 class="pt-1 mb-2 border-2 border-bottom border-secondary">${cardName}</h3>`;
    console.log([companyInfo])
    
    Object.keys(companyInfo).forEach(element => {
        let newSection = document.createElement('section');
        newSection.innerHTML = `
                    <h4 class="company">${element == 'catchPhrase' && element ? 'Catch Phrase' : element}</h4>
                    <p>${companyInfo[element]}</p>
            `
            dataContainer.appendChild(newSection)
    });
}

async function StartPage() {
    try {
        let data;
        if (typeof (Storage) == 'undefined') {
            data = await APIConection();
            localStorage.setItem('userData', JSON.stringify(data));
        }
        else {
            data = JSON.parse(localStorage.getItem('userData'));
        }
        let params = new URLSearchParams(window.location.search)
        let idParam = params.get('id');
        let user = data.filter(u => u.id == idParam);
        AddHeadline(user[0].name)
        ShowUserPersonalInfo(user[0], 'Personal Info', ['Name','Username', 'ID'], personalInfoContainer);
        ShowUserPersonalInfo(user[0], 'Contact', ['Phone','Email', 'City', 'Website'], contactInfoContainer);
        ShowCompanyInfo(user[0].company, 'Company Info', companyInfoContainer);

    }
    catch (exc) {
        console.log(`Algo ha salido mal: ${exc}`);
    }
}

document.addEventListener('DOMContentLoaded', StartPage)