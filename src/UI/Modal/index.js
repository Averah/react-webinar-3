import { useEffect } from 'react'
import { createPortal } from 'react-dom'
import PropTypes from 'prop-types';
import './style.css'
import React from 'react'

export const Modal = (props) => {
    const {isOpen, children, closeModal} = props;

    useEffect(() => {
        const keydownListener = (event) => {
            if (event.key === 'Escape' && isOpen) {
                closeModal()
            }
        }
        window.addEventListener('keydown', keydownListener)

        return () => {
            window.removeEventListener('keydown', keydownListener)
        }
    }, [closeModal, isOpen])

    if (!isOpen) {
        return null
    }

    const modalJsx = (
        <div className='Modal' onClick={closeModal}>
            <div onClick={(event) => event.stopPropagation()} className='Modal-content'>            
                {children}
            </div>
        </div>
    )

    return createPortal(modalJsx, document.body);
}

Modal.propTypes = {
    isOpen: PropTypes.bool,
    children: PropTypes.node,
    closeModal: PropTypes.func
};

Modal.defaultProps = {
    closeModal: () => {
    },
  }