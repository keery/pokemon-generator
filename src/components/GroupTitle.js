import PropTypes from 'prop-types';
import React from 'react';

const GroupTitle = ({ title, stepNumber, onClick }) => (
    <div className="gfields-header" onClick={onClick}>
        <div className="gfields-step">{ stepNumber }</div>
        <div>{ title }</div>
    </div>
);

GroupTitle.propTypes = {
    onClick       : PropTypes.func.isRequired,
    title         : PropTypes.string.isRequired,
    stepNumber    : PropTypes.string.isRequired,
}

export default GroupTitle
