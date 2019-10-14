import React, { Component } from 'react';
import { ModalContext } from '../../context';

class ModalProvider extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isOpen  : false,
            Content : false,
        };
    }

    openModalWith = (Content) => {
        this.setState({ isOpen : true, Content });
    }

    closeModal = () => {
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
