import React from 'react';
import PropTypes from 'prop-types';
import './InteractiveSelect.scss';

const InteractiveSelect = ({ name, x, y, height, width, choices, onChange, addClass, value }) => {
    return (
        <div
            style={{
                left   : `${x}%`,
                top    : `${y}%`,
                height : `${height}%`,
                width  : `${width}%`,
            }}
            className={`InteractiveSelect ${addClass}`}
        >
            <select
                name={name}
                onChange={onChange}
                value={value}
            >
                { choices.map(choice => <option key={`is-${choice}`}>{choice}</option>) }
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
    onChange : PropTypes.func.isRequired,
    addClass : PropTypes.string,
    value    : PropTypes.string,
};

InteractiveSelect.defaultProps = {
    x        : 0,
    y        : 0,
    height   : 5,
    width    : 100,
    choices  : [],
    addClass : '',
    value    : '',
};

export default InteractiveSelect;
