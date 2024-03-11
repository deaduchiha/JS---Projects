class Products {
  constructor(parent, products) {
    this.parent = parent;
    this.products = products;
  }

  // [1] this method for getting our products and mapping on them
  showProducts() {
    this.products.forEach((product) => this.createCard(product));
  }
  // [2] this method for create our products card
  createCard(data) {
    // create a div for our product
    const cardElement = document.createElement("div");
    // create img for product image
    const img = document.createElement("img");
    img.src = data.image;
    img.alt = data.alt;

    // create info for products information
    const info = document.createElement("div");
    const productName = document.createElement("h3");
    const control = document.createElement("div");
    const price = document.createElement("span");
    const button = document.createElement("button");
    productName.innerText = data.name;
    price.innerText = data.price;
    button.innerText = "+";

    // append our product details
    control.append(price, button);
    info.append(productName, control);

    cardElement.append(img, info);
    this.parent.appendChild(cardElement, info);
  }
}

export default Products;
