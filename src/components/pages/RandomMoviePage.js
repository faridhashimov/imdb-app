import React, { useEffect, useState } from 'react';
import { batman, imdb, rotten, metacritic } from '../../resources';
import useMovieService from '../../services/MovieService';




const SelectedMoviePage = () => {
    const [movie, setMovie] = useState([]);
    const { loading, error, getMovieOnNewPage } = useMovieService();

    const movieArr = [
        'tt0372784',
        'tt2975590',
        'tt0096895',
        'tt0103776',
        'tt0112462',
        'tt0118688',
        'tt4116284',
        'tt0103359',
        'tt1569923',
        'tt4853102',
        'tt0848228',
        'tt4154796',
        'tt4154756',
        'tt2395427',
        'tt0118661',
        'tt1626038',
        'tt0491703',
        'tt0803093',
        'tt0054518',
        'tt2455546',
        'tt0145487',
        'tt0948470',
        'tt0316654',
        'tt0413300',
        'tt2250912',
        'tt1872181',
        'tt10872600',
        'tt4633694',
        'tt6320628',
        'tt0112175',
        'tt0111161',]

    useEffect(() => {
        updateMovie();
    }, [])

    const onMovieSelected = (movie) => {
        setMovie(movie);
    }

    const updateMovie = () => {
        const movieID = movieArr[Math.floor(Math.random() * 32)];
        console.log(movieID);
        
        getMovieOnNewPage(movieID)
            .then(onMovieSelected)
    };

    const { title, poster, type, plot, year, country, rated, runtime, genre, director, writer, actors, boxoffice, imdbID, rottenID, metacriticID} = movie;


    let checkInfo = (item) => {
        if(item === 'N/A' || item === undefined) {
            return 'No available information'
        }
        return item;
    }
    let contentType = type === undefined ? null : type.charAt(0).toUpperCase() + type.slice(1);


    return (
        <div className='w-full flex justify-center pb-10'>
            <div className="w-11/12 flex justify-center flex-col items-start border-2 flex-wrap shadow-around p-4 rounded-lg cursor-pointer">
                <h1 className="w-full mx-auto text-center py-3 mb-7 shadow-around px-4 rounded-md">
                    <span className="  font-bold text-xl my-0 mx-auto ">
                        {/* Batman Begins  */}
                        {checkInfo(title)}
                    </span>
                </h1>
                <div className='flex justify-between w-full'>
                    <div className="cursor-pointer h-72 w-52 relative rounded-lg overflow-hidden mb-3 mr-5">
                        <img className="w-full h-full" src={poster} alt="Batman" />
                    </div>
                    <div className='w-4/5 shadow-around px-3 py-2 rounded-lg'>
                        <h1>
                            <span className="font-bold">Type: </span>
                            {/* Movie */}
                            {checkInfo(contentType)}
                        </h1>
                        <h1>
                            <span className="font-bold">Year: </span>
                            {/* 2005 */}
                            {checkInfo(year)}
                        </h1>
                        <h1>
                            <span className="font-bold">Country: </span>
                            {/* United States, United Kingdom */}
                            {checkInfo(country)}
                        </h1>
                        <h1>
                            <span className="font-bold">Rated: </span>
                            {/* PG-13 */}
                            {checkInfo(rated)}
                        </h1>
                        <h1>
                            <span className="font-bold">Runtime: </span>
                            {/* 140 min */}
                            {checkInfo(runtime)}
                        </h1>
                        <h1>
                            <span className="font-bold">Genre: </span>
                            {/* Action, Crime, Drama */}
                            {checkInfo(genre)}
                        </h1>
                        <h1>
                            <span className="font-bold">Director: </span>
                            {/* Christopher Nolan */}
                            {checkInfo(director)}
                        </h1>
                        <h1>
                            <span className="font-bold">Writer(s): </span>
                            {/* Bob Kane, David S. Goyer, Christopher Nolan */}
                            {checkInfo(writer)}
                        </h1>
                        <h1>
                            <span className="font-bold">Actors: </span>
                            {/* Christian Bale, Michael Caine, Ken Watanabe */}
                            {checkInfo(actors)}
                        </h1>
                     
                        <h1>
                            <span className="font-bold">BoxOffice: </span>
                            {/* $206,852,432 */}
                            {checkInfo(boxoffice)}
                        </h1>
                        <div className='flex w-full justify-between my-2 shadow-aroundsm p-2 rounded-md'>
                            <div className='flex justify-center items-center shadow-aroundsm p-1 rounded-md'><img className='w-12 mr-3' src={imdb} alt="imdb" /><span className='text-sm font-bold text-lime-500'>{imdbID}</span> </div>
                            <div className='flex justify-center items-center shadow-aroundsm p-1 rounded-md'><img className='w-24 mr-3' src={metacritic} alt="metacritic" /><span className='text-sm font-bold text-lime-500'>{metacriticID}</span> </div>
                            <div className='flex justify-center items-center shadow-aroundsm p-1 rounded-md'><img className='w-24 mr-3' src={rotten} alt="rotten" /><span className='text-sm font-bold text-lime-500'>{rottenID}</span> </div>
                        </div>
                    </div>
                </div>
                <div className="leading-5 mt-7 shadow-around w-full px-3 py-2 rounded-lg">
                    <div className='w-full text-center mb-2'><span className="font-bold">Plot</span> </div> 
                    <p className="pb-1 text-sm mb-5">
                        {/* After training with his mentor, Batman begins his fight to free crime-ridden Gotham City from corruption.
                        After training with his mentor, Batman begins his fight to free crime-ridden Gotham City from corruption. */}
                        {plot}
                    </p>
                 
                </div>
            </div>
        </div>
        
    );
};

export default SelectedMoviePage;
