import React, { Component } from 'react';
const ReactMarkdown = require('react-markdown');

const markdownString = '# This is a header\n\nAnd this is a paragraph'

class EntryPage extends Component {
    componentDidMount() {
        const entryName = window.location.search.substring(1);
        console.log(entryName);
    }

    render() {
        return (
            <div className="EntryPage">
                <p>This is the entry page</p>
                <ReactMarkdown source={markdownString} />
            </div>
        );
    }
}

export default EntryPage;
