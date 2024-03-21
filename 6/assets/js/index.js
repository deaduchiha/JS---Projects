import { getCookie } from "./utils/cookie.js";
import { getData } from "./utils/http-req.js";

const loginButton = document.getElementById("login");
const dashboardButton = document.getElementById("dashboard");
const mainContainer = document.getElementById("products");
const searchButton = document.querySelector("button");
const inputBox = document.querySelector("input");
const listItems = document.querySelectorAll("li");

let allProducts = null;
let search = "";
let category = "all";

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

const filterProducts = () => {
  // let filterProducts = null;

  // if (search) {
  //   if (category === "all") {
  //     filterProducts = allProducts.filter((product) =>
  //       product.title.toLowerCase().includes(search)
  //     );
  //   } else {
  //     filterProducts = allProducts.filter(
  //       (product) =>
  //         product.title.toLowerCase().includes(search) &&
  //         product.category.toLowerCase() === category
  //     );
  //   }
  // } else {
  //   if (category === "all") {
  //     filterProducts = allProducts;
  //   } else {
  //     filterProducts.allProducts.filter(
  //       (product) => product.category.toLowerCase() === category
  //     );
  //   }
  // }

  // better way👇🏽
  const filterProducts = allProducts.filter((product) => {
    if (category === "all") {
      return product.title.toLowerCase().includes(search);
    } else {
      return (
        product.title.toLowerCase().includes(search) &&
        product.category.toLowerCase() === category
      );
    }
  });

  showProducts(filterProducts);
};

const searchHandler = () => {
  search = inputBox.value.trim().toLowerCase();

  filterProducts();
};

const filterHandler = (event) => {
  category = event.target.innerText.toLowerCase();

  listItems.forEach((li) => {
    if (li.innerText.toLowerCase() === category) {
      li.className = "selected";
    } else {
      li.className = "";
    }
  });

  filterProducts();
};

document.addEventListener("DOMContentLoaded", init);
searchButton.addEventListener("click", searchHandler);
listItems.forEach((li) => li.addEventListener("click", filterHandler));
