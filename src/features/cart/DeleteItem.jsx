import { useDispatch } from 'react-redux'
import Button from '../../ui/Button'
import { deleteItem } from './cartSlice'

export default function DeleteItem({ pizzaId, children }) {
    const dispatch = useDispatch()
    return (
        <Button type="small" onClick={() => dispatch(deleteItem(pizzaId))}>
            {children}
        </Button>
    )
}
