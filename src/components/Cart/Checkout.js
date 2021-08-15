import classes from './Checkout.modules.css';

const Checkout = () => {
  return (
    <form>
      <div className={classes.control}>
        <label htmlFor="name">Your Name</label>
        <input type="text" id="name" />
      </div>

      <div className={classes.control}>
        <label htmlFor="street">Street</label>
        <input type="text" id="street" />
      </div>

      <div className={classes.control}>
        <label htmlFor="postal">Postal Code</label>
        <input type="text" id="postal" />
      </div>

      <div className={classes.control}>
        <label htmlFor="city">City</label>
        <input type="text" id="city" />
      </div>
      {/* cancel button加上type="button" 是因為要確保點擊cancel button後,表單不會提交 */}
      <button type="button">Cancel</button>
      <button>Confirm</button>
    </form>
  );
};

export default Checkout;
