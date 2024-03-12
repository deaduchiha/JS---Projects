import Display from "./display.js";

class Cart extends Display {
  constructor(parent, price) {
    super(parent);
    this.price = price;
    this.products = [];
    this.toShow = [];
  }

  //   showProducts() {
  //     this.toShow = [...new Set(this.products)]; // remove duplicate items in our array
  //     this.parent.innerHTML = "";
  //     this.toShow.forEach((product) => {
  //       const quantity = this.products.filter((p) => p === product).length; // filter return us an array we just take the length here
  //       this.createCard(product, quantity); // we need product and quantity
  //     });

  //     this.calculateTotalPrice();
  //   }

  //   createCard(data, quantity) {
  //     const cardElement = document.createElement("div");
  //     const imgElement = this.productImg(data);
  //     const infoElement = this.productInfo(data);
  //     const controlElement = this.productControl(data, quantity);

  //     cardElement.innerHTML = imgElement;
  //     cardElement.innerHTML += infoElement;
  //     cardElement.innerHTML += controlElement;

  //     this.parent.appendChild(cardElement);
  //   }
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

  handleEvent(event) {
    const tagName = event.target.tagName;
    const id = event.target.dataset.id;
    const type = event.target.innerText; // for getting => remove, +, -

    if (tagName !== "BUTTON") return;

    switch (type) {
      case "+":
        this.increase(id);
        break;
      case "-":
        this.decrease(id);
        break;
      case "remove":
        this.remove(id);
        break;
    }
  }

  increase(id) {
    const product = this.products.find((p) => p.id === +id);
    this.products.push(product);
    this.showProducts();
  }
  decrease(id) {
    const index = this.products.findIndex((p) => p.id === +id);
    this.products.splice(index, 1); // اینجا میاد اولین محصول رو پیدا میکنه و اونو حذف میکنه
    this.showProducts();
  }
  remove(id) {
    const newProducts = this.products.filter((p) => p.id !== +id);
    this.products = newProducts;
    this.showProducts();
  }

  calculateTotalPrice() {
    const total = this.products.reduce(
      (accumulator, currentItem) => (accumulator += currentItem.price),
      0
    );
    this.price.innerText = `$ ${total}`;
  }
}

export default Cart;
