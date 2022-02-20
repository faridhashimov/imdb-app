import React, { Component } from 'react';
import MovieService from '../../services/MovieService';
import SkeletonAnimation from '../skeletonAnimation/SkeletonAnimation';
import SpinnerAnimation from '../spinnerAnimation/SpinnerAnimation';
import ErrorMessage from '../errorMessage/ErrorMessage';

class SelectedMovieInfo extends Component {
    state = {
        movie: null,
        loading: false,
        error: false,
    };

    movieService = new MovieService();

    componentDidMount = () => {
        this.updateMovie();
    };

    componentDidUpdate(prevProps) {
        if (this.props.movieID !== prevProps.movieID) {
            this.updateMovie();
        }
        
    }

    onMovieLoading = () => {
        this.setState({
            loading: true,
        });
    };

    onError = () => {
        this.setState({
            loading: false,
            error: true,
        });
    };

    onMovieUpdated = (movie) => {
        this.setState({
            movie,
            loading: false,
        });
    };

    updateMovie = () => {
        const { movieID } = this.props;
        if (!movieID) {
            return;
        }

        this.onMovieLoading();

        this.movieService
            .getMovieById(movieID)
            .then(this.onMovieUpdated)
            .catch(this.onError);
    };

    render() {
        const { movie, error, loading } = this.state;

        const skeleton = movie || loading || error ? null : <SkeletonAnimation />;
        const errorMessage = error ? <ErrorMessage /> : null;
        const spinner = loading ? <SpinnerAnimation /> : null;
        const content = !(loading || error || !movie) ? <View movie={movie} /> : null;

        return (
            <div className="w-72 flex justify-center items-center border-2 flex-wrap shadow-xl p-2 rounded-lg" ref={this.myRef}>
                {errorMessage}
                {skeleton}
                {spinner}
                {content}
            </div>
        );
    }
}

const View = ({ movie }) => {
    const { poster, title, plot, type, year, rated, runtime, genre, director, writer, actors } = movie;
    let descr = plot.length > 100 ? plot.slice(0, 110) + '...': plot;
    let writers = writer.split(', ').slice(0, 3);
    let contentType = type.charAt(0).toUpperCase() + type.slice(1);

    
    return (
        <>
            <div className="cursor-pointer h-60 w-40 relative rounded-md overflow-hidden mb-3">
                <img className="w-full h-full" src={poster} alt="Batman" />
            </div>
            <div className="leading-5 text-sm">
                <h1 className="border-b-2 text-center font-bold pb-3">{title}</h1>
                <p className="border-b-2 pb-1">
                    {/* <span className="font-bold">Plot: </span>  */}
                    {descr}
                </p>
                <h1 className="border-b-2 pb-1">
                    <span className="font-bold">Type: </span>
                    {contentType}
                </h1>
                <h1 className="border-b-2 pb-1">
                    <span className="font-bold">Year: </span>
                    {year}
                </h1>
                <h1 className="border-b-2 pb-1">
                    <span className="font-bold">Rated: </span>
                    {rated}
                </h1>
                <h1 className="border-b-2 pb-1">
                    <span className="font-bold">Runtime: </span>
                    {runtime}
                </h1>
                <h1 className="border-b-2 pb-1">
                    <span className="font-bold">Genre: </span>
                    {genre}
                </h1>
                <h1 className="border-b-2 pb-1">
                    <span className="font-bold">Director: </span>
                    {director}
                </h1>
                <h1 className="border-b-2 pb-1">
                    <span className="font-bold">Writer(s): </span>
                    {writers + '...'}
                </h1>
                <h1 className="border-b-2 pb-1">
                    <span className="font-bold">Actors: </span>
                    {actors}
                </h1>
            </div>
        </>
    );
};

export default SelectedMovieInfo;
