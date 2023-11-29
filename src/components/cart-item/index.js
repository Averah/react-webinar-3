import React from "react";
import PropTypes from "prop-types";
import { cn as bem } from '@bem-react/classname';
import { convertPrice } from "../../utils";
import './style.css';

function CartItem(props) {
    const { item, onDeleteItem } = props;
    const callbacks = {
        onDeleteItem: () => {
            onDeleteItem(item.code);
        }
    }
    const cn = bem('CartItem');

    return (
        <div className={cn()}>
            <div className={cn('code')}>{item.code}</div>
            <div className={cn('title')}>
                {item.title}
            </div>
            <div className={cn('price')}>
                {`${convertPrice(item.price)} ₽`}
            </div>
            <div className={cn('quantity')}>
                {`${item.cartQuantity} шт`}
            </div>
            <div className={cn('actions')}>
                <button onClick={callbacks.onDeleteItem} className={cn('btn')}>
                    Удалить
                </button>
            </div>
        </div>
    );
}

CartItem.propTypes = {
    item: PropTypes.shape({
        code: PropTypes.number,
        title: PropTypes.string,
        price: PropTypes.number,
        quantity: PropTypes.number
    }).isRequired,
    onDeleteItem: PropTypes.func,
};

CartItem.defaultProps = {
    onDeleteItem: () => {
    },
}

export default React.memo(CartItem);
