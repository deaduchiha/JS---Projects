const BASE_URL = `https://api.openweathermap.org/data/2.5/`;
const API_KEY = "57a07b2cfdca2958e6d176fb7c835c8b";

const searchInput = document.querySelector("input");
const searchButton = document.querySelector("button");
const weatherContainer = document.getElementById("weather");

const getCurrentWeatherByName = async (city) => {
  const url = `${BASE_URL}/weather?q=${city}&appid=${API_KEY}&units=metric`;
  // describe this
  const res = await fetch(url);
  const data = await res.json();
  return data;
};

const renderCurrentWeather = (data) => {
  console.log(data);
  const { icon, main } = data.weather[0];
  const { country } = data.sys;
  const { name } = data;
  const { temp, humidity } = data.main;
  const { speed } = data.wind;

  const weatherJSX = `
    <h1>${name}, ${country}</h1>
    <div>
        <img src="https://api.openweathermap.org/img/w/${icon}.png" alt="weather icon"/>
        <span>${main}</span>
        <p>${Math.round(temp)} °C</p>
    </div>
    <div>
        <p>Humidity: <span>${humidity} %</span> </p>
        <p>Wind speed: <span>${speed} m/s</span> </p>
    </div>
  `;

  weatherContainer.innerHTML = weatherJSX;
};

const searchHandler = async () => {
  // this is for getting data from api
  const cityName = searchInput.value;

  if (!cityName) alert("Please enter your city name.");

  const currentData = await getCurrentWeatherByName(cityName);
  renderCurrentWeather(currentData);
};

searchButton.addEventListener("click", searchHandler);
