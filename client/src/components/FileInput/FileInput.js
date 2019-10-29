import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Uppy from '@uppy/core';
import Webcam from '@uppy/webcam';
import Instagram from '@uppy/instagram';
import AwsS3 from '@uppy/aws-s3';
import Url from '@uppy/url';
import { Dashboard } from '@uppy/react';
import { withTranslation } from 'react-i18next';
import French from '@uppy/locales/lib/fr_FR';
import Spanish from '@uppy/locales/lib/es_ES';
import { ModalContext } from '../../context';
import './FileInput.scss';

const EMPTY_STATE = {
    isUploaded  : false,
    uploadLabel : '',
};

class FileInput extends Component {
    static contextType = ModalContext;

    constructor(props) {
        super(props);

        if (props.value) {
            this.state = {
                isUploaded  : true,
                uploadLabel : props.value.name,
            };
        }
        else {
            this.state = EMPTY_STATE;
        }

        this.uppy = new Uppy({
            id                   : 'uppy-input',
            autoProceed          : true,
            locale               : this.getUppyTranslations(props.i18n.language),
            debug                : true,
            allowMultipleUploads : false,
            restrictions         : {
                maxFileSize      : 1000000,
                maxNumberOfFiles : 1,
                allowedFileTypes : ['image/*'],
            },
        })
            .use(Webcam)
            .use(Instagram, {
                companionUrl : process.env.REACT_APP_SERVER_URL,
            })
            .use(Url, {
                companionUrl : process.env.REACT_APP_SERVER_URL,
            })
            .use(AwsS3, {
                companionUrl : process.env.REACT_APP_SERVER_URL,
                limit        : 1,
            });
    }

    componentDidMount() {
        this.uppy.on('upload-success', (file, response) => {
            const { onChange, name } = this.props;

            this.setState({
                uploadLabel : file.name,
                isUploaded  : true,
            });

            onChange({
                target : {
                    name,
                    value : {
                        src  : response.uploadURL,
                        name : file.name,
                    },
                    getAttribute : () => false,
                },
            });
            this.uppy.reset();
            this.context.closeModal();
        });
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.value !== this.props.value && !this.props.value) {
            this.setState(EMPTY_STATE);
        }
    }

    componentWillUnmount() {
        this.uppy.off('upload-success');
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
        this.context.openModalWith(
            <Dashboard
                uppy={this.uppy}
                plugins={['Instagram', 'Webcam', 'Url']}
                proudlyDisplayPoweredByUppy={false}
                metaFields={[
                    { id : 'name', name : 'Name', placeholder : 'File name' },
                ]}
                browserBackButtonClose
            />
        );
    };

    render() {
        const { name } = this.props;
        const { uploadLabel, isUploaded } = this.state;

        return (
            <div>
                <div className="field">
                    <div
                        className={`file ${isUploaded ? 'uploaded' : ''}`}
                        onClick={this.handleFile}
                    >
                        <label className="file-label">
                            <div
                                className="file-input"
                                name={name}
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
    value    : false,
};

FileInput.propTypes = {
    onChange : PropTypes.func,
    name     : PropTypes.string.isRequired,
    value    : PropTypes.shape({
        src  : PropTypes.string,
        name : PropTypes.string,
    }),
};

export default withTranslation('fileInput')(FileInput);
