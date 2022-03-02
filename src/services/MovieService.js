import { useHttp } from '../hooks/http.hook';

const MovieService = () => {
    const {loading, request, error, clearError} = useHttp();

    const _apibase = 'https://movie-database-imdb-alternative.p.rapidapi.com/';
    const header = {
        'x-rapidapi-host':
            'movie-database-imdb-alternative.p.rapidapi.com',
        'x-rapidapi-key':
            '03122206c1mshbf1ff069199e6aep1fda91jsncc3c4a39c36d', //d
    } ;

    const getAllMovies = async (title, page) => {
        const data = await request(`${_apibase}?s=${title}&r=json&page=${page}`, {headers: header});
        return data.Search.map(_theMoviesData);
    };

    const getMovieById = async (id) => {
        const data = await request(`${_apibase}?r=json&i=${id}`, {headers: header});
        return _theMoviesData(data);
    };

    const _theMoviesData = (res) => {
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
        };
    };

    const getMovieOnNewPage = async (id) => {
        const data = await request(`${_apibase}?r=json&i=${id}`, {headers: header});
        return _theMovieData(data);
    };

    const _theMovieData = (res) => {
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
            type: res.Type,
            boxoffice: res.BoxOffice,
            imdbID: res.Ratings[0].Value,
            rottenID: res.Ratings.length < 2 ? null : res.Ratings[1].Value,
            metacriticID: res.Ratings.length < 3 ? null : res.Ratings[2].Value 
        };
    };

    return {loading, error, clearError, getMovieById, getAllMovies, getMovieOnNewPage }
}

export default MovieService;
