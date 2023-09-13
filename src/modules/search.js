import { numbers, createRow } from "./table.js";

import create, { GOODS_URL } from "./const.js";
import { renderGoods } from "./render.js";
const { table } = create;

let searchTimeout;

const searchInput = document.querySelector(".panel__input");
searchInput.addEventListener("input", () => {
  clearTimeout(searchTimeout);
  searchTimeout = setTimeout(() => {
    const searchQuery = searchInput.value;
    renderGoods(`${GOODS_URL}?search=${encodeURIComponent(searchQuery)}`);
  }, 300);
});
