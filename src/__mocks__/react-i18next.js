import React from 'react';

module.exports = {
    // this mock makes sure any components using the translate HoC receive the t function as a prop
    withTranslation : () => Component => props => <Component t={jest.fn(t => t)} {...props} />,
};
