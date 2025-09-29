import React from "react";
import { IoCloseCircle } from "react-icons/io5";
import { cartContext, checkOutContext } from "../CONTEXT/Context";
import { useNavigate } from "react-router-dom";

function CartSidePanel() {
    const { isOpen, setIsOpen, cart, setCart } = React.useContext(cartContext);
    const { checkoutNavigated, setCheckOutNavigated } = React.useContext(checkOutContext);
    const navigate = useNavigate();

    //TODO : study increment and decrement functions and total calculation
    const increment = (pId) => {
        setCart((prev) => prev.map((it) => (it.pId === pId ? { ...it, quantity: it.quantity + 1 } : it)));
    };

    const decrement = (pId) => {
        setCart((prev) =>
            prev.map((it) => (it.pId === pId ? { ...it, quantity: it.quantity - 1 } : it)).filter((it) => it.quantity > 0)
        );
    };
    const total = cart.reduce((s, it) => s + it.price * it.quantity, 0);

    function setAndNavigate() {
        setCheckOutNavigated(true);
        navigate("/checkout");
    }

    // !working before 
    // return (
    //     <>
    //         {/* Overlay */}
    //         <div
    //             onClick={() => setIsOpen(false)}
    //             aria-hidden={!isOpen}
    //             className={`fixed inset-0 bg-black/40 transition-opacity duration-300 ${isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
    //         />

    //         {/* Panel */}
    //         <aside
    //             className={`fixed top-0 right-0 h-full bg-white shadow-2xl w-[90%] sm:w-[420px] md:w-[400px] transform transition-transform duration-300 flex flex-col ${isOpen ? "translate-x-0" : "translate-x-full"}`}
    //             aria-hidden={!isOpen}
    //             aria-label="Cart panel"
    //         >
    //             {/* Header */}
    //             <div className={`flex items-center justify-between px-4 py-3 border-b relative z-60`}
    //             >
    //                 <h3 className="text-lg font-semibold flex items-center gap-2">Your Cart</h3>
    //                 <button
    //                     onClick={() => setIsOpen(false)}
    //                     aria-label="Close cart"
    //                     className="p-2 rounded-full hover:bg-slate-100 transition"
    //                 >
    //                     <IoCloseCircle />
    //                 </button>
    //             </div>

    //             {/* Items list */}
    //             <div className="flex-1 overflow-y-auto p-4 space-y-3">
    //                 {cart.length === 0 ? (
    //                     <div className="text-center text-slate-500 py-10">Your cart is empty</div>
    //                 ) : (
    //                     cart.map((item) => (
    //                         <div
    //                             key={item.PId}
    //                             /* Always keep a single horizontal row (no vertical stacking) */
    //                             className="flex items-center gap-3 bg-white rounded-lg p-3 shadow-sm"
    //                         >
    //                             {/* Image - fixed size, won't grow */}
    //                             <img
    //                                 src={item.image || "https://via.placeholder.com/80"}
    //                                 alt={item.name}
    //                                 className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded flex-shrink-0"
    //                             />

    //                             {/* Name - will take remaining space and truncate */}
    //                             <div className="min-w-0 flex-1">
    //                                 <div className="text-sm font-medium truncate">{item.name}</div>
    //                                 {/* optional small meta line (variant/size) could go here */}
    //                             </div>

    //                             {/* Quantity controls - kept compact, sits right after name */}
    //                             <div className="flex items-center gap-2 flex-none ml-1">
    //                                 <button
    //                                     onClick={() => decrement(item.pId)}
    //                                     className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-200 text-gray-700 text-lg font-semibold hover:bg-gray-300 active:bg-gray-400 transition"
    //                                     aria-label={`Decrease quantity of ${item.name}`}
    //                                 >
    //                                     −
    //                                 </button>

    //                                 <div className="px-2 py-1 min-w-[36px] text-center font-medium">{item.quantity}</div>

    //                                 <button
    //                                     onClick={() => increment(item.pId)}
    //                                     className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-200 text-gray-700 text-lg font-semibold hover:bg-gray-300 active:bg-gray-400 transition"
    //                                     aria-label={`Increase quantity of ${item.name}`}
    //                                 >
    //                                     +
    //                                 </button>
    //                             </div>

    //                             {/* Price - compact, right-aligned, small left margin so it's close to controls */}
    //                             <div className="w-[72px] text-right font-semibold flex-shrink-0 ml-2">₹{item.price * item.quantity}</div>
    //                         </div>
    //                     ))
    //                 )}
    //             </div>

    //             {/* Footer (sticky) */}
    //             <div className="border-t p-4 bg-white safe-bottom">
    //                 <div className="flex items-center justify-between mb-3">
    //                     <span className="text-sm text-slate-500">Total</span>
    //                     <span className="text-lg font-semibold">{total}</span>
    //                 </div>

    //                 <button
    //                     // onClick={() => alert("Proceed to checkout (implement your flow)")}
    //                     className="w-full py-3 rounded-md bg-indigo-600 text-white font-medium shadow hover:bg-indigo-700 transition"
    //                     disabled={cart.length === 0}
    //                 >
    //                     Checkout
    //                 </button>
    //             </div>
    //         </aside>
    //     </>
    // );



    return (
        <>
            {/* Overlay */}
            <div
                onClick={() => setIsOpen(false)}
                aria-hidden={!isOpen}
                className={`fixed inset-0 bg-black/40 transition-opacity duration-300 z-40 ${isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
            />

            {/* Panel */}
            <aside
                className={`fixed top-0 right-0 h-full bg-white shadow-2xl w-[90%] sm:w-[420px] md:w-[400px] transform transition-transform duration-300 flex flex-col z-50 ${isOpen ? "translate-x-0" : "translate-x-full"}`}
                aria-hidden={!isOpen}
                aria-label="Cart panel"
            >
                {/* Header */}
                <div className="flex items-center justify-between px-4 py-3 border-b relative z-60">
                    <h3 className="text-lg font-semibold flex items-center gap-2">Your Cart</h3>
                    <button
                        onClick={() => setIsOpen(false)}
                        aria-label="Close cart"
                        className="p-2 rounded-full hover:bg-slate-100 transition"
                    >
                        <IoCloseCircle className="h-6 w-6 sm:h-7 sm:w-7" />
                    </button>
                </div>

                {/* Items list */}
                <div className="flex-1 overflow-y-auto p-4 space-y-3">
                    {cart.length === 0 ? (
                        <div className="text-center text-slate-500 py-10">Your cart is empty</div>
                    ) : (
                        cart.map((item) => (
                            <div
                                key={item.PId}
                                className="flex items-center gap-3 bg-white rounded-lg p-3 shadow-sm"
                            >
                                <img
                                    src={item.image || "https://via.placeholder.com/80"}
                                    alt={item.name}
                                    className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded flex-shrink-0"
                                />

                                <div className="min-w-0 flex-1">
                                    <div className="text-sm font-medium truncate">{item.name}</div>
                                </div>

                                <div className="flex items-center gap-2 flex-none ml-1">
                                    <button
                                        onClick={() => decrement(item.pId)}
                                        className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-200 text-gray-700 text-lg font-semibold hover:bg-gray-300 active:bg-gray-400 transition"
                                        aria-label={`Decrease quantity of ${item.name}`}
                                    >
                                        −
                                    </button>

                                    <div className="px-2 py-1 min-w-[36px] text-center font-medium">{item.quantity}</div>

                                    <button
                                        onClick={() => increment(item.pId)}
                                        className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-200 text-gray-700 text-lg font-semibold hover:bg-gray-300 active:bg-gray-400 transition"
                                        aria-label={`Increase quantity of ${item.name}`}
                                    >
                                        +
                                    </button>
                                </div>

                                <div className="w-[72px] text-right font-semibold flex-shrink-0 ml-2">₹{item.price * item.quantity}</div>
                            </div>
                        ))
                    )}
                </div>

                {/* Footer (sticky) */}
                <div className="border-t p-4 bg-white safe-bottom">
                    <div className="flex items-center justify-between mb-3">
                        <span className="text-sm text-slate-500">Total</span>
                        <span className="text-lg font-semibold">{total}</span>
                    </div>

                    <button
                        onClick={setAndNavigate}
                        className="w-full py-3 rounded-md bg-indigo-600 text-white font-medium shadow hover:bg-indigo-700 transition"
                        disabled={cart.length === 0}
                    >
                        Checkout
                    </button>
                </div>
            </aside>
        </>
    );

}

export default CartSidePanel;
