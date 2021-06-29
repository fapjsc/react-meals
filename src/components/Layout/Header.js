import { Fragment } from "react";

// Components
import HeaderCartButton from "./HeaderCartButton";

// Style
import mealsImage from "../../assets/meals.jpg";
import classes from "./Header.module.css";

const Header = props => {
    return (
        <Fragment>
            <header className={classes.header}>
                <h1>ReactMeals</h1>
                <HeaderCartButton onShowCart={props.onShowCart} />
            </header>
            <div className={classes.mainImage}>
                <img src={mealsImage} alt="meals" />
            </div>
        </Fragment>
    );
};

export default Header;
