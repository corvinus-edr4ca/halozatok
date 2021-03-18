//Faktoriális számítás

function faktorialis(n) {
    let eredmény = 1;
    for (let i = 2; i <= n; i++) {
        eredmény = eredmény * i;
    }
    return eredmény;
}

window.onload = () => {


    var ujDiv = document.createElement("div")
    ujDiv.id = "szamsor";
    document.body.appendChild(ujDiv);

    for (var i = 1; i < 11; i++) {
     var ujDiv = document.createElement("div")
     ujDiv.innerText = i;
     ujDiv.className = "elem";
     ujDiv.style.backgroundColor = "rgb(" + ((10 - i) * 25.6) + ", 0, 0)";
     document.getElementById("szamsor").appendChild(ujDiv);
     }

    var ujDiv = document.createElement("div")
    ujDiv.id = "pascal";
    document.body.appendChild(ujDiv);

    for (var sor = 0; sor <= 10; sor++) {

        var sorok = document.createElement("div")
        sorok.className = "sorok";
        document.getElementById("pascal").appendChild(sorok);

        for (var oszlop = 0; oszlop <= sor; oszlop++) {

            var elemek = document.createElement("div")
            elemek.className = "elemek";
            elemek.innerText = faktorialis(sor) / (faktorialis(oszlop) * faktorialis(sor - oszlop));
            sorok.appendChild(elemek);

        }
    }








}