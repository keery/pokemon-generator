import React from 'react';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import './Modal.scss';

const Modal = ({ content, closeModal, t }) => (
    <div className="Modal">
        <div className="modal-closing-area" />
        <div className="modal-container">
            <button
                id="modal-close"
                onClick={closeModal}
                type="button"
                title={t('close')}
            >
                <i className="fas fa-times" />
            </button>
            { content }
        </div>
    </div>
);


Modal.propTypes = {
    content    : PropTypes.node.isRequired,
    closeModal : PropTypes.func.isRequired,
    t          : PropTypes.func.isRequired,
};

export default withTranslation('index')(Modal);
