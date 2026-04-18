function regisztracio() {
  const felhnev = document.getElementById("regfelh").value;
  const jelszo = document.getElementById("regjelsz").value;

  if (felhnev === "" || jelszo === "") {
    showMessage("Tölts ki minden mezőt!");
    return;
  }

  let felhasznalok = JSON.parse(localStorage.getItem("felhasznalok"));
  if (felhasznalok === null) {
    felhasznalok = [];
  }

  let marLetezik = false;

  for (let i = 0; i < felhasznalok.length; i++) {
    if (felhasznalok[i].felhnev === felhnev) {
      marLetezik = true;
    }
  }

  if (marLetezik) {
    showMessage("Ez a felhasználó már létezik!");
    return;
  }

  felhasznalok.push({
    felhnev: felhnev,
    jelszo: jelszo
  });

  localStorage.setItem("felhasznalok", JSON.stringify(felhasznalok));

  showMessage("Sikeres regisztráció");
}


function bejelentkezes() {
  const felhnev = document.getElementById("befelh").value;
  const jelszo = document.getElementById("bejelsz").value;

  let felhasznalok = JSON.parse(localStorage.getItem("felhasznalok"));
  if (felhasznalok === null) {
    felhasznalok = [];
  }

  let sikeres = false;

  for (let i = 0; i < felhasznalok.length; i++) {
    if (
      felhasznalok[i].felhnev === felhnev &&
      felhasznalok[i].jelszo === jelszo
    ) {
      sikeres = true;
    }
  }

  if (sikeres) {
    showMessage("Sikeres bejelentkezés");
  } else {
    showMessage("Hibás bejelentkezési adatok");
  }
}


function showMessage(message) {
  document.getElementById("message").innerText = message;
}