import React, { Component } from 'react';
import SearchIcon from '@mui/icons-material/Search';

class SearchForm extends Component {
    state = {
        value: '',
    };

    onInputChange = (e) => {
        this.setState({
            value: e.target.value,
        });
    };

    onSubmit = (e) => {
        e.preventDefault();
        if (this.state.value !== '') {
            this.props.onInput(this.state.value);
        }
        this.setState({
            value: '',
        });
    };

    render() {
        return (
            <form 
                className="el-width h-12 relative border-2 mx-auto border-lime-500 rounded-lg drop-shadow-lg"
                onSubmit={this.onSubmit}
                >
                <input
                    type="text"
                    placeholder="Search the movie..."
                    className="p-2 h-full w-full rounded-lg font-sans focus:outline-none"
                    value={this.state.value}
                    onChange={this.onInputChange}
                />
                <button
                    type="submit"
                    className="absolute top-2 right-4 cursor-pointer"
                >
                    <SearchIcon className="main-col" />
                </button>
            </form>
        )
    }
    
}

export default SearchForm