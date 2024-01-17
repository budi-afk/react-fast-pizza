import { formatCurrency } from '../../utils/helpers'
import Button from '../../ui/Button'
import DeleteItem from '../cart/DeleteItem'
import { useDispatch, useSelector } from 'react-redux'
import { addItem, getPizzaInCartQuantity } from '../cart/cartSlice'
import UpdateItemQuantity from '../cart/UpdateItemQuantity'

function MenuItem({ pizza }) {
    const dispatch = useDispatch()
    const { id, name, unitPrice, ingredients, soldOut, imageUrl } = pizza

    const pizzaInCartQuantity = useSelector(getPizzaInCartQuantity(id))
    const isPizzaInCart = pizzaInCartQuantity > 0

    function handleAddToCart() {
        const newItem = {
            pizzaId: id,
            name,
            unitPrice,
            quantity: 1,
            totalPrice: unitPrice * 1,
        }

        dispatch(addItem(newItem))
    }

    return (
        <li className="flex gap-4 py-2">
            <img
                src={imageUrl}
                alt={name}
                className={`h-24 ${soldOut ? 'opacity-70 grayscale' : ''}`}
            />
            <div className="flex grow flex-col pt-0.5">
                <p className="font-medium">{name}</p>
                <p className="text-sm capitalize italic text-stone-500">
                    {ingredients.join(', ')}
                </p>
                <div className="mt-auto flex items-center justify-between">
                    {!soldOut ? (
                        <p className="text-sm">{formatCurrency(unitPrice)}</p>
                    ) : (
                        <p className="text-sm font-medium uppercase text-stone-500">
                            Sold out
                        </p>
                    )}

                    {isPizzaInCart && (
                        <div className="flex items-center gap-2 md:gap-8">
                            <UpdateItemQuantity
                                pizzaId={id}
                                quantity={pizzaInCartQuantity}
                            />
                            <DeleteItem pizzaId={id}>
                                Delete from cart
                            </DeleteItem>
                        </div>
                    )}

                    {!soldOut && !isPizzaInCart && (
                        <Button type="small" onClick={handleAddToCart}>
                            Add to cart
                        </Button>
                    )}
                </div>
            </div>
        </li>
    )
}

export default MenuItem
