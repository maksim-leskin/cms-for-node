import { numbers, createRow } from "./table.js";

import create, { GOODS_URL } from "./const.js";
const { table } = create;

let searchTimeout;

const searchInput = document.querySelector(".panel__input");
searchInput.addEventListener("input", () => {
  clearTimeout(searchTimeout);
  searchTimeout = setTimeout(() => {
    const searchQuery = searchInput.value;
    loadDataFromAPI(searchQuery);
  }, 300);
});

const loadDataFromAPI = async (searchQuery) => {
  try {
    const response = await fetch(
      `${GOODS_URL}?search=${encodeURIComponent(searchQuery)}`
    );

    const data = await response.json();
    table.innerHTML = "";

    data.forEach((product) => {
      const {
        id,
        title,
        price,
        category,
        count,
        units,
        discount,
        description,
        image,
      } = product;
      const row = createRow({
        id,
        title,
        price,
        category,
        count,
        units,
        discount,
        description,
        image,
      });
      table.append(row);
    });

    numbers();
  } catch (error) {
    console.error(error);
  }
};
