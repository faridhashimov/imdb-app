class MovieService {
    _apibase = 'https://movie-database-imdb-alternative.p.rapidapi.com/';

    getData = async (url) => {
        let res = await fetch(`${url}`, {
            method: 'GET',
            headers: {
                'x-rapidapi-host':
                    'movie-database-imdb-alternative.p.rapidapi.com',
                'x-rapidapi-key':
                    '03122206c1mshbf1ff069199e6aep1fda91jsncc3c4a39c36d',
            },
        });

        if (!res.ok) {
            throw new Error(
                `Something went wrong with ${url}, error status ${res.status}`
            );
        }

        return res.json();
    };

    getAllMovies = async (title, page) => {
        const data = await this.getData(`${this._apibase}?s=${title}&r=json&page=${page}`);
        return data.Search.map(this._theMovieData);
    };

    getMovieById = async (id) => {
        const data = await this.getData(`${this._apibase}?r=json&i=${id}`);
        return this._theMovieData(data);
    };

    _theMovieData = (res) => {
        return {
            poster: res.Poster,
            title: res.Title,
            plot: res.Plot,
            year: res.Year,
            rated: res.Rated,
            runtime: res.Runtime,
            genre: res.Genre,
            director: res.Director,
            writer: res.Writer,
            actors: res.Actors,
            imdbID: res.imdbID,
            type: res.Type,
            totalResults: res.totalResults
        };
    };
}

export default MovieService;
