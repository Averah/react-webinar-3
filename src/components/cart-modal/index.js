import React from "react";
import { Modal } from "../../UI/Modal";
import Cart from "../cart";
import PropTypes from "prop-types";

function CartModal(props) {
    const { closeModal, onDeleteItem, isOpen, cartItems, totalPrice } = props;

    return (
        <Modal isOpen={isOpen} closeModal={closeModal}>
            <Cart
                onDeleteItem={onDeleteItem}
                cartItems={cartItems}
                totalPrice={totalPrice}
                closeModal={closeModal}
                isCartOpen={isOpen} />
        </Modal>
    )
};

CartModal.propTypes = {
    closeModal: PropTypes.func,
    onDeleteItem: PropTypes.func,
    isOpen: PropTypes.bool,
    cartItems: PropTypes.array,
    totalPrice: PropTypes.string,
};

CartModal.defaultProps = {
    closeModal: () => { },
    onDeleteItem: () => { },

}

export default React.memo(CartModal)