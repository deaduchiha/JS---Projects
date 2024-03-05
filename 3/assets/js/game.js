// we talked about BASE_URL, END POINT
// we have queries too -> what is queries?
// this is our API => https://opentdb.com/api.php?amount=10&difficulty=medium&type=multiple
// BASE_URL-> https://opentdb.com ---- end point -> /api.php ---- queries -> ?amount=10&difficulty=medium&type=multiple
const URL =
  "https://opentdb.com/api.php?amount=10&difficulty=medium&type=multiple";
let formattedData = null; // for having global variable of our data

const loader = document.getElementById("loader");
const container = document.getElementById("container");

const formatData = (questionData) => {
  const result = questionData.map((item) => {
    const questionObject = { question: item.question };
    const answers = [...item.incorrect_answers];
    const correctAnswerIndex = Math.floor(Math.random() * 4);
    // we create correctAnswerIndex to put our correct answer into the array index
    answers.splice(correctAnswerIndex, 0, item.correct_answer);
    // we said start from correctAnswerIndex delete 0 item and add correct answer
    questionObject.answers = answers;
    questionObject.correctAnswer = item.correct_answer;
    return questionObject;
  });
  return result;
};

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
