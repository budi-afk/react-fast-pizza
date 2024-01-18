import { useState } from 'react'
import { Form, redirect, useActionData, useNavigation } from 'react-router-dom'
import { createOrder } from '../../services/apiRestaurant'
import Button from '../../ui/Button'
import EmptyCart from '../cart/EmptyCart'
import { formatCurrency } from '../../utils/helpers'
import { useSelector } from 'react-redux'
import { store } from '../../store'
import { getCart, getTotalPrice, clearCart } from '../cart/cartSlice'

// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
    /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
        str
    )

function CreateOrder() {
    const username = useSelector((state) => state.user.username)
    const navigation = useNavigation()
    const isSubmitting = navigation.state === 'submitting'
    const [withPriority, setWithPriority] = useState(false)

    const formErrors = useActionData()

    const cart = useSelector(getCart)
    const totalPrice = useSelector(getTotalPrice)
    const priority = withPriority ? totalPrice * 0.2 : 0

    if (!cart.length) return <EmptyCart />

    return (
        <div className="px-4 py-6">
            <h2 className="mb-8 text-xl font-semibold">
                Ready to order? Let's go!
            </h2>

            <Form method="POST">
                <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
                    <label className="sm:basis-40">Full Name</label>
                    <input
                        defaultValue={username}
                        className="input grow"
                        type="text"
                        name="customer"
                        required
                    />
                </div>

                <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
                    <label className="sm:basis-40">Phone number</label>
                    <div className="grow">
                        <input
                            className="input w-full"
                            type="tel"
                            name="phone"
                            required
                        />
                    </div>
                </div>
                {formErrors?.phone && (
                    <p className="mt-2 rounded-md bg-red-100 p-2 text-xs text-red-700">
                        {formErrors.phone}
                    </p>
                )}

                <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
                    <label className="sm:basis-40">Address</label>
                    <div className="grow">
                        <input
                            className="input w-full"
                            type="text"
                            name="address"
                            required
                        />
                    </div>
                </div>

                <div className="mb-12 flex items-center gap-5">
                    <input
                        className="h-6 w-6 accent-yellow-400 focus:outline-none focus:ring focus:ring-yellow-400 focus:ring-offset-2"
                        type="checkbox"
                        name="priority"
                        id="priority"
                        value={withPriority}
                        onChange={(e) => setWithPriority(e.target.checked)}
                    />
                    <input
                        type="hidden"
                        name="cart"
                        value={JSON.stringify(cart)}
                    />
                    <label htmlFor="priority" className="font-medium">
                        Want to yo give your order priority?
                    </label>
                </div>

                <div>
                    <Button disabled={isSubmitting} type="primary">
                        {isSubmitting
                            ? 'Placing order...'
                            : `Order now ${formatCurrency(
                                  totalPrice + priority
                              )}`}
                    </Button>
                </div>
            </Form>
        </div>
    )
}

export async function action({ request }) {
    const formData = await request.formData()
    const data = Object.fromEntries(formData)

    const order = {
        ...data,
        cart: JSON.parse(data.cart),
        priority: data.priority === 'true',
    }

    const errors = {}
    if (!isValidPhone(order.phone)) {
        errors.phone = 'Fill with the correct number!'
    }
    if (Object.keys(errors).length > 0) return errors

    const newOrder = await createOrder(order)

    // DON'T OVERUSE
    store.dispatch(clearCart())

    return redirect(`/order/${newOrder.id}`)
}

export default CreateOrder
