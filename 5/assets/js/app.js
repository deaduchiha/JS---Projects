import getWeatherData from "./utils/http-req.js";
import { removeModal, showModal } from "./utils/modal.js";

const DAYS = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const searchInput = document.querySelector("input");
const searchButton = document.querySelector("button");
const weatherContainer = document.getElementById("weather");
const locationIcon = document.getElementById("location");
const forecastContainer = document.getElementById("forecast");
const modalButton = document.getElementById("modal-button");

const renderCurrentWeather = (data) => {
  const { icon, main } = data.weather[0];
  const { country } = data.sys;
  const { name } = data;
  const { temp, humidity } = data.main;
  const { speed } = data.wind;

  const weatherJSX = `
    <h1>${name}, ${country}</h1>
    <div id="main">
        <img src="https://api.openweathermap.org/img/w/${icon}.png" alt="weather icon"/>
        <span>${main}</span>
        <p>${Math.round(temp)} °C</p>
    </div>
    <div id="info">
        <p>Humidity: <span>${humidity} %</span> </p>
        <p>Wind speed: <span>${speed} m/s</span> </p>
    </div>
  `;

  weatherContainer.innerHTML = weatherJSX;
};

const getWeakDay = (date) => {
  return new Date(date * 1000).getDay();
};

const renderForecastWeather = (data) => {
  forecastContainer.innerHTML = "";

  // check endsWith in google
  data = data.list.filter((obj) => obj.dt_txt.endsWith("12:00:00"));

  data.forEach((d) => {
    const forecastJSX = `
      <div>
        <img src="https://api.openweathermap.org/img/w/${
          d.weather[0].icon
        }.png" alt="weather icon"/>
        <h3>${DAYS[getWeakDay(d.dt)]}</h3>
        <p>${Math.round(d.main.temp)} °C</p>
        <span>${d.weather[0].main}</span>
      </div>
      `;

    forecastContainer.innerHTML += forecastJSX;
  });
};

const searchHandler = async () => {
  // this is for getting data from api
  const cityName = searchInput.value;

  if (!cityName) {
    showModal("please enter city name");
    return;
  }

  const currentData = await getWeatherData("current", cityName);
  renderCurrentWeather(currentData);

  const forecastData = await getWeatherData("forecast", cityName);
  renderForecastWeather(forecastData);
};

const locationHandler = () => {
  // search about -> how to get geolocation in JS -> using navigator
  const positionCallback = async (position) => {
    const { latitude, longitude } = position.coords;

    const currentData = await getWeatherData("current", {
      lat: latitude,
      lon: longitude,
    });
    renderCurrentWeather(currentData);

    const forecastData = await getWeatherData("forecast", {
      lat: latitude,
      lon: longitude,
    });
    renderForecastWeather(forecastData);
  };

  const errorCallback = (err) => {
    console.log(err);
  };

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(positionCallback, errorCallback);
  } else {
    alert("your browser not support geo location");
  }
};

searchButton.addEventListener("click", searchHandler);
locationIcon.addEventListener("click", locationHandler);
modalButton.addEventListener("click", () => removeModal());
