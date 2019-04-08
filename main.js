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



    //Forecast 5 days, every 3 hour//
    //should be inside getCity function//
let urlForecast = `https://api.openweathermap.org/data/2.5/forecast?q=${cityNameFromSearchWindow}&units=metric&lang=pl&appid=64bff84570f2309bb275adddc338b250`;

fetch(urlForecast)
    .then((response) => {
        return response.json();
    })
    .then((response) => {
        for (let i = 1; response.list[i] !== undefined; i++) {
            let iconCode$ = response.list[i].weather[0].icon; //kod ikonki pogody
            let icon$ = `http://openweathermap.org/img/w/${iconCode$}.png`; //link do odpowiedniej ikonki pogody z tych, które proponuje openweathermap
            let weatherConditions$ = response.list[i].weather[0].description; //opis pogody
            let temperature$ = response.list[i].main.temp; //temperatura, stopnie celsjusza
            let pressure$ = response.list[i].main.pressure; //ciśnienie
            let humidity$ = response.list[i].main.humidity; //wilgotność
            let windSpeed$ = response.list[i].wind.speed; //prędkość wiatru
            let forecastDate = response.list[i].dt_txt; //data prognozy i godzina
            console.log(typeof forecastDate);
            forecastDate = forecastDate.split(' ');
            let date = forecastDate[0].split('-').reverse().splice(0, 2).join('.'); //data
            let time = parseInt(forecastDate[1].slice(0, 2)) + 1 + forecastDate[1].slice(2, 5); //godzina
            
            //znaczenia do obiektów html musimy wstawiać tutaj wewnątrz funkcji, bo na zewnątrz nie sa dostępne
        }
            
          
    })