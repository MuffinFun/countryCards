"use strict";

const btn = document.querySelector("#country");
const btnMyCountry = document.querySelector("#myCountry");
const countriesContainer = document.querySelector(".countries");
const overlay = document.querySelector(".overlay");

///////////////////////////////////////
/*
                XMLHttpRequest
    AJAX - Asynchronous JavaScript and XML
*/

/*
API MeowFacts

// const request = new XMLHttpRequest();
// request.open("GET", "https://meowfacts.herokuapp.com/?lang=rus");
// request.send();
// console.log(request);
// request.addEventListener("load", () => {
//   const data = JSON.parse(request.responseText);
//   const [text1] = data.data;
//   console.log(text1);
// });

*/

/*
    API restCountries
*/
/*
const countries = ["Afghanistan", "russia", "usa", "deutschland", "belarus"];

let name;
let count = 0;

function showCountry() {
  if (count == countries.length) count = 0;

  let name = countries[count];

  loadCountryCard(name);
  count++;
}

btn.addEventListener("click", showCountry);

// В функции ниже реализован плохой подход реализации асинхронного кода
// Адская пирамида вызовов
function loadCountryCard(name) {
  const request = new XMLHttpRequest();
  request.open("GET", `https://restcountries.com/v3.1/name/${name}`);
  request.send();

  function renderCard(data, neighbour = "") {
    const html = `
      <article class="country ${neighbour}">
              <img class="country__img" src="${data.flags.svg}" />
              <div class="country__data">
                <h3 class="country__name">${data.name.common}</h3>
                <h4 class="country__region">${data.region}</h4>
                <p class="country__row"><span>👫</span>${data.population}</p>
                <p class="country__row"><span>🗣️</span>${
                  Object.entries(data.languages)[0][1]
                }</p>
                <p class="country__row"><span>💰</span>${
                  Object.entries(data.currencies)[0][1].name
                } ${Object.entries(data.currencies)[0][1].symbol}</p>
              </div>
            </article>
      `;
    countriesContainer.insertAdjacentHTML("beforeend", html);
    countriesContainer.style.opacity = 1;
  }

  request.addEventListener("load", function () {
    const [data] = JSON.parse(this.responseText);
    const neighbour = data.borders[0];
    renderCard(data);

    const requestNeighbour = new XMLHttpRequest();
    requestNeighbour.open(
      "GET",
      `https://restcountries.com/v3.1/alpha/${neighbour}`
    );
    requestNeighbour.send();
    requestNeighbour.addEventListener("load", function () {
      const [dataNeighbour] = JSON.parse(this.responseText);
      renderCard(dataNeighbour, "neighbour");
    });
  });
}
*/

/*
    Fetch

    fetch('url).then(callBack(responce){return responce.json()}).then(callBack(data))

    catch - ловит ошибку в любом месте Fetch
    finally - выполняет действие в любом случае при выполнеии Fetch
*/

// prettier-ignore
const countries = ["Afghanistan","Albania","Algeria","Andorra","Angola","Anguilla","Antigua","Argentina","Armenia","Aruba","Australia","Austria","Azerbaijan","Bahamas","Bahrain","Bangladesh","Barbados","Belarus","Belgium","Belize","Benin","Bermuda","Bhutan","Bolivia","Bosnia ; Herzegovina","Botswana","Brazil","British Virgin Islands","Brunei","Bulgaria","Burkina Faso","Burundi","Cambodia","Cameroon","Cape Verde","Cayman Islands","Chad","Chile","China","Colombia","Congo","Cook Islands","Costa Rica","Cote D Ivoire","Croatia","Cruise Ship","Cuba","Cyprus","Czech Republic","Denmark","Djibouti","Dominica","Dominican Republic","Ecuador","Egypt","El Salvador","Equatorial Guinea","Estonia","Ethiopia","Falkland Islands","Faroe Islands","Fiji","Finland","France","French Polynesia","French West Indies","Gabon","Gambia","Georgia","Germany","Ghana","Gibraltar","Greece","Greenland","Grenada","Guam","Guatemala","Guernsey","Guinea","Guinea Bissau","Guyana","Haiti","Honduras","Hong Kong","Hungary","Iceland","India","Indonesia","Iran","Iraq","Ireland","Isle of Man","Israel","Italy","Jamaica","Japan","Jersey","Jordan","Kazakhstan","Kenya","Kuwait","Kyrgyz Republic","Laos","Latvia","Lebanon","Lesotho","Liberia","Libya","Liechtenstein","Lithuania","Luxembourg","Macau","Macedonia","Madagascar","Malawi","Malaysia","Maldives","Mali","Malta","Mauritania","Mauritius","Mexico","Moldova","Monaco","Mongolia","Montenegro","Montserrat","Morocco","Mozambique","Namibia","Nepal","Netherlands","Netherlands Antilles","New Caledonia","New Zealand","Nicaragua","Niger","Nigeria","Norway","Oman","Pakistan","Palestine","Panama","Papua New Guinea","Paraguay","Peru","Philippines","Poland","Portugal","Puerto Rico","Qatar","Reunion","Romania","Russia","Rwanda","Saint Pierre ; Miquelon","Samoa","San Marino","Satellite","Saudi Arabia","Senegal","Serbia","Seychelles","Sierra Leone","Singapore","Slovakia","Slovenia","South Africa","South Korea","Spain","Sri Lanka","St Kitts ; Nevis","St Lucia","St Vincent","St. Lucia","Sudan","Suriname","Swaziland","Sweden","Switzerland","Syria","Taiwan","Tajikistan","Tanzania","Thailand","Timor L'Este","Togo","Tonga","Trinidad ; Tobago","Tunisia","Turkey","Turkmenistan","Turks ; Caicos","Uganda","Ukraine","United Arab Emirates","United Kingdom","Uruguay","Uzbekistan","Venezuela","Vietnam","Virgin Islands (US)","Yemen","Zambia","Zimbabwe"];

let count = 0;

btnMyCountry.addEventListener("click", showMyCountry);
btn.addEventListener("click", showCountry);

function showCountry() {
  if (count == countries.length) count = 0;

  let name = countries[count];

  getCountryData(name);
  count++;
}

function showMyCountry() {
  navigator.geolocation.getCurrentPosition(
    (pos) => {
      const { latitude, longitude } = pos.coords;
      reverseCoord(latitude, longitude);
    },
    () => alert("Geolocation access denied")
  );
}

function renderCard(data, myCountry = "", neighbour = "") {
  const html = `
    <article class="country ${myCountry} ${neighbour}">
            <img class="country__img" src="${data.flags.svg}" />
            <div class="country__data">
              <h3 class="country__name">${data.name.common}</h3>
              <h4 class="country__region">${data.region}</h4>
              <p class="country__row"><span>👫</span>${data.population}</p>
              <p class="country__row"><span>🗣️</span>${
                Object.entries(data.languages)[0][1]
              }</p>
              <p class="country__row"><span>💰</span>${
                Object.entries(data.currencies)[0][1].name
              } ${Object.entries(data.currencies)[0][1].symbol}</p>
            </div>
          </article>
    `;
  console.log(html);
  countriesContainer.insertAdjacentHTML("beforeend", html);
}

function getCountryData(country, myCountry = "") {
  async function getJSON(url, errorMessage = "Something went wrong") {
    const responce = await fetch(url);
    if (!responce.ok) {
      throw new Error(`${errorMessage} (${responce.status}: ${country})`);
    }
    return await responce.json();
  }

  getJSON(`https://restcountries.com/v3.1/name/${country}`, `Country not found`)
    .then((data) => {
      renderCard(data[0], myCountry);
      const neighbour = data[0].borders ? data[0].borders[0] : "";

      if (!neighbour) {
        throw new Error("Neighbours not found");
      }

      return getJSON(
        `https://restcountries.com/v3.1/alpha/${neighbour}`,
        "Country not found"
      );
    })
    .then((neighbourData) => {
      renderCard(neighbourData[0], "neighbour");
    })
    .catch((err) => renderError(`Something wrong: ${err.message}`))
    .finally(() => {
      countriesContainer.style.opacity = 1;
    });
}

function reverseCoord(lat, long) {
  fetch(
    `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${long}&localityLanguage=en`
  )
    .then((responce) => {
      if (!responce.ok) {
        throw new Error(`${errorMessage} (${responce.status})`);
      }
      return responce.json();
    })
    .then((data) => {
      return fetch(`https://restcountries.com/v3.1/name/${data.countryName}`)
        .then((responce) => responce.json())
        .then((result) => {
          renderCard(result[0], "my-country");
          showOverlay();
        });
    })
    .catch((err) => renderError(`Something wrong: ${err.message}`)).finally(()=>countriesContainer.style.opacity = 1);
}

function renderError(message) {
  countriesContainer.insertAdjacentText("beforeend", message);
}

function showOverlay() {
  overlay.classList.remove("hidden");
}
function hideMyCountryOverlay() {
  overlay.classList.add("hidden");
  document.querySelector(".my-country").remove();
}
overlay.addEventListener("click", hideMyCountryOverlay);
