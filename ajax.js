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
    let cardtype = database.cards[cardId].cardtype;

    ReplaceCard(cardName, atk, def, edit, publishNumber, monsterType, description, number, cardtype);
}

function ReplaceCard(cardName, attack, defense, edition, publishingnumber, monstertype, descriptioneffect, cardnumber, cardtype) {

    document.querySelector("#cardname").innerHTML = cardName;
    document.querySelector("#attack").innerHTML = attack;
    document.querySelector("#defense").innerHTML = defense;
    document.querySelector("#edition").innerHTML = edition;
    document.querySelector("#packNumber").innerHTML = publishingnumber;
    document.querySelector("#monsterType").innerHTML = monstertype;
    document.querySelector("#effect").innerHTML = descriptioneffect;
    document.querySelector("#cardNumber").innerHTML = cardnumber;

      switch(cardtype) {
        case "normal":  
            document.querySelector("main").classList.remove();
            document.querySelector("main").classList.add("normal");
            document.querySelector("footer").classList.remove();
            document.querySelector("footer").classList.add("normal");
            document.querySelector("section:last-child").classList.remove();
            document.querySelector("section:last-child").classList.add("normalDesc");
            break;
        case "synchro":  
            document.querySelector("main").classList.remove();
            document.querySelector("main").classList.add("synchro");
            document.querySelector("footer").classList.remove();
            document.querySelector("footer").classList.add("synchro");
            document.querySelector("section:last-child").classList.remove();
            document.querySelector("section:last-child").classList.add("synchro");
            document.querySelector("#effect").classList.remove();
            document.querySelector("#effect").classList.add("smallerText");
            break;
        case "fusion": 
            document.querySelector("main").classList.remove();
            document.querySelector("main").classList.add("fusion");
            document.querySelector("footer").classList.remove();
            document.querySelector("footer").classList.add("fusion");
            document.querySelector("section:last-child").classList.remove();
            document.querySelector("section:last-child").classList.add("fusionDesc");
            break;
        case "effect": 
            document.querySelector("main").classList.remove();
            document.querySelector("main").classList.add("effect");
            document.querySelector("footer").classList.remove();
            document.querySelector("footer").classList.add("effect");
            document.querySelector("section:last-child").classList.remove();
            document.querySelector("section:last-child").classList.add("normalDesc");
            break;
    } 
    switch(cardName){
        case "Blue-Eyes Ultimate Dragon":
            document.querySelector("h1").classList.remove();
            document.querySelector("h1").classList.add("nameSmall");
            break;
        case "Slifer the Sky Dragon":
            document.querySelector("h1").classList.remove();
            document.querySelector("h1").classList.add("nameNormal");
            document.querySelector("#effect").classList.remove();
            document.querySelector("#effect").classList.add("smallestText");
            break;
        case "Dark Magician":
            document.querySelector("h1").classList.remove();
            document.querySelector("h1").classList.add("nameNormal");
            document.querySelector("#effect").classList.remove();
            document.querySelector("#effect").classList.add("DarkMagicianText");
            break;
        default:
            document.querySelector("h1").classList.remove();
            document.querySelector("h1").classList.add("nameNormal");
            break;
    }
    switch(cardName){
        case "Blue-Eyes Ultimate Dragon":
            document.querySelector("div.cardPhoto>img").src = "images/ultimate.png";
            break;
        case "Dark Magician":
            document.querySelector("div.cardPhoto>img").src = "images/Darkmagician.png";
            document.querySelector("img").src = "images/DARK.png"
            break;
        case "Slifer the Sky Dragon":
            document.querySelector("div.cardPhoto>img").src = "images/Slifer.jpg";
            document.querySelector("img").src = "images/DIVINE.png"

            break;
        case "Elemental Hero Neos":
            document.querySelector("div.cardPhoto>img").src = "images/neos.jpg";
            break;
        case "Red-Eyes B. Dragon":
            document.querySelector("div.cardPhoto>img").src = "images/RedEyes.jpg";
            document.querySelector("img").src = "images/DARK.png"
            document.querySelector("#effect").classList.remove();
            document.querySelector("#effect").classList.add("DarkMagicianText");
            break;
        case "Stardust Dragon":
            document.querySelector("div.cardPhoto>img").src = "images/Stardust.jpg";
            document.querySelector("img").src = "images/WIND.png"

    }
}
