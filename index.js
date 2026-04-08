import { menuArray } from "./data.js";
let orderedItems = [];
const checkout = document.getElementById("checkout");

document.addEventListener("click", (e) => {
  if (e.target.dataset.addItem) {
    orderObjNum(e.target.dataset.addItem);
  }
});

const menu = (array = []) => {
  const fragment = document.createDocumentFragment();
  array.forEach(({ name, ingredients, price, emoji, id }) => {
    const wrapDiv = document.createElement("div");
    wrapDiv.className = "wrap";

    const flexDiv = document.createElement("div");
    flexDiv.className = "flex";

    const emojiP = document.createElement("p");
    emojiP.className = "item-emoji";
    emojiP.textContent = emoji;

    const infoDiv = document.createElement("div");

    const h2 = document.createElement("h2");
    h2.textContent = name;

    const descP = document.createElement("p");
    descP.className = "item-description";
    descP.textContent = ingredients.join(", ");

    const priceP = document.createElement("p");
    priceP.className = "item-price";
    priceP.textContent = `$${price}`;

    infoDiv.appendChild(h2);
    infoDiv.appendChild(descP);
    infoDiv.appendChild(priceP);

    flexDiv.appendChild(emojiP);
    flexDiv.appendChild(infoDiv);

    const button = document.createElement("button");
    button.type = "button";
    button.className = "btn";
    button.setAttribute("data-add-item", id);
    button.textContent = "+";

    wrapDiv.appendChild(flexDiv);
    wrapDiv.appendChild(button);

    fragment.appendChild(wrapDiv);
  });
  return fragment;
};

const findOrderObject = (clickedId) => {
  const order = menuArray.find(({ id }) => id === parseInt(clickedId));
  try {
    if (!order) {
      throw new Error(`Order not found for id: ${clickedId}`);
    } else {
      return order;
    }
  } catch (err) {
    console.error(err);
  }
};

const orderObjNum = (orderNumber) => {
  const obj = findOrderObject(orderNumber);
  orderedItems.push(obj);
  checkoutOrderList(orderedItems);
  totalAmount(orderedItems);
  checkout.style.display = "block";
};

// Single delegated listener on the order list — no stale indices or duplicate handlers
document.getElementById("orderList").addEventListener("click", (e) => {
  if (e.target.classList.contains("remove")) {
    const index = Array.from(document.querySelectorAll(".remove")).indexOf(
      e.target,
    );
    orderedItems.splice(index, 1);
    if (orderedItems.length === 0) {
      checkout.style.display = "none";
    }
    checkoutOrderList(orderedItems);
    totalAmount(orderedItems);
  }
});

const checkoutOrderList = (itemsArray) => {
  const orderListContainer = document.getElementById("orderList");
  orderListContainer.replaceChildren();
  itemsArray.forEach(({ name, price }) => {
    const orderDiv = document.createElement("div");
    orderDiv.className = "order order-list-flex y-axis-margin";

    const orderFlexDiv = document.createElement("div");
    orderFlexDiv.className = "order-flex";

    const h3 = document.createElement("h3");
    h3.textContent = name;

    const removeP = document.createElement("p");
    removeP.className = "remove";
    removeP.textContent = "remove";

    orderFlexDiv.appendChild(h3);
    orderFlexDiv.appendChild(removeP);

    const priceP = document.createElement("p");
    priceP.textContent = `$${price}`;

    orderDiv.appendChild(orderFlexDiv);
    orderDiv.appendChild(priceP);

    orderListContainer.appendChild(orderDiv);
  });
};

const totalAmount = (itemsArray) => {
  const totalPrice = itemsArray.reduce((total, current) => {
    return total + current.price;
  }, 0);
  const totalCostElement = document.getElementById("totalCost");
  totalCostElement.textContent = `$${totalPrice}`;
};

document.getElementById("completeOrder").addEventListener("click", () => {
  document.querySelector(".checkout-payment-modal").style.display = "block";
});

document.getElementById("closeBtn").addEventListener("click", () => {
  document.querySelector(".checkout-payment-modal").style.display = "none";
});
const paymentForm = document.getElementById("paymentForm");
paymentForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const formData = new FormData(paymentForm);
  const objForm = Object.fromEntries(formData);
  const cardName = objForm.cardName;
  const checkoutSuccessString = `Thanks, ${cardName}! Your order is on the way!`;
  document.querySelector(".checkout-payment-modal").style.display = "none";
  checkout.innerHTML = `<p class="checkout-string">${checkoutSuccessString}</p>`;
});

const render = () => {
  const mainMenu = document.getElementById("mainMenu");
  mainMenu.replaceChildren(menu(menuArray));
};

render();
