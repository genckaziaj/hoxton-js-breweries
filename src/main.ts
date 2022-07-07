type Brewery = {
  address_2: string | null;
  address_3: string | null;
  brewery_type: string;
  city: string;
  country: string;
  county_province: string | null;
  created_at: string;
  id: number;
  latitude: string | null;
  longitude: string | null;
  name: string;
  obdb_id: string;
  phone: string | null;
  postal_code: string;
  state: string;
  street: string | null;
  updated_at: string;
  website_url: string | null;
};

type State = {
  USState: string;
  breweries: Brewery[];
};

let state: State = {
  USState: "",
  breweries: [],
};

function getBreweriesForState() {
  fetch(
    `https://api.openbrewerydb.org/breweries?by_state=${state.USState}&per_page=10`
  )
    .then((resp) => resp.json())
    .then((breweries) => {
      state.breweries = breweries;
      render();
    });
}

function renderHeader() {
  let mainEl = document.querySelector("main");
  if (mainEl === null) return;

  let titleEl = document.createElement("h1");
  titleEl.textContent = "List of Breweries";

  let searchBarHeader = document.createElement("header");
  searchBarHeader.className = "search-bar";

  let searchBreweriesForm = document.createElement("form");
  searchBreweriesForm.id = "search-breweries-form";
  searchBreweriesForm.autocomplete = "off";

  let searchBreweriesLabel = document.createElement("label");
  searchBreweriesLabel.htmlFor = "search-breweries";

  let searchBreweriesH2 = document.createElement("h2");
  searchBreweriesH2.textContent = "Search breweries";

  let searchBreweriesInput = document.createElement("input");
  searchBreweriesInput.id = "search-breweries";
  searchBreweriesInput.name = "search-breweries";
  searchBreweriesInput.type = "text";

  searchBreweriesLabel.append(searchBreweriesH2);
  searchBreweriesForm.append(searchBreweriesLabel, searchBreweriesInput);
  searchBarHeader.append(searchBreweriesForm);

  mainEl.append(titleEl, searchBarHeader);
}

function renderBreweryList() {
  let mainEl = document.querySelector("main");
  if (mainEl === null) return;

  let articleEl = document.createElement("article");

  let breweriesUl = document.createElement("ul");
  breweriesUl.className = "breweries-list";

  for (let brewery of state.breweries) {
    renderSingleBrewery(brewery, breweriesUl);
  }

  articleEl.append(breweriesUl);
  mainEl.append(articleEl);
}

function renderSingleBrewery(brewery: Brewery, breweriesUl: HTMLUListElement) {
  let breweryLi = document.createElement("li");

  let breweryTitle = document.createElement("h2");
  breweryTitle.textContent = brewery.name;

  let breweryTypeDiv = document.createElement("div");
  breweryTypeDiv.className = "type";
  breweryTypeDiv.textContent = brewery.brewery_type;

  let breweryAddressSection = document.createElement("section");
  breweryAddressSection.className = "address";

  let breweryAddressTitle = document.createElement("h3");
  breweryAddressTitle.textContent = "Address";

  let breweryAddressLine1 = document.createElement("p");
  breweryAddressLine1.textContent = brewery.street;

  let breweryAddressLine2 = document.createElement("p");

  let breweryAddressLine2Strong = document.createElement("strong");
  breweryAddressLine2Strong.textContent = `${brewery.city}, ${brewery.postal_code}`;

  let breweryPhoneSection = document.createElement("section");
  breweryAddressLine1.className = "phone";

  let breweryPhoneTitle = document.createElement("h3");
  breweryPhoneTitle.textContent = "Phone";

  let breweryPhoneP = document.createElement("p");
  breweryPhoneP.textContent = brewery.phone ? brewery.phone : "N/A";

  let breweryLinkSection = document.createElement("section");
  breweryLinkSection.className = "link";

  let breweryLinkA = document.createElement("a");
  if (brewery.website_url) {
    breweryLinkA.href = brewery.website_url ? brewery.website_url : "#";
    breweryLinkA.target = "_blank";
    breweryLinkA.textContent = "Visit Website";
  } else {
    breweryLinkA.textContent = "No Website";
  }

  breweryLi.append(
    breweryTitle,
    breweryTypeDiv,
    breweryAddressSection,
    breweryPhoneSection,
    breweryLinkSection
  );

  breweryAddressSection.append(
    breweryAddressTitle,
    breweryAddressLine1,
    breweryAddressLine2
  );
  breweryAddressLine2.append(breweryAddressLine2Strong);
  breweryPhoneSection.append(breweryPhoneTitle, breweryPhoneP);
  breweryLinkSection.append(breweryLinkA);

  breweriesUl.append(breweryLi);
}

function render() {
  let mainEl = document.querySelector("main");
  if (mainEl === null) return;
  mainEl.textContent = "";

  renderHeader();
  renderBreweryList();
}

function listenToSelectStateForm() {
  let formEl = document.querySelector<HTMLFormElement>("#select-state-form");
  formEl?.addEventListener("submit", function (event) {
    event.preventDefault();
    let USState = formEl!["select-state"].value;
    state.USState = USState;
    getBreweriesForState();
  });
}

listenToSelectStateForm();
render();
