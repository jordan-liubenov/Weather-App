const API_KEY = '4f298c2ad69a4d5ab0d55f013858af47';

window.addEventListener('load', () => {

    let longitude;
    let latitude;

    if (navigator.geolocation) {

        navigator.geolocation.getCurrentPosition(position => {
            console.log(position);

            longitude = position.coords.longitude;
            latitude = position.coords.latitude;

            const apiCall = `https://api.weatherbit.io/v2.0/current?lat=${latitude}&lon=${longitude}&key=4f298c2ad69a4d5ab0d55f013858af47`;

            console.log(apiCall);

            fetch(apiCall)
                .then(information => {
                    return information.json();

                }).then(information => {
                    console.log(information);
                    console.log(information.data[0].timezone);
                    console.log(information.data[0].app_temp + 'C° degrees');
                })


        })
    }
})