import create, { API_URL, GOODS_URL, appData } from "./const.js";
const { btn, table, modal, form, price, count, discont, formelems, checkbox } =
  create;
import { closeModal, openModal } from "./modal.js";
import { getTotal, allTotalTableSum } from "./summs.js";
import { addProductData, numbers, addProductPage } from "./table.js";
import { toBase } from "./picture.js";
import { loadGoods } from "./service.js";
import { renderGoods } from "./render.js";

export const formModal = () => {
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const newProduct = Object.fromEntries(formData);

    newProduct.image = await toBase(newProduct.image);
    newProduct.id = document.querySelector(".vendor-code__id").textContent;
    newProduct.discont = document.querySelector(".modal__input_discount").value;

    addProductData(newProduct);
    await allTotalTableSum();

    renderGoods(`${appData.lastUrl}`);
    form.reset();
    closeModal();
  });
};

const openConfirmationModal = async (id, target) => {
  const modal = document.createElement("div");
  modal.classList.add("overlay", "active");

  const modalContent = document.createElement("div");
  modalContent.classList.add("overlay__modal", "modal");

  const message = document.createElement("p");
  message.textContent = "Are you sure you want to delete this product?";

  const confirmButton = document.createElement("button");
  confirmButton.textContent = "Confirm";
  confirmButton.addEventListener("click", async () => {
    try {
      await fetch(`${GOODS_URL}${id}`, {
        method: "DELETE",
      });

      renderGoods(`${appData.lastUrl}`);
    } catch (error) {
      console.error("Failed to delete the product:", error);
    }

    modal.remove();
  });

  const cancelButton = document.createElement("button");
  cancelButton.textContent = "Cancel";
  cancelButton.addEventListener("click", () => {
    modal.remove();
  });

  modalContent.append(modal);
  modal.append(message, confirmButton, cancelButton);
  document.body.append(modal);
};

export const tableNum = () => {
  table.addEventListener("click", (e) => {
    const target = e.target;
    if (target.closest(".table__btn_del")) {
      const connectId = target.closest("tr").dataset.id;
      openConfirmationModal(connectId, target);
    }
  });
};

export const openWindow = () => {
  table.addEventListener("click", async (e) => {
    const target = e.target;
    if (target.closest(".table__btn_pic")) {
      const row = target.closest("tr");
      const id = row.dataset.id;

      try {
        const response = await fetch(`${GOODS_URL}${id}`);
        if (!response.ok) {
          throw new Error("Image not found");
        }

        const data = await response.json();
        const pictureUrl = `${API_URL}${data.image}`;

        const w = screen.width / 2 - 400;
        const h = screen.height / 2 - 300;
        window.open(
          pictureUrl,
          "_blank",
          `width=800,height=600,left=${w},top=${h}`,
        );
      } catch (error) {
        console.error(error);
        window.alert(error.message); // Display the error message in a window alert
      }
    }
  });
};

export const modalBtn = () => {
  btn.addEventListener("click", () => {
    openModal();
  });
};

export const modalModal = () => {
  modal.addEventListener("click", (e) => {
    const target = e.target;
    if (target === modal || target.closest(".modal__close")) {
      closeModal();
    }
  });
};

export const totalModal = () => {
  formelems.forEach((elem) => {
    const modalTotal = document.querySelector(".modal__total-price");
    modalTotal.textContent = "0.00";
    elem.addEventListener("blur", () => {
      modalTotal.value = getTotal(
        price.value,
        count.value,
        discont.value,
      ).toFixed(2);
    });
  });
};

export const reqModal = () => {
  formelems.forEach((formelem) => {
    formelem.required = true;
  });
};

export const checkboxModal = () => {
  checkbox.addEventListener("click", () => {
    discont.disabled = checkbox.checked ? false : true;
    discont.value = "";
  });
};
