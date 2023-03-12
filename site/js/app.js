'use strict'

window.onload = () => {
    const form = document.getElementById('form');
    form.onsubmit = async(event) => {
        event.preventDefault();

        const queryField = document.getElementById('queryField');
        console.log(queryField.value);

        const shows = await fetchShows(queryField.value);
        showElements(shows);
        if (shows.length < 1) document.querySelector('main').innerHTML += '<h2>No shows by query found :/</h2>';

        window.scrollTo(0, 0);
    }
}

const fetchShows = async(query) => {
    try {
        const url = `https://api.tvmaze.com/search/shows?q=${query}`;
        const response = await fetch(url);
        const json = await response.json();
        console.log(json);

        const showData = json.map(element => element.show);
        const shows = [];
        showData.forEach(show => {
            shows.push(
                {
                    name: show.name ? show.name : '',
                    image: show.image ? show.image.medium : 'img/errimage.jpg',
                    genres: show.genres ? show.genres : '',
                    summary: show.summary ? show.summary : '',
                    link: show.officialSite ? show.officialSite : '',
                    officialSite: show.officialSite ? 'official site' : ''
                });
        });
        return shows;
    } catch (e) {
        console.log(e);
    }
}

const showElements = (shows) => {
    const main = document.querySelector('main');
    main.innerHTML = '';
    shows.forEach((show, i) => {
        main.innerHTML +=
            `<article><h6>a TV show article</h6>
                <figure>
                    <img src=${show.image} alt='Related TV show poster'>
                </figure>
                <section>
                    <header>
                        <h2>${show.name}</h2>
                    </header>
                    <div id='genres${i}'></div>
                    ${show.summary}
                    <a href=${show.link}>${show.officialSite}</a>
                </section>
            </article>`;

        const genres = document.getElementById(`genres${i}`);
        show.genres.forEach(genre => {
            const element = document.createElement('span');
            element.innerText = genre;
            genres.appendChild(element);
        })
    });
}