import PropTypes from 'prop-types';
import React, { Component } from 'react';

class FileInput extends Component {
    constructor(props) {
        super(props);

        this.state = {
            uploadLabel : 'Upload picture',
        };
    }

    componentDidUpdate(prevProps) {
        if (this.props.value !== prevProps.value && !this.props.value) {
            this.setState({ uploadLabel : 'Upload picture' });
        }
    }

    handleFile = (event) => {
        const { onChange } = this.props;

        if (event.target.files.length > 0) {
            this.setState({ uploadLabel : event.target.files[0].name });
        }
        onChange(event);
    };

    render() {
        const { name } = this.props;
        const { uploadLabel } = this.state;

        return (
            <div>
                <div className="field">
                    <div className="file is-primary is-boxed">
                        <label className="file-label">
                            <input
                                className="file-input"
                                type="file"
                                name={name}
                                onChange={this.handleFile}
                            />
                            <span className="file-cta">
                                <span className="file-icon">
                                    <i className="fas fa-cloud-upload-alt" />
                                </span>
                                <span className="file-label">{uploadLabel}</span>
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
    value    : PropTypes.object,
};

export default FileInput;
