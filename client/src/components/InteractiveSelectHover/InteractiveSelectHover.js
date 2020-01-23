import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './InteractiveSelectHover.scss';
import retreatLogo from '../../assets/1-gen/retreat.png';

const InteractiveSelectHover = ({ max, defaultValue, handleClick }) => {
    const [count, setCount] = useState(defaultValue);

    const ico = [];
    for (let index = 0; index < count; index++) {
        ico.push(<i><img src={retreatLogo} onMouseEnter={() => setCount(index + 1)} alt="" /></i>);
    }

    if (count < max) {
        ico.push(
            <span className="more-icon fade" onMouseEnter={() => setCount(count + 1)}>
                <img src={retreatLogo} alt="" />
            </span>
        );
    }
    else {
        ico.pop();
        ico.push(<span className="more-icon"><img src={retreatLogo} alt="" /></span>);
    }

    return (
        <div className="InteractiveSelectHover" onClick={() => handleClick(count)}>
            { ico }
        </div>
    );
};

InteractiveSelectHover.propTypes = {
    max          : PropTypes.number,
    defaultValue : PropTypes.number,
    handleClick  : PropTypes.func.isRequired,
};

InteractiveSelectHover.defaultProps = {
    max          : 4,
    defaultValue : 0,
};


export default InteractiveSelectHover;
