import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Uppy from '@uppy/core';
import Webcam from '@uppy/webcam';
import Instagram from '@uppy/instagram';
import { Dashboard } from '@uppy/react';
import { withTranslation } from 'react-i18next';
import French from '@uppy/locales/lib/fr_FR';
import Spanish from '@uppy/locales/lib/es_ES';
import './FileInput.scss';

class FileInput extends Component {
    constructor(props) {
        super(props);

        this.state = {
            uploadLabel : '',
            isUploaded  : false,
        };

        this.uppy = new Uppy({
            id           : 'uppy-input',
            autoProceed  : true,
            locale       : this.getUppyTranslations(props.i18n.language),
            debug        : true,
            restrictions : {
                maxFileSize      : 1000000,
                maxNumberOfFiles : 1,
                allowedFileTypes : ['image/*'],
            },
        })
            .use(Webcam)
            .use(Instagram, {
                companionUrl : process.env.REACT_APP_SERVER_URL,
            });
    }

    componentWillUnmount() {
        this.uppy.close();
    }

    // eslint-disable-next-line class-methods-use-this
    getUppyTranslations(locale) {
        switch (locale) {
        case 'fr':
            return French;
        case 'es':
            return Spanish;
        default:
            return false;
        }
    }

    handleFile = (event) => {
        const { onChange } = this.props;

        if (event.target.files.length > 0) {
            this.setState({
                uploadLabel : event.target.files[0].name,
                isUploaded  : true,
            });
        }
        onChange(event);
    };

    render() {
        const { name } = this.props;
        const { uploadLabel, isUploaded } = this.state;

        return (
            <div>
                <div className="field">
                    <Dashboard
                        uppy={this.uppy}
                        plugins={['Instagram', 'Webcam']}
                        proudlyDisplayPoweredByUppy={false}
                        metaFields={[
                            { id : 'name', name : 'Name', placeholder : 'File name' },
                        ]}
                    />
                    <div className={`file ${isUploaded ? 'uploaded' : ''}`}>
                        <label className="file-label">
                            <input
                                className="file-input"
                                type="file"
                                name={name}
                                onChange={this.handleFile}
                            />
                            <span className="file-cta">
                                <span className="file-label">Upload picture</span>
                                <span className="file-icon">
                                    <i className="fas fa-cloud-upload-alt" />
                                </span>
                                <div className="file-label-uploaded">
                                    <span>{uploadLabel}</span>
                                </div>
                            </span>
                        </label>
                    </div>
                </div>
            </div>
        );
    }
}

FileInput.defaultProps = {
    onChange : () => null,
};

FileInput.propTypes = {
    onChange : PropTypes.func,
    name     : PropTypes.string.isRequired,
};

export default withTranslation('fileInput')(FileInput);
