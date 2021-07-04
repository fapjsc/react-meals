import { useContext } from 'react';

// Context
import CartContext from '../../store/cart-context';

// Style
import CartIcon from '../Cart/CartIcon';
import classes from './HeaderCartButton.module.css';

const HeaderCartButton = props => {
  // Cart Context
  const cartCtx = useContext(CartContext);

  const numberOfCartItems = cartCtx.items.reduce((curNumber, item) => {
    console.log(cartCtx.items);
    console.log(curNumber, item.amount);
    return curNumber + item.amount;
  }, 0);

  return (
    <button className={classes.button} onClick={props.onShowCart}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={classes.badge}>{numberOfCartItems}</span>
    </button>
  );
};

export default HeaderCartButton;
