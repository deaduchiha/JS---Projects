const searchInput = document.getElementById("search-input");
const products = document.querySelectorAll(".product-item");
const buttons = document.querySelectorAll(".filter");

const priceButton = document
  .getElementById("search-price")
  .querySelector("button");

// const priceButton = priceDiv.querySelector("button");

const searchHandler = (e) => {
  // to lowerCase + trim()=> delete first and last spaces

  const searchValue = e.target.value.toLowerCase().trim();

  //   we used forEach cause products is node list and we cant use MAP for it
  products.forEach((product) => {
    const productName = product.children[1].innerText.toLowerCase();

    if (productName.includes(searchValue)) {
      product.style.display = "block";
    } else {
      product.style.display = "none";
    }
  });
};

// check after each time client click on keyboard
searchInput.addEventListener("keyup", searchHandler);

// - - - - - - - -s

const changeClass = (filter) => {
  buttons.forEach((button) => {
    if (button.dataset.filter === filter) {
      button.classList.add("selected");
    } else {
      button.classList.remove("selected");
    }
  });
};

const filterHandler = (event) => {
  const { filter } = event.target.dataset;
  changeClass(filter);

  products.forEach((product) => {
    const { category } = product.dataset;
    if (filter === "all") {
      product.style.display = "block";
    } else {
      filter === category
        ? (product.style.display = "block")
        : (product.style.display = "none");
    }
  });
};

buttons.forEach((btn) => btn.addEventListener("click", filterHandler));

// - - - - - - - -

const searchPriceHandler = (event) => {
  const searchPrice = +event.target.parentElement.children[0].value;
  products.forEach((product) => {
    const price = +product.children[2].innerText;

    if (!searchPrice) {
      product.style.display = "block";
    } else {
      searchPrice === price
        ? (product.style.display = "block")
        : (product.style.display = "none");
    }
  });
};

priceButton.addEventListener("click", searchPriceHandler);

// - - - - - - - -

window.addEventListener("load");
