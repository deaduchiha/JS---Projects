import formatData from "./helper.js";
// we talked about BASE_URL, END POINT
// we have queries too -> what is queries?
// this is our API => https://opentdb.com/api.php?amount=10&difficulty=medium&type=multiple
// BASE_URL-> https://opentdb.com ---- end point -> /api.php ---- queries -> ?amount=10&difficulty=medium&type=multiple
const CORRECT_BONUS = 10;
const URL =
  "https://opentdb.com/api.php?amount=10&difficulty=medium&type=multiple";
let formattedData = null; // for having global variable of our data
let questionIndex = 0;
let correctAnswer = null; // we need it to apply correct answer in our function
let score = 0;
let isAccepted = true;

const loader = document.getElementById("loader");
const container = document.getElementById("container");
const questionText = document.getElementById("question-text");
const answerList = document.querySelectorAll(".answer-text");
const scoreText = document.getElementById("score");

const fetchData = async () => {
  try {
    const res = await fetch(URL);
    const data = await res.json();
    formattedData = formatData(data.results);
    start(); // we are calling start function to make loader none and show container
  } catch (error) {
    console.log("we have error: ", error);
  }
};

const start = () => {
  showQuestion();
  loader.style.display = "none";
  container.style.display = "block";
};

const showQuestion = () => {
  const { question, answers, correctAnswerIndex } =
    formattedData[questionIndex];

  correctAnswer = correctAnswerIndex;
  questionText.innerHTML = question;

  answerList.forEach((button, index) => {
    button.innerHTML = answers[index];
  });
};

const checkAnswer = (event, index) => {
  if (!isAccepted) return;
  isAccepted = false;

  const isCorrect = index === correctAnswer ? true : false;
  if (isCorrect) {
    event.target.classList.add("correct");
    score += CORRECT_BONUS;
    scoreText.innerHTML = score;
  } else {
    event.target.classList.add("incorrect");
    answerList[correctAnswer].classList.add("correct");
  }
};

window.addEventListener("load", fetchData);
answerList.forEach((button, index) => {
  button.addEventListener("click", (event) => checkAnswer(event, index));
});
