import create, { appData } from "./const.js";
const { table } = create;

import { numbers, createRow } from "./table.js";
import { allTotalTableSum } from "./summs.js";
import { loadGoods } from "./service.js";
import { renderPagination } from "./pagination.js";

export const renderGoods = async (url) => {
  const dataUrl = new URL(url);
  const data = await loadGoods({ url: dataUrl });
  appData.lastUrl = dataUrl;
  table.textContent = "";
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

  numbers(data.page);

  renderPagination({
    ...data,
    dataUrl,
  });
  await allTotalTableSum();
};
