let PROJECT_ID = '9qmqbv2y';
let DATASET = 'production';
let QUERY = encodeURIComponent(`*[_type == "about"]{
  aboutText,
  conductorHeadline,
  conductorText,
  joinHeadline,
  joinText,
  "imageUrl": joinImage.asset->url,
  "imageAlt": joinImage.alt,
}`);

let URL = `https://${PROJECT_ID}.api.sanity.io/v2021-10-21/data/query/${DATASET}?query=${QUERY}`;

const aboutTextContainer = document.querySelector('#about-text-container');

const conductorHeadlineContainer = document.querySelector(
  '#conductor-headline'
);
const conductorTextContainer = document.querySelector('#conductor-text');

const joinHeadlineContainer = document.querySelector('#join-headline');
const joinTextContainer = document.querySelector('#join-text');
const joinImage = document.querySelector('#join-image');

// fetch the content
fetch(URL)
  .then((res) => res.json())
  .then(({ result }) => {
    console.log(result);
    const page = result[0];

    sanityBlockContent(aboutTextContainer, page.aboutText);

    conductorHeadlineContainer.innerText = page.conductorHeadline;

    sanityBlockContent(conductorTextContainer, page.conductorText);

    joinHeadlineContainer.innerText = page.joinHeadline;

    sanityBlockContent(joinTextContainer, page.joinText);

    joinImage.src = page.imageUrl;
    joinImage.alt = page.imageAlt;
  })
  .catch((err) => console.error(err));
