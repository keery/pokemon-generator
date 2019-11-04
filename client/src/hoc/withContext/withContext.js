import React, { useContext } from 'react';

export default function withContext(Context) {
    return (WrappedComponent) => {
        return (props, ref) => (<WrappedComponent {...props} {...useContext(Context)} />);
    };
}
