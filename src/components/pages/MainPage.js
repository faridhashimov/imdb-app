import { useState } from 'react';

import SearchForm from '../searchForm/SearchForm';
import ErrorBoundary from '../errorBoundary/ErrorBoundary';
import SelectedMovieInfo from '../selecetedMovieInfo/SelectedMovieInfo';
import MovieList from '../movieList/MovieList';

const MainPage = () => {
    const [term, setTerm] = useState('Batman');
    const [movieID, setMovieID] = useState(null);

    const onInput = (term) => {
        setTerm(term);
    };

    const getMovieId = (movieID) => {
        setMovieID(movieID);
    };

    return (
        <>
            <SearchForm onInput={onInput}/>
            <div className="flex justify-between items-start py-10 px-14">
                <ErrorBoundary>
                    <MovieList term={term} getMovieId={getMovieId} />
                </ErrorBoundary>
                <SelectedMovieInfo movieID={movieID} />
            </div>
        </>
    )
}

export default MainPage