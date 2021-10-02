function SearchReady() {
    let input = document.querySelector("#searchCard");
    input.addEventListener("input", SearchCard);
}

function SearchCard(){
    let request = new XMLHttpRequest();
    request.open("GET", "database.json");
    request.addEventListener("load", FindCard);
    request.send();
}

function FindCard(event){
    let input = document.querySelector("#searchCard");
    let inputText = input.value;
    
    let response = event.currentTarget.response;
    let database = JSON.parse(response);

    let list = document.querySelector("#cardList");
    list.innerHTML = "";

    for (let i = 0; i < database.cards.length; ++i) {
        let card = database.cards[i];
        if (card.cardname.toLowerCase().includes(inputText.toLowerCase()) == true) {
            list.innerHTML += `
                <li>
                    <a href="card.html?cardId=${i}">${card.cardname}</a>
                </li>
            `;
        }
    }
}

function LoadCard() {
    let request = new XMLHttpRequest();
    request.open("GET", "database.json");
    request.addEventListener("load", DatabaseLoaded);
    request.send();
}

function DatabaseLoaded(event) {
    let response = event.currentTarget.response;
    let database = JSON.parse(response);

    let urlParams = new URLSearchParams(window.location.search);
    let cardId = urlParams.get("cardId");

    let cardName = database.cards[cardId].cardname;
    let atk = database.cards[cardId].stats.attack;

    ReplaceCard(cardName, atk);
}

function ReplaceCard(cardName, attack) {

    document.querySelector("#cardname").innerHTML = cardName;

    document.querySelector("#attack>").innerHTML = attack;
}
