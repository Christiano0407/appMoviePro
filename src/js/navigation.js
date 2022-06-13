//** ==== =====  Location And Hash =======   =====*/
//*? === Buttons Events */
searchFormBtn.addEventListener("click", () => {
  // > Add Value Fom input => Search
  //location.hash = "#search=" + searchFormInput.value;
  location.hash = `#search=${searchFormInput.value.trim()}`; // Method Trim>
});

trendingBtn.addEventListener("click", () => {
  location.hash = "#trends";
});

//*? = Add Return Button Navigation => Página anterior // History  OF  Search = */
let historyArr = [];

arrowBtn.addEventListener("click", () => {
  //location.hash = "#home";
  //window.history.back();
  history.back();
  //history.go(-1);
  /* 
  if (historyArr.length > 1) {
    location.hash = historyArr[historyArr.length - 2];
    historyArr.splice(-2, 2);
  } else {
    historyArr.pop();
    location.hash = "#home";
  } */
});

//*? == Events Load and HashLocation */
window.addEventListener("DOMContentLoaded", navigator, false);
window.addEventListener("hashchange", navigator, false);

//*? == Navigation */
function navigator() {
  console.log({ location });

  if (location.hash.startsWith(`#trends`)) {
    trendsPage();
  } else if (location.hash.startsWith(`#search=`)) {
    searchPage();
  } else if (location.hash.startsWith(`#movie=`)) {
    movieDetailPage();
  } else if (location.hash.startsWith(`#category=`)) {
    categoryPage();
  } else {
    homePage();
  }

  // ADD Scroll Top = Add Navegadores =>
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}

//** == Agregar y remover secciones con "add" and "remove"  ===== */
//*? =  Home Page =  */
function homePage() {
  console.log("Home");

  headerSection.classList.remove(`header-container--long`);
  headerSection.style.background = " ";
  arrowBtn.classList.add("inactive");
  arrowBtn.classList.add("header-arrow--white");
  headerTitle.classList.remove("inactive");
  headerCategoryTitle.classList.add("inactive");
  searchForm.classList.remove("inactive");

  trendingPreviewSection.classList.remove("inactive");
  categoriesPreviewSection.classList.remove("inactive");
  genericSection.classList.add("inactive");
  movieDetails.classList.add("inactive");
  getCategoriesPreview();
  getTrendingMoviesPreviews();
}
//*? =  Category Page  =  */
function categoryPage() {
  console.log("Here!  Categories");

  headerSection.classList.remove(`header-container--long`);
  headerSection.style.background = " ";
  arrowBtn.classList.remove("inactive");
  arrowBtn.classList.add("header-arrow--white");
  headerTitle.classList.add("inactive");
  headerCategoryTitle.classList.remove("inactive");
  searchForm.classList.add("inactive");

  trendingPreviewSection.classList.add("inactive");
  categoriesPreviewSection.classList.add("inactive");
  genericSection.classList.remove("inactive");
  movieDetails.classList.add("inactive");

  //> Add function Category = Función para llamar las pelis en categorias  ====>
  // ["#category,  id.name"]
  const [_, categoryData] = location.hash.split("=");
  const [categoryId, categoryName] = categoryData.split("-");

  headerCategoryTitle.innerHTML = categoryName;

  getMoviesByCategory(categoryId);
}
//*? =  Movie Detail Page  =  */
//** Agregamos los detalles de las movies en Endpoints === */
function movieDetailPage() {
  console.log("Movies!!");
  headerSection.classList.add(`header-container--long`);
  // headerSection.style.background = " ";
  arrowBtn.classList.remove("inactive");
  arrowBtn.classList.add("header-arrow--white");
  headerTitle.classList.add("inactive");
  headerCategoryTitle.classList.add("inactive");
  searchForm.classList.add("inactive");

  trendingPreviewSection.classList.add("inactive");
  categoriesPreviewSection.classList.add("inactive");
  genericSection.classList.add("inactive");
  movieDetails.classList.remove("inactive");

  //> Add Movies Info ==
  //  >  movie/ id
  const [_, movieId] = location.hash.split("=");
  getMovieById(movieId);
}
//*? =  Search  =  */
function searchPage() {
  console.log("Search, Yeah!!");
  headerSection.classList.remove(`header-container--long`);
  headerSection.style.background = " ";
  arrowBtn.classList.remove("inactive");
  arrowBtn.classList.add("header-arrow--white");
  headerTitle.classList.add("inactive");
  headerCategoryTitle.classList.add("inactive");
  searchForm.classList.remove("inactive");

  trendingPreviewSection.classList.add("inactive");
  categoriesPreviewSection.classList.add("inactive");
  genericSection.classList.remove("inactive");
  movieDetails.classList.add("inactive");

  // == Add Search => Input ==
  // ["#search,  "buscador"] => Array
  const [_, query] = location.hash.split("=");
  getMoviesBySearch(query);
}
//*? =  Trends Page  =  */
function trendsPage() {
  console.log("Here in Trends!");
  headerSection.classList.remove(`header-container--long`);
  headerSection.style.background = " ";
  arrowBtn.classList.remove("inactive");
  arrowBtn.classList.add("header-arrow--white");
  headerTitle.classList.add("inactive");
  headerCategoryTitle.classList.remove("inactive");
  searchForm.classList.add("inactive");

  trendingPreviewSection.classList.add("inactive");
  categoriesPreviewSection.classList.add("inactive");
  genericSection.classList.remove("inactive");
  movieDetails.classList.add("inactive");

  // === ADD Trending Movies Really ==
  headerCategoryTitle.innerHTML = "Tendencias";
  trendingGetMovies();
}

//** Historial de Navegación === Otra forma ====  Nos regrese a Home y no a la página anteriro ===== */
/* let historyArr = [];
arrowBtn.addEventListener("click", () => {
  if (historyArr.length > 1) {
    location.hash = historyArr[historyArr.length - 2];
    historyArr.splice(-2, 2);
  } else {
    historyArr.pop();
    location.hash = "#home";
  }
});
function navigator() {
  if (
    location.hash.startsWith("#trends") ||
    location.hash.startsWith("#search=") ||
    location.hash.startsWith("#movie=") ||
    location.hash.startsWith("#category=")
  ) {
    historyArr.push(location.hash);
  }
} */
