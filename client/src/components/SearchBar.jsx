import React, { Component } from 'react';
import './SearchBar.css';
import PropTypes from 'prop-types';

class SearchBar extends Component {
    constructor(props) {
        super(props);
        this.inputHandler = this.inputHandler.bind(this);
        this.buttonClickHandler = this.buttonClickHandler.bind(this);
        this.state = {
            inputValue: ''
        };
    }

    inputHandler(e) {
        this.setState({ inputValue: e.target.value });
    }

    buttonClickHandler() {
        const { inputValue } = this.state;
        this.props.onSearchUpdated(inputValue);
    }

    render() {
        return (
            <div id='searchBar'>
                <div id='searchBarInput'>
                    <input
                        placeholder='Enter search terms'
                        type='text'
                        value={this.state.inputValue}
                        onChange={this.inputHandler}
                    />
                </div>
                <div id='searchBarButton'>
                    <button onClick={this.buttonClickHandler}>
                        SEARCH
                    </button>
                </div>
            </div>
        );
    }
}

SearchBar.propTypes = {
    onSearchUpdated: PropTypes.func.isRequired
};

export default SearchBar;
