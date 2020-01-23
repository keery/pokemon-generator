import React from 'react';
import PropTypes from 'prop-types';
import './InteractiveFile.scss';

const InteractiveFile = (props) => {
    return (
        <div className="InteractiveFile">
            <span className="icon">
                <i className="fas fa-cloud-upload-alt" />
            </span>
        </div>
    );
};

InteractiveFile.propTypes = {
};

InteractiveFile.defaultProps = {
};

export default InteractiveFile;
