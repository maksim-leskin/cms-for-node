import { GOODS_URL, TOTAL_PRICE_URL } from "./const";

export const loadGoods = async (params = {}) => {
  const response = await fetch(GOODS_URL);
  const data = await response.json();

  return data;
};

export const loadTotalPrice = async (params = {}) => {
  const response = await fetch(TOTAL_PRICE_URL);
  const data = await response.json();

  return data;
};
