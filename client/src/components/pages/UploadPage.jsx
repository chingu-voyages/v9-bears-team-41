import React, { Component } from 'react';
import FileUploadForm from '../FileUploadForm';

class UploadPage extends Component {
    constructor(props) {
        super(props);
        this.uploadFile = this.uploadFile.bind(this);
        this.onFileChanged = this.onFileChanged.bind(this);

        this.file = null;
    }

    uploadFile() {
        if (!this.file) {
            console.error('Please select a markdown file!');
            return;
        }

        console.log(this.file);
        const formData = new FormData();
        formData.append('file', this.file);
        fetch('http://localhost:3001/file', {
                method: 'POST',
                body: formData
            })
            .then(response => response.json())
            .then(responseJson => console.log(responseJson))
            .catch(console.error);
    }

    onFileChanged(event) {
        this.file = event.target.files[0];
    }

    render() {
        return (
            <div>
                <FileUploadForm
                    acceptedFileType='.md'
                    uploadFile={this.uploadFile}
                    onFileChanged={this.onFileChanged}
                />
            </div>
        );
    }
}

export default UploadPage;
