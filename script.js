let now = new Date();
let hours = now.getHours();
let minutes = now.getMinutes();
let day = now.getDay();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let currentDate = document.querySelector("#current-date");
currentDate.innerHTML = `${days[now.getDay()]}`;
let time = document.querySelector("#current-time");
time.innerHTML = `${hours}:${minutes}`;

function searchCity(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-input");
  let currentCity = document.querySelector("#current-city");
  currentCity.innerHTML = `${searchInput.value}`;
  let apiKey = "c95d60a1e3adbeb286133f1ebebc2579";
  let unit = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchInput.value}&appid=${apiKey}&units=${unit}`;

  axios.get(apiUrl).then(showTemperature);
}

let form = document.querySelector("#search-city");
form.addEventListener("submit", searchCity);

function showTemperature(response) {
  let city = response.data.name;
  let currentCity = document.querySelector("#current-city");
  currentCity.innerHTML = city;
  let currentTemperature = Math.round(response.data.main.temp);
  let showTemperature = document.querySelector("#current-temperature");
  showTemperature.innerHTML = `${currentTemperature}°C`;
  let currentHumidity = Math.round(response.data.main.humidity);
  let showHumidity = document.querySelector("#current-humidity");
  showHumidity.innerHTML = `${currentHumidity}%`;
  let currentWind = Math.round(response.data.wind.speed);
  let showWind = document.querySelector("#current-wind");
  showWind.innerHTML = `${currentWind}km/h`;
  let description = response.data.weather[0].description;
  let showDescription = document.querySelector("#description");
  showDescription.innerHTML = description;
}

function showPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "c95d60a1e3adbeb286133f1ebebc2579";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showTemperature);
}
function getCurrentPosition(event) {
  navigator.geolocation.getCurrentPosition(showPosition);
}
let currentButton = document.querySelector("#current-button");
currentButton.addEventListener("click", getCurrentPosition);
