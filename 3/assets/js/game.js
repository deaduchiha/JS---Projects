import formatData from "./helper.js";
// we talked about BASE_URL, END POINT
// we have queries too -> what is queries?
// this is our API => https://opentdb.com/api.php?amount=10&difficulty=medium&type=multiple
// BASE_URL-> https://opentdb.com ---- end point -> /api.php ---- queries -> ?amount=10&difficulty=medium&type=multiple
const URL =
  "https://opentdb.com/api.php?amount=10&difficulty=medium&type=multiple";
let formattedData = null; // for having global variable of our data

const loader = document.getElementById("loader");
const container = document.getElementById("container");

const fetchData = async () => {
  try {
    const res = await fetch(URL);
    const data = await res.json();
    formattedData = formatData(data.results);
    start(); // we are calling start function to make loader none and show container
  } catch (error) {
    console.log(error);
  }
};

const start = () => {
  loader.style.display = "none";
  container.style.display = "block";
};

window.addEventListener("load", fetchData);
