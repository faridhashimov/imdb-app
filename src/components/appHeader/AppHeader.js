import React, { Component } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import './appHeader.css';
import logo from '../../resources/img/logo.png';

class AppHeader extends Component {
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
            <div className="h-36 flex flex-col justify-center items-center py-4">
                <div className="mb-5 el-width flex justify-start items-center rounded overflow-hidden shadow-md">
                    <img className="h-14 w-14 mr-32" src={logo} alt="Logo" />
                    <h2 className="main-col font-bold">
                        Don't know what to watch tonight? Don't worry...
                    </h2>
                </div>
                <form
                    className="el-width h-8 relative drop-shadow-md"
                    onSubmit={this.onSubmit}
                >
                    <input
                        type="text"
                        placeholder="Search the movie..."
                        className="p-2 h-8 w-full rounded font-sans focus:outline-none"
                        value={this.state.value}
                        onChange={this.onInputChange}
                    />
                    <button
                        type="submit"
                        className="absolute top-0.5 right-4 cursor-pointer"
                    >
                        <SearchIcon className="main-col" />
                    </button>
                </form>
            </div>
        );
    }
}

export default AppHeader;
