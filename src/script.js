let currentDate = document.querySelector("#current-date");

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];

let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];

let now = new Date();
let weekDay = days[now.getDay()];
let month = months[now.getMonth()];
let date = now.getDate();
let hour = now.getHours();
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
} else {
  minutes;
}

currentDate.innerHTML = `${weekDay}, ${month} ${date}, ${hour}:${minutes}`;

function showCurrentTemperature(response) {
  let currentTemperature = Math.round(response.data.main.temp);
  let temp = document.querySelector(".now-temp");
  temp.innerHTML = currentTemperature;
  let tempDescription = document.querySelector(".today-weather");
  tempDescription.innerHTML = response.data.weather[0].description;
  let maxTemp = document.querySelector(".max-temp");
  maxTemp.innerHTML = `${Math.round(response.data.main.temp_max)}ºC`;
  let minTemp = document.querySelector(".min-temp");
  minTemp.innerHTML = `${Math.round(response.data.main.temp_min)}ºC`;
  let wind = document.querySelector(".wind");
  wind.innerHTML = `${Math.round(response.data.wind.speed)} km/h`;
  let humidity = document.querySelector(".humidity");
  humidity.innerHTML = `${Math.round(response.data.main.humidity)}%`;
}

function changeCityName() {
  event.preventDefault();
  if (document.querySelector("#city-entered").value !== "") {
    let cityEntered = document.querySelector("#city-entered");
    cityEntered.trim();
    let cityHeading = document.querySelector("#city-heading");
    cityHeading.innerHTML = cityEntered.value;

    let apiKey = "bba30742206f6fc2ab4952eb606f9aba";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityEntered.value}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(showCurrentTemperature);
  } else {
    let h1 = document.querySelector("h1");
    h1.innerHTML = "Please enter a city";
  }
}

let form = document.querySelector("#city-form");
form.addEventListener("submit", changeCityName);
let goToButton = document.querySelector("#go-to-button");
goToButton.addEventListener("click", changeCityName);

function showCurrentPosition(response) {
  let cityHeading = document.querySelector("#city-heading");
  cityHeading.innerHTML = response.data.name;
  let currentTemperature = Math.round(response.data.main.temp);
  let temp = document.querySelector(".now-temp");
  temp.innerHTML = currentTemperature;
  let tempDescription = document.querySelector(".today-weather");
  tempDescription.innerHTML = response.data.weather[0].description;
  let maxTemp = document.querySelector(".max-temp");
  maxTemp.innerHTML = `${Math.round(response.data.main.temp_max)}ºC`;
  let minTemp = document.querySelector(".min-temp");
  minTemp.innerHTML = `${Math.round(response.data.main.temp_min)}ºC`;
  let wind = document.querySelector(".wind");
  wind.innerHTML = `${Math.round(response.data.wind.speed)} km/h`;
  let humidity = document.querySelector(".humidity");
  humidity.innerHTML = `${Math.round(response.data.main.humidity)}%`;
}

function showPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;

  let apiKey = "bba30742206f6fc2ab4952eb606f9aba";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showCurrentPosition);
}

function currentPosition() {
  navigator.geolocation.getCurrentPosition(showPosition);
}

let geoButton = document.querySelector("#location-button");
geoButton.addEventListener("click", currentPosition);
