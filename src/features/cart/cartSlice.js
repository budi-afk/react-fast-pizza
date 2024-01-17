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
                (item) => item.pizzaId == action.payload
            )
            pizza.quantity++
            pizza.totalPrice = pizza.unitPrice * pizza.quantity
        },
        decreaseQuantityItem(state, action) {
            const pizza = state.cart.find(
                (item) => item.pizzaId == action.payload
            )
            pizza.quantity--
            pizza.totalPrice = pizza.unitPrice * pizza.quantity

            if (pizza.quantity === 0)
                cartSlice.caseReducers.deleteItem(state, action)
        },
        clearCart(state) {
            state.cart = []
        },
    },
})

export const {
    addItem,
    deleteItem,
    increaseQuantityItem,
    decreaseQuantityItem,
    clearCart,
} = cartSlice.actions

export default cartSlice.reducer

export const getCart = (state) => state.cart.cart

export const getTotalQuantity = (state) =>
    state.cart.cart.reduce((sum, item) => sum + item.quantity, 0)

export const getTotalPrice = (state) =>
    state.cart.cart.reduce((sum, item) => sum + item.totalPrice, 0)

export const getPizzaInCartQuantity = (id) => (state) =>
    state.cart.cart.find((item) => item.pizzaId === id)?.quantity ?? 0
