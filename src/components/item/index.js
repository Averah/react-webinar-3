import React from "react";
import PropTypes from "prop-types";
import { convertPrice } from "../../utils";
import './style.css';

function Item(props) {

  const callbacks = {
    onAddItem: () => {
      props.onAddItem(props.item.code);
    }
  }

  return (
    <div className='Item'>
      <div className='Item-code'>{props.item.code}</div>
      <div className='Item-title'>
        {props.item.title}
      </div>
      <div className='Item-price'>
        {`${convertPrice(props.item.price)} ₽`}
      </div>
      <div className='Item-actions'>
        <button onClick={callbacks.onAddItem}>
          Добавить
        </button>
      </div>
    </div>
  );
}

Item.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    price: PropTypes.number
  }).isRequired,
  onAddItem: PropTypes.func,
};

Item.defaultProps = {
  onAddItem: () => {
  },
}

export default React.memo(Item);
