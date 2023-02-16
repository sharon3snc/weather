/*
La API es https://open-meteo.com/en/docs

Primero debemos hacer una petición para extraer la latitud, longitud y zona horaria de la ciudad que queremos buscar

var city = ...
var CITY_API_URL = `https://geocoding-api.open-meteo.com/v1/search?name=${city}`;

Con esa información, haremos una segunda petición que nos devolverá la predicción

var lat = ...
var lon = ...
var timezone = ...
var WEATHER_API_URL = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&timezone=${timezone}&daily=weathercode,temperature_2m_max,temperature_2m_min,rain_sum,windspeed_10m_max`;
*/

function getLatitud() {
    var city= document.getElementById ("city").value;
    console.log("--- getting latitud");

    fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${city}`)
        .then(function(response) {
            return response.json()
        })
        .then(function(data) {
            console.log(data);
            getWeather(data);
        })
        .catch(function(error) {
            console.log(error);
        });
}



function getWeather(data) {
    console.log("--- getting data for weather" + city);
    var lat= data.results[0].latitude;
    var lon= data.results[0].longitude;
    var timezone= data.results[0].timezone;

    document.getElementById("resultado").innerHTML = 'Clima para: ' + city;

    fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&timezone=${timezone}&daily=weathercode,temperature_2m_max,temperature_2m_min,rain_sum,windspeed_10m_max`)
        .then(function(response) {
            return response.json()
        })
        .then(function(data) {
            console.log(data);
            addWeatherToPage(data); 
        })
        .catch(function(error) {
            console.log(error);
        });
}


function addWeatherToPage(weatherList) {

    var HTML = '';
    
    for (let index = 0; index < weatherList.length; index++) {
        const weather = weatherList[index];

        HTML += `
            <div class="weather">
                <div>${weather.time}</div>
                <div>${weather.temperature_2m_max}</div>
                <div>${weather.temperature_2m_min}</div>
                <div>${weather.rain_sum}</div>
                <div>${weather.windspeed_10m_max}</div>
                <button onclick="getPostsByUser(${weather.id})">Get Weather</button>
            </div>
        `
    }

    console.log(weatherList)
    document.getElementById("weatherList").innerHTML = HTML;
}



