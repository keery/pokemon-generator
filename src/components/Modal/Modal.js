import React from 'react';

const Modal = ({ content, closeModal }) => (
    <div className="Loader">
        <div className="loader-container">
            <button onClick={closeModal}>X</button>
            { content }
        </div>
    </div>
);


Modal.propTypes = {
};

export default Modal;