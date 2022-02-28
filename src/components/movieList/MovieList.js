import React, { useState, useEffect, useRef } from 'react';

import useMovieService from '../../services/MovieService';
import SpinnerAnimation from '../spinnerAnimation/SpinnerAnimation';
import ErrorMessage from '../errorMessage/ErrorMessage';
// import EmptyMovieList from '../emptyMovieList/EmptyMovieList';
import Button from '@mui/material/Button';
import posterimg from '../../resources/img/image_not_found.png';

import './movieList.css';

const MovieList = (props) =>  {
    const [movies, setMovies] = useState([]);
    const [page, setPage] = useState(1);
    const { term } = props;

    const { loading, error, getAllMovies } = useMovieService();

    useEffect(() => {
        updateMovieList(); 
        getElements()
    }, [term])

    const onMovielistUpdated = (newMovies) => {
        setMovies([...movies, ...newMovies]);
        setPage(page => page + 1);
    };


    const onLoad = () => {
        getAllMovies(term, page)
        .then(onMovielistUpdated)
    };

    const onUpdateByNewTerm = (newMovies) => {
        setMovies([...newMovies]);
        setPage(2);
    }

    const updateMovieList = () => {
        const page = 1;
         
        if (!term) {
            return;
        } 

        getAllMovies(term, page)
        .then(onUpdateByNewTerm)

        movieRefs.current.forEach(item => item.classList.remove('clicked'));
    };

    const movieRefs = useRef([]);

    const getElements = (el, i) => {
        movieRefs.current[i] = el;
    }

    const focusOnMovie = (id) => {
        movieRefs.current.forEach(item => item.classList.remove('clicked'));
        movieRefs.current[id].classList.add('clicked');
        movieRefs.current[id].focus();
    }

    const renderMenu = (arr) => {
        if (!arr) {
            return;
        }

        const items = arr.map((item, i) => {
        let poster = (item.poster === 'N/A') ?  posterimg : item.poster;
        
            return (
                <li
                    className="cursor-pointer h-72 w-48 relative rounded-md shadow-xl overflow-hidden unclicked"
                    key={i}
                    tabIndex={'0'}
                    ref={(e) => getElements(e, i)}
                    onClick={() => {
                        props.getMovieId(item.imdbID);
                        focusOnMovie(i);}}
                >
                    <img
                        className="w-full h-full"
                        src={poster}
                        alt="Batman"
                    />
                    <div className="h-10 w-full absolute bottom-0 left-0 bg-black opacity-60 hide "></div>
                    <div className="h-10 w-full absolute bottom-0 left-0 leading-4 text-xs text-center text-white p-1 hide ">
                        {item.title} {item.year}
                    </div>
                </li>
            );
        });

        return (
            <div className='flex flex-wrap mr-8 flex-col justify-between items-center'>
                <ul className=" grid md:grid-cols-2 lg:grid-cols-4 lg:gap-3 md:gap-5 gap-3 mb-8">
                    {items}
                </ul>
                <Button color={'primary'} variant="contained" size='large' onClick={onLoad} disabled={movies.length % 10 !== 0 ? true: false}>Load More</Button>
            </div>
        );
    };

    const items = renderMenu(movies);
    // const skeleton = loading || error || movies ? null : <EmptyMovieList />;
    const errorMessage = error ? <ErrorMessage /> : null;
    const spinner = loading ? <SpinnerAnimation /> : null;
    const content = !(loading || error) ? items : null;

    return (
        <>
            {/* {skeleton} */}
            {errorMessage}
            {spinner}
            {content}
        </>
    );
}

export default MovieList;
