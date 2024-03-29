const taskInput = document.getElementById("task-input");
const dateInput = document.getElementById("date-input");
const addButton = document.getElementById("add-button");
const alertMessage = document.getElementById("alert-message");
const todosBody = document.querySelector("tbody");
const deleteAllButton = document.getElementById("delete-all-button");
const editButton = document.getElementById("edit-button");
const filterButtons = document.querySelectorAll(".filter-todos");

// 2: for push object in here
// const todos = []
// const todos = JSON.parse(localStorage.getItem("todos")); // its have ERROR for first time we cant do this
let todos = JSON.parse(localStorage.getItem("todos")) || []; // its have ERROR for first time we cant do this
console.log(todos);

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

// 5
const saveToLocalStorage = () => {
  localStorage.setItem("todos", JSON.stringify(todos));
};

// 6
// we set data for display when filtering todos
const displayTodos = (data) => {
  const todoList = data ? data : todos;

  // we should add this comment below line to check what happened
  todosBody.innerHTML = "";
  // todos.length === 0 => its not professional
  // change todos to todoList
  if (!todoList.length) {
    todosBody.innerHTML = `
    <tr>
      <td colspan="4  ">no task found</td>
    </tr>`;
    return;
  }

  // change todos to todoList
  todoList.forEach((todo) => {
    todosBody.innerHTML += `
      <tr>
        <td>${todo.task}</td>
        <td>${todo.date || "no date"}</td>
        <td>${todo.completed ? "completed" : "pending"}</td>
        <td>
          <button onclick="editHandler(${todo.id})">edit</button>
          <button onclick="toggleHandler('${todo.id}')" >${
      todo.completed ? "undo" : "do"
    }</button>
          <button onclick="deleteHandler('${todo.id}')" >delete</button>
        </td>
      </tr>
    `;
  });
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
    saveToLocalStorage(); // its for 5
    displayTodos();

    // explain why we do this
    taskInput.value = "";
    dateInput.value = "";

    showAlert("todo added successfully", "success");
    console.log(todos);
  } else {
    showAlert("please enter todo", "error");
  }
};

const deleteAllHandler = () => {
  if (todos.length) {
    todos = [];
    saveToLocalStorage();
    displayTodos();
    showAlert("all todos clear successfully", "success");
  } else {
    showAlert("no todos for clear", "error");
  }
};
deleteAllButton.addEventListener("click", deleteAllHandler);

const deleteHandler = (id) => {
  const newTodos = todos.filter((todo) => todo.id !== id);
  todos = newTodos;
  saveToLocalStorage();
  displayTodos();
  showAlert("todo deleted", "success");
};

// references types
const toggleHandler = (id) => {
  console.log(id);
  // first way and long way

  // const newTodos = todos.map((todo) => {
  //   if (todo.id === id) {
  //     // return {
  //     //   id: todo.id,
  //     //   task: todo.task,
  //     //   date: todo.date,
  //     //   completed: !todo.completed,
  //     // };

  //     // we can use this way instead of upper
  //     return {
  //       ...todo,
  //       completed: !todo.completed,
  //     };
  //   } else {
  //     return todo;
  //   }
  // });
  // todos = newTodos;
  //  --------------------

  // second way and better way
  const todo = todos.find((todo) => todo.id === id);
  todo.completed = !todo.completed;

  saveToLocalStorage();
  displayTodos();
  showAlert("todo status changed.", "success");
  // console.log(newTodos);
};

const editHandler = (id) => {
  const todo = todos.find((todo) => +todo.id === +id);

  taskInput.value = todo.task;
  dateInput.value = todo.date;

  addButton.style.display = "none";
  editButton.style.display = "inline-block";

  editButton.dataset.id = id;
};

const applyEditHandler = (event) => {
  const { id } = event.target.dataset;
  const todo = todos.find((todo) => todo.id === id);

  todo.task = taskInput.value;
  todo.date = dateInput.value;

  taskInput.value = "";
  dateInput.value = "";

  addButton.style.display = "inline-block";
  editButton.style.display = "none";

  saveToLocalStorage();
  displayTodos();
  showAlert("todo edited.", "success");
};

const filterHandler = (event) => {
  let filteredTodos = null; // don't let a variable be undefined null is better
  const { filter } = event.target.dataset;

  switch (filter) {
    case "pending":
      filteredTodos = todos.filter((todo) => todo.completed === false);
      break;

    case "completed":
      filteredTodos = todos.filter((todo) => todo.completed === true);
      break;

    default:
      filteredTodos = todos;
      break;
  }
  displayTodos(filteredTodos);
  // console.log(filteredTodos);
};

filterButtons.forEach((button) => {
  button.addEventListener("click", filterHandler);
});

addButton.addEventListener("click", addHandler);
editButton.addEventListener("click", applyEditHandler);
window.addEventListener("load", displayTodos()); // 7
