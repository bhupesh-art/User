import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { cartContext } from "../CONTEXT/Context";
import { AiOutlineClose } from "react-icons/ai";

function Product() {
    const BACKEND_URL = import.meta.env.VITE_API_URL;
    const { productId } = useParams();
    const [productInfo, setProductInfo] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { cart, setCart } = useContext(cartContext);
    const navigate = useNavigate();

    useEffect(() => {
        (async function () {
            try {
                setLoading(true);
                const response = await axios.get(
                    `${BACKEND_URL}/api/product/item/${productId}`
                );
                setProductInfo(response.data.product ?? null);
            } catch (err) {
                console.error(err);
                setError("Failed to load product");
            } finally {
                setLoading(false);
            }
        })();
    }, [BACKEND_URL, productId, cart]);

    function addToCart() {
        const item = { pId: productInfo.pId, name: productInfo.name, image: productInfo.image, price: productInfo.price, description: productInfo.description, quantity: 1 };
        setCart([...cart, item]);
    }

    function removeFromCart() {
        const updatedCart = cart.filter((item) => item.pId !== productInfo.pId);
        setCart(updatedCart);
    }

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">Loading…</div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center text-red-600">
                {error}
            </div>
        );
    }

    if (!productInfo) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                Product not found
            </div>
        );
    }

    return (
        // <div className="flex flex-col min-h-screen bg-gray-50">
        //     {/* Main container */}
        //     <div className="flex-grow container mx-auto px-4 py-6 flex flex-col lg:flex-row gap-8">
        //         {/* Product Image */}
        //         <div className="flex-1 flex items-center justify-center">
        //             <img
        //                 src={productInfo.image || "https://via.placeholder.com/400"}
        //                 alt={productInfo.name || "product image"}
        //                 className="w-full max-w-md rounded-2xl shadow-lg object-cover"
        //             />
        //         </div>

        //         {/* Product Info */}
        //         <div className="flex-1 space-y-6">
        //             <h1 className="text-3xl font-bold text-gray-800">
        //                 {productInfo.name}
        //             </h1>
        //             <p className="text-gray-600 leading-relaxed">
        //                 {productInfo.description}
        //             </p>
        //             <p className="text-2xl font-semibold text-green-600">
        //                 ₹{productInfo.price}
        //             </p>

        //             {/* Categories (safe access) */}
        //             <div className="flex flex-wrap gap-2">
        //                 {Array.isArray(productInfo.categories) &&
        //                     productInfo.categories.map((categoryObj) => (
        //                         <span
        //                             key={categoryObj.cId || categoryObj.name}
        //                             className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm"
        //                         >
        //                             {categoryObj.name}
        //                         </span>
        //                     ))}
        //             </div>
        //         </div>
        //     </div>

        //     {/* Bottom Add to Cart */}
        //     <div className="sticky bottom-0 bg-white shadow-md p-4">
        //         <button
        //             className="w-full py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition"
        //             onClick={() => {
        //                 // TODO: hook this up to your cart logic
        //                 console.log("Add to cart", productInfo.pId);
        //             }}
        //         >
        //             Add to Cart
        //         </button>
        //     </div>
        // </div>
        <div className="flex flex-col min-h-screen bg-gray-50 relative">

            <button
                onClick={() => navigate("/")} // <-- useNavigate
                className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition"
            >
                <AiOutlineClose className="w-5 h-5 text-gray-700" />
            </button>

            {/* Main container: narrower max width to avoid too much empty space on large screens */}
            <div className="mx-auto w-full max-w-6xl px-6 py-8 lg:py-10 flex flex-col lg:flex-row gap-6 lg:gap-8 items-stretch">

                {/* LEFT: image — full left half on large screens */}
                <div className="w-full lg:w-1/2 flex-shrink-0 flex items-center justify-center">
                    <img
                        src={productInfo?.image || "https://via.placeholder.com/800x800"}
                        alt={productInfo?.name || "product image"}
                        className="w-full h-72 sm:h-96 md:h-[60vh] lg:h-[80vh] object-cover rounded-2xl shadow-lg"
                    />
                </div>

                {/* RIGHT: info — use column layout and push bottom group down */}
                <div className="w-full lg:w-1/2 flex flex-col justify-between">
                    {/* Top: name + description */}
                    <div>
                        <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900 leading-tight">
                            {productInfo?.name}
                        </h1>

                        {/* space between name and description */}
                        <p className="mt-4 text-gray-600 text-sm md:text-base leading-relaxed">
                            {productInfo?.description}
                        </p>
                    </div>

                    {/* Bottom: price + categories (stays at bottom of this column) */}
                    <div className="mt-6 md:mt-8 lg:mt-0">
                        <div className="flex items-center justify-between">
                            <p className="text-2xl md:text-3xl font-semibold text-green-600">
                                ₹{productInfo?.price}
                            </p>
                            {/* If you want stock or other badges, add here */}
                        </div>

                        {/* categories as chips — placed below price */}
                        <div className="mt-4 flex flex-wrap gap-2">
                            {Array.isArray(productInfo?.categories) && productInfo.categories.length > 0 ? (
                                productInfo.categories.map((cat) => (
                                    <span
                                        key={cat.cId ?? cat.name}
                                        className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm"
                                    >
                                        {cat.name}
                                    </span>
                                ))
                            ) : (
                                <span className="text-sm text-gray-500">No categories</span>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Add to Cart (sticky) */}
            <div className="sticky bottom-0 bg-white shadow-md p-4">
                {
                    cart.some((product) => product.pId === productInfo.pId) ? <button
                        className="w-full py-3 bg-red-700 text-white font-semibold rounded-xl hover:bg-red-800 transition"
                        onClick={removeFromCart}
                    >
                        Remove From Cart
                    </button> : <button
                        className="w-full py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition"
                        onClick={addToCart}
                    >
                        Add to Cart
                    </button>
                }
            </div>
        </div>
    );
}

export default Product;
