var kérdések;
var kérdésszám = 1;
var összkérdés = 859;
var kattintott;
var helyes;

function kérdésBetöltés(id) {
    fetch(`/questions/${id}`)
        .then(response => {
            if (!response.ok) {
                console.error(`Hibás válasz: ${response.status}`)
            } else {
                return response.json()
            }
        })
        .then(data => kérdésMegjelenítés(data));
}


function kérdésMegjelenítés(kérdés) {

    document.getElementById("kerdesszoveg").innerText = kérdés.questionText;
    document.getElementById("valasz1").innerText = kérdés.answer1;
    document.getElementById("valasz2").innerText = kérdés.answer2;
    document.getElementById("valasz3").innerText = kérdés.answer3;
    let kep1 = document.getElementById("kep1");
   
    if (!kérdés.image == "") {
        kep1.src = "https://szoft1.comeback.hu/hajo/" + kérdés.image;
        kep1.style.display = 'flex';
    } else {
        kep1.style.display = 'none';
    }

    helyes = kérdés.correctAnswer;

    valasz1.classList.remove("jo", "rossz");
    valasz2.classList.remove("jo", "rossz");
    valasz3.classList.remove("jo", "rossz");
}


window.onload = function () {
    kérdésBetöltés(kérdésszám);


    document.getElementById("valasz1").onclick = function () {
        kattintott = 1;
        ellenőrzés();
    }
    document.getElementById("valasz2").onclick = function () {
        kattintott = 2;
        ellenőrzés();
    }
    document.getElementById("valasz3").onclick = function () {
        kattintott = 3;
        ellenőrzés();
    }
}

function lépTovább() {
    if (kérdésszám < összkérdés) {
        kérdésszám++;
        kérdésBetöltés(kérdésszám);
    }
    else {
        kérdésszám = 1;
        kérdésBetöltés(kérdésszám);
    }
}

function lépVissza() {
    if (kérdésszám > 1) {
        kérdésszám--;
        kérdésBetöltés(kérdésszám);
    }
    else {
        kérdésszám = összkérdés;
        kérdésBetöltés(kérdésszám);
    }
}


function ellenőrzés() {
    if (kattintott == helyes) {
        document.getElementById("valasz" + kattintott).classList.add("jo")
    }
    else {
        document.getElementById("valasz" + kattintott).classList.add("rossz")
        document.getElementById("valasz" + helyes).classList.add("jo")
    }
}