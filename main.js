// Konrad

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

//Fetch API //
let cityNameFromSearchWindow = 'Tambov'; //ta wartość miasta będzie pobierana z okienka wyszukiwania, teraz tylko przykładowo wrzuciłam miasto
let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityNameFromSearchWindow}&units=metric&lang=pl&appid=64bff84570f2309bb275adddc338b250`;

fetch(url)
    .then((response) => {
        return response.json();
    })
    .then((response) => {
        let cityName = response.name;
        let iconCode = response.weather[0].icon; //kod ikonki pogody
        let icon = `http://openweathermap.org/img/w/${iconCode}.png`; //link do odpowiedniej ikonki pogody z tych, które proponuje openweathermap
        let weatherConditions = response.weather[0].description; //opis pogody; tego nie było na liście Marcina, więc jest ewentualnym dodatkiem
        let temperature = response.main.temp; //temperatura, stopnie celsjusza
        let pressure = response.main.pressure; //ciśnienie
        let humidity = response.main.humidity; //wilgotność
        let windSpeed = response.wind.speed; //prędkość wiatru; też nie było na liście 
        let windDirection = response.wind.deg; //kierunek wiatru; też nie było na liście
        //znaczenia do obiektów html musimy wstawiać tutaj wewnątrz funkcji, bo na zewnątrz nie sa dostępne
        
    })
//  master
