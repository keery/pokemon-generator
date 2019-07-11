import PropTypes from 'prop-types';
import React from 'react';

const Field = ({ label, children }) => (
    <div className="field">
        <label className="label">{label}</label>
        {children}
    </div>
);

Field.propTypes = {
    label : PropTypes.string.isRequired,
};

export default Field;
