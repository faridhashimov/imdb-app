import { useHttp } from '../hooks/http.hook';

const MovieService = () => {
    const {loading, request, error, clearError} = useHttp();

    const _apibase = 'https://movie-database-imdb-alternative.p.rapidapi.com/';
    const header = {
        'x-rapidapi-host':
            'movie-database-imdb-alternative.p.rapidapi.com',
        'x-rapidapi-key':
            '03122206c1mshbf1ff069199e6aep1fda91jsncc3c4a39c36d',
    } ;

    // const getData = async (url) => {
    //     let res = await fetch(`${url}`, {
    //         method: 'GET',
    //         headers: {
    //             'x-rapidapi-host':
    //                 'movie-database-imdb-alternative.p.rapidapi.com',
    //             'x-rapidapi-key':
    //                 '03122206c1mshbf1ff069199e6aep1fda91jsncc3c4a39c36d',
    //         },
    //     });

    //     if (!res.ok) {
    //         throw new Error(
    //             `Something went wrong with ${url}, error status ${res.status}`
    //         );
    //     }

    //     return res.json();
    // };

    const getAllMovies = async (title, page) => {
        const data = await request(`${_apibase}?s=${title}&r=json&page=${page}`, {headers: header});
        return data.Search.map(_theMovieData);
    };

    const getMovieById = async (id) => {
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
            imdbID: res.imdbID,
            type: res.Type,
            totalResults: res.totalResults
        };
    };

    return {loading, error, clearError, getMovieById, getAllMovies }
}

export default MovieService;
