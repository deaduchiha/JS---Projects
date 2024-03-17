const BASE_URL = `https://api.openweathermap.org/data/2.5/`;
const API_KEY = "57a07b2cfdca2958e6d176fb7c835c8b"; // its not safe we should handle it on server side or .ENV

const getWeatherData = async (type, data) => {
  let url = null;

  switch (type) {
    case "current":
      if (typeof data === "string") {
        url = `${BASE_URL}/weather?q=${data}&appid=${API_KEY}&units=metric`;
      } else {
        url = `${BASE_URL}/weather?lat=${data.lat}&lon=${data.lon}&appid=${API_KEY}&units=metric`;
      }
      break;

    case "forecast":
      if (typeof data === "string") {
        url = `${BASE_URL}/forecast?q=${data}&appid=${API_KEY}&units=metric`;
      } else {
        url = `${BASE_URL}/forecast?lat=${data.lat}&lon=${data.lon}&appid=${API_KEY}&units=metric`;
      }
      break;
  }

  try {
    const res = await fetch(url);
    const json = await res.json();

    console.log();

    if (+json.code === 200) {
      return json;
    } else {
      console.log(json.message);
    }
  } catch (error) {
    console.log(error);
  }
};

export default getWeatherData;
