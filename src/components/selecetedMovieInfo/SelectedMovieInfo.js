import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import useMovieService from '../../services/MovieService';
import SkeletonAnimation from '../skeletonAnimation/SkeletonAnimation';
import SpinnerAnimation from '../spinnerAnimation/SpinnerAnimation';
import ErrorMessage from '../errorMessage/ErrorMessage';
import posterimg from '../../resources/img/image_not_found.png';


const SelectedMovieInfo = (props) => {
    const [movie, setMovie] = useState(null);
    const { movieID } = props;

    const { loading, error, getMovieById } = useMovieService();

    useEffect(() =>{
        updateMovie();
    }, [movieID])

    const onMovieUpdated = (movie) => {
        setMovie(movie);
    };

    const updateMovie = () => {
        if (!movieID) {
            return;
        }
        getMovieById(movieID)
            .then(onMovieUpdated)
    };

        const skeleton = movie || loading || error ? null : <SkeletonAnimation />;
        const errorMessage = error ? <ErrorMessage /> : null;
        const spinner = loading ? <SpinnerAnimation /> : null;
        const content = !(loading || error || !movie) ? <View movie={movie} /> : null;

        // ref={this.myRef}

        return (
            <div className="w-72 flex justify-center items-center border-2 flex-wrap shadow-xl p-2 rounded-lg cursor-pointer">
                {errorMessage}
                {skeleton}
                {spinner}
                {content}
            </div>
        );
}

const View = ({ movie }) => {

    const { poster, title, plot, type, year, rated, runtime, genre, director, imdbID, writer, actors } = movie;

    let checkInfo = (item) => {
        if(item === 'N/A') {
            return 'No available information'
        }
        return item;
    }

    let descr = plot.length > 100 ? plot.slice(0, 110) + '...': plot;
    // let writers = checkInfo(writer).split(', ').slice(0, 3);
    let contentType = type.charAt(0).toUpperCase() + type.slice(1);
    let moviePoster = (poster === 'N/A') ?  posterimg : poster;

    
    return (
        <>
            <div className="cursor-pointer h-60 w-44 relative rounded-md overflow-hidden mb-3">
                <img className="w-full h-full" src={moviePoster} alt="Batman" />
            </div>
            <div className="leading-5 text-sm">
                <h1 className="border-b-2 text-center pb-3 px-5"><span className='font-bold text-xl my-0 mx-auto'>{checkInfo(title)}</span></h1>
                <p className="border-b-2 pb-1">{/* <span className="font-bold">Plot: </span>  */}{checkInfo(descr)}</p>
                <h1 className="border-b-2 pb-1"><span className="font-bold">Type: </span>{checkInfo(contentType)}</h1>
                <h1 className="border-b-2 pb-1"> <span className="font-bold">Year: </span> {checkInfo(year)} </h1>
                <h1 className="border-b-2 pb-1"><span className="font-bold">Rated: </span> {checkInfo(rated)} </h1>
                <h1 className="border-b-2 pb-1"><span className="font-bold">Runtime: </span>{checkInfo(runtime)}</h1>
                <h1 className="border-b-2 pb-1"><span className="font-bold">Genre: </span> {checkInfo(genre)} </h1>
                <div className='flex justify-center items-center'>
                    <Link to={`/movie/${imdbID}`} 
                    className='inline-block mt-2 mb-1 bg-lime-500 hover:bg-lime-400 font-bold rounded-md px-5 py-2 shadow-aroundsm'>Show More</Link>
                </div>
            </div>
        </>
    );
};

export default SelectedMovieInfo;
