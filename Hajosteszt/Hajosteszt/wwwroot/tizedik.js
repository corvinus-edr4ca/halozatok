var hotList = [];
var questionsInHotlist = 3;
var displayedQuestion;
var numberOfQuestions;
var nextQuestion = 1;
var timerHandler;

document.addEventListener("DOMContentLoaded", () => {
    for (let i = 0; i < questionsInHotlist; i++) {
        hotList[i] = {
            question: {},
            goodAnswers: 0
        }
    }

    fetch(`/questions/count`)
        .then(result => result.text())
        .then(n => { numberOfQuestions = parseInt(n) })

    document.getElementById("eloregomb").addEventListener("click", előre);
    document.getElementById("hatragomb").addEventListener("click", hátra);

    if (localStorage.getItem("hotList")) {
        hotList = JSON.parse(localStorage.getItem("hotList"));
    }

    if (localStorage.getItem("displayedQuestion")) {
        displayedQuestion = parseInt(localStorage.getItem("displayedQuestion"));
    }
    
    if (localStorage.getItem("nextQuestion")) {
        nextQuestion = parseInt(localStorage.getItem("nextQuestion"));
    }

    if (hotList.length === 0) {
        for (let i = 0; i < questionsInHotlist; i++) {
            kérdésBetöltés(nextQuestion, i);
            nextQuestion++;
            }
    } else {
        console.log("Local storage-ból olvasott kérdésekkel dolgozunk!");
        kérdésMegjelenítés();
    }

});

function kérdésBetöltés(questionNumber, destination ) {
    fetch(`/questions/${questionNumber}`)
        .then(result => {
            if (!result.ok) {
                console.error(`Hibás letöltés: ${result.status}`);
                return null;
            } else {
                return result.json();
            }
        })
        .then(q => {
            hotList[destination].question = q;
            hotList[destination].goodAnswers = 0;
            console.log(`A ${questionNumber}. kérdés letöltésre került a hotList ${destination}. helyére!`);
            if (displayedQuestion === undefined && destination === 0) {
                displayedQuestion = 0;
                kérdésMegjelenítés();
            }
        })
}

function kérdésMegjelenítés() {
    let kérdés = hotList[displayedQuestion].question;
    document.getElementById("kerdesszoveg").innerText = kérdés.questionText;
    document.getElementById("valasz1").innerText = kérdés.answer1;
    document.getElementById("valasz2").innerText = kérdés.answer2;
    document.getElementById("valasz3").innerText = kérdés.answer3;

    if (kérdés.image) {
        document.getElementById("kep1").src = kérdés.image;
        document.getElementById("kep1").style.display = "block"
    } else {
        document.getElementById("kep1").style.display = "none"
    }

    for (var i = 1; i <= questionsInHotlist; i++) document.getElementById("valasz" + i).classList.remove("jo", "rossz");
    document.getElementById("valaszok").style.pointerEvents = "auto";
}

function előre() {
    clearTimeout(timerHandler);
    displayedQuestion++;
    if (displayedQuestion == questionsInHotlist) displayedQuestion = 0;
    kérdésMegjelenítés();

}

function hátra() {
    clearTimeout(timerHandler);
    displayedQuestion--;
    if (displayedQuestion < 0) displayedQuestion = questionsInHotlist - 1;
    kérdésMegjelenítés();
}

function valasztas(n) {
    let kérdés = hotList[displayedQuestion].question;

    if (n === kérdés.correctAnswer) {
        document.getElementById("valasz" + n).classList.add("jo")
        hotList[displayedQuestion].goodAnswers++;
        if (hotList[displayedQuestion].goodAnswers === 3) {
            kérdésBetöltés(nextQuestion, displayedQuestion);
            nextQuestion++;
            //kérdéslista vége ellenőrzése
        }
    } else {
        document.getElementById("valasz" + n).classList.add("rossz")
        document.getElementById("valasz" + kérdés.correctAnswer).classList.add("jo")
        hotList[displayedQuestion].goodAnswers = 0;
    }

    document.getElementById("valaszok").style.pointerEvents = "none";

    timerHandler = setTimeout(előre, 1000);

    localStorage.setItem("hotList", JSON.stringify(hotList));
    localStorage.setItem("displayedQuestion", displayedQuestion);
    localStorage.setItem("nextQuestion", nextQuestion);
}