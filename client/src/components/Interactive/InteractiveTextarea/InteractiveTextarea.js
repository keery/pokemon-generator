import React from 'react';
import PropTypes from 'prop-types';
import './InteractiveTextarea.scss';

const InteractiveTextarea = ({ x, y, height, width, fontSize, fontFamily }) => {
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
                type="text"
                style={{
                    fontSize : `${fontSize}px`,
                    fontFamily,
                }}
            />
        </div>
    );
};

InteractiveTextarea.propTypes = {
    x          : PropTypes.number,
    y          : PropTypes.number,
    height     : PropTypes.number,
    width      : PropTypes.number,
    fontSize   : PropTypes.number,
    fontFamily : PropTypes.string,
};

InteractiveTextarea.defaultProps = {
    x          : 0,
    y          : 0,
    height     : 5,
    width      : 100,
    fontSize   : 16,
    fontFamily : 'pokevolution',
};


export default InteractiveTextarea;
