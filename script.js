//--------------------------------------------------
// AUX METHODS
//--------------------------------------------------

/**
 * array with all the products.
 */
let information = {};

/**
 * Products in the cart.
 */
let cart = [];

/**
 * Defines that products are shown.
 */
let total = 0;

/**
 * Load information.
 */
fetch(
  "https://gist.githubusercontent.com/josejbocanegra/9a28c356416badb8f9173daf36d1460b/raw/5ea84b9d43ff494fcbf5c5186544a18b42812f09/restaurant.json"
)
  .then((response) => response.json())
  .then((data) => {
    information = {
      burgers: data[0].products,
      tacos: data[1].products,
      salads: data[2].products,
      desserts: data[3].products,
      drinksSlides: data[4].products,
    };
    loadMenu("burgers");
  });

//--------------------------------------------------
// AUX METHODS
//--------------------------------------------------
/**
 * Creates a row for the cart table.
 * @param {String} itemTxt num of the item.
 * @param {String} quantityTxt Quantity of the product.
 * @param {String} descriptionTxt Description of the product.
 * @param {String} priceTxt Unit price of the product.
 * @param {String} amountTxt Total value of the products.
 */
function addRowCart(itemTxt, quantityTxt, descriptionTxt, priceTxt, amountTxt) {
  let row = document.createElement("tr");
  let item = document.createElement("td");
  item.appendChild(document.createTextNode(itemTxt));
  row.appendChild(item);

  let quantity = document.createElement("td");
  quantity.appendChild(document.createTextNode(quantityTxt));
  row.appendChild(quantity);

  let description = document.createElement("td");
  description.appendChild(document.createTextNode(descriptionTxt));
  row.appendChild(description);

  let price = document.createElement("td");
  price.appendChild(document.createTextNode(priceTxt));
  row.appendChild(price);

  let amount = document.createElement("td");
  amount.appendChild(document.createTextNode(amountTxt));
  row.appendChild(amount);

  document.getElementsByTagName("tbody")[0].appendChild(row);
}

function loadMenu(category) {
  let productsList = information[category];
  document.getElementById("product").textContent = category;
  let products = document.getElementById("products");
  if (products.hidden) {
    toggleHidden("#products");
    toggleHidden("#orderDetail");
  }
  while (products.firstChild) {
    products.removeChild(products.firstChild);
  }

  for (let i = 0; i < productsList.length; i++) {
    let product = productsList[i];
    let container = document.createElement("div");
    container.className = "col-12 col-sm-6 col-lg-3";
    let card = document.createElement("div");
    card.className = "card";
    let img = document.createElement("img");
    img.src = product.image;
    img.alt = "Product image";
    img.className = "img-fluid";
    card.appendChild(img);

    let cardBody = document.createElement("div");
    cardBody.className = "card-body";
    let prodName = document.createElement("h3");
    prodName.className = "card-title";
    prodName.appendChild(document.createTextNode(product.name));
    cardBody.appendChild(prodName);

    let prodDescription = document.createElement("p");
    prodDescription.className = "card-text";
    prodDescription.appendChild(document.createTextNode(product.description));
    cardBody.appendChild(prodDescription);

    let prodPrice = document.createElement("h4");
    prodPrice.className = "card-title";
    prodPrice.appendChild(document.createTextNode(product.price));
    cardBody.appendChild(prodPrice);

    let button = document.createElement("button");
    button.type = "button";
    button.className = "btn btn-dark";
    button.appendChild(document.createTextNode("Add to cart"));
    button.setAttribute("onClick", "addToCart('" + category + "'," + i + ")");
    cardBody.appendChild(button);

    card.appendChild(cardBody);
    container.appendChild(card);
    products.appendChild(container);
  }
}

function addToCart(category, i) {
  let product = information[category][i];
  let pCart = cart.find((element) => element.product === product);

  if (pCart === undefined)
    cart.push({ product: product, quantity: 0, item: cart.length + 1 });

  pCart = cart.find((element) => element.product === product);
  pCart.quantity++;
  total += product.price;

  clearTable();
  document.getElementById("cart-items").textContent = cart.length + " items";
  document.getElementById("total").textContent = "Total: $" + total + " items";
  cart.forEach((element) => {
    let amount = element.product.price * element.quantity;
    addRowCart(
      element.item,
      element.quantity,
      element.product.description,
      element.product.price,
      amount
    );
  });
}

function cancelOrder() {
  cart = [];
  total = 0;
  clearTable();
}

function clearTable() {
  document.getElementById("cart-items").textContent = "0 items";
  document.getElementById("total").textContent = "Total: $" + 0 + " items";
  let tableBody = document.getElementsByTagName("tbody");
  tableBody[0].remove();
  let table = document.getElementById("table");
  table.appendChild(document.createElement("tbody"));
}

function confirmOrder() {
  console.log(cart);
  cancelOrder();
}

function cartButton() {
  document.getElementById("product").textContent = "Order detail";
  toggleHidden("#products");
  toggleHidden("#orderDetail");
}

function toggleHidden(selector) {
  element = document.querySelector(selector);
  element.hidden = element.hidden ? false : true;
}
