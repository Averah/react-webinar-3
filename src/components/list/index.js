import React from "react";
import PropTypes from 'prop-types';
import Item from "../item";
import './style.css';

function List({ list, onAddItem, onDeleteItem, isCartOpen }) {
  return (
    <div className='List'>{
      list.map(item =>
        <div key={item.code} className='List-item'>
          <Item item={item} onAddItem={onAddItem} onDeleteItem={onDeleteItem} isCartOpen={isCartOpen} />
        </div>
      )}
    </div>
  )
}

List.propTypes = {
  list: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.number
  })).isRequired,
  onAddItem: PropTypes.func,
  onDeleteItem: PropTypes.func,
  isCartOpen: PropTypes.bool,
};

List.defaultProps = {
  onAddItem: () => {
  },
  onDeleteItem: () => {
  },
}

export default React.memo(List);
