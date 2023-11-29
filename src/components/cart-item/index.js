import React from "react";
import PropTypes from "prop-types";
import {cn as bem} from '@bem-react/classname';
import './style.css';

function CartItem(props) {
    const { item, onDeleteItem } = props;
    console.log(item);
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
                {`${item.price} ₽`}
            </div>
            <div className={cn('actions')}>
                <button onClick={callbacks.onDeleteItem}>
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
