const starFilled = "icons/filled-star.png";
const starEmpty = "icons/empty-star.png";

const init = () => {
    getGenres(populateGenres);

    const genresDropDownList = document.getElementById("genres");

    genresDropDownList.addEventListener("change", (e) => {
        const genreSelected = e.target.value;
        switch (genreSelected) {
            case "All genres":
                getMovies();
                break;
            case "Favorites":
                getFavourites();
                break;
            default:
                getMoviesFromCategory(genreSelected);
        }
    });
};

const displayMovieList = (movies) => {
    document.getElementById("main").innerHTML = "";
    if (movies.length > 0) {
        movies.sort((a, b) => b.year - a.year);
        movies.forEach((movie) => {
            document.getElementById("main").innerHTML += getMovieHtml(
                movie,
                localStorage.getItem(movie.id) ? starFilled : starEmpty
            );
        });
    } else {
        document.getElementById("main").innerHTML += noMovies();
    }
};

const setFavStatus = (id) => {
    if (localStorage.getItem(id)) {
        localStorage.removeItem(id);
        document.getElementById(id).src = starEmpty;
    } else {
        localStorage.setItem(id, true);
        document.getElementById(id).src = starFilled;
    }
};

const noMovies = () =>
    `<div class="noMovies">
    <h2>Não existem filmes para a categoria selecionada.</h2>
    </div>`;

const getMovieHtml = (movie, fSts) =>
    `<div class="movie">
    <div class="movie-header">
    <img src="${fSts}" class="favStar" alt="favourite status" id="${movie.id}" onClick="setFavStatus(${movie.id})"/><h2>${movie.title}</h2>
    </div>
    <div class="content">
    <img src="${movie.posterUrl}" alt="${movie.title}"/>
    <div class="text">
    <p>${movie.summary}</p>
    <div class="year">${movie.year}</div>
    <div><strong>Directors:</strong> ${movie.director}</div>
    <div><strong>Actors:</strong> ${movie.actors}</div>
    </div>
    </div>
    </div>`;

const populateGenres = (data) => {
    data.push("Favorites");
    data.forEach((genre) => {
        let option = document.createElement("option");
        option.text = genre;
        document.getElementById("genres").add(option);
    });
};

const domIsReady = () => {
    init(getMovies());
};

document.addEventListener("DOMContentLoaded", domIsReady);

const getGenres = () => {
    fetch("https://moviesfunctionapp.azurewebsites.net/api/GetGenres")
        .then((res) => res.json())
        .then((json) => populateGenres(json))
        .catch((err) => console.log(err));
};

const getMovies = () => {
    fetch("https://moviesfunctionapp.azurewebsites.net/api/GetMovies")
        .then((res) => res.json())
        .then((json) => {
            displayMovieList(json);
        })
        .catch((err) => console.log(err));
};

const getMoviesFromCategory = (category) => {
    let url =
        "https://moviesfunctionapp.azurewebsites.net/api/GetMovies?category=" +
        category;
    fetch(url)
        .then((res) => res.json())
        .then((json) => {
            displayMovieList(json);
        })
        .catch((err) => {
            console.log("catch erro", err);
        });
};

const getFavourites = () => {
    let favList = [];
    fetch("https://moviesfunctionapp.azurewebsites.net/api/GetMovies")
        .then((res) => res.json())
        .then((json) => {
            json.forEach((movie) => {
                if (localStorage.getItem(movie.id)) {
                    favList.push(movie);
                }
            });
            displayMovieList(favList);
        })
        .catch((err) => console.log(err));
};