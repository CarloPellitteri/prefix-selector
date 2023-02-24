// DOM ACCESS

const dropdown = document.querySelector(".dropdown");
const listContainer = document.querySelector(".dropdown-list-container ul");
const dropdownButton = document.querySelector(".dropdown-flag-container");
const flag = document.querySelector(".flag");
const prefix = document.querySelector(".prefix");
const searchingBar = document.querySelector("#searching-input");

// STATE

const state = {
  dropdownActive: false,
  selectedCountry: data[5],
  searchingBarValue: "",
};

// FUNCTIONS

const upperFirst = (str) => {
  return `${str[0].toUpperCase()}${str.slice(1)}`;
};

const getTab = (obj) => {
  const nameUppered = upperFirst(obj.name);

  return `
  <li>
    <div class="tab" data-id="${obj.id}">
      <div class="grid-container">
        <div class="grid-item">
          <div class="tab-flag">
            <img src="${obj.icon}" alt="">
          </div>
        </div>
        <div class="grid-item">
          <div class="tab-text">
            <span>${nameUppered} (${obj.prefix})</span>
          </div>
        </div>
      </div>
    </div>
  </li>
`;
};

const filterCountriesByName = (name) => {
  return data.filter((country) => {
    return country.name.startsWith(name.toLowerCase());
  });
};

const getFilteredCountries = () => {
  return state.searchingBarValue !== ""
    ? filterCountriesByName(state.searchingBarValue)
    : data;
};

// RENDER

const renderSelectedCountry = () => {
  flag.innerHTML = `
    <img src="${state.selectedCountry.icon}" alt="">
  `;
};

const renderPrefix = () => {
  prefix.innerHTML = `
    ${state.selectedCountry.prefix}
  `;
};

const renderList = () => {
  const filteredCountries = getFilteredCountries();
  const template = filteredCountries.map((country) => {
    return getTab(country);
  });

  listContainer.innerHTML = template.join("");

  const tabs = [...document.querySelectorAll(".tab")];
  tabs.forEach((tab) => {
    tab.addEventListener("click", handleTabClick);
  });
};

const render = () => {
  renderList();
  renderSelectedCountry();
  renderPrefix();
};

// HANDLE FUNCIONS

const handleButtonClick = () => {
  if (!state.dropdownActive) {
    dropdown.classList.add("dropdown-active");
  } else {
    dropdown.classList.remove("dropdown-active");
  }
  state.dropdownActive = !state.dropdownActive;
};

const handleTabClick = (event) => {
  const { id } = event.currentTarget.dataset;
  state.selectedCountry = data[id];
  render();
};

const handleSearch = () => {
  state.searchingBarValue = searchingBar.value;

  render();
  console.log(state);
};

// EVENTS

dropdownButton.addEventListener("click", handleButtonClick);
searchingBar.addEventListener("keyup", handleSearch);

render();
