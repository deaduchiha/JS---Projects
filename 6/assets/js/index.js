import { getCookie } from "./utils/cookie.js";
import { getData } from "./utils/http-req.js";

const loginButton = document.getElementById("login");
const dashboardButton = document.getElementById("dashboard");
const mainContainer = document.getElementById("products");
const searchButton = document.querySelector("button");
const inputBox = document.querySelector("input");

let allProducts = null;

const shortenText = (text) => {
  return text.split(" ").slice(0, 3).join(" ");
};

const showProducts = (products) => {
  mainContainer.innerHTML = "";

  products.forEach((product) => {
    const jsx = `
        <div>
            <img alt="${shortenText(product.title)}" src="${product.image}" />
            
            <h4>${shortenText(product.title)}</h4>

            <div id="price">
                <p>$ ${product.price}</p>
                <button>
                  Buy
                  <i class="fa-solid fa-cart-shopping"></i>
                </button>
            </div>

            <div id="rate">
              <i class="fa-solid fa-star"></i>
              <span>${product.rating.rate}</span>
            </div>

            <div id="count">
              <i class="fa-solid fa-user"></i>
              <span>${product.rating.count}</span>
            </div>
        </div>
    `;

    mainContainer.innerHTML += jsx;
  });
};

const init = async () => {
  const cookie = getCookie();

  if (cookie) {
    loginButton.style.display = "none";
  } else {
    dashboardButton.style.display = "none";
  }

  allProducts = await getData("products");
  showProducts(allProducts);
};

const searchHandler = () => {
  const query = inputBox.value.trim().toLowerCase();

  if (!query) showProducts(allProducts);

  const filterProducts = allProducts.filter((product) =>
    product.title.toLowerCase().includes(query)
  );

  showProducts(filterProducts);
};

document.addEventListener("DOMContentLoaded", init);
searchButton.addEventListener("click", searchHandler);
