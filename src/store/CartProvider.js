import CartContext from './cart-context';
import { useReducer } from 'react';

const initState = {
  items: [],
  totalAmount: 0,
};

const cartReducer = (state, action) => {
  if (action.type === 'ADD') {
    // 沒有在array裡面就是-1, 如果有找到就返回index值, 只會返回第一個
    const existingCartItemIndex = state.items.findIndex(item => item.id === action.payload.id);

    const existingCartItem = state.items[existingCartItemIndex];

    let updateItems;

    if (existingCartItem) {
      const updateItem = {
        ...existingCartItem,
        amount: existingCartItem.amount + action.payload.amount,
      };

      updateItems = [...state.items];
      updateItems[existingCartItemIndex] = updateItem;
    } else {
      // concat返回一個全新的array, 不會在記憶體中編輯舊的array (push() 這個就是編輯舊的array)
      // 如果用push的話，這會導致在react不知道的情況下改變了舊有的array
      updateItems = state.items.concat(action.payload);
    }

    // 總金額 = 舊有的總金額加上新的item金額乘以數量
    const updateTotalAmount = state.totalAmount + action.payload.price * action.payload.amount;

    return {
      items: updateItems,
      totalAmount: updateTotalAmount,
    };
  }

  if (action.type === 'REMOVE') {
    const existingCartItemIndex = state.items.findIndex(item => item.id === action.payload);
    const existingItem = state.items[existingCartItemIndex];

    const updateTotalAmount = state.totalAmount - existingItem.price;

    let updateItems;

    if (existingItem.amount === 1) {
      updateItems = state.items.filter(item => item.id !== action.payload); // 如果是true就保留，false就移除
    } else {
      const updateItem = { ...existingItem, amount: existingItem.amount - 1 };
      updateItems = [...state.items];
      updateItems[existingCartItemIndex] = updateItem;
    }

    return {
      items: updateItems,
      totalAmount: updateTotalAmount,
    };
  }

  if (action.type === 'CLEAR') {
    return initState;
  }

  return initState;
};

const CartProvider = props => {
  // Cart Reducer
  const [cartState, dispatch] = useReducer(cartReducer, initState);

  const addItemToCartHandler = item => {
    dispatch({ type: 'ADD', payload: item });
  };
  const removeItemFromCartHandler = id => {
    dispatch({ type: 'REMOVE', payload: id });
  };

  const clearCartHandler = () => {
    dispatch({ type: 'CLEAR' });
  };

  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemToCartHandler,
    removeItem: removeItemFromCartHandler,
    clearCart: clearCartHandler,
  };

  return <CartContext.Provider value={cartContext}>{props.children}</CartContext.Provider>;
};

export default CartProvider;
