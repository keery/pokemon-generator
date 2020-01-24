import React from 'react';
import PropTypes from 'prop-types';
import './InteractiveSelect.scss';

const InteractiveSelect = ({ x, y, height, width, choices }) => {
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
                { choices.map(choice => <option>{choice}</option>) }
            </select>
            <span className="border" />
        </div>
    );
};

InteractiveSelect.propTypes = {
    x       : PropTypes.number,
    y       : PropTypes.number,
    height  : PropTypes.number,
    width   : PropTypes.number,
    choices : PropTypes.arrayOf(PropTypes.string),
};

InteractiveSelect.defaultProps = {
    x       : 0,
    y       : 0,
    height  : 5,
    width   : 100,
    choices : [],
};


export default InteractiveSelect;
