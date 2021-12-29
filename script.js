const API_KEY = '4f298c2ad69a4d5ab0d55f013858af47';

window.addEventListener('load', () => {

    let longitude;
    let latitude;


    if (navigator.geolocation) { //if the user allows geolocation when they open the webpage, run code ->

        navigator.geolocation.getCurrentPosition(position => {
            console.log(position);

            longitude = position.coords.longitude;
            latitude = position.coords.latitude;

            const apiCall = `https://api.weatherbit.io/v2.0/current?lat=${latitude}&lon=${longitude}&key=${API_KEY}`;

            fetch(apiCall) //fetches the data collected from the api call to weatherbit

                .then(information => {
                    return information.json(); //returns data as text object

                }).then(information => {
                    const icon = (information.data[0].weather.icon).toString();

                    const temperature = (information.data[0].app_temp).toString();
                    document.getElementById("displayDegree").innerHTML = temperature + " C°";

                    const areaZone = (information.data[0].timezone).toString();
                    document.getElementById("areaZone").innerHTML = areaZone;

                    console.log(information);

                    const weatherInfo = (information.data[0].weather.description).toString()
                    console.log(weatherInfo);
                    document.getElementById("weatherDescription").innerHTML = weatherInfo;

                    setIcons(icon, document.querySelector('.icon1'));

                })
        })
    }

    //light drizzle - moderate rain = "r01d" || "r01n";
    //shower rain = "r05d" || "r05n";
    //snowing = "s02d" || "s02n"
    function setIcons(icon, iconID) {
        const icons = new Skycons({ color: "blanchedalmond" });
        icons.play();
        if (icon === "r01n" || icon === "r01d" || icon === "r06d" || icon === "r06n" || icon === "r04d" || icon === "r04n"
            || icon === "r02d" || icon === "r02d" || icon === "r03d" || icon === "r03d") { //rain
            return icons.set(iconID, Skycons.RAIN);

        } else if (icon === "s05d" || icon === "s05n") { //sleet
            return icons.set(iconID, Skycons.SLEET);

        } else if (icon === "c01d") { //clear day
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
            return icons.set(iconID, Skycons.PARTLY_CLOUDY_DAY); //if icon is not recognized, default to cloudy icon
        }
    }
})
