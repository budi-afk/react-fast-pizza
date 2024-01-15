import { useSelector } from 'react-redux'
import LinkButton from '../../ui/LinkButton'
import { getTotalPrice, getTotalQuantity } from './cartSlice'
import { formatCurrency } from '../../utils/helpers'

function CartOverview() {
    const totalQuantity = useSelector(getTotalQuantity)
    const totalPrice = useSelector(getTotalPrice)

    if (!totalQuantity) return null

    return (
        <div className="flex items-center justify-between bg-stone-800 p-4 text-stone-200">
            <p className="space-x-2 font-semibold uppercase text-stone-300">
                <span>{totalQuantity} pizzas</span>
                <span>{formatCurrency(totalPrice)}</span>
            </p>
            <LinkButton to="cart">Open cart &rarr;</LinkButton>
        </div>
    )
}

export default CartOverview
