import { CATEGORY_URL } from "./const";

export const fetchCategories = async () => {
  const categoriesResponse = await fetch(CATEGORY_URL, {
    method: "GET",
  });

  if (categoriesResponse.ok) {
    const categories = await categoriesResponse.json();

    const categoryInput = document.getElementById("categoryId");
    const categoryInput2 = document.getElementById("category");

    if (categoryInput) {
      const datalist = document.createElement("datalist");
      datalist.id = "category-list-id";

      categories.forEach((category) => {
        const option = document.createElement("option");
        option.value = category;
        datalist.append(option);
      });

      categoryInput.append(datalist);
    }

    if (categoryInput2) {
      const datalist2 = document.createElement("datalist");
      datalist2.id = "category-list";

      categories.forEach((category) => {
        const option = document.createElement("option");
        option.value = category;
        datalist2.append(option);
      });

      categoryInput2.setAttribute("list", "category-list");
      categoryInput2.append(datalist2);
    }
  }
};
