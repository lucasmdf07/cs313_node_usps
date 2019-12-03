const API_KEY = '243617934df15cd416cb4fab0608b4ff';

const url = 'https://api.themoviedb.org/3/search/movie?api_key=243617934df15cd416cb4fab0608b4ff'

const searchButton = document.querySelector('#searchSubmit');
const searchInput = document.querySelector('#inputSearchBox');
const movieSearchable = document.querySelector('#movies-searchable');
const IMAGE_URL = 'https://image.tmdb.org/t/p/w500';
const imgElement = document.querySelector('img');

function generateUrl(path) {
    const url = `https://api.themoviedb.org/3${path}?api_key=243617934df15cd416cb4fab0608b4ff`;
    return url;
}

function movieSelection(movies) {
    return movies.map((movie) => {
        // if statement to make sure we do not display paths without images
        if (movie.poster_path) {
            return `<img 
                src=${IMAGE_URL + movie.poster_path} 
                data-movie-id=${movie.id}
            />`;
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
        <p id = "content-close">X</p>
        </div>  
    `;

    movieElement.innerHTML = movieTemplate;
    return movieElement;
}

function renderSearchMovies(data) {
    // data.results []
    movieSearchable.innerHTML = '';
    const movies = data.results;
    const movieBlock = createMovieContainer(movies);
    movieSearchable.appendChild(movieBlock);
    console.log('Data: ', data);

}

searchButton.onclick = function (event) {
    event.preventDefault();
    const value = searchInput.value;
    const path = '/search/movie';
    const newUrl = generateUrl(path) + '&query=' + value;

    fetch(newUrl)
        .then((res) => res.json())
        .then(renderSearchMovies)
        .catch((error) => {
            console.log('Error: ', error);
        });


    searchInput.value = '';

    console.log('value: ', value);

}

// function createReviews() {

// }

function createIframe(video) {
    const iframe = document.createElement('iframe');
    iframe.src = `https://www.youtube.com/embed/${video.key}`;
    iframe.width = 360;
    iframe.height = 315;
    iframe.allowFullscreen = true;

    return iframe;
}

function createVideoTemplate(data, content) {
    content.innerHTML = '<p id="content-close">X</p>';
    console.log('Videos: ', data);
    const videos = data.results;
    const length = videos.length > 4 ? 4 : videos.length;
    const iframeContainer = document.createElement('div');

    for (let i = 0; i < length; i++) {
        const video = videos[i];
        const iframe = createIframe(video);
        iframeContainer.appendChild(iframe);
        content.appendChild(iframeContainer);
    }
}


// Event Delegation
document.onclick = function (event) {

    const target = event.target;

    if (target.tagName.toLowerCase() === 'img') {
        // console.log('Hello World');
        const movieId = target.dataset.movieId;
        console.log('MovieId: ', movieId);
        const section = event.target.parentElement;
        const content = section.nextElementSibling;
        content.classList.add('content-display');

        const path = `/movie/${movieId}/videos`;
        const url = generateUrl(path);

        //fetch movie videos
        fetch(url)
            .then((res) => res.json())
            .then((data) => createVideoTemplate(data, content))
            .catch((error) => {
                console.log('Error: ', error);
            });

    }

    if (target.id === 'content-close') {
        const content = target.parentElement;
        content.classList.remove('content-display');

    }
}