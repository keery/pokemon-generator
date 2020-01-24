import React from 'react';
import PropTypes from 'prop-types';
import './InteractiveSelect.scss';

const InteractiveSelect = ({ name, x, y, height, width, choices, onChange }) => {
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
            <select
                name={name}
                onChange={onChange}
            >
                { choices.map(choice => <option>{choice}</option>) }
            </select>
            <span className="border" />
        </div>
    );
};

InteractiveSelect.propTypes = {
    name     : PropTypes.string.isRequired,
    x        : PropTypes.number,
    y        : PropTypes.number,
    height   : PropTypes.number,
    width    : PropTypes.number,
    choices  : PropTypes.arrayOf(PropTypes.string),
    onChange : PropTypes.number.isRequired,
};

InteractiveSelect.defaultProps = {
    x       : 0,
    y       : 0,
    height  : 5,
    width   : 100,
    choices : [],
};


export default InteractiveSelect;
