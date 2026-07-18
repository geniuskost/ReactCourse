import { createContext } from 'react';
import type IAppContext from './model/IAppContext';

const AppContext = createContext<IAppContext>({
    cart: {
        cartItems: [],
        price: 0,
    },
    setCart() {
        throw new Error('setCart: not implemented');
    },
    user: undefined,
    setUser() {
        throw new Error('setUser: not implemented');
    },
});

export default AppContext;
