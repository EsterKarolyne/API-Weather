const api = {
  key: "30ef41be8c0e3c8d162c64db297a3a7f",
  base: "https://api.openweathermap.org/data/2.5/",
  lang: "pt_br",
  units: "metric",
};

const city = document.querySelector(".subtitle-city");
const date = document.querySelector(".current-date");
const imagesWeather = document.querySelector(
  ".div-container-meteorologicalConditions"
);
const weatherDescription = document.querySelector(
  ".weather-meteorologicalConditions"
);
const searchInput = document.querySelector(".search-input");
const searchButton = document.querySelector(".search-button");
const localization = document.querySelector(".container-localization");
const degreesMeteorologicalConditions = document.querySelector(
  ".container-degrees-meteorologicalConditions"
);

searchInput.addEventListener("keypress", enter);
function enter(e) {
  key = e.keyCode;
  if (key === 13) {
    apiResults(searchInput.value);
    searchInput.value = "";
  }
}

searchButton.addEventListener("click", function () {
  apiResults(searchInput.value);
  searchInput.value = "";
});

function apiResults(city) {
  fetch(
    `${api.base}weather?q=${city}&lang=${api.lang}&units=${api.units}&APPID=${api.key}`
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error(`http error: status ${response.status}`);
      }
      return response.json();
    })
    .catch((error) => {
      alert(error.message);
    })
    .then((response) => {
      canvaResults(response);
    });
}

function canvaResults(weather) {
  let now = new Date();

  localization.innerHTML = `
    <p class="title-country">${weather.sys.country}</p>
    <p class="subtitle-city">${weather.name}</p>
    <p class="current-date">${curentDate(now)}</p>
     `;

  let iconName = weather.weather[0].icon;
  imagesWeather.innerHTML = `
    <img class="image-meteorologicalConditions" src="./icons/${iconName}.png"/>
   `;

  let temperature = `${Math.round(weather.main.temp)}`;
  const fahrenheit = Math.round(temperature * 1.8 + 32);

  degreesMeteorologicalConditions.innerHTML = `<p class="degrees-meteorologicalConditions celsius">${temperature}°C | ${fahrenheit}°F</p>`;

  weather_tempo = weather.weather[0].description;
  weatherDescription.innerHTML = `<p>${weather_tempo}</p>`;
}

function curentDate(d) {
  let days = [
    "Domingo",
    "Segunda",
    "Terça",
    "Quarta",
    "Quinta",
    "Sexta",
    "Sábado",
  ];
  let months = [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julio",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro",
  ];

  let day = days[d.getDay()]; //getDay: 0-6
  let date = d.getDate();
  let month = months[d.getMonth()];
  let year = d.getFullYear();

  return `${day} |  ${date}/${month}/${year}`;
}
