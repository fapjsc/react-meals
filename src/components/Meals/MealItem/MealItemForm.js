import { useRef, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

// Components
import Input from '../../UI/Input';

// Style
import classes from './MealItemForm.module.css';

const MealItemForm = props => {
  const amountInputRef = useRef();

  // Init State
  const [amountIsValid, setAmountIsValid] = useState(true);

  const submitHandler = e => {
    e.preventDefault();
    const enterAmount = amountInputRef.current.value; // ref 永遠是字串
    const enterAmountNumber = +enterAmount; // 字串轉數字

    if (enterAmount.trim().length === 0 || enterAmountNumber < 1 || enterAmount > 5) {
      setAmountIsValid(false);
      return;
    }

    props.onAddToCart(enterAmountNumber);
  };

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <Input
        ref={amountInputRef}
        label="Amount"
        input={{
          id: uuidv4(),
          type: 'number',
          min: '1',
          max: '5',
          step: '1',
          defaultValue: '1',
        }}
      />
      <button>+ Add</button>
      {!amountIsValid && <p>*please enter a valid amount (1-5).</p>}
    </form>
  );
};

export default MealItemForm;
