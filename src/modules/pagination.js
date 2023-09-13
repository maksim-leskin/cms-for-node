import { renderGoods } from "./render.js";

{
  /* <div class="sub-panel">
          <p class="sub-panel__choice-pages">Показывать на странице: 10</p>
          <p class="sub-panel__pages">1-10 из 15</p>
          <div class="sub-panel__arrows">
            <a href="#" class="sub-panel__left"></a>
            <p class="sub-panel__page">1</p>
            <a href="#" class="sub-panel__right"></a>
          </div>
        </div> */
}
const subPanel = document.querySelector(".sub-panel");
export let counter = 10;

export const renderPagination = ({ page, totalCount, dataUrl }) => {
  subPanel.textContent = "";
  const choicePageElem = document.createElement("p");
  choicePageElem.classList.add("sub-panel__choice-pages");
  choicePageElem.textContent = `Показывать на странице: ${counter}`;

  const pagesElem = document.createElement("p");
  pagesElem.classList.add("sub-panel__pages");
  pagesElem.textContent = `
    ${(page - 1) * counter + 1} - 
    ${page * counter < totalCount ? page * counter : totalCount} из 
    ${totalCount}`;

  const arrowsElem = document.createElement("div");
  arrowsElem.classList.add("sub-panel__arrows");

  const leftElem = document.createElement("button");
  leftElem.classList.add("sub-panel__left");
  leftElem.textContent = "<";

  const pageElem = document.createElement("p");
  pageElem.classList.add("sub-panel__page");
  pageElem.textContent = "1";

  const rightElem = document.createElement("button");
  rightElem.classList.add("sub-panel__right");
  rightElem.textContent = ">";

  arrowsElem.append(leftElem, pageElem, rightElem);
  subPanel.append(choicePageElem, pagesElem, arrowsElem);

  leftElem.addEventListener("click", () => {
    if (page > 1) {
      dataUrl.searchParams.set("page", page - 1);
      renderGoods(dataUrl);
    }
  });

  rightElem.addEventListener("click", () => {
    if (page * counter < totalCount) {
      dataUrl.searchParams.set("page", page + 1);
      renderGoods(dataUrl);
    }
  });
};
