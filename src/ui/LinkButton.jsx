import { Link, useNavigate } from 'react-router-dom'

export default function LinkButton({ children, to }) {
    const navigate = useNavigate()

    if (to === '-1')
        return (
            <button
                className="inline-block rounded-full bg-red-400 px-4 py-3 font-semibold uppercase tracking-wide text-stone-800 transition-colors duration-300 hover:bg-red-300 focus:bg-red-300 focus:outline-none focus:ring focus:ring-red-300 focus:ring-offset-2 active:bg-slate-400 disabled:cursor-not-allowed"
                onClick={() => navigate(-1)}
            >
                {children}
            </button>
        )

    return (
        <Link to={to} className="text-sm text-blue-500 hover:text-blue-900">
            {children}
        </Link>
    )
}
