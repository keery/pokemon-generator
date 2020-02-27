import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import './InteractiveSelectHover.scss';
import retreatLogo from '../../../assets/1-gen/normal.png';

const InteractiveSelectHover = ({ name, max, defaultValue, handleClick, x, y, height, width, setRetreatVisible }) => {
    const [count, setCount] = useState(defaultValue);
    const [isDown, setDown] = useState(false);
    const inputRef = useRef(null);

    const ico = [];
    for (let index = 0; index < count; index++) {
        ico.push(<i key={`retreat-${index}`}><img src={retreatLogo} onMouseEnter={() => setCount(index + 1)} alt="" /></i>);
    }

    if (count < max) {
        ico.push(
            <span className="more-icon fade" onMouseEnter={() => setCount(count + 1)} key="retreat-lf">
                <img src={retreatLogo} alt="" />
            </span>
        );
    } else {
        ico.pop();
        ico.push(<span className="more-icon" key="retreat-l"><img src={retreatLogo} alt="" /></span>);
    }

    return (
        <div
            className={`InteractiveSelectHover ${isDown ? 'down' : ''}`}
            style={{
                left   : `${x}%`,
                top    : `${y}%`,
                height : `${height}%`,
                width  : `${width}%`,
            }}
            onMouseEnter={() => setRetreatVisible(false)}
            onMouseLeave={() => setRetreatVisible(true)}
            onMouseDown={() => setDown(true)}
            onMouseUp={() => setDown(false)}
            onClick={() => inputRef.current.click()}
        >
            <input
                type="hidden"
                name={name}
                ref={inputRef}
                value={count}
                onClick={handleClick}
            />
            { ico }
        </div>
    );
};

InteractiveSelectHover.propTypes = {
    name              : PropTypes.string.isRequired,
    max               : PropTypes.number,
    defaultValue      : PropTypes.number,
    handleClick       : PropTypes.func.isRequired,
    setRetreatVisible : PropTypes.func.isRequired,
    x                 : PropTypes.number,
    y                 : PropTypes.number,
    height            : PropTypes.number,
    width             : PropTypes.number,
};

InteractiveSelectHover.defaultProps = {
    max          : 4,
    defaultValue : 0,
    x            : 0,
    y            : 0,
    height       : 5,
    width        : 100,
};


export default InteractiveSelectHover;
