import React from 'react'
import { ModalContext } from '../../context'
import { Modal } from '..'

export default () => (
    <ModalContext.Consumer>
        {({ isOpen, Content, closeModal }) => {
            if (isOpen && Content) {
                return <Modal content={Content} closeModal={closeModal} />
            }
        }}
    </ModalContext.Consumer>
)
