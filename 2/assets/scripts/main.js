const taskInput = document.getElementById("task-input");
const dateInput = document.getElementById("date-input");
const addButton = document.getElementById("add-button");
const alertMessage = document.getElementById("alert-message");

// 2: for push object in here
const todos = [];

// 4: for generate id
const generateId = () => {
  return Math.round(
    Math.random() * Math.random() * Math.pow(10, 15)
  ).toString(); // we can generate any id its just example
};

// 3 alert message
const showAlert = (message, type) => {
  // why we write this ?
  alertMessage.innerHTML = "";

  const alert = document.createElement("p");
  alert.innerText = message;
  alert.classList.add("alert");
  alert.classList.add(`alert-${type}`); // alert-error , alert-success

  alertMessage.append(alert);

  setTimeout(() => {
    alert.style.display = "none";
  }, 1500);
};

// 1:
const addHandler = () => {
  const task = taskInput.value;
  const date = dateInput.value;

  // ECM6
  const todo = {
    id: generateId(),
    task,
    date,
    completed: false,
  };

  if (task) {
    todos.push(todo);

    // explain why we do this
    taskInput.value = "";
    dateInput.value = "";

    showAlert("todo added successfully", "success");
    console.log(todos);
  } else {
    showAlert("please enter todo", "error");
  }
};

addButton.addEventListener("click", addHandler);
