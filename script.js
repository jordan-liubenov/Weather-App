const API_KEY = '4f298c2ad69a4d5ab0d55f013858af47';

window.addEventListener('load', () => {

    if (navigator.geolocation) { //if the user allows geolocation when they open the webpage, run code ->

        navigator.geolocation.getCurrentPosition(position => {

            const longitude = position.coords.longitude; //get current geo-location of the user 
            const latitude = position.coords.latitude;

            const apiCall = `https://api.weatherbit.io/v2.0/current?lat=${latitude}&lon=${longitude}&key=${API_KEY}`; //send the geo-information to the api

            fetch(apiCall) //fetches the data collected from the api call to weatherbit

                .then(information => {
                    return information.json(); //returns data as text object

                }).then(information => {
                    
                    var today = new Date();
                    var minutes = (today.getMinutes()).toString();
                    var hours = (today.getHours()).toString();

                    if(minutes.length < 2){
                        minutes = "0" + minutes;
                    }
                    if(hours.length < 2){
                        hours = "0" + hours;
                    }

                    var time = hours + ":" + minutes; //gets the current time (hour and minutes)


                    document.getElementById("last-update").innerHTML = "Last updated " + time;

                    const windSpeedKM = (information.data[0].wind_spd).toString();
                    document.getElementById("windSpeed").innerHTML = "Wind speed: " + windSpeedKM + " km/h";

                    const icon = (information.data[0].weather.icon).toString();

                    const temperature = (Math.round(information.data[0].temp)).toString();
                    document.getElementById("displayDegree").innerHTML = temperature + " C°";

                    console.log(information);

                    const weatherInfo = (information.data[0].weather.description).toString()
                    console.log(weatherInfo);
                    //document.getElementById("weatherDescription").innerHTML = weatherInfo;

                    const areaZone = (information.data[0].timezone).toString();
                    document.getElementById("areaZone").innerHTML = areaZone + ` (${weatherInfo})`;

                    setIcon(icon, document.querySelector('.icon1'));
                    setWindIcon(document.querySelector('.windIcon'));

                    console.log(information.data[0].wind_cdir);

                    const UV = (information.data[0].uv).toString();
                    document.getElementById("UV").innerHTML = "UV Index: " + UV;

                    const windDirection = (information.data[0].wind_cdir).toString();
                    document.getElementById("Wind").innerHTML = "Wind direction: " + windDirection;

                    const airQuality = (information.data[0].aqi).toString();
                    document.getElementById("AQ").innerHTML = "Air Quality Index: " + airQuality;
                    console.log(airQuality);
                })
        })

    } else {
        document.getElementById("last-update").innerHTML = "Gathering info...";
        document.getElementById("windSpeed").innerHTML = "Gathering info...";
        document.getElementById("displayDegree").innerHTML = "Gathering info...";
        document.getElementById("areaZone").innerHTML = "Gathering info...";
    }

    //sets icon for current weather 
    function setIcon(icon, iconID) {
        const icons = new Skycons({ color: "blanchedalmond" });
        icons.play();
        if (icon === "r01n" || icon === "r01d" || icon === "r06d" || icon === "r06n" || icon === "r04d" || icon === "r04n"
            || icon === "r02d" || icon === "r02d" || icon === "r03d" || icon === "r03d") { //rain
            return icons.set(iconID, Skycons.RAIN);

        } else if (icon === "s05d" || icon === "s05n") { 
            return icons.set(iconID, Skycons.SLEET);

        } else if (icon === "c01d") { 
            return icons.set(iconID, Skycons.CLEAR_DAY);

        } else if (icon === "c01n") {
            return icons.set(iconID, Skycons.CLEAR_NIGHT);

        } else if (icon === "c02d") {
            return icons.set(iconID, Skycons.PARTLY_CLOUDY_DAY);

        } else if (icon === "c02n") {
            return icons.set(iconID, Skycons.PARTLY_CLOUDY_NIGHT);

        } else if (icon === "c03d" || icon === "c03n" || icon === "c04n" || icon === "c04d") {
            return icons.set(iconID, Skycons.CLOUDY);

        } else if (icon === "a05d" || icon === "a05n") {
            return icons.set(iconID, Skycons.FOG);

        } else if (icon === "s01d" || icon === "s01n" || icon === "s02n" || icon === "s02d" || icon === "s03n" || icon === "s03d" || icon === "s04n" || icon === "s04d") {
            return icons.set(iconID, Skycons.SNOW);

        } else {
            return icons.set(iconID, Skycons.CLOUDY); //default to cloudy icon if the current icon isn't featured in skycons pack
        }
    }

    function setWindIcon(iconID) {
        const wind = new Skycons({ color: "blanchedalmond" });
        wind.play();
        return wind.set(iconID, Skycons.WIND);
    }
})
