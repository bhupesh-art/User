import React, { useContext, useEffect } from "react";
import { FaCartShopping } from "react-icons/fa6";
import { IoRemoveCircle } from "react-icons/io5";
import { cartContext } from "../CONTEXT/Context";
import { useNavigate } from "react-router-dom";

function Product({ pId, name, image, price, description, categories = [] }) {
    const { cart, setCart } = useContext(cartContext);
    const navigate = useNavigate();

    function addToCart() {
        const item = { pId, name, image, price, description, quantity: 1 };
        setCart([...cart, item]);
    }

    function removeFromCart() {
        const updatedCart = cart.filter((item) => item.pId !== pId);
        setCart(updatedCart);
    }

    useEffect(() => {
        console.log(cart);
    }, [cart]);

    function navigateToProductsPage() {
        navigate(`/product/${pId}`);
    }

    return (
        <article className="max-w-sm bg-white rounded-2xl shadow-lg overflow-hidden transition-transform hover:scale-[1.01] hover:shadow-xl">
            {/* Image */}
            <div className="relative w-full h-64 bg-gray-100" onClick={navigateToProductsPage}>
                <img
                    src={image ?? "https://www.shutterstock.com/image-vector/lost-items-line-vector-icon-260nw-1436787446.jpg"}
                    alt={name}
                    loading="lazy"
                    className="w-full h-full object-cover"
                />

                {/* Price badge */}
                <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 text-sm font-semibold shadow">
                    <span className="sr-only">Price</span>
                    ₹{price}
                </div>
            </div>

            {/* Content */}
            <div className="p-4 space-y-3">
                <header className="flex items-start justify-between gap-3">
                    <h3 className="text-lg font-semibold text-slate-900 line-clamp-2">{name}</h3>

                    {/* Add/Remove from cart */}
                    {!cart.some((item) => item.pId === pId) ? (
                        <button
                            type="button"
                            aria-label={`Add ${name} to cart`}
                            className="ml-auto inline-flex items-center justify-center p-2 bg-indigo-600 text-white rounded-lg shadow-sm hover:bg-indigo-700 active:scale-95 transition"
                            onClick={addToCart}
                        >
                            <FaCartShopping className="w-5 h-5" />
                        </button>
                    ) : (
                        <button
                            type="button"
                            aria-label={`Remove ${name} from cart`}
                            className="ml-auto inline-flex items-center justify-center p-2 bg-red-600 text-white rounded-lg shadow-sm hover:bg-red-700 active:scale-95 transition"
                            onClick={removeFromCart}
                        >
                            <IoRemoveCircle className="w-5 h-5" />
                        </button>
                    )}
                </header>

                <p className="text-sm text-slate-600 leading-relaxed line-clamp-3">{description}</p>

                {/* Categories */}
                {/* <div className="pt-2">
                    <h4 className="text-xs text-slate-500 uppercase tracking-wider mb-2">Categories</h4>

                    <div className="flex flex-wrap gap-2 items-center">
                        {categories.length === 0 ? (
                            <span className="text-xs text-slate-400">No categories</span>
                        ) : (
                            categories.map((cat, idx) => {
                                const colorVariants = [
                                    "bg-indigo-100 text-indigo-800",
                                    "bg-rose-100 text-rose-800",
                                    "bg-emerald-100 text-emerald-800",
                                    "bg-amber-100 text-amber-800",
                                    "bg-violet-100 text-violet-800",
                                ];
                                const variant = colorVariants[idx % colorVariants.length];

                                return (
                                    <span
                                        key={cat.cId}
                                        title={cat.name}
                                        className={`flex items-center justify-center min-w-[36px] h-9 rounded-full px-3 text-xs font-medium ${variant} shadow-sm`}
                                    >
                                        <span className="uppercase">{cat.name.slice(0, 10)}</span>
                                    </span>
                                );
                            })
                        )}
                    </div>
                </div> */}
            </div>
        </article>
    );
}

export default Product;
