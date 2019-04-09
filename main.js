
//poniezej funkcja ktora podaje nam wspolrzedne lokalizacji uzytkownika po kliknieciu.
var x = document.getElementById("city"); //tutaj moze je wyswietlic, city wpisane, ale nie bardzo wychodiz mi wstukanie ich do inputa.

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        x.innerHTML = "Nie można pobrać lokalizacji. Wprowadź miasto ręcznie.";
    }
}

function showPosition(position) {
    let e=`${position.coords.latitude},${position.coords.longitude}`;
    console.log(e);//tu loguje kordy
}
//ta funkcja ustawia tlo w zaleznosci od pory dnia. poki co zmienia tlo forecasta, ale to szczegol do zmiany,
function dayAndNight() {
    var current = new Date();
    var timer = current.getHours();
    if (timer>6&&timer<=19) {
          //Dzien
          var bodyColor1 = document.getElementById("simple1");
          bodyColor1.style.backgroundColor = "blue";
    } else {
          //Noc
          var bodyColor2 = document.getElementById("simple1");
          bodyColor2.style.backgroundColor = 'pink';
    }
} dayAndNight();