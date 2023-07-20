let movieNameRef = document.getElementById("movieName");
let searchBtn = document.getElementById("searchBtn");
let movie = document.getElementById("movie");

//function to fetch data from api

let getMovie = () => {
  let movieName = movieNameRef.value;
  // let key = "60f88b5b";
  let key = "7f9a3b82";

  let url = `http://www.omdbapi.com/?t=${movieName}&apikey=${key}`;
  //if input field is empty

  if (movieName.length <= 0) {
    movie.innerHTML = `<h3 class="msg">Please enter a movie name </h3>`;
  }

  //if input isn't empty
  else {
    fetch(url)
      .then((resp) => resp.json())
      .then((data) => {
        //if movie exist in database
        if (data.Response == "True") {
          movie.innerHTML = `
              <div class="movie__poster">
                <img src=${data.Poster}>
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
                  <li><b>Director :</b> ${data.Director}</li>
                  <li><b>Cast :</b> ${data.Actors}</li>
                  <li><b>Released :</b> ${data.Year}</li>
                  <li><b>Rated :</b> ${data.Rated}</li>  
                </ul>
                
              </div>
        `;
        }

        //if movie doesn't exist in database
        else {
          movie.innerHTML = `<h3 class="msg">${data.Error}</h3>`;
        }
      })
      //if error occurs
      .catch(() => {
        movie.innerHTML = `<h3 class="msg">Error Occured</h3>`;
      });
  }
};

searchBtn.addEventListener("click", getMovie);
window.addEventListener("load", getMovie);
