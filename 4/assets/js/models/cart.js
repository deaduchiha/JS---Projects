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
    console.log(data);
  }
}

export default Cart;
