const searchField = document.querySelector(".search-field");
const searchInput = document.querySelector(".searchs");
const searchBtn = document.querySelector(".search-btn");
const temp = document.querySelector("#temp");
const tempUnit = document.querySelector("#temp-unit");
const currentCondition = document.querySelector(".currCondition");

const date = document.getElementById("date-time");
const currLoc = document.querySelector(".currLoc");
const currIcon = document.querySelector(".curricon");
const percPer = document.querySelector(".perc");

const todayBtn = document.querySelector(".todayBtn");
const weekBtn = document.querySelector(".weekBtn");
const celBtn = document.getElementById("cel");
const farBtn = document.getElementById("far");

const detailsCard = document.querySelector(".detailsCard");


let currentCity = ""; // Default location
let currUnit = "C";
let hourOrWeek = "week";

function getDateTime(){
    let now = new Date(),
    hour = now.getHours(),
    minute = now.getMinutes();

    let days = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
    ];
    hour = hour % 12;
    if (hour < 10) {
        hour = "0" + hour;
    }
    if (minute < 10) {
        minute = "0" + minute;
    }
    let dayString = days[now.getDay()];
    return `${dayString}, ${hour}:${minute}`;
}

date.innerText = getDateTime();

setInterval(() => {
    date.innerText = getDateTime();
}, 1000);

//-----fetch the geoloacation api------
function getPublicIp() {
    fetch("https://geolocation-db.com/json/" , {
        method: "GET",
        })
        .then((responseLoc) => responseLoc.json()
        ).then((locdata)=>{
            console.log(locdata);
            currentCity=locdata.city;
        
           //console.log(currentCity);
            fetchTodayWeather(currentCity,currUnit,hourOrWeek)
        }).catch((err)=>{
            console.error("Error fetching weather data:", err)
        })
}
getPublicIp();

//----- feth the weather Data-----

function fetchTodayWeather(city,unit,hourOrWeek) {
    // const apiKey = "Y24SBNU67CLF6CY2YYHDAFUKW";   
    fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?unitGroup=metric&key=EJ6UBL2JEQGYB3AA4ENASN62J&contentType=json`, {
        method: "GET",
    })
    .then((response) => response.json())

        .then((data) => {
            console.log(data);


        let today = data.currentConditions;
        if (unit === "C") {
            temp.innerText = today.temp;
        } else {
            temp.innerText = celciusToFahrenheit(today.temp);
        }
        //const today = data.currentConditions;

            //city
            currLoc.innerText = data.resolvedAddress;            


            //for fetch the bg image 
            setWeatherBackground(today.icon);
            //console.log(today.icon);

            //current icon
            currIcon.src =  setCurrentIcon(today.icon);


            //for  current conditions
            if(hourOrWeek="hourly"){
                updateWeatherData(data.days[0].hours,unit,"day")
            }
            else{
                updateWeatherData(data.days,unit,"week")
            } 


            //console.log(today.conditions);
            currentCondition.textContent = `${today.conditions}`
            //console.log(today.precip);
            percPer.textContent = `${today.precip}%`

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
        currentCity = location;
        fetchTodayWeather(currentCity,currUnit,hourOrWeek);
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
        if (icons === "partly-cloudy-day") {
            return "https://i.ibb.co/PZQXH8V/27.png";
        } else if (icons === "partly-cloudy-night") {
            return "https://i.ibb.co/Kzkk59k/15.png";
        } else if (icons === "rain") {
            return "https://i.ibb.co/kBd2NTS/39.png";
        } else if (icons === "clear-day") {
            return "https://i.ibb.co/rb4rrJL/26.png";
        } else if (icons === "clear-night") {
            return "https://i.ibb.co/1nxNGHL/10.png";
        }
    }


// for day week btn

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
            fetchTodayWeather(currentCity,currUnit,hourOrWeek)

        }
    }



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


    // change cel to far
    function celciusToFahrenheit(temp) {
        return ((temp * 9) / 5 + 32).toFixed(1);
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


    
// for temp cel far button
farBtn.addEventListener("click", () => {
    changeUnit("F");
});
celBtn.addEventListener("click", () => {
    changeUnit("C");
});


function changeUnit(unit){
    if(currUnit != unit){
        currUnit = unit;
        {
            tempUnit.forEach((ele) => {
                ele.innerText = `°${unit.toUpperCase()}`;
            });
            if(unit === "C"){
                cel.classList.add("active");
                farBtn.classList.remove("active");
            }else{
                cel.classList.remove("active");
                farBtn.classList.add("active");
            }
            fetchTodayWeather(currentCity, currUnit, hourOrWeek);
        }
    }
    
}



    