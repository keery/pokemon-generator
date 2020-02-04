import React, { useState, useEffect, useRef } from 'react';
import { useSpring, animated } from 'react-spring';
import PropTypes from 'prop-types';
import './ButtonList.scss';

const ButtonList = ({ name, x, y, size, items, handleClick }) => {
    const [selected, selectItem] = useState(items[0]);
    const didMountRef = useRef(false);
    const inputRef = useRef(null);
    const [props, set] = useSpring(() => ({
        from   : { transform : 'scale(1)' },
        config : {
            precision : 0.9,
            duration  : 125,
        },
        height : `${size}rem`,
        width  : `${size}rem`,
    }));

    useEffect(() => {
        if (didMountRef.current) {
            set({
                to : [
                    { transform : 'scale(1.3)' },
                    { transform : 'scale(1)' },
                ],
                from : { transform : 'scale(1)' },
            });
            inputRef.current.click()
        } else {
            didMountRef.current = true;
        }
    }, [selected]);

    return (
        <div
            className="ButtonList"
            style={{
                left : `${x}%`,
                top  : `${y}%`,
            }}
        >
            <animated.div className={`preview ${selected}`} style={props} />
            <ul className="list-items">
                <li
                    key="default"
                    className="default"
                    onClick={() => selectItem('')}
                />
                {
                    items.map(item => (
                        <li
                            key={item}
                            className={item}
                            onClick={() => selectItem(item)}
                        />
                    ))
                }
            </ul>
            <input
                type="hidden"
                name={name}
                ref={inputRef}
                value={selected}
                onClick={handleClick}
            />
        </div>
    );
};

ButtonList.propTypes = {
    name        : PropTypes.string.isRequired,
    x           : PropTypes.number,
    y           : PropTypes.number,
    size        : PropTypes.number,
    items       : PropTypes.arrayOf(PropTypes.string),
    handleClick : PropTypes.func.isRequired,
};

ButtonList.defaultProps = {
    items : [],
    x     : 0,
    y     : 0,
    size  : 3,
};

export default ButtonList;
