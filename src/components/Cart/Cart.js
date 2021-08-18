import { Fragment, useContext, useState } from 'react';

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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [didSubmit, setDidSubmit] = useState(false);

  // Cart Context
  const cartCtx = useContext(CartContext);
  let { items, totalAmount, addItem, removeItem, clearCart } = cartCtx;
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

  const submitOrderHandler = async userData => {
    setIsSubmitting(true);
    await fetch(
      'https://react-meal-69b86-default-rtdb.asia-southeast1.firebasedatabase.app/order.json',
      {
        method: 'POST',
        body: JSON.stringify({
          user: userData,
          orderItems: items,
        }),
      }
    );

    setIsSubmitting(false);
    setDidSubmit(true);
    clearCart();
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

  const isSubmittingModalContent = <p>Sending order data...</p>;

  const cartModalContent = (
    <Fragment>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>

      {isCheckout && <Checkout hide={hide} onConfirm={submitOrderHandler} />}
      {!isCheckout && modalAction}
    </Fragment>
  );

  const didSubmitModalContent = (
    <Fragment>
      <p>SuccessFully sent the order</p>
      <div className={classes.actions}>
        <button className={classes.button} onClick={hide}>
          Close
        </button>
      </div>
    </Fragment>
  );

  return (
    <Modal hide={hide}>
      {!isSubmitting && !didSubmit && cartModalContent}
      {isSubmitting && isSubmittingModalContent}
      {!isSubmitting && didSubmit && didSubmitModalContent}
    </Modal>
  );
};

export default Cart;
