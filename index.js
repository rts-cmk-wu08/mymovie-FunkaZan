document.addEventListener("DOMContentLoaded", () => {
  ;

  let BaseURL = "https://api.themoviedb.org/3";
  let apiKey = "99291ceb9c126b71b17d93d5dbcaa5e2";

  fetch(
    "https://api.themoviedb.org/3/movie/now_playing?api_key=99291ceb9c126b71b17d93d5dbcaa5e2&language=en-US&page=1"
  )
    .then((nowPlaying) => nowPlaying.json())

    .then((nowPlay) => {
      console.log(nowPlay);

      let body = document.querySelector("body");

      nowPlay.results.forEach((nowPlaying) => {
        let div = document.createElement("div");

        div.classList.add("cards");

        div.innerHTML = `
            <img src="https://image.tmdb.org/t/p/original${nowPlaying.backdrop_path}" class="xflex" alt="" onclick="window.location.href='detail.html?id=${nowPlaying.id}';">
            `;

        articleElm.append(div);
      });
    });



  let wrapperElm = document.querySelector(".wrapper");

  let headerElm = document.createElement("header");
  headerElm.classList.add("header");
  wrapperElm.append(headerElm);

  let articleElm = document.createElement("article");
  articleElm.classList.add("article");
  wrapperElm.append(articleElm);

  let mainElm = document.createElement("main");
  wrapperElm.append(mainElm);

  let footerElm = document.createElement("footer");
  wrapperElm.append(footerElm);

  headerElm.innerHTML = `
  <h1 class="">MyMovies</h1>
  <h2 class="flexheaderelm">Now Showing</h2>
  <button class="flexheaderelm right-flexitems">See More</button>

  `;

  let popularElm = document.createElement("section");
  popularElm.classList.add("popular");
  mainElm.append(popularElm);

  let popularHeader = document.createElement("header");
  popularHeader.innerHTML = `
    <h2 class="flexitems">Popular</h2>
    <a href='#' class="flexitems right-flexitems">See More</a>
  `;
  popularElm.append(popularHeader);

  let popularMovies = document.createElement("div");
  popularElm.append(popularMovies);

  fetch(`${BaseURL}/movie/popular?api_key=${apiKey}`)
    .then((response) => response.json())
    .then((data) => {
      data.results.forEach((movie) => {
        let article = document.createElement("article");
        article.classList.add("movie-article");
        article.innerHTML = `
          <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" class="img-a" alt="${movie.title}  poster ">
          <div class="popular-text">
            <h3>${movie.title}</h3>
            <p class="gray-ptag" >${movie.vote_average}/10 IMDb</p>
            <p class="genres"></p>
          </div>
        `;
        popularMovies.append(article);

        let genreElm = article.querySelector(".genres");
        movie.genre_ids.forEach((id) => {
          let currentGenre = genres.find((genre) => genre.id == id);
          let genreSpan = document.createElement("span");
          genreSpan.classList.add("genre__pill");
          genreSpan.innerText = currentGenre.name;
          genreElm.append(genreSpan);
        });
      });
    });
});
