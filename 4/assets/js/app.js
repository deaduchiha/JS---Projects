import { fetchData } from "./utils/http-req.js";
import Products from "./models/products.js";

const productsNode = document.getElementById("products");

const render = async () => {
  const productsData = await fetchData();
  const productsInstance = new Products(productsNode, productsData);
  console.log(productsInstance);
};
document.addEventListener("DOMContentLoaded", render);
// DOMContentLoaded vs Load?
// DOMContentLoaded=> load our function after html load
// Load=> load should all css and files load then running
