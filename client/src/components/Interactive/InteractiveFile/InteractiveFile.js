import React, { useContext } from 'react';
import { Dashboard } from '@uppy/react';
import PropTypes from 'prop-types';
import { ModalContext } from '../../../context';
import './InteractiveFile.scss';

const InteractiveFile = ({ uppy }) => {
    const context = useContext(ModalContext);
    return (
        <div
            className="InteractiveFile"
            onClick={() => {
                context.openModalWith(
                    <Dashboard
                        uppy={uppy}
                        plugins={['Instagram', 'Webcam', 'Url']}
                        proudlyDisplayPoweredByUppy={false}
                        metaFields={[
                            { id : 'name', name : 'Name', placeholder : 'File name' },
                        ]}
                        browserBackButtonClose
                    />
                );
            }}
        >
            <span className="icon">
                <i className="fas fa-cloud-upload-alt" />
            </span>
        </div>
    );
};

InteractiveFile.propTypes = {
    uppy : PropTypes.object.isRequired
};

export default InteractiveFile;
