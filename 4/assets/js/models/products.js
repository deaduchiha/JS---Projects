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

    const img = this.productImg(data);
    const info = this.productInfo(data);

    cardElement.innerHTML = img; // we should do this to our div cause we are using return string in productImg()
    cardElement.innerHTML += info;

    this.parent.appendChild(cardElement);
  }

  // create img for product image
  productImg(data) {
    const { image, alt } = data;
    // const img = document.createElement("img");
    // img.src = image;
    // img.alt = alt;
    const imgJSX = `<img src=${image} alt=${alt}/>`; // better way

    return imgJSX;
    // cardElement.appendChild(img);
  }
  // create info for products information
  productInfo(data) {
    const { id, name, price } = data;
    // const info = document.createElement("div");
    // const productName = document.createElement("h3");
    // const control = document.createElement("div");
    // const price = document.createElement("span");
    // const button = document.createElement("button");
    // productName.innerText = data.name;
    // price.innerText = data.price;
    // button.innerText = "+";

    const infoJSX = `
        <div id="product-info">
            <h3>${name}</h3>
            <div>
                <span>${price}</span>
                <button data-id=${id}>+</button>
            </div>
        </div>
    `;

    return infoJSX;
  }
}

export default Products;
