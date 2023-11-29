import React from "react";
import PropTypes from 'prop-types';
import './style.css';
import { plural } from '../../utils'

function Controls({ onOpenCart, cartItemsAmount, totalPrice }) {
  return (
    <div className='Controls'>
      <div className='Controls-cart'>В корзине:</div>
      <div className='Controls-info'>
        {cartItemsAmount !== 0
          ? `${cartItemsAmount} ${plural(cartItemsAmount, { one: 'товар', few: 'товара', many: 'товаров' })} / ${totalPrice} ₽`
          : 'пусто '}
      </div>
      <button onClick={() => onOpenCart()} className='Controls-btn'>Перейти</button>
    </div>
  )
}

Controls.propTypes = {
  onOpenCart: PropTypes.func,
  cartItemsAmount: PropTypes.number,
  totalPrice: PropTypes.string
};

Controls.defaultProps = {
  onOpenCart: () => { },

}

export default React.memo(Controls);
