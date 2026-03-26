import { menuArray } from "./data.js";

const menu = (array = []) => {
  const menuHtml = array.map(
    ({ name, ingredients, price, emoji, id }) =>
      `<div class="wrap">
        <div class="flex">
          <p class="item-emoji">${emoji}</p>
          <div>
            <h2>${name}</h2>
            <p class="item-description">${ingredients.join(", ")}</p>
            <p class="item-price">$${price}</p>
          </div>
        </div>
        <button type="button" class="add-button" data-addItem="${id}">+</button>
      </div>`,
  );
  return menuHtml.join("");
};

const render = () => {
  document.getElementById("mainMenu").innerHTML = menu(menuArray);
};

render();
