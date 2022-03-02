import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom/cjs/react-router-dom.min';
import { batman, imdb, rotten, metacritic } from '../../resources';
import ErrorMessage from '../errorMessage/ErrorMessage';
import SpinnerAnimation from '../spinnerAnimation/SpinnerAnimation';
import useMovieService from '../../services/MovieService';



const SelectedMoviePage = () => {
    const { movieId } = useParams();

    const [movie, setMovie] = useState(null);
    const { loading, error, getMovieOnNewPage, clearError } = useMovieService();

    useEffect(() => {
        updateMovie();
    }, [movieId])

    const onMovieSelected = (movie) => {
        setMovie(movie);
        // console.log(movie);
    }

    const updateMovie = () => {
        clearError();
        getMovieOnNewPage(movieId)
        .then(onMovieSelected)
    };

    const errorMessage = error ? <ErrorMessage/> : null;
    const spinner = loading ? <SpinnerAnimation/> : null;
    const content = !(loading || error || !movie) ? <View movie={movie} /> : null;


    return (
        <>
            {errorMessage}
            {spinner}
            {content}
        </>
    );
};

const View = ({movie}) => {
    console.log(movie);
    const { title, poster, type, plot, year, country, rated, runtime, genre, director, writer, actors, boxoffice, imdbID, rottenID, metacriticID } = movie;
    console.log(title, poster, type, plot, year, country, rated, runtime, genre, director, writer, actors, boxoffice, imdbID, rottenID, metacriticID);

    let checkInfo = (item) => {
        if(item === 'N/A' || item === undefined) {
            return 'No available information'
        }
        return item;
    }

    let contentType = type.charAt(0).toUpperCase() + type.slice(1);

    return (
        <div className='w-full flex justify-center pb-10'>
            <div className="w-8/12 flex justify-center flex-col items-start border-2 flex-wrap shadow-xl p-4 rounded-lg cursor-pointer">
                <h1 className="w-full text-center pb-7 pt-3">
                    <span className="font-bold text-xl my-0 mx-auto">
                        {checkInfo(title)}
                    </span>
                </h1>
                <div className='flex justify-between w-full'>
                    <div className="cursor-pointer h-72 w-52 relative rounded-lg overflow-hidden mb-3 mr-5">
                        <img className="w-full h-full" src={poster} alt="Batman" />
                    </div>
                    <div className='w-4/5 shadow-around px-3 py-2 rounded-lg'>
                        <h1><span className="font-bold">Type: </span> {checkInfo(contentType)} </h1>
                        <h1><span className="font-bold">Year: </span> {checkInfo(year)} </h1>
                        <h1><span className="font-bold">Country: </span> {checkInfo(country)} </h1>
                        <h1><span className="font-bold">Rated: </span> {checkInfo(rated)} </h1>
                        <h1><span className="font-bold">Runtime: </span> {checkInfo(runtime)} </h1>
                        <h1><span className="font-bold">Genre: </span> {checkInfo(genre)} </h1>
                        <h1><span className="font-bold">Director: </span> {checkInfo(director)} </h1>
                        <h1><span className="font-bold">Writer(s): </span> {checkInfo(writer)} </h1>
                        <h1><span className="font-bold">Actors: </span> {checkInfo(actors)} </h1>
                        <h1><span className="font-bold">BoxOffice: </span>{checkInfo(boxoffice)} </h1>
                        <div className='flex w-full justify-between my-2 shadow-aroundsm p-2 rounded-md'>
                            <div className='flex justify-center items-center shadow-aroundsm p-1 rounded-md'>
                                <img className='w-12 mr-3' src={imdb} alt="imdb" />
                                <span className='text-sm font-bold text-lime-500'>{imdbID} </span>
                            </div>
                            <div className='flex justify-center items-center shadow-aroundsm p-1 rounded-md'>
                                <img className='w-24 mr-3' src={metacritic} alt="metacritic" />
                                <span className='text-sm font-bold text-lime-500'> {metacriticID} </span>       
                            </div>
                            <div className='flex justify-center items-center shadow-aroundsm p-1 rounded-md'>
                                <img className='w-24 mr-3' src={rotten} alt="rotten" />
                                <span className='text-sm font-bold text-lime-500'> {rottenID} </span> 
                            </div>
                        </div>
                    </div>
                </div>
                <div className="leading-5 mt-7 shadow-around w-full px-3 py-2 rounded-lg">
                    <div className='w-full text-center mb-2'><span className="font-bold">Plot</span></div> 
                    <p className="pb-1 text-sm mb-5">{checkInfo(plot)}</p>
                </div>
            </div>
        </div>
    )


}

export default SelectedMoviePage;
