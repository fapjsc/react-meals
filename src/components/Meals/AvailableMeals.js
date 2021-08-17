import { useEffect, useState } from 'react';

// Style
import classes from './AvailableMeals.module.css';

// Components
import Card from '../UI/Card';
import MealItem from './MealItem/MealItem';

const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [httpError, setHttpError] = useState();

  const fetchMeals = async () => {
    setIsLoading(true);

    const res = await fetch(
      'https://react-meal-69b86-default-rtdb.asia-southeast1.firebasedatabase.app/meal.json'
    );

    if (!res.ok) throw new Error('something went wrong');

    const resData = await res.json();

    let loadedMeals = [];

    for (const key in resData) {
      loadedMeals.push({
        id: key,
        name: resData[key].name,
        description: resData[key].description,
        price: resData[key].price,
      });
    }

    setMeals(loadedMeals);

    setIsLoading(false);
  };

  useEffect(() => {
    fetchMeals().catch(error => {
      setIsLoading(false);
      setHttpError(error.message);
    });
  }, []);

  if (isLoading) {
    return (
      <section className={classes.mealsLoading}>
        <p>Loading...</p>
      </section>
    );
  }

  if (httpError) {
    return (
      <section className={classes.mealsError}>
        <p>{httpError}</p>
      </section>
    );
  }

  const mealsList = meals.map(meal => (
    <MealItem
      key={meal.id}
      id={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));

  return (
    <section className={classes.meals}>
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
