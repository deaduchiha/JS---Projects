// FIRST: what are  tokens? -> unique strings of characters used for authentication and authorization purposes in web applications.
// we can use as identifier for our user => tokens are unique
// each user send request to server and server generate unique token for each user -> tokens are different
// for each CRUD from client server can know that which token is requesting => میتونیم بفهمیم فرستنده کیه

import { postData } from "./utils/http-req.js";
import { setCookie } from "./utils/cookie.js";
import authHandler from "./utils/authorization.js";

// SECOND: what is JWT(json web token)? -> we can share our secret data as ENCODED JSON between server and data
// Performs an encryption operation that we cannot understand what it is, and only the backend knows it

// THIRD: what is the difference between authentication and authorization?
// Authentication is the process of verifying the identity of a user, ensuring they are who they claim to be.
// Authorization, on the other hand, determines what a user is allowed to do after successful authentication. -> we can set access for each user
// FOURTH: why are both important in web applications?
// Both authentication and authorization are crucial in web applications to ensure security and privacy.
// Authentication prevents unauthorized access, while authorization controls what authenticated users can do.

const inputs = document.querySelectorAll("input");
const button = document.querySelector("button");

const submitHandler = async (event) => {
  event.preventDefault();

  const username = inputs[0].value;
  const password = inputs[1].value;

  const response = await postData("auth/login", {
    username,
    password,
  });

  setCookie(response.token);

  location.assign("index.html");
};

button.addEventListener("click", submitHandler);
document.addEventListener("DOMContentLoaded", authHandler);
