import React, { Component } from 'react';
import { ModalContext } from '../../context';

const MODAL_CLASS = 'modal-open';
const ID_HTML_TAG = 'app';

class ModalProvider extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isOpen  : false,
            Content : false,
        };
    }

    openModalWith = (Content) => {
        document.getElementById(ID_HTML_TAG).classList.add(MODAL_CLASS);
        this.setState({ isOpen : true, Content });
    }

    closeModal = () => {
        document.getElementById(ID_HTML_TAG).classList.remove(MODAL_CLASS);
        this.setState({ isOpen : false, Content : false });
    }

    render() {
        const { isOpen, Content } = this.state;

        return (
            <ModalContext.Provider value={{
                Content,
                isOpen,
                openModalWith : this.openModalWith,
                closeModal    : this.closeModal,
            }}>
                { this.props.children }
            </ModalContext.Provider>
        );
    }
}

export default ModalProvider;
