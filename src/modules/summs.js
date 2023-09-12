import { loadTotalPrice } from "./service.js";

const setDiscount = (discount) => (discount ? (100 - discount) / 100 : 1);

const getTotal = (price, count, discount) =>
  price * count * setDiscount(discount);

const getTotalTableSum = async () => {
  const totalSum = await loadTotalPrice();

  return totalSum.toFixed(2);
};

const allTotalTableSum = async () => {
  const totalPriceElement = document.querySelector(".cms__total-price");
  const totalSum = await getTotalTableSum();
  totalPriceElement.textContent = totalSum;
};

export { setDiscount, getTotal, allTotalTableSum };
