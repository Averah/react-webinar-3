import React, {useCallback, useMemo, useState} from 'react';
import List from "./components/list";
import Controls from "./components/controls";
import Head from "./components/head";
import PageLayout from "./components/page-layout";
import { Modal } from './UI/Modal';
import Cart from './components/cart';

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({store}) {
  const list = store.getState().list;

  const [isCartOpen, setIsCartOpen] = useState(false)

  const totalPrice = list.reduce((price, item) => price + item.cartQuantity * item.price, 0);
  const uniqItemsQuantityInCart = list.reduce((quantity, item) => item.cartQuantity ? quantity + 1 : quantity, 0);
  const cartItems = useMemo(() => list.filter(item => item.cartQuantity), [list]);

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
      <Head title='Магазин'/>
      <Controls cartItemsAmount={uniqItemsQuantityInCart} totalPrice={totalPrice} onOpenCart={callbacks.onOpenCart} />
      <Modal isOpen={isCartOpen} closeModal={callbacks.closeModal}>
        <Cart 
        onDeleteItem={callbacks.onDeleteItem} 
        closeModal={callbacks.closeModal} 
        cartItems={cartItems}
        totalPrice={totalPrice} />
      </Modal>
      <List list={list} onAddItem={callbacks.onAddItem} />
    </PageLayout>
  );
}

export default App;
