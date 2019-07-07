import React, { Component } from 'react';
import EntryLink from '../EntryLink';
import './EntryListPage.css';
import SearchBar from '../SearchBar';

class EntryListPage extends Component {
    constructor(props) {
        super(props);
        this.onSearchUpdated = this.onSearchUpdated.bind(this);
        this.updateEntryNamesWithFetchResponse = this.updateEntryNamesWithFetchResponse.bind(this);

        this.state = {
            entryNames: []
        };
    }

    async componentDidMount() {
        const url = 'http://localhost:3001/file/all';
        try {
            const response = await fetch(url);
            await this.updateEntryNamesWithFetchResponse(response);
        } catch (error) {
            console.error(error);
        }
    }

    async onSearchUpdated(inputValue) {
        const searchUrl = 'http://localhost:3001/file/search';
        const data = { 'searchString': inputValue };
        try {
            const response = await fetch(
                searchUrl,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                }
            );
            this.updateEntryNamesWithFetchResponse(response);
        } catch (error) {
            console.error(error);
        }
    }

    async updateEntryNamesWithFetchResponse(response) {
        if (!response.ok) { throw new Error(response.statusText); }
        const responseJson = await response.json();
        const entryNames = JSON.parse(responseJson.names);
        this.setState({ entryNames: entryNames });
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
                <SearchBar
                    onSearchUpdated={this.onSearchUpdated}
                />
                {entryLinkRenders}
            </div>
        );
    }
}

export default EntryListPage;
