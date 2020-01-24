import React from 'react';
import PropTypes from 'prop-types';
import './InteractiveInput.scss';

const InteractiveInput = ({ x, y, height, width, fontSize, fontFamily }) => {
    return (
        <div
            style={{
                left   : `${x}%`,
                top    : `${y}%`,
                height : `${height}%`,
                width  : `${width}%`,
            }}
            className="InteractiveInput"
        >
            <input
                type="text"
                style={{
                    fontSize : `${fontSize}px`,
                    fontFamily,
                }}
            />
        </div>
    );
};

InteractiveInput.propTypes = {
    x          : PropTypes.number,
    y          : PropTypes.number,
    height     : PropTypes.number,
    width      : PropTypes.number,
    fontSize   : PropTypes.number,
    fontFamily : PropTypes.number,
};

InteractiveInput.defaultProps = {
    x          : 0,
    y          : 0,
    height     : 5,
    width      : 100,
    fontSize   : 15,
    fontFamily : 'pokename',
};


export default InteractiveInput;
