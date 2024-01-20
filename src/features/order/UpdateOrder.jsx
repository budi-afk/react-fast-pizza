import { useFetcher } from 'react-router-dom'
import Button from '../../ui/Button'
import { updateOrder } from '../../services/apiRestaurant'

export default function UpdateOrder() {
    const fetcher = useFetcher()
    return (
        <fetcher.Form method="PATCH" className="text-right">
            <Button type="primary">Update Priority</Button>
        </fetcher.Form>
    )
}

export async function action({ request, params }) {
    const data = { priority: true }
    const orderId = params.orderId
    await updateOrder(orderId, data)
    return null
}
