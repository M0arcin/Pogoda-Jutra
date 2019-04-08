let cityNameFromSearchWindow

let submit = document.querySelector('input[type="submit"')

submit.addEventListener('click', getCity)

function getCity(e){

    e.preventDefault()
    cityNameFromSearchWindow = document.getElementById("city").value
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

           document.querySelector('#cityNameBox').innerHTML = cityName 
           document.querySelector('#temperatureBox').innerHTML = temperature
           document.querySelector('#pressureBox').innerHTML = pressure
           document.querySelector('#humidityBox').innerHTML = humidity
           document.querySelector('#windSpeedBox').innerHTML = windSpeed
           document.querySelector('#windDirectionBox').innerHTML = windDirection
       })       
}
