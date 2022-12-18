const inputbox1 = document.getElementById("input_text1");
const inputbox2 = document.getElementById("input_text2");
const buttonSearch = document.getElementById("button_search");
const cards = document.getElementsByClassName('cards')[0];


init();

function init(){
    buttonSearch.addEventListener("click", getUsers)
    inputbox2.addEventListener('keyup', (e) => {
        if(e.key === 'Enter'){
            getUsers();
        }
    })
}

async function getUsers(){
    let country = inputbox1.value;
    const api = await fetch(`http://universities.hipolabs.com/search?country=${country}`);
    const streamResponse = await api.text();
    const jason = JSON.parse(streamResponse);
    console.log(jason);
    render(jason);


}
function render(data){
    let html = '';
        let newData = data.filter((d) => {
            let state = inputbox2.value;
            state = state.charAt(0).toUpperCase() + state.slice(1);
            return d['state-province'] === state;
        })

    for (let i = 0; i < newData.length; i++) {
        html += `<div class="card">
                    <p><u><b>State Name:</b></u> ${newData[i]['state-province']} </p>
                    <p><u><b>University Name:</b></u> ${newData[i].name}</p>
                    <p><u><b>University Site URL:</b></u> ${newData[i].web_pages}</p>
                </div>`
        console.log(html);
        
    }
    cards.innerHTML = html;
    inputbox1.value = '';
    inputbox2.value = '';
}