

init = () => {
    getGenres(populateGenres)

    const genresDropDownList = document.getElementById('genres');

    genresDropDownList.addEventListener("change", function () {    
        const  genreSelected = this.value;
        console.log('genreSelected>>>>', genreSelected)

        
        let filteredMovies
        
        if(genreSelected !== "All genres"){
            console.log('genreSelected inside if', genreSelected)
            filteredMovies = getMoviesFromCategory(genreSelected)
            console.log('return getMoviesFromCategory', filteredMovies)
        } else {
            filteredMovies = getMovies()
        }
            
        displayMovieList(filteredMovies);
    });
}

function displayMovieList(movies){
    document.getElementById("main").innerHTML = '';
    console.log('displayMovieList', movies)

    movies.forEach(function (movie){
        document.getElementById("main").innerHTML += getMovieHtml(movie);
    });
}

getMovieHtml = (movie) =>  `<div class="movie">
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


populateGenres= (data) => {
    data.forEach((genre) => {
        let option = document.createElement("option");
        option.text = genre;
        document.getElementById("genres").add(option);
    });
}

domIsReady = () => {init(getMovies(handleMovies))}


document.addEventListener("DOMContentLoaded", domIsReady);
  
getGenres = () => {
    fetch("https://moviesfunctionapp.azurewebsites.net/api/GetGenres")
        .then(res => res.json())
        .then(json => populateGenres(json))
        .catch(err => console.log(err))
}

getMovies = () => {
    fetch("https://moviesfunctionapp.azurewebsites.net/api/GetMovies")
        .then(res => res.json())
        .then(json =>{
            console.log(json)
            displayMovieList(json)
        })
        .catch(err => console.log(err))
}

handleMovies = (status, response) => {
    if (status==200){
        console.log("Tudo OK")
        console.log(response)
        displayMovieList(response)
    } else {
        console.log("Error: " + status)
    }
}

function getMoviesFromCategory(category) {
    console.log("getMoviesFromCategory")
    console.log(category)
    let url = "https://moviesfunctionapp.azurewebsites.net/api/GetMovies?category="+category
    console.log(url);
    fetch(url)
    .then(res => res.json())
    .then(json =>{
        console.log('json>>',json)
        displayMovieList(json.json())
        
    })
    .catch(err => {console.log('catch erro',err)})
}