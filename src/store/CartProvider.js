import CartContext from "./cart-context";
import { useReducer } from "react";

const initState = {
    items: [],
    totalAmount: 0,
};

const cartReducer = (state, action) => {
    if (action.type === "ADD") {
        // concat返回一個全新的array, 不會在記憶體中編輯舊的array (push() 這個就是編輯舊的array)
        // 如果用push的話，這會導致在react不知道的情況下改變了舊有的array
        const updateItems = state.items.concat(action.payload);

        // 總金額 = 舊有的總金額加上新的item金額乘以數量
        const updateTotalAmount = state.totalAmount + action.payload.price * action.payload.amount;

        return {
            items: updateItems,
            totalAmount: updateTotalAmount,
        };
    }
    return initState;
};

const CartProvider = props => {
    // Cart Reducer
    const [cartState, dispatch] = useReducer(cartReducer, initState);

    const addItemToCartHandler = item => {
        dispatch({ type: "ADD", payload: item });
    };
    const removeItemFromCartHandler = id => {};

    const cartContext = {
        items: cartState.items,
        totalAmount: cartState.totalAmount,
        addItem: addItemToCartHandler,
        removeItem: removeItemFromCartHandler,
    };

    return <CartContext.Provider value={cartContext}>{props.children}</CartContext.Provider>;
};

export default CartProvider;
