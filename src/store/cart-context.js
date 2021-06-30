import React from "react";

const CartContext = React.createContext({
    // 可有可無
    items: [],
    totalAmount: 0,
    addItem: item => {},
    removeItem: id => {},
});

export default CartContext;
