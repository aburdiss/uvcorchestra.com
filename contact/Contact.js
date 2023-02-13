let PROJECT_ID = '9qmqbv2y';
let DATASET = 'production';
let QUERY = encodeURIComponent('*[_type == "contact"]');

let URL = `https://${PROJECT_ID}.api.sanity.io/v2021-10-21/data/query/${DATASET}?query=${QUERY}`;

const headlineContainer = document.querySelector('#form-headline');
const descriptionContainer = document.querySelector('#form-description');

// fetch the content
fetch(URL)
  .then((res) => res.json())
  .then(({ result }) => {
    const page = result[0];

    const headline = page.formHeadline;
    headlineContainer.innerText = headline;

    sanityBlockContent(descriptionContainer, page.formText);
  })
  .catch((err) => console.error(err));
