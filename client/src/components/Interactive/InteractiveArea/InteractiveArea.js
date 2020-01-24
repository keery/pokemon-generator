import React from 'react';
import PropTypes from 'prop-types';
import './InteractiveArea.scss';

const InteractiveArea = ({ x, y, height, width, children, handleClick }) => {
    return (
        <div
            style={{
                left   : `${x}%`,
                top    : `${y}%`,
                height : `${height}%`,
                width  : `${width}%`,
            }}
            className="InteractiveArea"
            onClick={handleClick}
        >
            { children }
        </div>
    );
};

InteractiveArea.propTypes = {
    x           : PropTypes.number,
    y           : PropTypes.number,
    height      : PropTypes.number,
    width       : PropTypes.number,
    handleClick : PropTypes.func.isRequired,
};

InteractiveArea.defaultProps = {
    x      : 0,
    y      : 0,
    height : 5,
    width  : 100,
};


export default InteractiveArea;
