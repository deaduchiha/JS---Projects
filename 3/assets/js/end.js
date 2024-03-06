const score = localStorage.getItem("score");
const scoreEle = document.querySelector("p");
const button = document.querySelector("button");
const input = document.querySelector("input");
scoreEle.innerText = score;

const highScores = JSON.parse(localStorage.getItem("highScores")) || [];

const saveHandler = () => {
  if (!input.value || !score) {
    alert("Invalid username or score");
  } else {
    const finalScore = {
      name: input.value,
      score,
    };

    highScores.push(finalScore);
    highScores.sort((a, b) => b.score - a.score);
    localStorage.setItem("highScores", JSON.stringify(highScores));
    localStorage.removeItem("scores");
    window.location.assign("index.html");
  }
};

button.addEventListener("click", saveHandler);
