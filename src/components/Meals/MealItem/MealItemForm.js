import classes from "./MealItemForm.module.css";
import Input from "../../UI/Input";
import { v4 as uuidv4 } from "uuid";
const MealItemForm = props => {
    return (
        <form className={classes.form}>
            <Input
                label="Amount"
                input={{
                    id: uuidv4(),
                    type: "number",
                    min: "1",
                    max: "5",
                    step: "1",
                    defaultValue: "1",
                }}
            />
            <button>+ Add</button>
        </form>
    );
};

export default MealItemForm;
