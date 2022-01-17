const API_KEY = '4f298c2ad69a4d5ab0d55f013858af47';

const units = ["metric", "imperial"];

let currentUnit;

let windSpeed;
let temperature;

const rainSound = document.getElementById("rain");
const cricketSound = document.getElementById("crickets");

window.addEventListener('load', () => {


    if (navigator.geolocation) { //if the user allows geolocation when they open the webpage, run code ->

        navigator.geolocation.getCurrentPosition(position => {

            currentUnit = units[0];

            const longitude = position.coords.longitude; //get current geo-location of the user 
            const latitude = position.coords.latitude;

            const apiCall = `https://api.weatherbit.io/v2.0/current?lat=${latitude}&lon=${longitude}&key=${API_KEY}`; //send the geo-information to the api

            const forecastApi = `https://api.weatherbit.io/v2.0/forecast/daily?lat=${latitude}&lon=${longitude}&key=${API_KEY}`;
            fetch(forecastApi)
                .then(information => {
                    return information.json();
                }).then(information => {
                    console.log(information);
                    //console.log(information.data[0].)

                })



            fetch(apiCall) //fetches the data collected from the api call to weatherbit
                .then(information => {
                    return information.json(); //returns data as text object

                }).then(information => {

                    const city = information.data[0].city_name;
                    const country = information.data[0].country_code;

                    let today = new Date();
                    let minutes = (today.getMinutes()).toString();
                    let hours = (today.getHours()).toString();

                    if (minutes.length < 2) {
                        minutes = "0" + minutes;
                    }
                    if (hours.length < 2) {
                        hours = "0" + hours;
                    }

                    let time = hours + ":" + minutes; //gets the current time (hour and minutes)

                    document.getElementById("last-update").innerHTML = `Last updated ${time}`;

                    windSpeed = (information.data[0].wind_spd).toFixed(1);
                    document.getElementById("windSpeed").innerHTML = `Wind speed: ${windSpeed}km/h`;

                    const icon = (information.data[0].weather.icon).toString();

                    temperature = (Math.ceil(information.data[0].temp)).toString();
                    document.getElementById("displayDegree").innerHTML = `${temperature} C°`;

                    const weatherInfo = (information.data[0].weather.description).toString()

                    const areaZone = (information.data[0].timezone).toString();
                    document.getElementById("areaZone").innerHTML = `${country}/${city}` + ` (${weatherInfo})`;

                    setIcon(icon, document.querySelector('.icon1'));
                    setWindIcon(document.querySelector('.windIcon'));

                    const UV = (Math.round(information.data[0].uv)).toString();
                    document.getElementById("UV").innerHTML = `UV Index: ${UV} ☼`;

                    const windDirection = (information.data[0].wind_cdir).toString();
                    const arrow = setWindArrow(windDirection);

                    document.getElementById("Wind").innerHTML = `Wind direction: ${windDirection} ${arrow}`;

                    const airQuality = (information.data[0].aqi).toString();
                    document.getElementById("AQ").innerHTML = `Air Quality Index: ${airQuality}`;
                })
        })

    }

    //sets icon for current weather 
    function setIcon(icon, iconID) {

        const icons = new Skycons({ color: "blanchedalmond" });
        icons.play();

        if (icon === "r01n" || icon === "r01d" || icon === "r06d" || icon === "r06n" || icon === "r04d" || icon === "r04n"
            || icon === "r02d" || icon === "r02d" || icon === "r03d" || icon === "r03d") {

            return icons.set(iconID, Skycons.RAIN); //raining

        } else if (icon === "s05d" || icon === "s05n") {
            return icons.set(iconID, Skycons.SLEET); //snowing

        } else if (icon === "c01d") {
            return icons.set(iconID, Skycons.CLEAR_DAY); //clear

        } else if (icon === "c01n") {
            return icons.set(iconID, Skycons.CLEAR_NIGHT); //clear

        } else if (icon === "c02d") {

            return icons.set(iconID, Skycons.PARTLY_CLOUDY_DAY); //cloudy

        } else if (icon === "c02n") {

            return icons.set(iconID, Skycons.PARTLY_CLOUDY_NIGHT); //cloudy 

        } else if (icon === "c03d" || icon === "c03n" || icon === "c04n" || icon === "c04d") {
            return icons.set(iconID, Skycons.CLOUDY);

        } else if (icon === "a05d" || icon === "a05n") {
            return icons.set(iconID, Skycons.FOG);

        } else if (icon === "s01d" || icon === "s01n" || icon === "s02n" || icon === "s02d" || icon === "s03n" || icon === "s03d" || icon === "s04n" || icon === "s04d") {
            return icons.set(iconID, Skycons.SNOW); //snowing

        } else {
            return icons.set(iconID, Skycons.CLOUDY); //default to cloudy icon if the current icon isn't featured in skycons pack
        }
    }
})

function setWindIcon(iconID) {
    const wind = new Skycons({ color: "blanchedalmond" });
    wind.play();
    return wind.set(iconID, Skycons.WIND);
}

const directions = { West: ' ⬅', North: ' ⬆', South: ' ⬇', East: ' ➡' };

function setWindArrow(windDirection) {
    switch (windDirection.charAt(0)) {
        case 'W':
            return directions.West;
        case 'N':
            return directions.North;
        case 'E':
            return directions.East;
        case 'S':
            return directions.South;
    }
}


function convertUnits() {
    if (currentUnit === units[0]) {
        currentUnit = convertToImperial(temperature, windSpeed)

    } else if (currentUnit === units[1]) {
        currentUnit = convertToMetric(temperature, windSpeed);
    }
}

//convert Celsius to Fahrenheit : ((degrees)°C × 9/5) + 32 = (degrees)°F
//convert KM to miles: KM / 1.609;
function convertToImperial(temp, speed) {
    temp = ((temperature) * 0.95) + 32;
    speed = (speed / 1.609).toFixed(1);

    document.getElementById("displayDegree").innerHTML = temp.toFixed(0) + " F°";
    document.getElementById("windSpeed").innerHTML = "Wind speed: " + speed + "mph";

    console.log(`converted to imperial`);
    return units[1];
}

//convert Fahrenheit to Celsius: ((degrees)°F − 32) × 5/9 = (degrees)°C
//convert miles to KM: miles * 1.609;
function convertToMetric() {
    document.getElementById("displayDegree").innerHTML = temperature + " C°";

    document.getElementById("windSpeed").innerHTML = "Wind speed: " + windSpeed.toFixed(1) + "km/h";

    console.log(`converted to metric`);
    return units[0];
}