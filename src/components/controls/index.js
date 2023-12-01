import React from "react";
import PropTypes from 'prop-types';
import './style.css';
import { plural } from '../../utils'

function Controls({ onOpenCart, uniqCartItemsAmount, totalPrice }) {
  return (
    <div className='Controls'>
      <div className='Controls-cart'>В корзине:</div>
      <div className='Controls-info'>
        {uniqCartItemsAmount !== 0
          ? `${uniqCartItemsAmount} ${plural(uniqCartItemsAmount, { one: 'товар', few: 'товара', many: 'товаров' })} / ${totalPrice} ₽`
          : 'пусто '}
      </div>
      <button onClick={() => onOpenCart()} className='Controls-btn'>Перейти</button>
    </div>
  )
}

Controls.propTypes = {
  onOpenCart: PropTypes.func,
  uniqCartItemsAmount: PropTypes.number,
  totalPrice: PropTypes.string
};

Controls.defaultProps = {
  onOpenCart: () => { },

}

export default React.memo(Controls);
