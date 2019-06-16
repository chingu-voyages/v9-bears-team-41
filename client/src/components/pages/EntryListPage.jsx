import React, { Component } from 'react';
import EntryLink from '../EntryLink';

class EntryListPage extends Component {
    render() {
        return (
            <div id="EntryListPage">
                <EntryLink entryName='this is entry 1' />
            </div>
        );
    }
}

export default EntryListPage;
