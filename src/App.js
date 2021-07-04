import { useState } from 'react';

// Components
import Header from './components/Layout/Header';
import Meals from './components/Meals/Meals';
import Cart from './components/Cart/Cart';

// Context
import CartProvider from './store/CartProvider';

const App = () => {
  const [cartIsShow, setCartIsShow] = useState(false);

  const showCartHandler = () => {
    setCartIsShow(true);
  };
  const hideCartHandler = () => {
    setCartIsShow(false);
  };

  return (
    <CartProvider>
      {cartIsShow && <Cart hide={hideCartHandler} />}
      <Header onShowCart={showCartHandler} />
      <main>
        <Meals />
      </main>
    </CartProvider>
  );
};

export default App;
