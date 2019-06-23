import React from 'react';
import { Form, Button } from 'semantic-ui-react';
import PropTypes from 'prop-types';

function FileUploadForm(props) {
    const { acceptedFileType, uploadFile, onFileChanged } = props;
    return (
        <Form>
            <Form.Field>
                <label>Upload Markdown File</label>
                <input
                    accept={acceptedFileType}
                    type='file'
                    onChange={onFileChanged}
                />
                <Button
                    htmlFor='file'
                    onClick={uploadFile}
                >
                    Upload
                </Button>
            </Form.Field>
        </Form>
    );
}

FileUploadForm.propTypes = {
    acceptFileType: PropTypes.string,
    onFileChanged: PropTypes.func.isRequired,
    uploadFile: PropTypes.func.isRequired
}

export default FileUploadForm;
