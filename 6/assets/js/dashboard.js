import authHandler from "./utils/authorization.js";
import { getData } from "./utils/http-req.js";

const mainContainer = document.getElementById("container");

const renderUsers = (users) => {
  mainContainer.innerHTML = "";
};

const init = async () => {
  authHandler();

  const users = await getData("users");
  renderUsers(users);
};

document.addEventListener("DOMContentLoaded", init);
