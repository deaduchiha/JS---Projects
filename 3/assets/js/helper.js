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

export default formatData;
