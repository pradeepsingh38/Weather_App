const currentTemp = document.querySelector(".curTemp");
const currentCondition = document.querySelector(".currCondition");
const searchField = document.querySelector(".search-field");
const searchInput = document.querySelector(".searchs");
const searchBtn = document.querySelector(".search-btn");
const currLoc = document.querySelector(".currLoc");
const percPer = document.querySelector(".perc");

const todayBtn = document.querySelector(".todayBtn");
const weekBtn = document.querySelector(".weekBtn");
const detailsCard = document.querySelector(".detailsCard");


let currentCity = ""
let currUnit = "C";
let hourOrWeek = "Week";

//-----fetch the geoloacation api------
function getPublicIp() {
    fetch("https://geolocation-db.com/json/" , {
        method: "GET",
        })
        .then((responseLoc) => responseLoc.json()
        ).then((locdata)=>{
            console.log(locdata);
            currentCity=locdata.city;
        
           // console.log(currentCity);
            fetchTodayWeather(currentCity,currUnit,hourOrWeek)
        }).catch((err)=>{
            console.error("Error fetching weather data:", err)
        })
}
getPublicIp();

//----- feth the weather Data-----

function fetchTodayWeather(city,unit,hourOrWeek) {
    //const apiKey = "EJ6UBL2JEQGYB3AA4ENASN62J";
    const apiKey = "Y24SBNU67CLF6CY2YYHDAFUKW";
    const apiUrl = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?unitGroup=metric&key=${apiKey}&contentType=json`;

    fetch(apiUrl)
        .then((response) => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then((data) => {
            console.log(data);

            const today = data.currentConditions;

            //city
            currLoc.innerText = data.resolvedAddress;            


            //for fetch the bg image 
            setWeatherBackground(today.icon);
            console.log(today.icon);

            //current icon
            setCurrentIcon(today.icon);

            //for current today temp
            console.log(today.temp);
            currentTemp.textContent = `${today.temp}°C`;

            //for  current conditions
            if(hourOrWeek="hourly"){
                updateWeatherData(data.days[0].hours,unit,"day")
            }



            //console.log(today.conditions);
            // currentCondition.textContent = `${today.conditions}`
            // percPer.textContent = `${today.precip}%`

            // //for today data
            // todayBtn.addEventListener("click", ()=>{
            //     updateTodayData(today, data.resolvedAddress);
            // })
            // console.log(data.resolvedAddress);

        })
        .catch((err) => {
            console.error("Error fetching weather data:", err);
        });
}



//Call the function for a specific city
searchField.addEventListener("submit", (e)=>{
    e.preventDefault();
    let location = searchInput.value.trim();
    //console.log(location);    
        if(location !== ""){
        fetchTodayWeather(location,currUnit,hourOrWeek);
    }
});


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
    if (hours === 0){
        hours = 12;
    }
    if (minutes < 10) {
        minutes = "0" + minutes;
    }
    timer.textContent = `${currentDay}, ${hours}:${minutes}`;




    function getDayName(date) {
        let day = new Date(date);
        let days = [
            "Sunday",
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday"
        ];
        return days[day.getDay()];
    }
    function getHour(time) {
        let hour = time.split(":")[0];
        let min = time.split(":")[1];
        if (hour > 12) {
            hour = hour - 12;
            return` ${hour}:${min} PM`;
        } else {
            return `${hour}:${min} AM`;
        }
    }
    



// for hourly data
    function updateWeatherData(weatherData,unit,type){
        detailsCard.innerHTML = ""; // for empty weekly data
        let day = 0;
        let numCards = type === "day" ? 24 : 7;
    
        for (let i = 0; i < numCards; i++) {
            let card = document.createElement("div");
            card.classList.add("detail");
    
            let dayName = type === "week" ? getDayName(weatherData[day].datetime) : getHour(weatherData[day].datetime);
            let dayTemp = weatherData[day].temp;
            if (unit === "F") {
                dayTemp = celciusToFahrenheit(dayTemp);
            }
            let iconCondition = weatherData[day].icon;
            //console.log(iconCondition);
            
            let iconsrc = setCurrentIcon(iconCondition);
            //console.log(iconsrc);
            
            let tempUnit = unit === "F" ? "°F" : "°C";
    
            card.innerHTML = `<h2 class="day-name">${dayName}</h2>
                <div class="card-icon">
                    <img src="${iconsrc}" alt="">
                </div>
                <div class="day-temp">
                    <h2 class="temp">${dayTemp}</h2>
                    <span class="temp-unit">${tempUnit}</span>
                </div>`;
                detailsCard.appendChild(card);
            day++;
        }
    }


    todayBtn.addEventListener("click", () => {
        changeTimeSpan("hourly");
    });
    weekBtn.addEventListener("click", () => {
        changeTimeSpan("week");
    });
    
    function changeTimeSpan(unit){
        if(hourOrWeek != unit){
            hourOrWeek = unit;
            if (unit === "hourly") {
                todayBtn.classList.add("active");
                weekBtn.classList.remove("active");
            }else {
                todayBtn.classList.remove("active");
                weekBtn.classList.add("active");
            }
            fetchTodayWeather(location,currUnit,hourOrWeek)

        }
    }

    