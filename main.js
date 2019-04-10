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
    if (timer>6 && timer<=19) {
          //Dzien
          var bodyColor1 = document.querySelector('body')
          bodyColor1.style.backgroundColor = "#e3ecf2";
    } else {
          //Noc
          var bodyColor2 = document.querySelector('body');
          bodyColor2.style.backgroundColor = '#5d839c';
    }
} dayAndNight();

//Fetch API //
//let cityNameFromSearchWindow = 'Tambov'; //ta wartość miasta będzie pobierana z okienka wyszukiwania, teraz tylko przykładowo wrzuciłam miasto
//let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityNameFromSearchWindow}&units=metric&lang=pl&appid=64bff84570f2309bb275adddc338b250`;
let submit = document.querySelector('input[type="submit"]');

submit.addEventListener('click', getCity);

function getCity (e) {
    e.preventDefault();
    let cityNameFromSearchWindow = document.getElementById("city").value;
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityNameFromSearchWindow}&units=metric&lang=pl&appid=64bff84570f2309bb275adddc338b250`;
    
    fetch(url)
        .then((response) => {
            return response.json();
        })
        .then((response) => {
            let cityName = response.name;
            let iconCode = response.weather[0].icon; //kod ikonki pogody
            let icon = `<img src="media/${iconCode}.png">`; //link do odpowiedniej ikonki pogody
            let weatherConditions = response.weather[0].description; //opis pogody
            let temperature = response.main.temp; //temperatura, stopnie celsjusza
            let pressure = response.main.pressure; //ciśnienie
            let humidity = response.main.humidity; //wilgotność
            let windSpeed = response.wind.speed; //prędkość wiatru; też nie było na liście 
           
            //znaczenia do obiektów html

                document.querySelector('#cityNameBox').innerHTML = `<p>${cityName}</p>`;
                document.querySelector('#temperatureBox').innerHTML = `<p>${Math.round(temperature)} °C</p>`;
                document.querySelector('#pressureBox').innerHTML = `<p>${pressure} hPa</p>`;
                document.querySelector('#humidityBox').innerHTML = `<p>${humidity} %</p>`;
                document.querySelector('#windSpeedBox').innerHTML = `<p>${windSpeed} m/s</p>`;
                document.querySelector('#weatherBox').innerHTML = `${icon} <p>${weatherConditions}</p>`;
        })



        //Forecast 5 days, every 3 hour//
        //should be inside getCity function//
    let dateDay$ = document.querySelectorAll('.date');
    let icon$ = document.querySelectorAll('.day .weatherIcon');
    let iconNight$ = document.querySelectorAll('.night .weatherIcon');
    let temp$ = document.querySelectorAll('.day .temperature');
    let tempNightShow = document.querySelectorAll('.night .temperature');
    let conditionsDay$ = document.querySelectorAll('.day .conditions-forecast');
    let conditionsNight$ = document.querySelectorAll('.night .conditions-forecast');
    let pressureDay$ = document.querySelectorAll('.day .pressure');
    let pressureNight$ = document.querySelectorAll('.night .pressure');
    let humidityDay$ = document.querySelectorAll('.day .humidity');
    let humidityNight$ = document.querySelectorAll('.night .humidity');
    let windspeedDay$ = document.querySelectorAll('.day .wind-speed');
    let windspeedNight$ = document.querySelectorAll('.night .wind-speed');
    let urlForecast = `https://api.openweathermap.org/data/2.5/forecast?q=${cityNameFromSearchWindow}&units=metric&lang=pl&appid=64bff84570f2309bb275adddc338b250`;

    fetch(urlForecast)
        .then((response) => {
            return response.json();
        })
        .then((response) => {
            for (let i = 1; response.list[i] !== undefined; i++) {
                let j = 0;
                let dates = [];
                let tempDay = [];
                let icons = [];
                let conditions = [];
                let pressureDay = [];
                let humidityDay = [];
                let windSpeedDay = [];
                
                for (let i = 1; i < 5; i++) {
                    while (new Date(response.list[j].dt_txt).getHours() != 12) {
                        j++;
                    }
                    dates.push(response.list[j].dt_txt);

                    tempDay.push(response.list[j].main.temp);
                    icons.push(response.list[j].weather[0].icon);
                    conditions.push(response.list[j].weather[0].description);
                    pressureDay.push(response.list[j].main.pressure);
                    humidityDay.push(response.list[j].main.humidity);
                    windSpeedDay.push(response.list[j].wind.speed);
                    j++;
                } 
                
                let m = 0;
                let tempNight = [];
                let iconsNight = [];
                let conditionsNight = [];
                let pressureNight = [];
                let humidityNight = [];
                let windSpeedNight = [];
                for (let i = 1; i < 5; i++) {
                    while (new Date(response.list[m].dt_txt).getHours() != 0) {
                        m++;
                    }
                    tempNight.push(response.list[m].main.temp);
                    iconsNight.push(response.list[m].weather[0].icon);
                    conditionsNight.push(response.list[m].weather[0].description);
                    pressureNight.push(response.list[m].main.pressure);
                    humidityNight.push(response.list[m].main.humidity);
                    windSpeedNight.push(response.list[m].wind.speed);
                    m++;
                }

                for (let i = 0; i < tempDay.length; i++) {
                    let forecastDate = dates[i].split(' ');
                    forecastDate = forecastDate[0].split('-').reverse().splice(0, 2).join('.');
                    //for day forecasts
                    dateDay$[i].innerHTML = `<p>${forecastDate}</p>`;
                    icon$[i].innerHTML = `<img src="media/${icons[i]}.png">`;
                    conditionsDay$[i].innerText = conditions[i];
                    temp$[i].innerText = `${Math.round(tempDay[i])} °C`;
                    pressureDay$[i].innerText = `${pressureDay[i]} hPa`;
                    humidityDay$[i].innerText = `${humidityDay[i]} %`;
                    windspeedDay$[i].innerText = `${windSpeedDay[i]} m/s`;
                    //for night forecasts
                    iconNight$[i].innerHTML = `<img src="media/${iconsNight[i]}.png">`;
                    conditionsNight$[i].innerText = conditionsNight[i];
                    tempNightShow[i].innerText = `${Math.round(tempNight[i])} °C`;
                    pressureNight$[i].innerText = `${pressureNight[i]} hPa`;
                    humidityNight$[i].innerText = `${humidityNight[i]} %`;
                    windspeedNight$[i].innerText = `${windSpeedNight[i]} m/s`;
                }
                
            }
        })

       
    }