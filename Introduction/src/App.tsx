import { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from './pages/_layout/Layout';
import Home from './pages/Home/Home';
import Group from './pages/group/Group';
import Cart from './pages/cart/Cart';
import Privacy from './pages/privacy/Privacy';
import NotFound from './pages/not-found/NotFound';
import AppContext from './features/_context/AppContext';
import type ICart from './entities/cart/model/ICart';
import CartApi from './entities/cart/api/CartApi';

function App() {
  const [cart, setCart] = useState<ICart>({ cartItems: [], price: 0 });

  // перед зміною стану перераховуємо знижки по кошику
  const updateCart = (next: ICart): void => {
    CartApi.calculateCart(next).then(setCart);
  };

  return (
    <AppContext.Provider value={{ cart, setCart: updateCart }}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="group/:slug" element={<Group />} />
            <Route path="cart" element={<Cart />} />
            <Route path="privacy" element={<Privacy />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AppContext.Provider>
  );
}

export default App;
