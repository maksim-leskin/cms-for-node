export const pic = () => {
  const fileInput = document.querySelector(".modal__file_two");

  const modalPic = document.querySelector(".modal__image");
  console.log(modalPic);

  const previewContainer = document.querySelector(".spacer-container");

  const imagePreview = document.createElement("img");
  imagePreview.classList.add("modal_spacer");

  const mesContainer = document.createElement("div");
  mesContainer.classList.add("mes-container");

  const mes = document.createElement("p");
  mes.textContent = "Изображение не должно превышать размер 1 Мб";
  mes.style.color = "red";

  fileInput.addEventListener("change", () => {
    if (fileInput.files.length > 0) {
      modalPic.remove();

      const selectedFile = fileInput.files[0];
      const fileSizeInMb = selectedFile.size / (1024 * 1024);
      if (fileSizeInMb > 1) {
        previewContainer.append(mesContainer);
        mesContainer.append(mes);
      } else {
        const src = URL.createObjectURL(selectedFile);

        imagePreview.style.display = "block";
        imagePreview.src = src;
        mesContainer.remove();
        previewContainer.append(imagePreview);
      }
    }
  });
};
