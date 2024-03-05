// we talked about BASE_URL, END POINT
// we have queries too -> what is queries?
// this is our API => https://opentdb.com/api.php?amount=10&difficulty=medium&type=multiple
// BASE_URL-> https://opentdb.com ---- end point -> /api.php ---- queries -> ?amount=10&difficulty=medium&type=multiple
const URL =
  "https://opentdb.com/api.php?amount=10&difficulty=medium&type=multiple";

const fetchData = async () => {
  const res = await fetch(URL);
  const data = await res.json();
  console.log(data);
};

window.addEventListener("load", fetchData);
