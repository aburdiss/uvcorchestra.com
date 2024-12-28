let PROJECT_ID = '9qmqbv2y';
let DATASET = 'production';
let QUERY = encodeURIComponent(`*[_type in ["home", "event"]]{
  _type == "home" => {
    headline,
    "imageUrl": mainImage.asset->url,
    "imageAlt": mainImage.alt,
    firstSectionHeadline,
    firstSectionText,
    donateHeadline,
    secondSectionText,
    eventsHeadline,
    noEventsText,
  },
  _type == "event" => {
    headline,
    date,
    address1,
    address2,
    address3,
    "imageUrl": image.asset->url
  }
}`);

let URL = `https://${PROJECT_ID}.api.sanity.io/v2021-10-21/data/query/${DATASET}?query=${QUERY}`;

const headlineContainer = document.querySelector('#headline');

const imageElement = document.querySelector('#main-image-container');

const firstSectionHeadlineContainer = document.querySelector(
  '#first-section-headline'
);
const firstSectionTextContainer = document.querySelector('#first-section-text');

const donateHeadlineContainer = document.querySelector('#donate-headline');
const donateTextContainer = document.querySelector('#second-section-text');

const eventsHeadlineContainer = document.querySelector('#events-headline');
const eventsContainer = document.querySelector('#events-container');
const noEventsTextContainer = document.querySelector('#no-events-text');

const dateOptions = {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
};

const timeOptions = {
  hour: 'numeric',
  minute: '2-digit',
};

// fetch the content
fetch(URL)
  .then((res) => res.json())
  .then(({ result }) => {
    const page = result.find((element) => !!element.eventsHeadline);
    const events = result.filter((element) => !element.eventsHeadline);

    // Handle Page
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

    sanityBlockContent(donateTextContainer, page.secondSectionText);

    const eventsHeadline = page.eventsHeadline;
    eventsHeadlineContainer.innerText = eventsHeadline;

    const upcomingEvents = events.filter(function (event) {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      return new Date(event.date).getTime() > tomorrow.getTime();
    });

    // Handle Events
    if (upcomingEvents.length) {
      noEventsTextContainer.remove();

      events.forEach((event) => {
        const container = document.createElement('div');
        container.classList.add('upcoming-event');
        container.style.backgroundImage = `url(${event.imageUrl})`;
        const markup = `
<div class="content-box">
  <h3>${event.headline}</h3>
  <div class="date">${new Date(event.date).toLocaleDateString(
    'en-US',
    dateOptions
  )}
  <div>${new Date(event.date).toLocaleTimeString('en-US', timeOptions)}</div>
  </div>
  <div class="Address1">${event.address1}</div>
  <div class="Address2">${event.address2}</div>
  <div class="Address3">${event.address3}</div>
</div>`;
        container.innerHTML = markup;
        eventsContainer.appendChild(container);
      });
    } else {
      // No events!
      eventsContainer.remove();
      sanityBlockContent(noEventsTextContainer, page.noEventsText);
    }
  })
  .catch((err) => console.error(err));
