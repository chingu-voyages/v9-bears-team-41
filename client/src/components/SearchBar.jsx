import React, { Component } from 'react';

class SearchBar extends Component {
    constructor(props) {
        super(props);
    }

    async componentDidMount() {
        const searchUrl = 'localhost:3001/file/search';
    }

    render() {
        return (
            <div className="SearchBar">
                search bar
            </div>
        );
    }
}

export default SearchBar;
