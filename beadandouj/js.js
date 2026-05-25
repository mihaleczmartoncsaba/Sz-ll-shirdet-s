function regisztracio() {
    const felhnev = document.getElementById("regfelh").value;
    const jelszo = document.getElementById("regjelsz").value;

    document.getElementById("regfelh").value = "";
    document.getElementById("regjelsz").value = "";

    if (felhnev === "" || jelszo === "") {
        showMessage("Tölts ki minden mezőt!");
        return;
    }

    let adatok = {
        email: felhnev,
        jelszo: jelszo
    };

    // <-- ITT JAVÍTVA A "Z" BETŰ
    fetch('http://localhost:3000/api/regisztracio', { 
        method: "POST",
        cache: "no-cache",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(adatok)
    }).then(
        resp => resp.json(),
        err => console.log(err)
    ).then(
        adatok => showMessage(adatok.message)
    );
}

function bejelentkezes() {
    const felhnev = document.getElementById("befelh").value;
    const jelszo = document.getElementById("bejelsz").value;

    document.getElementById("befelh").value = "";
    document.getElementById("bejelsz").value = "";

    if (felhnev === "" || jelszo === "") {
        showMessage("Tölts ki minden mezőt!");
        return;
    }

    let adatok = {
        email: felhnev,
        jelszo: jelszo
    };

    fetch('http://localhost:3000/api/bejelentkezes', {
        method: "POST",
        cache: "no-cache",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(adatok)
    }).then(
        resp => resp.json(),
        err => console.log(err)
    ).then(
        adatok => showMessage(adatok.message)
    );
}

function showMessage(message) {
    document.getElementById("message").innerText = message;
}