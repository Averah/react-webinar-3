import React, { useCallback, useMemo, useState } from 'react';
import List from "./components/list";
import Controls from "./components/controls";
import Head from "./components/head";
import PageLayout from "./components/page-layout";
import { convertPrice } from './utils';
import CartModal from './components/cart-modal';

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({ store }) {
  
  const [isCartOpen, setIsCartOpen] = useState(false)

  const list = store.getState().list;
  const totalPrice = convertPrice(store.getState().cart.totalPrice);
  const { uniqCartItemsAmount, cartItems } = store.getState().cart;

  const callbacks = {
    closeModal: useCallback(() => {
      setIsCartOpen(false)
    }, []),

    onOpenCart: useCallback(() => {
      setIsCartOpen(true)
    }, []),

    onAddItem: useCallback((code) => {
      store.addItemToCart(code);
    }, [store]),

    onDeleteItem: useCallback((code) => {
      store.deleteItemFromCart(code);
    }, [store])
  }

  return (
    <PageLayout>
      <Head title='Магазин' />
      <Controls totalPrice={totalPrice} uniqCartItemsAmount={uniqCartItemsAmount} onOpenCart={callbacks.onOpenCart} />
      <CartModal
        isOpen={isCartOpen}
        closeModal={callbacks.closeModal}
        onDeleteItem={callbacks.onDeleteItem}
        cartItems={cartItems}
        totalPrice={totalPrice} />
      <List list={list} onAddItem={callbacks.onAddItem} cartItems={cartItems} />
    </PageLayout>
  );
}

export default App;
