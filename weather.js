
const hrs = document.querySelector(".hrs");
const mints = document.querySelector(".mints");
const sec = document.querySelector(".sec");
const messege = document.querySelector(".messege");
const city = document.querySelector("#searchcity");
const btn = document.querySelector("#searchbtn");
const cityInfo = document.querySelector("#cityinfo");
const humidityInfo = document.querySelector("#humidity");
const errorInfo = document.querySelector("#errormessege");
const windInfo = document.querySelector("#wind");
const temperatureInfo = document.querySelector("#temperature");
// const weatherIcon = document.querySelector("#weathericon");
const descriptionInfo = document.querySelector("#description")

function getCapitalizedString(value){
  const fristLetter = value.charAt(0).toUpperCase();
  const secondPart = value.slice(1);
  return fristLetter + secondPart;
}

function fahrenheitToCelsius(fahrenheit){
  let celsius = (fahrenheit - 32) * (5/9);
  return celsius;
}

let  dateAndTime = new Date();
let date = dateAndTime.getDate() + '/' + (dateAndTime.getMonth() + 1) + '/' + dateAndTime.getFullYear();

console.log(dateAndTime);
document.querySelector("#date").innerHTML = date;

async function updateWeatherDetails() {
  let cityName = city.value;
  console.log("currentValue", cityName);
  
  if (cityName != ""){
    const weatherData = await fetchWeather(cityName);
    if (weatherData.cod == "200"){
      console.log("weather data", weatherData.main.humidity);
      console.log("weather data", weatherData.wind.speed);
      console.log("weather data", weatherData.main.temp);
      // console.log("weather data", weatherData.weather[1].icon);
      console.log("weather data", weatherData.weather[0].description);
      cityInfo.innerHTML = ` ${getCapitalizedString(cityName)}`;
      humidityInfo.innerHTML = `${weatherData.main.humidity}% Humidity`;
      windInfo.innerHTML = `${weatherData.wind.speed}km/h wind`;
      temperatureInfo.innerHTML = `${(weatherData.main.temp)}°C`;
      // weatherIcon.innerHTML = `${weatherData.weather[1].icon}`;
      descriptionInfo.innerHTML = `${weatherData.weather[0].description}`;
    } else {
      errorInfo.style.display = "block";
      errorInfo.innerHTML = weatherData.message;
    }
  }
}

btn.addEventListener("click", updateWeatherDetails);




function setWeather() {

}
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
  const resp = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`)
    .then((response) => response.json())
    .then((data) => data)
    .catch((err)=> console.error("something went wrong", err));
  console.log("api response", resp);
  return resp;
}
