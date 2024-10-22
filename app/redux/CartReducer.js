import { createSlice } from '@reduxjs/toolkit';


const initialState = {
    cart: []
}

const CartReducer = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const itemsPresent = state.cart.find((item) => item.id === action.payload.id);

            if (itemsPresent) {
                itemsPresent.quantity++;
            }
            else {
                state.cart.push({ ...action.payload, quantity: 1 })
            }
        },
        removeToCart: (state, action) => {
            const RemoveItem = state.cart.filter((item) => item.id !== action.payload.id);

            state.cart = RemoveItem
        },
        increaseQuantity: (state, action) => {
            const itemsPresent = state.cart.find((item) => item.id === action.payload.id);

            itemsPresent.quantity++;
        },
        decreaseQuantity: (state, action) => {
            const itemsPresent = state.cart.find((item) => item.id === action.payload.id);

            if (itemsPresent.quantity === 0) {
                const RemoveItem = state.cart.filter((item) => item.id !== action.payload.id);
                state.cart = RemoveItem;
            }
            else {
                itemsPresent.quantity--;
            }
        },
        cleanCart: (state) => {
            state.cart = [];
        }
    }
});


export const { addToCart, removeToCart, increaseQuantity, decreaseQuantity, cleanCart } = CartReducer.actions;

export default CartReducer.reducer;