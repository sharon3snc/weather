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
    var error=false;
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
            console.log(error);
            if (error=true) {
                document.getElementById("showError").innerHTML= "Ciudad Errónea";
            }
            else {
                document.getElementById("showError").reset();
            }
        });

    document.getElementById("showError").innerHTML= " "
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
                    <div class="imagen" src="${getIcon(weather.weathercode[index])}"> Imagen </div>
                    <div id="temp">
                        <span class= "min">${weather.temperature_2m_min[index]}ºC</span>
                        <span> / </span>
                        <span class="max">${weather.temperature_2m_max[index]}ºC</span>
                    </div>
                    <div  id="lluvia"> LLuvia: ${weather.rain_sum[index]} mm </div>
                    <div id="viento"> Viento: ${weather.windspeed_10m_max[index]} km/h</div>        
                </div> `             
    }
    document.getElementById("resultado").innerHTML = HTML;
}


function getIcon (weathercode){

    console.log(weathercode);

    if (weathercode===0){
        return "./images/sun.png";
    }
    else if (weathercode===1 || weathercode===2 || weathercode===3 || weathercode===45 || 
        weathercode===48 || weathercode===51 || weathercode===53 || weathercode===55 || weathercode===56 || weathercode===57){
        return "./images/clouds.png";
    }
    else if (weathercode=== 61 || weathercode=== 63 || weathercode=== 65 || weathercode=== 66 || weathercode=== 67 || 
        weathercode=== 80 || weathercode=== 81 || weathercode=== 82){
        return ("./images/rain.png");
    }
    else if (weathercode=== 71 || weathercode=== 73 || weathercode=== 75 || weathercode=== 77 || 
        weathercode=== 85 || weathercode=== 86){
        return ("./images/snow.png");
    }
    else if (weathercode=== 95 || weathercode=== 96 || weathercode=== 99){
        return ("./images/thunderstorm.png");
    }

} 






