import React, { Component } from 'react';
import EntryLink from '../EntryLink';

class EntryListPage extends Component {
    render() {
        return (
            <div id="EntryListPage">
                <EntryLink entryName='Entry 1' />
            </div>
        );
    }
}

export default EntryListPage;
