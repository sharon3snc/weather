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

function getLatitud(city) {
    var city= document.getElementById("city").value;
    console.log("--- getting latitud for "+ city);

    fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${city}`)
        .then(function(response) {
            return response.json()
        })
        .then(function(data) {
            console.log(data);
            getWeather(data);
        })
        .catch(function(error) {
            console.log("error",error);
        });
}


function getWeather(data) {
    console.log("--- getting data for weather" + city);
    var lat= data.results[0].latitude;
    var lon= data.results[0].longitude;
    var timezone= data.results[0].timezone;

    document.getElementById("resultado").innerHTML = ("Obteniendo clima para: " + city);

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

    var HTML = ``;

    for (let index = 0; index < 7; index++) {
        let weather= weatherList.daily;

        HTML += `
                <div class="weather" id="resultado-${weather.weathercode[index]}">
                    <div class="title">${weather.time[index]}</div>
                    
                    <div><img src="./images/clouds.png" id="icon"/> </div>
                    <span class= "min">${weather.temperature_2m_min[index]}ºC</span>
                    <span> / </span>
                    <span class="max">${weather.temperature_2m_max[index]}ºC</span>
                    <div> LLuvia: ${weather.rain_sum[index]} mm </div>
                    <div> Viento: ${weather.windspeed_10m_max[index]} km/h</div>        
                </div> `             

    }

    document.getElementById("resultado").innerHTML = HTML;
}



function getIcon (weathercode) {
    var imagen = "  "

	 if (weathercode="0") 
     { imagen = "./images/sun.jpg";
    console.log("imagen")}


document.getElementById("icon").src=imagen;
}




/*
if weathe="1,2,3,45,48,51,53,55,56,57" then imagen = "./images/clouds.jpg"; 
case "61,63,65,66,67,80,81,82": imagen = "./images/rain.jpg"; break;
case "71,73,75,77,85,86": imagen = "./images/rain.jpg"; break;
case "95,96,99": imagen = "./images/thunderstorm.jpg"; break;} */

