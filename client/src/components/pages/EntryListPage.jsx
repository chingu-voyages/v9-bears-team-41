import React, { Component } from 'react';
import EntryLink from '../EntryLink';
import './EntryListPage.css';
import SearchBar from '../SearchBar';

class EntryListPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            entryNames: []
        };
    }

    async componentDidMount() {
        const url = 'http://localhost:3001/file/all';
        try {
            const response = await fetch(url);
            if (!response.ok) { throw new Error(response.statusText); }
            const responseJson = await response.json();
            const entryNames = JSON.parse(responseJson.names);
            this.setState({ entryNames: entryNames });
        } catch (error) {
            console.error(error);
        }
    }

    render() {
        const { entryNames } = this.state;
        let entryLinkRenders = <React.Fragment />;
        if (entryNames.length > 0) {
            entryLinkRenders = entryNames.map((entryName, index) => {
                return <EntryLink key={index} entryName={entryName} />
            });
        }

        return (
            <div id="EntryListPage">
                <SearchBar />
                {entryLinkRenders}
            </div>
        );
    }
}

export default EntryListPage;
