import { menuArray } from "./data.js";

document.addEventListener("click", (e) => {
  if (e.target.dataset.addItem) {
    console.log(e.target.dataset.addItem);
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
    button.className = "add-button";
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

const render = () => {
  const mainMenu = document.getElementById("mainMenu");
  mainMenu.innerHTML = "";
  mainMenu.appendChild(menu(menuArray));
};

render();
