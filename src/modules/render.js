import create, { GOODS_URL } from "./const.js";
const { table } = create;

import { numbers, createRow } from "./table.js";
import { allTotalTableSum } from "./summs.js";
import { loadGoods } from "./service.js";

export const renderGoods = async () => {
  const data = await loadGoods();
  console.log("data: ", data);

  data.goods.forEach((product) => {
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
  await allTotalTableSum();
};
