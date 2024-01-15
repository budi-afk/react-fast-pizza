import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    cart: [],
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItem(state, action) {
            state.cart.push(action.payload)
        },
        deleteItem(state, action) {
            state.cart = state.cart.filter(
                (item) => item.pizzaId !== action.payload
            )
        },
        increaseQuantityItem(state, action) {
            const pizza = state.cart.find(
                (item) => item.pizzaId === action.payload
            )
            pizza.quantity++
            pizza.totalPrice = pizza.unitPrice * pizza.quantity
        },
        decreaseQuantityItem(state, action) {
            const pizza = state.cart.find(
                (item) => item.pizzaId === action.payload
            )
            pizza.quantity--
            pizza.totalPrice = pizza.unitPrice * pizza.quantity
        },
        clearCart(state) {
            state.cart = []
        },
    },
})

export const {
    addItem,
    deleteItem,
    incrementQuantityItem,
    decrementQuantityItem,
    clearCart,
} = cartSlice.actions

export default cartSlice.reducer

export const getTotalQuantity = (state) =>
    state.cart.cart.reduce((sum, item) => sum + item.quantity, 0)

export const getTotalPrice = (state) =>
    state.cart.cart.reduce((sum, item) => sum + item.totalPrice, 0)
