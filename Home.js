let PROJECT_ID = '9qmqbv2y';
let DATASET = 'production';
let QUERY = encodeURIComponent(`*[_type == "home"]{
  headline,
  "imageUrl": mainImage.asset->url,
  "imageAlt": mainImage.alt,
  firstSectionHeadline,
  firstSectionText,
  donateHeadline,
  secondSectionText,
  eventsHeadline,
  noEventsText,
}`);

let URL = `https://${PROJECT_ID}.api.sanity.io/v2021-10-21/data/query/${DATASET}?query=${QUERY}`;

const headlineContainer = document.querySelector('#headline');

const imageElement = document.querySelector('#main-image-container');

const firstSectionHeadlineContainer = document.querySelector(
  '#first-section-headline'
);
const firstSectionTextContainer = document.querySelector('#first-section-text');

const donateHeadlineContainer = document.querySelector('#donate-headline');

const eventsHeadlineContainer = document.querySelector('#events-headline');
const noEventsTextContainer = document.querySelector('#no-events-text');

// fetch the content
fetch(URL)
  .then((res) => res.json())
  .then(({ result }) => {
    const page = result[0];

    const headline = page.headline;
    headlineContainer.innerText = headline;

    const imageAlt = page.imageAlt;
    const imageSrc = page.imageUrl;
    imageElement.src = imageSrc;
    imageElement.alt = imageAlt;

    const firstSectionHeadline = page.firstSectionHeadline;
    firstSectionHeadlineContainer.innerText = firstSectionHeadline;

    sanityBlockContent(firstSectionTextContainer, page.firstSectionText);

    const donateHeadline = page.donateHeadline;
    donateHeadlineContainer.innerText = donateHeadline;

    const eventsHeadline = page.eventsHeadline;
    eventsHeadlineContainer.innerText = eventsHeadline;

    sanityBlockContent(noEventsTextContainer, page.noEventsText);
  })
  .catch((err) => console.error(err));
