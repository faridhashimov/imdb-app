import React, { Component } from 'react';

import MovieService from '../../services/MovieService';
import SpinnerAnimation from '../spinnerAnimation/SpinnerAnimation';
import ErrorMessage from '../errorMessage/ErrorMessage';
import EmptyMovieList from '../emptyMovieList/EmptyMovieList';
import Button from '@mui/material/Button';

import './movieList.css';

class MovieList extends Component {
    state = {
        movies: [],
        loading: true,
        error: false,
        page: 1,
        newMoviesloading: false
    };

    movieService = new MovieService();

    componentDidMount = () => {
        this.updateMovieList();
    };

    componentDidUpdate(prevProps) {
        if (this.props.term !== prevProps.term) {
            this.updateMovieList();
        }
    }

    onMovielistLoading = () => {
        this.setState({
            newMoviesloading: true,
        });
    };

    onMovielistUpdated = (newMovies) => {
        this.setState(({movies, page}) =>({
            movies: [...movies, ...newMovies],
            loading: false,
            newMoviesloading: false,
            error: false,
            page: page + 1
        }));
    };

    onError = () => {
        this.setState({
            error: true,
            loading: false,
        });
    };

    onLoad = () => {
        const { term } = this.props;
        const { page } = this.state;

        this.onMovielistLoading();

        this.movieService
            .getAllMovies(term, page)
            .then(this.onMovielistUpdated)
            // .then(res => console.log(res))
            .catch(this.onError);
        console.log(this.state.page);
        
    };

    onUpdateByNewTerm = (newMovies) => {
        this.setState(() =>({
            movies: [...newMovies],
            loading: false,
            newMoviesloading: false,
            error: false,
            page: 2
        }));
    }

    updateMovieList = () => {
        const { term } = this.props;
        const page = this.props.page  ;
         
        if (!term) {
            return;
        } 

        this.onMovielistLoading();

        this.movieService
            .getAllMovies(term, page)
            .then(this.onUpdateByNewTerm)
            // .then(res => console.log(res))
            .catch(this.onError);
        console.log(this.state.page);
    };

    checkedMovie = null;
    movieList = [];

    setRef = element => {
        this.checkedMovie = element;
        this.movieList.push(this.checkedMovie);
    };

    checkMovieEl = (id) => {
        this.movieList.forEach((item, i) => {
            item.classList.remove('clicked');
            if(id === i) {
                item.classList.add('clicked')
            }
        })  
        // console.log(this.movieList);      
    }

    renderMenu = (arr) => {
        if (!arr) {
            return;
        }

        const items = arr.map((item, i) => {
            return (
                <li
                    className="cursor-pointer h-60 w-40 relative rounded-md shadow-xl overflow-hidden unclicked"
                    key={item.imdbID}
                    tabIndex={'0'}
                    ref={this.setRef}
                    onClick={() => {
                        this.props.getMovieId(item.imdbID);
                        this.checkMovieEl(i)}}
                >
                    <img
                        className="w-full h-full"
                        src={item.poster}
                        alt="Batman"
                    />
                    <div className="h-10 w-40 absolute bottom-0 left-0 bg-black opacity-60 hide "></div>
                    <div className="h-10 w-40 absolute bottom-0 left-0 leading-4 text-xs text-center text-white p-1 hide ">
                        {item.title} {item.year}
                    </div>
                </li>
            );
        });

        return (
            <div className='flex flex-wrap mr-14 flex-col justify-between items-center'>
                <ul className=" grid md:grid-cols-2 lg:grid-cols-4 lg:gap-3 md:gap-5 gap-3 mb-8">
                    {items}
                </ul>
                <Button color={'primary'} variant="contained" disabled={false} onClick={this.onLoad}>Load More</Button>
            </div>
        );
    };

    render() {
        const { movies, loading, error } = this.state;
        const items = this.renderMenu(movies);

        // const skeleton = loading || error || movies ? null : <EmptyMovieList />;
        const errorMessage = error ? <ErrorMessage /> : null;
        const spinner = loading ? <SpinnerAnimation /> : null;
        const content = !(loading || error ) ? items : null;

        return (
            <>
                {/* {skeleton} */}
                {errorMessage}
                {spinner}
                {content}
            </>
        );
    }
}

export default MovieList;
