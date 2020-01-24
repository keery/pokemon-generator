import React from 'react';
import PropTypes from 'prop-types';
import './InteractiveSelect.scss';

const InteractiveSelect = ({ x, y, height, width, fontSize, fontFamily }) => {
    return (
        <div
            style={{
                left   : `${x}%`,
                top    : `${y}%`,
                height : `${height}%`,
                width  : `${width}%`,
            }}
            className="InteractiveSelect"
        >
            <select>
                <option>1</option>
                <option>100</option>
                <option>1</option>
                <option>1</option>
            </select>
            <span className="border" />
        </div>
    );
};

InteractiveSelect.propTypes = {
    x          : PropTypes.number,
    y          : PropTypes.number,
    height     : PropTypes.number,
    width      : PropTypes.number,
    fontSize   : PropTypes.number,
    fontFamily : PropTypes.number,
};

InteractiveSelect.defaultProps = {
    x          : 0,
    y          : 0,
    height     : 5,
    width      : 100,
    fontSize   : 15,
    fontFamily : 'pokename',
};


export default InteractiveSelect;
