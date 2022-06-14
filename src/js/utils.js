//** === ==== ====  Function General API REST ======= ====== ====  */
//*?  == No repetir el mismo código para la API / = Utils ( funciones que voy a usar )  = */

//*TODO:<<< ==== Add  Intersection Observer == LazyLoader === >>> */
//*? === Function(callback) / Object ( parameters o Option) === */
const lazyLoader = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    //console.log(entry);
    if (entry.isIntersecting) {
      const URL = entry.target.getAttribute(`data-img`);
      entry.target.setAttribute(`src`, URL);
    }
  });
});
//*? == Add Root == */
//observer.observe();

//*TODO: == Create Movies ==  Agregar los Endpointes de detllaes de peli ==> Movie Container ==== Add lazyLoader= == */
function createMovies(
  movies,
  container,
  { lazyLoad = false, clean = true } = {}
) {
  // => Limpiar antes mi "caché"
  if (clean) {
    container.innerHTML = " ";
  }

  movies.forEach((movie) => {
    const movieContainer = document.createElement("div");
    movieContainer.classList.add("movie-container");

    movieContainer.addEventListener("click", () => {
      //location.hash = `#movie=` + movie.id;
      location.hash = `#movie=${movie.id}`;
    });

    const movieImg = document.createElement("img");
    movieImg.classList.add("movie-img");
    movieImg.setAttribute(`alt`, movie.title);
    movieImg.setAttribute(
      lazyLoad ? `data-img` : `src`,
      `https://image.tmdb.org/t/p/w300/` + movie.poster_path
    );
    // Error Img al cargar =
    movieImg.addEventListener("error", () => {
      //console.log("Error, al cargar una imagen");
      movieImg.setAttribute(
        "src",
        "https://static.platzi.com/static/images/error/img404.png"
      );
    });

    // = Add Observer=
    if (lazyLoad) {
      lazyLoader.observe(movieImg);
    }

    // == Add Movies HTML ==
    movieContainer.appendChild(movieImg);
    container.appendChild(movieContainer);
    /* const movieTitle = document.createElement("h2");
    movieTitle.classList.add("movie-titles");
    movieTitle.innerHTML = movie.title; */
    /* movieContainer.appendChild(movieTitle); */
  });
}

//*TODO: ====== Create Category => Creamos las Categoría ====== */
const createCategories = (categories, container) => {
  // => Limpiar antes mi "caché" // All usar Navigation tenemos que editarlo ==>
  container.innerHTML = " ";

  categories.forEach((category) => {
    const categoryContainer = document.createElement("div");
    categoryContainer.classList.add("category-container");

    const categoryTitle = document.createElement("h3");
    categoryTitle.classList.add("category-title");
    categoryTitle.setAttribute("id", "id" + category.id);
    //> Unir ID + Btn
    categoryTitle.addEventListener("click", () => {
      //location.hash = "#category=" + category.id + " - " + category.name;
      location.hash = `#category=${category.id}-${category.name}`;
    });
    const categoryTitleText = document.createTextNode(category.name);

    categoryTitle.appendChild(categoryTitleText);
    categoryContainer.appendChild(categoryTitle);
    container.appendChild(categoryContainer);
  });
};
//*TODO: ===== Add Btn Navigation and Scroll = BUTTON 01 === Scoll 02 ===  */
//getPaginatedTrendingMovies = async () => {};
async function getPaginatedTrendingMovies() {
  // Scroll 02 >
  const { scrollTop, clientHeight, scrollHeight } = document.documentElement;

  // = Validar =
  const scrollValidationBtn = scrollTop + clientHeight >= scrollHeight - 15;

  // = page is not Max of the maxPage =
  const pageIsNotMax = page < maxPage;

  if (scrollValidationBtn & pageIsNotMax) {
    //> Page >
    page++;
    const { data } = await API(`trending/movie/day`, {
      params: {
        page,
      },
    });
    const movies = data.results;
    //console.log(data);
    createMovies(movies, genericSection, { lazyLoad: true, clean: false });
  }
  //> Add Btn  01=
  /* const btnLoader = document.createElement("button");
  btnLoader.innerText = "Cargar Más";
  btnLoader.classList.add("btnLoad");
  btnLoader.addEventListener("click", getPaginatedTrendingMovies);
  genericSection.appendChild(btnLoader); */
}
