// first we create fetchData.js
import { fetchData } from "./utils/http-req.js";

const render = async () => {
  const productsData = await fetchData();
};
document.addEventListener("DOMContentLoaded", render);
// DOMContentLoaded vs Load?
// DOMContentLoaded=> load our function after html load
// Load=> load should all css and files load then running
