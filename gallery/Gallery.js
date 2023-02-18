let PROJECT_ID = '9qmqbv2y';
let DATASET = 'production';
let QUERY = encodeURIComponent(`*[_type == "galleryImage"]{
  "alt": image.alt,
  "src": image.asset->url
}`);

let URL = `https://${PROJECT_ID}.api.sanity.io/v2021-10-21/data/query/${DATASET}?query=${QUERY}`;

const imageContainer = document.querySelector('#image-container');
const imageModalImg = document.querySelector('#img');
const imageModal = document.querySelector('#imageModal');

function animateOut() {
  imageModal.classList.add('modal-out');
  imageModalImg.classList.add('out');
  setTimeout(function () {
    imageModal.classList.remove('active');
    imageModal.classList.remove('modal-out');
    imageModalImg.classList.remove('out');
  }, 400);
}

// Handle the image modal
imageModal.onclick = animateOut;

// fetch the content
fetch(URL)
  .then((res) => res.json())
  .then(({ result }) => {
    imageContainer.innerHTML = '';
    result.forEach((resultImage) => {
      const button = document.createElement('button');
      const image = document.createElement('img');
      image.src = resultImage.src;
      image.alt = resultImage.alt;
      function onInteract() {
        if (imageModal.classList.contains('active')) {
          animateOut();
        } else {
          imageModal.classList.add('active');
          imageModalImg.src = image.src;
          imageModalImg.alt = image.alt;
        }
      }
      button.classList.add('image-button');
      button.onclick = onInteract;
      button.appendChild(image);
      imageContainer.appendChild(button);
    });
  })
  .catch((err) => console.error(err));
