//** === ==== ====  Function General API REST ======= ====== ====  */
//*?  == No repetir el mismo código para la API / = Utils ( funciones que voy a usar )  = */
//** Agregar los Endpointes de detllaes de peli ==> Movie Container */

function createMovies(movies, container) {
  // => Limpiar antes mi "caché"
  container.innerHTML = " ";

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
      `src`,
      `https://image.tmdb.org/t/p/w300/` + movie.poster_path
    );

    /* const movieTitle = document.createElement("h2");
    movieTitle.classList.add("movie-titles");
    movieTitle.innerHTML = movie.title; */
    /* movieContainer.appendChild(movieTitle); */
    // == Add Movies HTML ==
    movieContainer.appendChild(movieImg);
    container.appendChild(movieContainer);
  });
}

const createCategories = (categories, container) => {
  // => Limpiar antes mi "caché"
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
