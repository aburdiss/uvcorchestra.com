const images = document.querySelectorAll('.image-container img');

const imageModal = document.querySelector('#imageModal');
const imageModalImg = document.querySelector('#img');

images.forEach((image) => {
  image.classList.add('clickable');
  image.tabIndex = 0;

  image.onclick = function () {
    imageModal.classList.add('active');

    imageModalImg.src = this.src;
    imageModalImg.alt = this.alt;
  };
});

imageModal.onclick = function () {
  imageModal.classList.add('modal-out');
  imageModalImg.classList.add('out');
  setTimeout(function () {
    imageModal.classList.remove('active');
    imageModal.classList.remove('modal-out');
    imageModalImg.classList.remove('out');
  }, 400);
};
