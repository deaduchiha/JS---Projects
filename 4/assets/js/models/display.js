class Display {
  constructor(parent, products) {
    this.parent = parent;
    this.products = products;
    this.parent.addEventListener("click", this);
  }

  showProducts() {
    this.toShow = [...new Set(this.products)]; // remove duplicate items in our array
    this.parent.innerHTML = "";
    this.toShow.forEach((product) => {
      const quantity = this.products.filter((p) => p === product).length; // filter return us an array we just take the length here
      this.createCard(product, quantity); // we need product and quantity
    });

    this.calculateTotalPrice();
  }

  createCard(data, quantity) {
    const cardElement = document.createElement("div");
    const imgElement = this.productImg(data);
    const infoElement = this.productInfo(data);
    cardElement.innerHTML = imgElement;
    cardElement.innerHTML += infoElement;

    // console.dir(this.constructor); ==> check it
    if (this.constructor.name === "Cart") {
      const controlElement = this.productControl(data, quantity);
      cardElement.innerHTML += controlElement;
    }

    this.parent.appendChild(cardElement);
  }
}

export default Display;
