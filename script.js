//Bootstrap HTML elments
const container = bootstrap("div", "container");
// Top Header
const headerRow = bootstrap("div", "row");
const headerCol = bootstrap("div", "col-md-12 text-center py-3");
const headerTitle = bootstrap("p", "h2 head-title");
headerTitle.innerHTML = "Daily Aurora";
const headerDate = bootstrap("p", "h6");
headerDate.innerHTML = `${toDaysDate()}`;
//Top Header append
headerCol.append(headerTitle, headerDate);
headerRow.append(headerCol);
//Section Bar - navbar
const navRow = bootstrap("div", "row");
const navCol = bootstrap("div", "col-md-12 py-2");
const navBar = bootstrap("nav", "navbar-expand-lg navbar-light ");
navBar.innerHTML = ` <button
    class="navbar-toggler float-right"
    type="button"
    data-toggle="collapse"
    data-target="#navbarSupportedContent"
    aria-controls="navbarSupportedContent"
    aria-expanded="false"
    aria-label="Toggle navigation"
    >
    <span class="navbar-toggler-icon"></span>
    </button>`;
const navbar_collapse = bootstrap("div", "collapse navbar-collapse");
navbar_collapse.id = "navbarSupportedContent";
const navbarList = bootstrap("ul", "navbar-nav navbar-list mx-auto");

//Section Bar append
navBar.append(navbar_collapse);
navCol.append(navBar);
navRow.append(navCol);
//main content holder
const mainContentRow = bootstrap(
  "div",
  "row no-gutters mt-3 d-flex justify-content-center"
);

const centerCol1 = bootstrap("div", "col-md-6");
const centerCol2 = bootstrap("div", "col-md-6");
mainContentRow.append(centerCol1, centerCol2);

// Main container append
container.append(headerRow, navRow, mainContentRow);
document.body.append(container);
// function to create Boostrap elments
function bootstrap(ele, className = "") {
  const element = document.createElement(ele);
  element.setAttribute("class", className);
  return element;
}

//function to display today's date
function toDaysDate() {
  const toDay = new Date() + "";
  // seprate the date from time
  dateAndTime = toDay.split(" ");
  // Day, Month, Date and Year
  return `${dateAndTime[0]}, ${dateAndTime[1]} ${dateAndTime[2]}, ${dateAndTime[3]}`;
}

//API url, API Key and News Sections
const api_base_url = "https://api.nytimes.com/svc/topstories/v2/";
const api_key = ".json?api-key=" + YOUR_API_KEY;
const news_section = [
  "world",
  "magazine",
  "technology",
  "science",
  "health",
  "sports",
  "arts",
  "fashion",
  "food",
  "travel",
];

// Function to create navigation bar with news section
function navigationBar(sections) {
  const navbarItemActive = bootstrap("li", "t-link nav nav-tabs active ");
  navbarItemActive.innerHTML = `<a class="t-link nav-link navbar-link" href="#">home<span class="sr-only"></span></a>`;
  let navbarItemList = [];
  sections.forEach((section) => {
    const navbarItems = bootstrap("li", "t-link nav nav-tabs");
    navbarItems.innerHTML = `<a class="t-link nav-link navbar-link" href="#">${section}</a>`;
    navbarItemList.push(navbarItems);
  });
  navbarList.append(navbarItemActive, ...navbarItemList);
  navbar_collapse.append(navbarList);
}
navigationBar(news_section);

// navbar link selector and add event listener
const navbar_link = document.querySelectorAll(".navbar-link");

navbar_link.forEach((link) => {
  link.addEventListener("click", () => {
    dataFromNYApi(api_base_url, link.textContent, api_key);
  });
});

// Async function to fetch the data related to news section array topics
async function dataFromNYApi(baseUrl, section, key) {
  try {
    const final_api_url = await fetch(baseUrl + section + key);
    const api_json = await final_api_url.json();
    newsData(api_json);
  } catch {
    console.log("Api error occured");
  }
}
//function to get the home page
function homePage(baseUrl, key) {
  fetch(baseUrl + "home" + key)
    .then((res) => res.json())
    .then((data) => {
      newsData(data);
    });
}
homePage(api_base_url, api_key);

//function to collect news data and renders it to the web sections
function newsData(data) {
  const results = data.results;

  centerCol1.innerHTML = "";
  centerCol2.innerHTML = "";
  newsCenter1(results);
  newsCenter2(results);
}

// display even number news
function newsCenter1(news) {
  for (let i = 0; i <= 20; i = i + 2) {
    const row = bootstrap("div", "row");
    const col = bootstrap("div", "col-md-12");
    col.innerHTML = `<div class="card m-3">
    <div class="row no-gutters border-bottom pb-3">
      <div class="col-md-12">
        <div class='news-type text-center pt-2'>
         <h6 class="card-text">Classification | ${news[i].section}<h6>
        </div>
        <div class="news-img" style="height: 18rem;">
          <img src="${news[i].multimedia[0].url}"
          class="card-img h-100" style="object-fit:cover";
          alt="${news[i].title}"
          />
        </div>
      </div>
      <div class="col-md-12">
      <div class="card-body">
      <span class="card-text text-size pr-3 pb-2">${news[i].byline}</span>
        <h5 class="h3">${news[i].title}</h5>
        <p class="card-text text-size">${news[i].abstract}</p>
        <p class="card-text"><a class="a-link btn btn-outline-primary" href="${
          news[i].url
        }" target="_blank" >Read More</a></p>
         |<span class="card-text text-size pl-3"><b>Last updated:</b> ${
           news[i].updated_date.split("T")[0]
         }</span>
      </div>
    </div>
  </div>
</div>`;
    row.append(col);
    centerCol1.append(row);
  }
}
// display odd number news
function newsCenter2(news) {
  for (let i = 1; i <= 20; i = i + 2) {
    const row = bootstrap("div", "row");
    const col = bootstrap("div", "col-md-12");
    col.innerHTML = `<div class="card m-3">
      <div class="row no-gutters border-bottom pb-3">
        <div class="col-md-12">
        <div class='news-type text-center pt-2'>
        <h6 class="card-text">Classification | ${news[i].section}<h6>
       </div>
          <div class="news-img" style="height: 18rem;">
            <img src="${news[i].multimedia[0].url}"
            class="card-img h-100" style="object-fit:cover";
            alt="${news[i].title}"
            />
          </div>
        </div>
        <div class="col-md-12">
          <div class="card-body">
          <span class="card-text text-size pr-3 pb-2">${news[i].byline}</span>
            <h5 class="h3">${news[i].title}</h5>
            <p class="card-text text-size">${news[i].abstract}</p>
            <p class="card-text"><a class="a-link btn btn-outline-primary" href="${
              news[i].url
            }" target="_blank" >Read More</a></p>
             |<span class="card-text text-size pl-3"><b>Last updated:</b> ${
               news[i].updated_date.split("T")[0]
             }</span>
          </div>
      </div>
    </div>
  </div>`;
    row.append(col);
    centerCol2.append(row);
  }
}
