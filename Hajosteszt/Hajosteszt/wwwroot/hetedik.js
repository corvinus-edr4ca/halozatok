var kérdések;
var kérdésszám = 0;
var összkérdés;
var kattintott;

function letöltés() {
    fetch('/questions.json')
        .then(r => r.json())
        .then(data => letöltésBefejeződött(data));
}

function letöltésBefejeződött(d) {
    console.log("Sikeres letöltés");
    console.log(d);
    kérdések = d;
    összkérdés = kérdések.length;
    console.log(összkérdés);
    kérdésMegjelenítés(kérdések);
}

function kérdésMegjelenítés(kérdés) {
    
    let kerdesszoveg = document.getElementById("kerdesszoveg");
    let valasz1 = document.getElementById("valasz1");
    let valasz2 = document.getElementById("valasz2");
    let valasz3 = document.getElementById("valasz3");
    let kep1 = document.getElementById("kep1");
    kerdesszoveg.innerHTML = (kérdésszám+1) + ". " + kérdések[kérdésszám].questionText;
    valasz1.innerHTML = kérdések[kérdésszám].answer1;
    valasz2.innerHTML = kérdések[kérdésszám].answer2;
    valasz3.innerHTML = kérdések[kérdésszám].answer3;
    kep1.src = "https://szoft1.comeback.hu/hajo/" + kérdések[kérdésszám].image;

    valasz1.classList.remove("jo", "rossz");
    valasz2.classList.remove("jo", "rossz");
    valasz3.classList.remove("jo", "rossz");
}

window.onload = function () {
    letöltés();
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
    if (kérdésszám < összkérdés - 1) {
        kérdésszám++;
        kérdésMegjelenítés();
    }
    else {
        kérdésszám = 0;
        kérdésMegjelenítés();
    }
}

function lépVissza() {
    if (kérdésszám > 0) {
        kérdésszám--;
        kérdésMegjelenítés();
    }
    else {
        kérdésszám = összkérdés -1 ;
        kérdésMegjelenítés();
    }
}


function ellenőrzés() {
    let jovalasz = kérdések[kérdésszám].correctAnswer;
    if (kattintott == jovalasz) {
        document.getElementById("valasz" + kattintott).classList.add("jo")
    }
    else {
        document.getElementById("valasz" + kattintott).classList.add("rossz")
        document.getElementById("valasz" + jovalasz).classList.add("jo")
    }
}