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

            console.log(apiCall);

            fetch(apiCall) //fetches the data collected from the api call to weatherbit

                .then(information => {
                    return information.json(); //returns data as text object

                }).then(information => {
                    const temperature = (information.data[0].app_temp).toString();
                    document.getElementById("displayDegree").innerHTML = temperature;

                    const areaZone = (information.data[0].timezone).toString();
                    document.getElementById("areaZone").innerHTML = areaZone;

                    console.log(information);
                    
                    const weatherInfo = (information.data[0].weather.description).toString()
                    console.log(weatherInfo);
                    document.getElementById("weatherDescription").innerHTML = weatherInfo;
                })
        })
    }
})
