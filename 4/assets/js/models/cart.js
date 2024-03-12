class Cart {
  constructor(parent, price) {
    this.parent = parent;
    this.price = price;
    this.products = [];
    this.toShow = [];
  }

  showProducts() {
    this.toShow = [...new Set(this.products)]; // remove duplicate items in our array
    this.parent.innerHTML = "";
    this.toShow.forEach((product) => {
      const quantity = this.products.filter((p) => p === product).length; // filter return us an array we just take the length here
      this.createCard(product, quantity); // we need product and quantity
    });
  }

  createCard(data, quantity) {
    const cardElement = document.createElement("div");
    const imgElement = this.productImg(data);
    const infoElement = this.productInfo(data);
    const controlElement = this.productControl(data, quantity);

    cardElement.innerHTML = imgElement;
    cardElement.innerHTML += infoElement;
    cardElement.innerHTML += controlElement;

    this.parent.appendChild(cardElement);
  }
  productImg(data) {
    const { image, alt } = data;
    const imgJSX = `<img src=${image} alt=${alt}/>`;
    return imgJSX;
  }
  productInfo(data) {
    const { name, price } = data;

    const infoJSX = `
        <div id="cart-info">
            <h4>${name}</h4>
            <p>${price}</p>
        </div>
    `;
    return infoJSX;
  }
  productControl(data, quantity) {
    const { id } = data;
    const controlJSX = `
        <div id="cart-control">
            <div>
                <button data-id=${id}>-</button>
                <span>${quantity}</span>
                <button data-id=${id}>+</button>
                </div>
            <button data-id=${id}>remove</button>
        </div>
    `;

    return controlJSX;
  }
}

export default Cart;
