const movieNameRef = document.getElementById("movieName");
const searchBtn = document.getElementById("searchBtn");
const movie = document.getElementById("movie");

const getMovie = () => {
  const movieName = movieNameRef.value.trim();
  const key = "60f88b5b";

  if (movieName.length === 0) {
    movie.innerHTML = `<h3 class="msg">Please enter a movie name</h3>`;
    return;
  }

  const url = `https://www.omdbapi.com/?t=${encodeURIComponent(
    movieName
  )}&apikey=${key}`;

  fetch(url)
    .then((resp) => resp.json())
    .then((data) => {
      if (data.Response === "True") {
        movie.innerHTML = `
          <div class="movie__poster">
            <img src="${data.Poster}">
          </div>

          <div class="movie__details">
            <div class="movie__info">
              <div class="movie__title">
                <h2>${data.Title}</h2>
                <div class="movie__genre">
                  <span>${data.Genre}</span>
                  <span>${data.Runtime}</span>
                </div>
              </div>

              <div class="movie__rating">
                <h4>${data.imdbRating} <span>/ 10</span></h4>
                <div class="movie__ratings">${data.imdbVotes} ratings</div>
              </div>
            </div>

            <div class="movie__plot">
              ${data.Plot}
            </div>

            <ul class="movie__cast">
              <li><b>Director:</b> ${data.Director}</li>
              <li><b>Cast:</b> ${data.Actors}</li>
              <li><b>Released:</b> ${data.Year}</li>
              <li><b>Rated:</b> ${data.Rated}</li>  
            </ul>
          </div>
        `;
      } else {
        movie.innerHTML = `<h3 class="msg">${data.Error}</h3>`;
      }
    })
    .catch(() => {
      movie.innerHTML = `<h3 class="msg">Error Occurred</h3>`;
    });
};

searchBtn.addEventListener("click", getMovie);
window.addEventListener("load", getMovie);
