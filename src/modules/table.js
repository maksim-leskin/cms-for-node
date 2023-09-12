import create, { GOODS_URL } from "./const.js";
const { table } = create;
import { openEditModal } from "./createModal.js";

import { pic } from "./pic.js";

import { getTotal, allTotalTableSum } from "./summs.js";

const addProductData = async (product) => {
  try {
    const response = await fetch(GOODS_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(product),
    });

    if (response.ok) {
      const newProduct = await response.json();
      const newRow = createRow(newProduct);
      table.append(newRow);

      numbers();
      await allTotalTableSum();
    } else if (
      response.status === 422 ||
      response.status === 404 ||
      response.status >= 500
    ) {
      const errorData = await response.json();
      const errorMessage = errorData.message;
      console.log(errorMessage);
    } else {
      throw new Error("Something went wrong...");
    }
  } catch (error) {
    console.error("Error:", error);
    displayErrorMessageModal("Something went wrong...");
  }
};

const addProductPage = async (product, table) => {
  try {
    const response = await fetch(GOODS_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(product),
    });

    if (response.ok) {
      const newProduct = await response.json();
      const newRow = createRow(newProduct);
      table.append(newRow);

      numbers();
      await allTotalTableSum();
    } else {
      console.log("Error adding product");
    }
  } catch (error) {
    console.log("Error:", error);
  }
};

const numbers = () => {
  const numTd = table.querySelectorAll(".table__cell-num");

  let n = 1;
  numTd.forEach((i) => {
    i.textContent = n++;
  });
};

const createRow = ({
  id,
  title,
  price,
  category,
  count,
  units,
  discount,
  description,
}) => {
  const tr = document.createElement("tr");
  tr.classList.add("row");
  tr.dataset.id = id;

  const tdNumber = document.createElement("td");
  tdNumber.classList.add("table__cell", "table__cell-num");
  const idSpan = document.createElement("span");
  const tdTitle = document.createElement("td");

  tdTitle.classList.add("table__cell", "table__cell_left", "table__cell_name");

  idSpan.classList.add("table__cell-id");
  idSpan.textContent = "ID: " + id;
  tdTitle.textContent = title;

  tdTitle.prepend(idSpan);

  const tdCategory = document.createElement("td");
  tdCategory.classList.add("table__cell", "table__cell_left");
  tdCategory.textContent = category;

  const tdUnit = document.createElement("td");
  tdUnit.classList.add("table__cell");
  tdUnit.textContent = units;

  const tdCount = document.createElement("td");
  tdCount.classList.add("table__cell");
  tdCount.textContent = count;

  const tdPrice = document.createElement("td");
  tdPrice.classList.add("table__cell");
  tdPrice.textContent = price;

  const tdTotal = document.createElement("td");
  tdTotal.classList.add("table__cell", "table__total");
  const total = getTotal(count, price, discount).toFixed(2);
  tdTotal.textContent = total;

  const tdImages = document.createElement("td");

  tdImages.classList.add("table__cell", "table__cell_btn-wrapper");

  const button1 = document.createElement("button");
  button1.classList.add("table__btn", "table__btn_pic");

  const button2 = document.createElement("button");
  button2.classList.add("table__btn", "table__btn_edit");

  button2.addEventListener("click", () => {
    openEditModal({
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
    pic();
  });

  const button3 = document.createElement("button");
  button3.classList.add("table__btn", "table__btn_del");

  tdImages.append(button1, button2, button3);

  tr.append(
    tdNumber,
    tdTitle,
    tdCategory,
    tdUnit,
    tdCount,
    tdPrice,
    tdTotal,
    tdImages
  );
  return tr;
};

const displayErrorMessageModal = (message) => {
  const errorModal = document.createElement("div");
  errorModal.classList.add("modal");
  errorModal.id = "errorModal";

  const modalContent = document.createElement("div");
  modalContent.classList.add("modal-content");

  const closeBtn = document.createElement("span");
  closeBtn.classList.add("close");
  closeBtn.textContent = "×";

  const errorTitle = document.createElement("h2");
  errorTitle.textContent = "Error";

  const errorMessage = document.createElement("p");
  errorMessage.textContent = message;

  modalContent.append(closeBtn, errorTitle, errorMessage);

  errorModal.append(modalContent);

  document.body.append(errorModal);

  errorModal.style.display = "block";

  closeBtn.addEventListener("click", () => {
    errorModal.style.display = "none";
  });
};

export { addProductData, numbers, createRow, addProductPage };
