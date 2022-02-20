import { Component } from 'react';

import AppHeader from '../appHeader/AppHeader';
import MovieList from '../movieList/MovieList';
import SelectedMovieInfo from '../selecetedMovieInfo/SelectedMovieInfo';
import ErrorBoundary from '../errorBoundary/ErrorBoundary';

class App extends Component {
    state = {
        term: 'Batman',
        movieID: null,
        page: 1
    };

    onInput = (term) => {
        this.setState({ term });
    };

    getMovieId = (movieID) => {
        this.setState({ movieID });
    }

    render() {
        const { term, movieID } = this.state;
    
        return (
            <div>
                <AppHeader onInput={this.onInput} />
                <div className="flex justify-between items-start py-10 sm:pl-40 pl-10 pr-10">
                    <ErrorBoundary>
                        <MovieList term={term} getMovieId={this.getMovieId}/>
                    </ErrorBoundary>
                    <SelectedMovieInfo movieID={movieID} />
                </div>
            </div>
        );
    }
}

export default App;
