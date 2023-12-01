import {generateCode} from "./utils";

/**
 * Хранилище состояния приложения
 */
class Store {
  constructor(initState = {}) {
    this.state = initState;
    this.listeners = []; // Слушатели изменений состояния
  }

  /**
   * Подписка слушателя на изменения состояния
   * @param listener {Function}
   * @returns {Function} Функция отписки
   */
  subscribe(listener) {
    this.listeners.push(listener);
    // Возвращается функция для удаления добавленного слушателя
    return () => {
      this.listeners = this.listeners.filter(item => item !== listener);
    }
  }

  /**
   * Выбор состояния
   * @returns {Object}
   */
  getState() {
    return this.state;
  }

  /**
   * Установка состояния
   * @param newState {Object}
   */
  setState(newState) {
    this.state = newState;
    // Вызываем всех слушателей
    for (const listener of this.listeners) listener();
  }

  /**
   * Добавление продукта в корзину по коду
   */
  addItemToCart(code) {
    const newCartItem = this.state.list.find(item => item.code === code);
    const isAlreadyInCart = this.state.cart.cartItems.some(item => item.code === newCartItem.code);

    if (!isAlreadyInCart) {
      this.setState({
        ...this.state,
        cart: {
          ...this.state.cart,
          cartItems: [...this.state.cart.cartItems, { ...newCartItem, cartQuantity: 1 }],
          totalPrice: this.state.cart.totalPrice + newCartItem.price,
          uniqCartItemsAmount: this.state.cart.uniqCartItemsAmount + 1
        }
      })
    } else {
      this.setState({
        ...this.state,
        cart: {
          ...this.state.cart,
          cartItems: this.state.cart.cartItems.map(item => item.code === newCartItem.code ? { ...item, cartQuantity: item.cartQuantity + 1 } : item),
          totalPrice: this.state.cart.totalPrice + newCartItem.price,
        }
      })
    }
  }

  /**
   * Удаление продуктов из корзины по коду
   * @param code
   */
  deleteItemFromCart(code) {
    const newCartItems = this.state.cart.cartItems.filter(item => item.code !== code);

    this.setState({
      ...this.state,
      cart: {
        ...this.state.cart,
        cartItems: newCartItems,
        totalPrice: newCartItems.reduce((price, item) => price + item.cartQuantity * item.price, 0),
        uniqCartItemsAmount: newCartItems.length
      }
    })
  };
  /**
   * Выделение записи по коду
   * @param code
   */
}

export default Store;