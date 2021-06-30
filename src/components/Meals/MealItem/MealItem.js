import { useContext } from "react";

// Context
import CartContext from "../../../store/cart-context";

// Components
import MealItemForm from "./MealItemForm";

// Style
import classes from "./MealItem.module.css";

const MealItem = props => {
    console.log(props);
    // Cart Context
    const cartCtx = useContext(CartContext);
    const { addItem } = cartCtx;

    const price = `$${props.price.toFixed(2)}`;

    const addToCartHandler = amount => {
        const item = {
            id: props.id,
            name: props.name,
            price: props.price,
            amount,
        };

        addItem(item);
    };

    return (
        <li className={classes.meal}>
            <div>
                <h3>{props.name}</h3>
                <div className={classes.description}>{props.description}</div>
                <div className={classes.price}>{price}</div>
            </div>
            <div>
                <MealItemForm onAddToCart={addToCartHandler} />
            </div>
        </li>
    );
};

export default MealItem;
