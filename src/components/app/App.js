import { useState, useEffect } from 'react';

import AppHeader from '../appHeader/AppHeader';
import MovieList from '../movieList/MovieList';
import SelectedMovieInfo from '../selecetedMovieInfo/SelectedMovieInfo';
import ErrorBoundary from '../errorBoundary/ErrorBoundary';

const App = () => {
    const [term, setTerm] = useState('Batman');
    const [movieID, setMovieID] = useState(null);

    const onInput = (term) => {
        setTerm(term);
    };

    const getMovieId = (movieID) => {
        setMovieID(movieID);
    }

    return (
        <div className='pt-5'>
            <AppHeader onInput={onInput} />
            <div className="flex justify-between items-start py-10 px-14">
                <ErrorBoundary>
                    <MovieList term={term} getMovieId={getMovieId}/>
                </ErrorBoundary>
                <SelectedMovieInfo movieID={movieID} />
            </div>
        </div>
    );
    
}

export default App;
