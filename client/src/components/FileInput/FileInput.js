import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Dashboard } from '@uppy/react';
import { withTranslation } from 'react-i18next';
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
    }

    componentDidMount() {
        const { onChange, name, uppy } = this.props;
        uppy.on('transloadit:result', (stepName, result) => {
            const file = uppy.getFile(result.localId);

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
            uppy.reset();
            this.context.closeModal();
        });
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.value !== this.props.value && !this.props.value) {
            this.setState(EMPTY_STATE);
        }
    }

    componentWillUnmount() {
        this.props.uppy.off('upload-success');
        this.props.uppy.close();
    }

    handleFile = (event) => {
        this.context.openModalWith(
            <Dashboard
                uppy={this.props.uppy}
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
    onChange : PropTypes.func,
    name     : PropTypes.string.isRequired,
    uppy     : PropTypes.object.isRequired,
    value    : PropTypes.shape({
        src  : PropTypes.string,
        name : PropTypes.string,
    }),
};

export default withTranslation('fileInput')(FileInput);
