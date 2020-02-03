import React from 'react';
import PropTypes from 'prop-types';
import './InteractiveTextarea.scss';

const InteractiveTextarea = ({ name, x, y, height, width, fontSize, fontFamily, value, onChange }) => {
    return (
        <div
            style={{
                left   : `${x}%`,
                top    : `${y}%`,
                height : `${height}%`,
                width  : `${width}%`,
            }}
            className="InteractiveTextarea"
        >
            <textarea
                name={name}
                type="text"
                style={{
                    fontSize : `${fontSize}px`,
                    fontFamily,
                }}
                onChange={onChange}
                value={value}
            />
        </div>
    );
};

InteractiveTextarea.propTypes = {
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

InteractiveTextarea.defaultProps = {
    x          : 0,
    y          : 0,
    height     : 5,
    width      : 100,
    fontSize   : 16,
    fontFamily : 'pokevolution',
    value      : '',
};


export default InteractiveTextarea;
