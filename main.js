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
          bodyColor1.style.backgroundColor = "#e3ecf2";
    } else {
          //Noc
          var bodyColor2 = document.getElementById("simple1");
          bodyColor2.style.backgroundColor = '#5d839c';
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
        let icon = `<img src="media/${iconCode}.png">`; //link do odpowiedniej ikonki pogody
        let weatherConditions = response.weather[0].description; //opis pogody; tego nie było na liście Marcina, więc jest ewentualnym dodatkiem
        let temperature = response.main.temp; //temperatura, stopnie celsjusza
        let pressure = response.main.pressure; //ciśnienie
        let humidity = response.main.humidity; //wilgotność
        let windSpeed = response.wind.speed; //prędkość wiatru; też nie było na liście 
        let windDirection = response.wind.deg; //kierunek wiatru; też nie było na liście
        //znaczenia do obiektów html musimy wstawiać tutaj wewnątrz funkcji, bo na zewnątrz nie sa dostępne
    })



    //Forecast 5 days, every 3 hour//
    //should be inside getCity function//
let weatherIcon = document.querySelectorAll('.day .weatherIcon');
let weatherIconNight = document.querySelectorAll('.night .weatherIcon');
let temp = document.querySelectorAll('.day .temperature');
let tempNight = document.querySelectorAll('.night .temperature');
let conditionsForecast = document.querySelectorAll('.day .conditions-forecast');
let conditionsForecastNight = document.querySelectorAll('.night .conditions-forecast');
let urlForecast = `https://api.openweathermap.org/data/2.5/forecast?q=${cityNameFromSearchWindow}&units=metric&lang=pl&appid=64bff84570f2309bb275adddc338b250`;

fetch(urlForecast)
    .then((response) => {
        return response.json();
    })
    .then((response) => {
        for (let i = 1;  /*i < 26*/response.list[i] !== undefined; i++) {
            let iconCode$ = response.list[i].weather[0].icon; //kod ikonki pogody
            //let icon$ = `<img src="media/${iconCode$}.png">`; //link do odpowiedniej ikonki pogody
            let weatherConditions$ = response.list[i].weather[0].description; //opis pogody
            let temperature$ = Math.round(response.list[i].main.temp); //temperatura, stopnie celsjusza
            let pressure$ = response.list[i].main.pressure; //ciśnienie
            let humidity$ = response.list[i].main.humidity; //wilgotność
            let windSpeed$ = response.list[i].wind.speed; //prędkość wiatru
            let forecastDate = response.list[i].dt_txt; //data prognozy i godzina
            forecastDate = forecastDate.split(' ');
            let date = forecastDate[0].split('-').reverse().splice(0, 2).join('.'); //data
            let time = forecastDate[1].slice(0, 5); //godzina
            
            let j = 0;
            let nextDaysTemp = [];
            let icons = [];
            let conditions = [];
            for (let i = 1; i < 5; i++) {
                while (new Date(response.list[j].dt_txt).getHours() != 12) {
                    j++;
                }
                nextDaysTemp.push(response.list[j].main.temp);
                icons.push(response.list[j].weather[0].icon);
                conditions.push(response.list[j].weather[0].description);
                j++;
                
            } 
            
            let m = 0;
            let nextDaysTempNight = [];
            let iconsNight = [];
            for (let i = 1; i < 5; i++) {
                while (new Date(response.list[m].dt_txt).getHours() != 0) {
                    m++;
                }
                nextDaysTempNight.push(response.list[m].main.temp);
                iconsNight.push(response.list[m].weather[0].icon);
                
                m++;
            }
            for (let i = 0; i < nextDaysTemp.length; i++) {
                weatherIcon[i].innerHTML = `<img src="media/${icons[i]}.png">`;
                conditionsForecast[i].innerText = conditions[i];
                temp[i].innerText = `${Math.round(nextDaysTemp[i])} °C`;
                weatherIconNight[i].innerHTML = `<img src="media/${iconsNight[i]}.png">`;
                tempNight[i].innerText = `${Math.round(nextDaysTempNight[i])} °C`;
            }
            
        }
    })