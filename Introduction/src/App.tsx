import { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from './pages/_layout/Layout';
import Home from './pages/Home/Home';
import Group from './pages/group/Group';
import Cart from './pages/cart/Cart';
import Privacy from './pages/privacy/Privacy';
import NotFound from './pages/not-found/NotFound';
import Auth from './pages/auth/Auth';
import AppContext from './features/_context/AppContext';
import Preloader from './features/preloader/Preloader';
import Alert from './features/alert/Alert';
import type IAlertData from './features/alert/model/IAlertData';
import type ICart from './entities/cart/model/ICart';
import CartApi from './entities/cart/api/CartApi';
import type IUser from './entities/user/model/IUser';
import { getRememberedUser } from './entities/user/lib/UserLib';

function App() {
  const [cart, setCart] = useState<ICart>({ cartItems: [], price: 0 });
  const [user, setUser] = useState<IUser | undefined>();
  const [isLoading, setLoading] = useState<boolean>(false);
  const [alertData, setAlertData] = useState<IAlertData | null>(null);

  // перед зміною стану перераховуємо знижки по кошику
  const updateCart = (next: ICart): void => {
    CartApi.calculateCart(next).then(setCart);
  };

  useEffect(() => {
    // при (пере)запуску перевіряємо чи є в локальному сховищі дані про користувача
    setUser(getRememberedUser());
  }, []);

  return (
    <AppContext.Provider
      value={{ cart, setCart: updateCart, user, setUser, isLoading, setLoading, showAlert: setAlertData }}
    >
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="group/:slug" element={<Group />} />
            <Route path="cart" element={<Cart />} />
            <Route path="auth" element={<Auth />} />
            <Route path="privacy" element={<Privacy />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
      {isLoading && <Preloader />}
      {alertData && <Alert data={alertData} />}
    </AppContext.Provider>
  );
}

export default App;
