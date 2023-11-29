import React from "react";
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css'
import Head from "../head";
import Item from "../item";

function Cart(props) {
    const { onDeleteItem, closeModal, cartItems, totalPrice, isCartOpen } = props;
    const cn = bem('Cart');
    const content = cartItems.length
        ? <>
            <div className={cn('list')}>
                {cartItems.map(item =>
                    <div key={item.code} className={cn('item')}>
                        <Item item={item} onDeleteItem={onDeleteItem} isCartOpen={isCartOpen} />
                    </div>
                )}
            </div>
            <div className={cn('price')}>
                <div className={cn('summary')}>Итого
                </div>
                <div className={cn('amount')}>
                    {`${totalPrice} ₽`}
                </div>
                <div className={cn('splash')}></div>
            </div>

        </>

        : <div className={cn('empty')}>В корзине пусто</div>


    return (
        <div className={cn()}>
            <div className={cn('head')}>
                <Head title='Корзина' />
                <button onClick={closeModal} className={cn('actions')}>Закрыть</button>
            </div>
            {content}
        </div>
    )


}

Cart.propTypes = {
    cartItems: PropTypes.arrayOf(PropTypes.shape({
        code: PropTypes.number
    })).isRequired,
    totalPrice: PropTypes.string,
    onDeleteItem: PropTypes.func,
};

Cart.defaultProps = {
    onDeleteItem: () => {
    },
    closeModal: () => {
    },
}


export default React.memo(Cart)


