const API_KEY = '243617934df15cd416cb4fab0608b4ff';

const url = 'https://api.themoviedb.org/3/search/movie?api_key=243617934df15cd416cb4fab0608b4ff'

const searchButton = document.querySelector('#searchSubmit');
const searchInput = document.querySelector('#inputSearchBox');
const movieSearchable = document.querySelector('#movies-searchable');
const IMAGE_URL = 'https://image.tmdb.org/t/p/w500'

{
    /* <div class="movie">
        <section class="section">
            <img
                src=""
                alt=""
                data-movie-id="557"
            />
            <img
                src=""
                alt=""
                data-movie-id="557"
            />
        </section>
        <div class="content">
            <p id="content-close">X</p>
        </div>
    </div> */
}

function movieSelection(movies) {
    return movies.map((movie) => {
        // if statement to make sure we do not display paths without images
        if (movie.poster_path) {
            return `
                <img src=${IMAGE_URL + movie.poster_path} data-movie-id=${movie.id}/> 
                `;
        }
    })
}

function createMovieContainer(movies) {
    const movieElement = document.createElement('div');
    movieElement.setAttribute('class', 'movie');

    const movieTemplate = `
        <section class = "section">
            ${movieSelection(movies)}
        </section>
        <div class = "content">
        <p id = "content-close"></p>
        </div>  
    `;

    movieElement.innerHTML = movieTemplate;
    return movieElement;
}

searchButton.onclick = function (event) {
    event.preventDefault();
    const value = searchInput.value;
    const newUrl = url + '&query=' + value;

    fetch(newUrl)
        .then((res) => res.json())
        .then((data) => {

            // data.results []
            movieSearchable.innerHTML = '';
            const movies = data.results;
            const movieBlock = createMovieContainer(movies);
            movieSearchable.appendChild(movieBlock);
            console.log('Data: ', data);
        })
        .catch((error) => {
            console.log('Error: ', error);
        });
    
    
    searchInput.value = '';

    console.log('value: ', value);

}