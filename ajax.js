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
                    <a href="index.html?cardId=${i}">${card.cardname}</a>
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
    let atk = database.cards[cardId].attack;
    let def = database.cards[cardId].defense;
    let edit = database.cards[cardId].edition;
    let publishNumber = database.cards[cardId].publishingnumber;
    let monsterType = database.cards[cardId].monstertype;
    let description = database.cards[cardId].descriptioneffect;
    let number = database.cards[cardId].cardnumber;

    ReplaceCard(cardName, atk, def, edit, publishNumber, monsterType, description, number);
}

function ReplaceCard(cardName, attack, defense, edition, publishingnumber, monstertype, descriptioneffect, cardnumber) {

    document.querySelector("#cardname").innerHTML = cardName;
    document.querySelector("#attack").innerHTML = attack;
    document.querySelector("#defense").innerHTML = defense;
    document.querySelector("#edition").innerHTML = edition;
    document.querySelector("#packNumber").innerHTML = publishingnumber;
    document.querySelector("#monsterType").innerHTML = monstertype;
    document.querySelector("#effect").innerHTML = descriptioneffect;
    document.querySelector("#cardNumber").innerHTML = cardnumber;
}
