console.log("Hello World API REST");
//** API  Edit */
/* import { API_KEY } from "./secrets.js"; */
//console.log(`Key: ${API_KEY}`);
/* import { API_URL } from "./secrets.js"; */
//console.log(`URL: ${API_URL}`);
//*? Agregar a tu gitignore*/
// => add .gitignore ( add )

//** <<<< === === AXIOS API REST === === >>>> */
const API = axios.create({
  baseURL: `https://api.themoviedb.org/3/`,
  headers: {
    "Content-Type": "application/json;charset=utf-8",
  },
  params: {
    api_key: API_KEY,
  },
});

//*?  === AXIOS part 02====  */
//** === Project API MOVIES Container === */
//*? ==== Trending and Preview  View add HTML  ==== */
const getTrendingMoviesPreviews = async () => {
  const { data } = await API(`trending/movie/day`);
  //console.log(data.results);
  const movies = data.results;
  //console.log(movies);
  //> Llamar a mi function Movies > Add lazyLoad === >
  createMovies(movies, trendingMoviesPreviewList, { lazyLoad: true });
};

// &language=es-Mx (API)
//*? 03  =========== New AXIOS  */
//** ====== Categorias Movies === */
async function getCategoriesPreview() {
  const { data } = await API("genre/movie/list");
  const categories = data.genres;
  // => No repetir al cargar ==
  //  categoriesPreviewList.innerHTML = " ";

  createCategories(categories, categoriesPreviewList);
}

//** Add Categories  and Movies */
//*? ==== 04 =====> With AXIOS */
async function getMoviesByCategory(id) {
  const { data } = await API("discover/movie", {
    params: {
      with_genres: id,
    },
  });
  const movies = data.results;
  // Limpiar e quitar doble carga
  //genericSection.innerHTML = " ";
  // < Add Max Page >
  maxPage = data.total_pages;
  // <= Add Lazyload = Intersection Observer =>
  createMovies(movies, genericSection, { lazyLoad: true });
}

//** ADD Get Search === */
//*?  ==== Search add Movies ==== 05  */
//** = Add Autentication Query => Search Movies = */
async function getMoviesBySearch(query) {
  const { data } = await API("search/movie", {
    params: {
      query,
    },
  });
  const movies = data.results;
  // Limpiar e quitar doble carga
  //genericSection.innerHTML = " ";
  maxPage = data.total_pages;

  // Function[movies, container]
  createMovies(movies, genericSection);
}

//** ADD Get Trends Real === */
//*?  ==== Trends ==== 06  */
async function trendingGetMovies() {
  const { data } = await API(`trending/movie/day`);
  //console.log(data.results);
  const movies = data.results;
  // = Limit of the movies =
  maxPage = data.total_pages;
  //console.log(maxPage);
  //> Llamar a mi function Movies >>
  createMovies(movies, genericSection, { lazyLoad: true, clean: true });
  // Add Btn Load More =
  /* const btnLoader = document.createElement("button");
  btnLoader.innerText = "Cargar Más";
  btnLoader.classList.add("btnLoad");
  btnLoader.addEventListener("click", getPaginatedTrendingMovies);
  genericSection.appendChild(btnLoader); */
}

//** Add Get Movies By ID ===  */
//*?  ==> Endpoints Details  == ID Movies = 07*/
async function getMovieById(id) {
  const { data: movie } = await API(`movie/` + id); // movie/{movie_id}

  const movieImgUrl = `https://image.tmdb.org/t/p/w500/` + movie.poster_path;
  console.log(movieImgUrl);
  headerSection.style.background = `
    linear-gradient(
      180deg,
      rgba(0, 0, 0, 0.35) 19.27%,
      rgba(0, 0, 0, 0) 29.17%
    ),
    url(${movieImgUrl})
  `;

  movieDetailTitle.textContent = movie.title;
  movieDetailDescription.textContent = movie.overview;
  movieDetailScore.textContent = movie.vote_average;

  //> Add Image for Categories >
  createCategories(movie.genres, movieDetailsCategoriesList);

  //> Similar Movies >
  getSimilarMoviesId(id);
}

//**  ==  Add and Get Similar Movies for ID ==  08 = */
//*? === Obtener pelis similares a la que escogimos == */
async function getSimilarMoviesId(id) {
  const { data } = await API(`movie/${id}/similar`);
  const similarMovies = data.results;

  //> Add Container and Similar ==>
  createMovies(similarMovies, relatedMoviesContainer);
}

//** === Part 03 LikedMovies Button ==  */
function getLikedMovies() {
  const likedMoviesAdd = likedMoviesList();
  const arrayMovies = Object.values(likedMoviesAdd);

  createMovies(arrayMovies, movieListLiked, { lazyLoad: true, clean: true });
  //console.log(likedMoviesAdd);
}

//*?====== CALL Functions ======= */
/* getCategoriesPreview();
 getTrendingMoviesPreviews(); */
