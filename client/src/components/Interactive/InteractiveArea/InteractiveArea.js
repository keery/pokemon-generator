import React from 'react';
import PropTypes from 'prop-types';
import './InteractiveArea.scss';

const InteractiveArea = ({ x, y, height, width, children, handleClick, linkedGroup, focusField }) => {
    return (
        <div
            style={{
                left   : `${x}%`,
                top    : `${y}%`,
                height : `${height}%`,
                width  : `${width}%`,
            }}
            className="InteractiveArea"
            onClick={() => handleClick(linkedGroup, focusField)}
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
    linkedGroup : PropTypes.string.isRequired,
    focusField  : PropTypes.string.isRequired,
};

InteractiveArea.defaultProps = {
    x      : 0,
    y      : 0,
    height : 5,
    width  : 100,
};


export default InteractiveArea;
