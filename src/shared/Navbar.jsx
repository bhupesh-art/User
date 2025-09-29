import React, { useEffect } from 'react'
import { FaCartShopping } from "react-icons/fa6";
import { cartContext } from '../CONTEXT/Context';

function Navbar() {
    const { cart, isOpen, setIsOpen } = React.useContext(cartContext);
    return (
        <nav className="w-screen bg-gradient-to-r from-purple-600 to-indigo-600 py-4 shadow-md h-16 sticky top-0 z-50">
            <div className="flex justify-between px-14">
                {/* Logo */}

                <div className=''></div>

                <h1 className="text-2xl sm:text-3xl font-bold text-white cursor-pointer">
                    KlayoMart
                </h1>

                {/* Cart Button */}
                <div className=''>
                    <button className="text-white hover:text-yellow-300 transition-colors duration-300 relative" onClick={
                        () => {
                            setIsOpen(!isOpen);
                        }
                    }>
                        <FaCartShopping className="text-3xl sm:text-4xl" />
                        {/* Optional cart badge */}
                        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs sm:text-sm font-bold rounded-full px-2 py-0.5">
                            {cart.length ? cart.length : 0}
                        </span>
                    </button>
                </div>
            </div>
        </nav>
    )
}

export default Navbar
