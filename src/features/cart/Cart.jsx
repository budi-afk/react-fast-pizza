import Button from '../../ui/Button'
import CartItem from './CartItem'
import { useDispatch, useSelector } from 'react-redux'
import { clearCart, getCart } from './cartSlice'
import EmptyCart from './EmptyCart'
import LinkButton from '../../ui/LinkButton'

function Cart() {
    const dispatch = useDispatch()
    const cart = useSelector(getCart)
    const username = useSelector((state) => state.user.username)

    {
        if (cart.length < 1) return <EmptyCart />
    }

    return (
        <div className="py3 px-4">
            <LinkButton to="/menu">&larr; Back to menu</LinkButton>

            <ul className="mt-3 divide-y divide-stone-200">
                {cart.map((item) => (
                    <CartItem item={item} key={item.pizzaId} />
                ))}
            </ul>

            <h2 className="mt-7 text-left font-semibold">
                Your cart, {username}
            </h2>

            <div className="mt-6 space-x-2">
                <Button type="primary" to="/order/new">
                    Order Pizzas
                </Button>
                <Button type="secondary" onClick={() => dispatch(clearCart())}>
                    Clear cart
                </Button>
            </div>
        </div>
    )
}

export default Cart
