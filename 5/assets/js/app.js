const BASE_URL = `https://api.openweathermap.org/data/2.5/`;
const API_KEY = "57a07b2cfdca2958e6d176fb7c835c8b";

const searchInput = document.querySelector("input");
const searchButton = document.querySelector("button");

const getCurrentWeatherByName = async (city) => {
  const url = `${BASE_URL}/weather?q=${city}&appid=${API_KEY}&units=metric`;
  // describe this
  const res = await fetch(url);
  const data = await res.json();
  return data;
};

const searchHandler = async () => {
  // this is for getting data from api
  const cityName = searchInput.value;

  if (!cityName) alert("Please enter your city name.");

  const currentData = await getCurrentWeatherByName(cityName);
  console.log(currentData);
};

searchButton.addEventListener("click", searchHandler);
