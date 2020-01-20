import React, { useState, useEffect, useRef } from 'react';
import { useSpring, animated } from 'react-spring';
import PropTypes from 'prop-types';
import './ButtonList.scss';

const ButtonList = ({ items }) => {
    const [selected, selectItem] = useState(items[0]);
    const didMountRef = useRef(false);
    const [props, set] = useSpring(() => ({
        from   : { transform : 'scale(1)' },
        config : {
            precision : 0.9,
            duration  : 125,
        },
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
        } else {
            didMountRef.current = true;
        }
    }, [selected]);

    return (
        <div className="ButtonList">
            <animated.div className={`preview ${selected}`} style={props} />
            <ul className="list-items">
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
        </div>
    );
};

ButtonList.propTypes = {
    items : PropTypes.arrayOf(PropTypes.string),
};

ButtonList.defaultProps = {
    items : [],
};

export default ButtonList;
