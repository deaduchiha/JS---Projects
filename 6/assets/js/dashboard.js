import authHandler from "./utils/authorization.js";
import { getData } from "./utils/http-req.js";

const mainContainer = document.getElementById("container");

const renderUsers = (users) => {
  mainContainer.innerHTML = "";

  users.forEach((user) => {
    const jsx = `
        <div id="card">
            <h3>${user.id}</h3>

            <div>
                <p> <i class="fa-solid fa-user"></i> Name: </p>
                <span>${user.name.firstname} ${user.name.lastname}</span>
            </div>

            <div>
                <p> <i class="fa-solid fa-paperclip"></i> username: </p>
                <span>${user.username}</span>
            </div>

            <div>
                <p> <i class="fa-solid fa-envelope"></i> email: </p>
                <span>${user.email}</span>
            </div>

            <div>
                <p> <i class="fa-solid fa-phone"></i> phone: </p>
                <span>${user.phone}</span>
            </div>

            <div>
                <p> <i class="fa-solid fa-location-dot"></i> address: </p>
                <span>${user.address.city} - ${user.address.street} - ${user.address.zipcode}</span>
            </div>
        </div>
    `;
    mainContainer.innerHTML += jsx;
  });
};

const init = async () => {
  authHandler();

  const users = await getData("users");
  renderUsers(users);
};

document.addEventListener("DOMContentLoaded", init);
