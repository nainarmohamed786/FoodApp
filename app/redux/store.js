import { configureStore } from '@reduxjs/toolkit';
import CartReducer from './CartReducer';
import LocationReducer from './LocationReducer';


const store = configureStore({
    reducer: {
        cart: CartReducer,
        location:LocationReducer
    }
});

export default store;
