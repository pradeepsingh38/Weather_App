const currentTemp = document.querySelector(".curTemp");
const currentCondition = document.querySelector(".currCondition");




//-----fetch the geoloacation api------
fetch("https://geolocation-db.com/json/").then((responseLoc) => {
    return responseLoc.json();
}).then((locdata)=>{
    console.log(locdata);
}).catch((err)=>{
    console.error("Error fetching weather data:", err)
})



//----- feth the weather Data-----

function fetchTodayWeather(city) {
    const apiKey = "EJ6UBL2JEQGYB3AA4ENASN62J";
    const apiUrl = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?unitGroup=metric&key=${apiKey}&contentType=json`;

    fetch(apiUrl)
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            console.log(data);

            const today = data.currentConditions;

            //for fetch the bg image 
            setWeatherBackground(today.icon);
            console.log(today.icon);

            //current icon
            setCurrentIcon(today.icon);

            //for current today temp
            console.log(today.temp);
            currentTemp.textContent = `${today.temp}°C`;

            //for  current conditions
            //console.log(today.conditions);
            currentCondition.textContent = `${today.conditions}`







        })
        .catch((err) => {
            console.error("Error fetching weather data:", err);
        });
}






//Call the function for a specific city
fetchTodayWeather("bengaluru");

//for backround image 
function setWeatherBackground(icon) {
            const bgImg = document.querySelector("#bgImg");

            if (icon === "partly-cloudy-day") {
                bgImg.src = "https://i.ibb.co/qNv7NxZ/pc.webp";
            } else if (icon === "cloudy") {
                bgImg.src = "https://i.ibb.co/qNv7NxZ/pc.webp";
            } else if (icon === "partly-cloudy-night") {
                bgImg.src = "https://i.ibb.co/RDfPqXz/pcn.jpg";
            } else if (icon === "rain") {
                bgImg.src = "https://i.ibb.co/h2p6Yhd/rain.webp";
            } else if (icon === "clear-day") {
                bgImg.src = "https://i.ibb.co/WGry01m/cd.jpg";
            } else if (icon === "clear-night") {
                bgImg.src = "https://i.ibb.co/kqtZ1Gx/cn.jpg";
            }
        }


        //for current weather icon
    function  setCurrentIcon(icons){
        const currIcon = document.querySelector(".curricon");

        if (icons === "partly-cloudy-day") {
            currIcon.src = "https://i.ibb.co/PZQXH8V/27.png";
        } else if (icons === "partly-cloudy-night") {
            currIcon.src = "https://i.ibb.co/Kzkk59k/15.png";
        } else if (icons === "rain") {
            currIcon.src = "https://i.ibb.co/kBd2NTS/39.png";
        } else if (icons === "clear-day") {
            currIcon.src = "https://i.ibb.co/rb4rrJL/26.png";
        } else if (icons === "clear-night") {
            currIcon.src = "https://i.ibb.co/1nxNGHL/10.png";
        }
    }
    

    //for day and time
    const timer = document.querySelector('.curr-dayTime');
    const currDate = new Date();
    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const currentDay = daysOfWeek[currDate.getDay()];
    const currentTime = new Date();
    let hours = currentTime.getHours();
    let minutes = currentTime.getMinutes();
    
    if (hours > 12) {
        hours = hours - 12;
    }
    if (hours === 0) {
        hours = 12;
    }
    if (minutes < 10) {
        minutes = "0" + minutes;
    }
    timer.textContent = `${currentDay}, ${hours}:${minutes}`;