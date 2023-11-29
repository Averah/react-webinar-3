import React from "react";
import PropTypes from "prop-types";
import { convertPrice } from "../../utils";
import './style.css';
import { cn as bem } from '@bem-react/classname';

function Item(props) {
  const { item, onAddItem, onDeleteItem, isCartOpen } = props;
  const cn = bem('Item');

  const callbacks = {
    onAddItem: () => {
      onAddItem(item.code);
    },
    onDeleteItem: () => {
      onDeleteItem(item.code);
    }
  }

  return (
    <div className={cn()}>
      <div className={cn('code')}>{item.code}</div>
      <div className={cn('title')}>
        {item.title}
      </div>
      <div className={cn('price')}>
        {`${convertPrice(item.price)} ₽`}
      </div>
      {isCartOpen
        ? <>
          <div className={cn('quantity')}>
            {`${item.cartQuantity} шт`}
          </div>
          <div className={cn('actions')}>
            <button onClick={callbacks.onDeleteItem} className={cn('btn')}>
              Удалить
            </button>
          </div>
        </>
        : <div className={cn('actions')}>
          <button onClick={callbacks.onAddItem} className={cn('btn')}>
            Добавить
          </button>
        </div>
      }
    </div>
  );
}

Item.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    price: PropTypes.number,
    cartQuantity: PropTypes.number,
  }).isRequired,
  onAddItem: PropTypes.func,
  onDeleteItem: PropTypes.func,
  isCartOpen: PropTypes.bool
};

Item.defaultProps = {
  onAddItem: () => {
  },
  onDeleteItem: () => {
  },
}

export default React.memo(Item);
