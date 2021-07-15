import { useContext } from 'react';

// Style
import classes from './Cart.module.css';

// Components
import Modal from '../UI/Modal';
import CartItem from './CartItem';

// Context
import CartContext from '../../store/cart-context';

const Cart = ({ hide }) => {
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

  return (
    <Modal hide={hide}>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      <div className={classes.actions}>
        <button onClick={hide} className={classes['button--alt']}>
          Close
        </button>
        {items.length > 0 && <button className={classes.button}>Order</button>}
      </div>
    </Modal>
  );
};

export default Cart;
