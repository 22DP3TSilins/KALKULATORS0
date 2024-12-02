let vesture = JSON.parse(localStorage.getItem('vesture')) || [];

function pievienotUzEkranu(vertiba) {
    document.getElementById("display").value += vertiba;
}

function notirit() {
    document.getElementById("display").value = '';
}

function aprekins() {
    let ekrans = document.getElementById("display").value;
    let validInput = /^[0-9+\-*/(). ]+$/;
    if (!validInput.test(ekrans)) {
        document.getElementById("display").value = "Kļūda";
        return;
    }
    ekrans = ekrans.replace(/(^|[^0-9])0+(?=\d)/g, '$1');
    try {
        let rezultats = eval(ekrans);
        rezultats = rezultats.toFixed(5);
        document.getElementById("display").value = rezultats;
        let kalkulacija = ekrans + " = " + rezultats;
        vesture.push(kalkulacija);
        if (vesture.length > 10) {
            vesture.shift();
        }
        localStorage.setItem('vesture', JSON.stringify(vesture));
        atjaunotVesturi();
    } catch (kļūda) {
        document.getElementById("display").value = "Kļūda";
    }
}

function atjaunotVesturi() {
    const vestureDiv = document.getElementById("history");
    vestureDiv.innerHTML = "";
    vesture.forEach((item, index) => {
        let ieraksts = document.createElement("div");
        ieraksts.textContent = item;
        let deleteButton = document.createElement("button");
        deleteButton.textContent = "Izdzēst";
        deleteButton.classList.add("delete-btn");
        deleteButton.onclick = function() {
            deleteHistoryItem(index);
        };
        ieraksts.appendChild(deleteButton);
        vestureDiv.appendChild(ieraksts);
    });
}

function deleteHistoryItem(index) {
    vesture.splice(index, 1);
    localStorage.setItem('vesture', JSON.stringify(vesture));
    atjaunotVesturi();
}

function dzestVesturi() {
    vesture = [];
    localStorage.removeItem('vesture');
    atjaunotVesturi();
}

atjaunotVesturi();
