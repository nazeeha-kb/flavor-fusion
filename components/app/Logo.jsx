import Link from "next/link"

export default function Logo({ href, size, action }) {

    return (
        <>
            <Link
                href={href}
                className="flex items-center space-x-3 rtl:space-x-reverse"
            >
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-green-500 to-green-600 shadow-sm">
                    <img
                        src="/utensils.svg"
                        className="h-6 w-6"
                        alt="Flavor Fusion logo"
                    />
                </div>

                <div className="flex flex-col leading-none">
                    <span className="text-xl font-bold tracking-tight text-gray-900">
                        Flavor Fusion
                    </span>
                </div>

                <div>{action}</div>
            </Link>
        </>
    )
}