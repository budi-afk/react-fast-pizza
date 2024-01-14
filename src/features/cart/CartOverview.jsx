import { Link } from 'react-router-dom'
import LinkButton from '../../ui/LinkButton'

function CartOverview() {
    return (
        <div className="flex items-center justify-between bg-stone-800 p-4 text-stone-200">
            <p className="space-x-2 font-semibold uppercase text-stone-300">
                <span>23 pizzas</span>
                <span>$23.45</span>
            </p>
            <LinkButton to="cart">Open cart &rarr;</LinkButton>
        </div>
    )
}

export default CartOverview
