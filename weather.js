const select = document.querySelector("select");
const para = document.querySelector("p");
const background = document.querySelector(".container");
const hrs = document.querySelector(".hrs");
const mints = document.querySelector(".mints");
const sec = document.querySelector(".sec");
const messege = document.querySelector(".messege");
const city = document.querySelector("#searchcity");
const btn = document.querySelector("#searchbtn");
const cityInfo = document.querySelector("#cityinfo");
const humidityInfo = document.querySelector("#humidity");
const errorInfo = document.querySelector("#errormessege")

function getCapitalizedString(value){
  const fristLetter = value.charAt(0).toUpperCase();
  const secondPart = value.slice(1);
  return fristLetter + secondPart;
}


async function updateWeatherDetails() {
  let cityName = city.value;
  console.log("currentValue", cityName);
  
  if (cityName != ""){
    const weatherData = await fetchWeather(cityName);
    if (weatherData.cod == "200"){
      console.log("weather data", weatherData.main.humidity);
      cityInfo.innerHTML = `Weather in ${getCapitalizedString(cityName)}`;
      humidityInfo.innerHTML = `Humidity: ${weatherData.main.humidity}%`;
    } else {
      errorInfo.style.display = "block";
      errorInfo.innerHTML = weatherData.message;
    }
  }
}

btn.addEventListener("click", updateWeatherDetails);




function setWeather() {
    const choice = select.value;
    console.log("currentValue", choice);
    
    if (choice === "sunny") {

        para.textContent = "it is nice and sunny outside today. Wear shorts! Go to the beach, or the park, and get an ice cream.";
        background.style.background ="url(https://img.freepik.com/premium-vector/cloudscape-blue-sky-with-clouds-sun-paper-art-style_501557-72.jpg?w=1060)";
    }else if (choice === "rainy") {
        para.textContent =
        "Rain is falling outside; take a rain coat and an umbrella, and don't stay out for too long.";
        background.style.background ="url(https://img.freepik.com/free-vector/realistic-background-monsoon-season_23-2150428848.jpg?w=1380&t=st=1689322929~exp=1689323529~hmac=f1dadf419b6ba8dd45202745fd3e1053675d69be08f45c70ceed83a0d9a28a4b)";
    } else if (choice === "snowing") {
        para.textContent =
          "The snow is coming down — it is freezing! Best to stay in with a cup of hot chocolate, or go build a snowman.";
          background.style.background ="url(https://img.freepik.com/free-photo/frozen-branches-leaves-snow_23-2148441322.jpg?w=740&t=st=1689333725~exp=1689334325~hmac=fd103ad117b6ee44967ecc432c186d99d52f4322f8c339335e16b11d29a09369)";
      } else if (choice === "overcast") {
        para.textContent =
          "It isn't raining, but the sky is grey and gloomy; it could turn any minute, so take a rain coat just in case.";
          background.style.background ="url(https://img.freepik.com/free-photo/streetlights-cloudy-day_23-2148098648.jpg?w=1380&t=st=1689333309~exp=1689333909~hmac=606aced9065ef69471bc2c8b66e837ac16716d72904b04e38e5a22fc7c4169b4)";
      }else {
        para.textContent = "";
        background.style.background ="";
      }
    }

    select.addEventListener("change", setWeather);

    setInterval(()=> {

        let currentTime = new Date();

        // let currentHour = currentTime.getHours();
        let currentHour = currentTime.getHours();
        // console.log(currentHour);

        if (currentHour < 12) {
          messege.innerHTML = "Good Morning"
        } else if (currentHour >= 12 && currentHour < 16){
          messege.innerHTML = "Good Afternoon"
          // console.log(currentHour)
        } else if (currentHour >= 16 && currentHour < 19){
          messege.innerHTML = "Good Evening"
        } else {
          messege.innerHTML = "Good Night"
        }


            // console.log(currentTime.getHours());  // for getting exect time 
            // console.log(currentTime.getMinutes());
            // console.log(currentTime.getSeconds());

        hrs.innerHTML = currentTime.getHours();
        mints.innerHTML = currentTime.getMinutes();
        sec.innerHTML = currentTime.getSeconds();
      
  });  

  
  let weather = {
    "apikey": "994dc86781c66a4dbad56161ca0d0dba",
     Weather: function () {
      fetch(
        " https://api.openweathermap.org/data/2.5/weather?q=units=metric&appid=994dc86781c66a4dbad56161ca0d0dba"
      )
        .then((response) => response.json())
        .then((data) => console.log(data));
    },
  };

async function fetchWeather(cityName){
  const apiKey = "994dc86781c66a4dbad56161ca0d0dba";
  const resp = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`)
    .then((response) => response.json())
    .then((data) => data)
    .catch((err)=> console.error("something went wrong", err));
  console.log("api response", resp);
  return resp;
}
