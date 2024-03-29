import { fetchData } from "./utils/http-req.js";
import Products from "./models/products.js";
import Cart from "./models/cart.js";

const productsNode = document.getElementById("products");
const cartListNode = document.getElementById("cart-list");
const totalPriceNode = document
  .getElementById("total-price")
  .querySelector("span");

const render = async () => {
  const productsData = await fetchData();

  const cartInstance = new Cart(cartListNode, totalPriceNode);

  const productsInstance = new Products(
    productsNode,
    productsData,
    cartInstance
  );
  productsInstance.showProducts();
};
document.addEventListener("DOMContentLoaded", render);
// DOMContentLoaded vs Load?
// DOMContentLoaded=> load our function after html load
// Load=> load should all css and files load then running
