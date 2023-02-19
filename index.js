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
            getIcon(data); 
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
                    <div> <img id="imagen" src="./images/clouds.png" alt="imagen"}> </div>
                    <div id="temp">
                        <span class= "min">${weather.temperature_2m_min[index]}ºC</span>
                        <span> / </span>
                        <span class="max">${weather.temperature_2m_max[index]}ºC</span>
                    </div>
                    <div> LLuvia: ${weather.rain_sum[index]} mm </div>
                    <div> Viento: ${weather.windspeed_10m_max[index]} km/h</div>        
                </div> `             

    }
    document.getElementById("resultado").innerHTML = HTML;
}




function getIcon(weatherList) {

    var imagen = "./images/clouds.png";

    for (let index = 0; index < 7; index++) {
        let weather= weatherList.daily;
        let codigo = weather.weathercode;

        console.log(codigo[index]);

        if (codigo[index]==0){
            document.getElementById("imagen").innerHTML= "./images/sun.png";
        }
        else if (codigo[index]==1 || 2 || 3 || 45 || 48 || 51 || 53 || 55 || 56 || 57){
            document.getElementById("imagen").innerHTML= "./images/clouds.png";
        }
        else if (codigo[index]== 61 || 63 || 65 || 66 || 67 || 80 || 81 || 82){
            document.getElementById("imagen")= "./images/rain.png";
        }
        else if (codigo[index]== 71 || 73 || 75 || 77 || 85 || 86){
            document.getElementById("imagen")= "./images/snow.png";
        }
        else if (codigo[index]== 95 || 96 || 99){
            document.getElementById("imagen")= "./images/thunderstorm.png";
        }
    }
}


/*
esto no funciona

                    <div id= {getIcon(weathercode)}> </div>

function getIcon (weathercode){
    if (weathercode==0){
        return "0";
    }
    else if (weathercode==1 || 2 || 3 || 45 || 48 || 51 || 53 || 55 || 56 || 57){
        return "1";
    }
    else if (codigo[index]== 61 || 63 || 65 || 66 || 67 || 80 || 81 || 82){
        return "2";
    }
    else if (codigo[index]== 71 || 73 || 75 || 77 || 85 || 86){
        return "3";
    }
    else if (codigo[index]== 95 || 96 || 99){
        return "4";
    }
console.log(weathercode);
} 

*/

