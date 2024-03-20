import { getCookie } from "./utils/cookie.js";

const init = () => {
  const cookie = getCookie();

  if (!cookie) location.assign("auth.html");
};

document.addEventListener("DOMContentLoaded", init);
