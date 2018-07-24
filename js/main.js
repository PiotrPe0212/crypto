const
    buttonCrypto = document.getElementById("buttonCrypto"),
    buttonNormal = document.getElementById("buttonNormal"),
    list = Array.from(document.getElementsByTagName("ul")),
    listElements = Array.from(document.getElementsByTagName("li"));

let
    cryptoValue,
    buyObject,
    currentCrypto = document.getElementById("currentCrypto"),
    currentNormal = document.getElementById("currentNormal"),
    chosenNormal = 'EUR',
    chosenCrypto = 'BTC',
    buyValue = document.getElementById("buy"),
    sellValue = document.getElementById("sell"),
    cryptoNumber = 1;

openList = (x) => {
    list[x].style.visibility = 'visible';
    listElements.forEach((listElement) => {
        listElement.style.display = "block";
        if (listElement.textContent == currentCrypto.textContent
            || listElement.textContent == currentNormal.textContent) {
            listElement.style.display = "none";
        }
    });
    event.stopPropagation();
}


close = () => {
    list[0].style.visibility = 'hidden';
    list[1].style.visibility = 'hidden';
}

choose = (x) => {
    buyValue.innerHTML = '<span class="dot dot1"></span><span class="dot dot2"></span><span class="dot dot3"></span>';
    if (x < 6) {
        let text = listElements[x].textContent;
        currentCrypto.innerHTML = text;
        chosenCrypto = currentCrypto.textContent;
        switch (x) {
            case 0: {
                cryptoNumber = 1;
                break;
            }
            case 1: {
                cryptoNumber = 2;
                break;
            }
            case 2: {
                cryptoNumber = 1027;
                break;
            }
            case 3: {
                cryptoNumber = 1437;
                break;
            }
            case 4: {
                cryptoNumber = 131;
                break;
            }
            case 5: {
                cryptoNumber = 52;
                break;
            }
        }
    }

    else if (x > 5) {
        let text = listElements[x].textContent;
        currentNormal.innerHTML = text;
        chosenNormal = currentNormal.textContent;
    }
}
refresh = () => {
    const moneyData = new XMLHttpRequest();
    moneyData.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            buyObject = JSON.parse(this.responseText);
            if (chosenNormal == 'USD')
                buyValue.innerHTML = (buyObject.data.quotes.USD.price).toFixed(3);
            else if (chosenNormal == 'EUR')
                buyValue.innerHTML = (buyObject.data.quotes.EUR.price).toFixed(3);
            else if (chosenNormal == 'GBP')
                buyValue.innerHTML = (buyObject.data.quotes.GBP.price).toFixed(3);
            else if (chosenNormal == 'PLN')
                buyValue.innerHTML = (buyObject.data.quotes.PLN.price).toFixed(3);
        }
    };

    moneyData.open("GET", `https://api.coinmarketcap.com/v2/ticker/${cryptoNumber}/?convert=${chosenNormal}`, true);
    moneyData.send();
}
setInterval(refresh, 5000);
document.addEventListener("click", close);