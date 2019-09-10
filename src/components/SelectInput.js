import React from 'react';
import PropTypes from 'prop-types';

const SelectInput = ({
    value, name, onChange, choices, suffix, blankLine, nested,
}) => {
    const list = Array.from(choices);
    if (blankLine) list.unshift('');

    return (
        <div className="select">
            <select name={name} onChange={onChange} value={value} nested={nested}>
                {list.length > 0
                    && list.map(el => (
                        <option value={el.toLowerCase().replace(/ /g, '')} key={el}>
                            {el + suffix}
                        </option>
                    ))}
            </select>
        </div>
    );
};

SelectInput.defaultProps = {
    onChange  : () => null,
    choices   : [],
    suffix    : '',
    blankLine : true,
    nested    : '',
};

SelectInput.propTypes = {
    blankLine : PropTypes.bool,
    onChange  : PropTypes.func,
    nested    : PropTypes.string,
    name      : PropTypes.string.isRequired,
    choices   : PropTypes.arrayOf(PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
    ])),
    value  : PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    suffix : PropTypes.string,
};

export default SelectInput;
