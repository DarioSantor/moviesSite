// TODO
//
//DONE
//
//1.
// Alterar código javascript , para quando se
// seleciona uma categoria de filmes fazer
// um pedido à API com o parâmetro
// categoria (*)
//
// 3.
// Alterar todo o código javascript para usar
// arrow functions
//
// 4.
// Usar fetch para chamar as APIs
//
// 2.
// Quando não se recebe filmes para uma
// categoria, deve escrever se no ecrã "Não
// existem filmes para a categoria
// selecionada.“ (*)
//
// 7.
// Ordenar filmes cronologicamente (do
// mais recente para o mais antigo)
//
// 5.
// Adicionar favoritos à listagem (*)
//
// 6.
// Guardar favoritos em local storage
// (*)-obrigatório

const init = () => {
    // 3.
    getGenres(populateGenres);

    const genresDropDownList = document.getElementById("genres");

    genresDropDownList.addEventListener("change", function () {  //wtf (e) => não funciona também
        // Não consegui implementar a arrow f
        // 3.
        const genreSelected = this.value;
        console.log("genreSelected>>>>", genreSelected);

        if (genreSelected !== "All genres") {
            console.log("genreSelected inside if", genreSelected);
            getMoviesFromCategory(genreSelected); // antes => filteredMovies = getMoviesFromCategory(genreSelected);
        } else {
            getMovies(); // antes filteredMovies = getMovies()
        }

        // displayMovieList(filteredMovies); Aqui estava o erro da consola.
    });
};

const displayMovieList = (movies) => {
    // 3.
    document.getElementById("main").innerHTML = "";

    console.log("displayMovieList", movies);

    // Adicionar a propriedade de favorito ao filme
    // for (element of movies) {
    //     element.favourite = false;
    // }

    if (movies.length > 0) {
        let favouriteStatus = "";
        // 7. - Organizar os filmes cronologicamente
        movies.sort((a, b) => b.year - a.year); // 3.
        // Acrescentar o atributo de favorito ao filme
        movies.forEach((movie) => {
            // 3.
            // if(localStorage.getItem(movie.id)) {
            //     console.log('localStorage.getItem(movie.id)', localStorage.getItem(movie.id))
            //     movie.favourite = true;
            // }

            if(localStorage.getItem(movie.id)){
                favouriteStatus = "icons/filled-star.png";
            } else {
                favouriteStatus = "icons/empty-star.png";
            }


            // if (movie.favourite) {
            //     favouriteStatus = "icons/filled-star.png";
            // } else {
            //     favouriteStatus = "icons/empty-star.png";
            // }
            document.getElementById("main").innerHTML += getMovieHtml(movie,favouriteStatus);

        });
    } else {
        // 2. - Mensagem de ausência de filmes
        console.log("Não existem filmes para a categoria selecionada.");
        document.getElementById("main").innerHTML += noMovies();
    }
};

const setFavStatus = (id) => {
    if(localStorage.getItem(id)){
        console.log("Retirado nos favoritos")
        localStorage.removeItem(id)
        document.getElementById(id).src = "icons/empty-star.png";
    } else {
        console.log("Colocado nos favoritos")
        localStorage.setItem(id, true)
        document.getElementById(id).src = "icons/filled-star.png";
    }
    
};

const noMovies = () =>
    // 3.
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
    // 3.
    data.forEach((genre) => {
        // 3.
        let option = document.createElement("option");
        option.text = genre;
        document.getElementById("genres").add(option);
    });
};

const domIsReady = () => {
    // 3.
    init(getMovies(handleMovies));
};

document.addEventListener("DOMContentLoaded", domIsReady);

const getGenres = () => {
    // 3.
    fetch("https://moviesfunctionapp.azurewebsites.net/api/GetGenres") // 4.
        .then((res) => res.json()) // 3.
        .then((json) => populateGenres(json)) // 3.
        .catch((err) => console.log(err)); // 3.
};

const getMovies = () => {
    // 3.
    fetch("https://moviesfunctionapp.azurewebsites.net/api/GetMovies")
        .then((res) => res.json()) // 3.
        .then((json) => {
            // 3.
            console.log(json);
            displayMovieList(json);
        })
        .catch((err) => console.log(err)); // 3.
};

// Verificar se ambos os fetches passam por aqui.
const handleMovies = (status, response) => {
    // 3.
    if (status == 200) {
        console.log("Tudo OK");
        console.log(response);
        displayMovieList(response);
    } else {
        console.log("Error: " + status);
    }
};

const getMoviesFromCategory = (category) => {
    // 3.
    console.log("getMoviesFromCategory");
    console.log(category);

    // 1. - Chamada dos filmes com categoria
    let url =
        "https://moviesfunctionapp.azurewebsites.net/api/GetMovies?category=" +
        category;
    console.log(url);
    fetch(url)
        .then((res) => res.json()) // 3.
        .then((json) => {
            // 3.
            console.log("json>>", json);
            displayMovieList(json);
        })
        .catch((err) => {
            // 3.
            console.log("catch erro", err);
        });
};