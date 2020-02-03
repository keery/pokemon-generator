import React from 'react';
import PropTypes from 'prop-types';
import './InteractiveInput.scss';

const InteractiveInput = ({ name, x, y, height, width, fontSize, fontFamily, onChange, value }) => {
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
                onChange={onChange}
                name={name}
                autoComplete="off"
                value={value}
            />
        </div>
    );
};

InteractiveInput.propTypes = {
    name       : PropTypes.string.isRequired,
    x          : PropTypes.number,
    y          : PropTypes.number,
    height     : PropTypes.number,
    width      : PropTypes.number,
    fontSize   : PropTypes.number,
    fontFamily : PropTypes.string,
    value      : PropTypes.string,
    onChange   : PropTypes.func.isRequired,
};

InteractiveInput.defaultProps = {
    value      : '',
    x          : 0,
    y          : 0,
    height     : 5,
    width      : 100,
    fontSize   : 15,
    fontFamily : 'pokename',
};


export default InteractiveInput;
