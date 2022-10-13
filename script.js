// TODO
//
// 5.
// Adicionar favoritos à listagem (*)
//
// 6.
// Guardar favoritos em local storage
// (*)-obrigatório
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

const init = () => {
    // 3.
    getGenres(populateGenres);

    const genresDropDownList = document.getElementById("genres");

    genresDropDownList.addEventListener("change", function () { // Não consegui implementar a arrow f
        // 3.
        const genreSelected = this.value;
        console.log("genreSelected>>>>", genreSelected);

        let filteredMovies;

        if (genreSelected !== "All genres") {
            console.log("genreSelected inside if", genreSelected);
            getMoviesFromCategory(genreSelected);  // antes => filteredMovies = getMoviesFromCategory(genreSelected);
            console.log("return getMoviesFromCategory", filteredMovies);
        } else {
            getMovies(); // antesfilteredMovies = getMovies()
        }

        // displayMovieList(filteredMovies); Aqui estava o erro da consola.
    });
};

const displayMovieList = (movies) => {
    // 3.
    //Quando os filmes são filtrados este movies não estava a entrar no formato adequado
    document.getElementById("main").innerHTML = "";
    console.log("displayMovieList", movies);

    if (movies.length > 0) {
        // 7. - Organizar os filmes cronologicamente
        movies.sort((a, b) => b.year - a.year); // 3.
        movies.forEach((movie) => {
            // 3.
            document.getElementById("main").innerHTML += getMovieHtml(movie);
        });
    } else {
        // 2. - Mensagem de ausência de filmes
        console.log("Não existem filmes para a categoria selecionada.");
        document.getElementById("main").innerHTML += noMovies();
    }
};

const noMovies = () => // 3.
    `<div class="noMovies">
    <h2>Não existem filmes para a categoria selecionada.</h2>
    </div>`;

const getMovieHtml = (movie) => // 3.
    `<div class="movie">
    <h2>${movie.title}</h2>
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

const populateGenres = (data) => { // 3.
    data.forEach((genre) => { // 3.
        let option = document.createElement("option");
        option.text = genre;
        document.getElementById("genres").add(option);
    });
};

const domIsReady = () => { // 3.
    init(getMovies(handleMovies));
};

document.addEventListener("DOMContentLoaded", domIsReady);

const getGenres = () => { // 3.
    fetch("https://moviesfunctionapp.azurewebsites.net/api/GetGenres") // 4.
        .then((res) => res.json()) // 3.
        .then((json) => populateGenres(json)) // 3.
        .catch((err) => console.log(err)); // 3.
};

const getMovies = () => { // 3.
    fetch("https://moviesfunctionapp.azurewebsites.net/api/GetMovies")
        .then((res) => res.json()) // 3.
        .then((json) => { // 3.
            console.log(json);
            displayMovieList(json);
        })
        .catch((err) => console.log(err)); // 3.
};

const handleMovies = (status, response) => { // 3.
    if (status == 200) {
        console.log("Tudo OK");
        console.log(response);
        displayMovieList(response);
    } else {
        console.log("Error: " + status);
    }
};

const getMoviesFromCategory = (category) => { // 3.
    console.log("getMoviesFromCategory");
    console.log(category);

    // 1. - Chamada dos filmes com categoria
    let url =
        "https://moviesfunctionapp.azurewebsites.net/api/GetMovies?category=" +
        category;
    console.log(url);
    fetch(url)
        .then((res) => res.json()) // 3.
        .then((json) => { // 3.
            console.log("json>>", json);
            displayMovieList(json); //formato anterior -> displayMovieList(json.json())
        })
        .catch((err) => { // 3.
            console.log("catch erro", err);
        });
};