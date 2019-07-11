import React, { Component } from 'react';
import FileUploadForm from '../FileUploadForm';

class UploadPage extends Component {
    constructor(props) {
        super(props);
        this.uploadFile = this.uploadFile.bind(this);
        this.onFileChanged = this.onFileChanged.bind(this);

        this.file = null;

        this.state = {
            saved: null
        }
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
            .then(responseJson => {
                console.log(responseJson);
                const saved = responseJson.saved;
                this.setState({ saved: saved });
            })
            .catch(console.error);
    }

    onFileChanged(event) {
        this.file = event.target.files[0];
    }

    render() {
        const { saved } = this.state;
        let saveStatus;
        if (saved === null) {
            saveStatus = <React.Fragment />;
        } else if (saved) {
            saveStatus = <p>Save Success!</p>;
        } else {
            saveStatus = <p>Save Failed!</p>;
        }
        return (
            <div>
                <FileUploadForm
                    acceptedFileType='.md'
                    uploadFile={this.uploadFile}
                    onFileChanged={this.onFileChanged}
                />
                {saveStatus}
            </div>
        );
    }
}

export default UploadPage;
