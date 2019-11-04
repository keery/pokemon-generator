import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Dashboard } from '@uppy/react';
import { withTranslation } from 'react-i18next';
import Url from '@uppy/url';
import Uppy from '@uppy/core';
import Webcam from '@uppy/webcam';
import Instagram from '@uppy/instagram';
import Transloadit from '@uppy/transloadit';
import { getUppyTranslations } from '../../setupTransloadit';
import { ModalContext } from '../../context';
import { withStore } from '../../hoc';
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
            locale               : getUppyTranslations(props.i18n.language),
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
            .use(Transloadit, props.transloaditParams);
    }

    componentDidMount() {
        this.uppy.on('transloadit:result', (stepName, result) => {
            const file = this.uppy.getFile(result.localId);
            const { onChange, name } = this.props;

            this.setState({
                uploadLabel : file.name,
                isUploaded  : true,
            });

            onChange({
                target : {
                    name,
                    value : {
                        src  : file.response.uploadURL,
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
    }

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
    transloaditParams : PropTypes.shape({
        signature : PropTypes.string,
        params    : PropTypes.string,
    }).isRequired,
    onChange : PropTypes.func,
    name     : PropTypes.string.isRequired,
    value    : PropTypes.shape({
        src  : PropTypes.string,
        name : PropTypes.string,
    }),
};

export default withStore(['transloaditParams'])(withTranslation('fileInput')(FileInput));
