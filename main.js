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