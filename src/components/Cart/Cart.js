import { useContext, useState } from 'react';

// Style
import classes from './Cart.module.css';

// Components
import Modal from '../UI/Modal';
import CartItem from './CartItem';
import Checkout from './Checkout';

// Context
import CartContext from '../../store/cart-context';

const Cart = ({ hide }) => {
  const [isCheckout, setIsCheckout] = useState(false);

  // Cart Context
  const cartCtx = useContext(CartContext);
  let { items, totalAmount, addItem, removeItem } = cartCtx;
  totalAmount = `$${totalAmount.toFixed(2)}`;

  const cartItemRemoveHandler = id => {
    console.log(id);
    removeItem(id);
  };

  const cartItemAddHandler = item => {
    console.log(item);
    addItem({ ...item, amount: 1 });
  };

  const orderHandler = () => {
    setIsCheckout(true);
  };

  const cartItems = (
    <ul className={classes['cart-items']}>
      {items.map(item => (
        <CartItem
          onRemove={() => cartItemRemoveHandler(item.id)}
          onAdd={() => cartItemAddHandler(item)}
          key={item.id}
          name={item.name}
          price={item.price}
          amount={item.amount}
        />
      ))}
    </ul>
  );

  const modalAction = (
    <div className={classes.actions}>
      <button onClick={hide} className={classes['button--alt']}>
        Close
      </button>
      {items.length > 0 && (
        <button onClick={orderHandler} className={classes.button}>
          Order
        </button>
      )}
    </div>
  );

  return (
    <Modal hide={hide}>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>

      {isCheckout && <Checkout />}
      {!isCheckout && modalAction}
    </Modal>
  );
};

export default Cart;
