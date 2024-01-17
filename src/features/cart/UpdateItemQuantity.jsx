import { useDispatch } from 'react-redux'
import Button from '../../ui/Button'
import { decreaseQuantityItem, increaseQuantityItem } from './cartSlice'

export default function UpdateItemQuantity({ pizzaId, quantity }) {
    const dispatch = useDispatch()

    return (
        <div className="flex items-center gap-2 md:gap-3">
            <Button
                type="round"
                onClick={() => dispatch(decreaseQuantityItem(pizzaId))}
            >
                -
            </Button>
            <span className="text-sm font-bold">{quantity}</span>
            <Button
                type="round"
                onClick={() => dispatch(increaseQuantityItem(pizzaId))}
            >
                +
            </Button>
        </div>
    )
}
