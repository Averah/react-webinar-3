import React from "react";
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css'
import Head from "../head";
import CartItem from "../cart-item";

function Cart(props) {
    const { onDeleteItem, closeModal, cartItems, totalPrice } = props;
    const cn = bem('Cart');

    return (
        <div className={cn()}>
            <div className={cn('head')}>
                <Head title='Корзина' />
                <button onClick={closeModal} className={cn('head-actions')}>Закрыть</button>
            </div>
            <div className={cn('list')}>
                {cartItems.map(item =>
                    <div key={item.code} className={cn('list-item')}>
                        <CartItem item={item} onDeleteItem={onDeleteItem} />
                    </div>
                )}
            </div>
            <div className={cn('total-price')}>Итого
                {`${totalPrice} ₽`}
            </div>

        </div>

    )
}

Cart.propTypes = {
    cartItems: PropTypes.arrayOf(PropTypes.shape({
        code: PropTypes.number
    })).isRequired,
    totalPrice: PropTypes.number,
    onDeleteItem: PropTypes.func,
};

Cart.defaultProps = {
    onDeleteItem: () => {
    },
    closeModal: () => {
    },
}


export default React.memo(Cart)


