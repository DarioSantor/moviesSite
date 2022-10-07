let movies = [];

function init() {
    getGenres(populateGenres);

    const genresDropDownList = document.getElementById('genres');

    genresDropDownList.addEventListener("change", function () {    
        const  genreSelected= this.value;

        
        let filteredMovies;
        
        if(genreSelected !== "All genres"){
            filteredMovies = movies.filter(movie => {
                return movie.genres === genreSelected;
            });
        } else {
            filteredMovies = movies;
        }
            
        displayMovieList(filteredMovies);
    });
}

function displayMovieList(movies) {
    document.getElementById("main").innerHTML = '';

    movies.forEach(function (movie){
        document.getElementById("main").innerHTML += getMovieHtml(movie);
    });
}

function getMovieHtml(movie){
    return `<div class="movie">
    <h2>${movie.title}</h2>
    <div class="content">
    <img src="${movie.posterUrl}" alt="${movie.title}" />
    <div class="text">
        <p>${movie.summary}</p>
        <div class="year">${movie.year}</div>
        <div><strong>Directors:</strong> ${movie.director}</div>
        <div><strong>Actors:</strong> ${movie.actors}</div>
    </div>
    </div>
</div>`
}

function populateGenres(data) {
    data.forEach(function (genre){
        let option = document.createElement("option");
        option.text = genre;
        document.getElementById("genres").add(option);
    });
}

function domIsReady() {
    init(getMovies(handleMovies));
}

document.addEventListener("DOMContentLoaded", domIsReady);
  
function getGenres() {
    fetch("https://moviesfunctionapp.azurewebsites.net/api/GetGenres")
        .then(res => res.json())
        .then(json => populateGenres(json))
        .catch(err => console.log(err))
}

function getMovies(){
    fetch("https://moviesfunctionapp.azurewebsites.net/api/GetMovies")
        .then(res => res.json())
        .then(json =>{
            movies = json
            displayMovieList(json)
        })
        .catch(err => console.log(err))
}

function handleMovies(status, response) {
    if (status==200){
        console.log("Tudo OK")
        console.log(response);
        movies = response
        displayMovieList(response)
    } else {
        console.log("Error: " + status)
    }
}
