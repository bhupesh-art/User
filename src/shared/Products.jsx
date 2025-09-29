import React, { useEffect } from 'react'
import axios from "axios";
import { cartContext, productContext } from '../CONTEXT/Context';
import { useContext } from 'react';
import Product from './Product';

function Products({ query }) {
    const { isOpen, setIsOpen } = useContext(cartContext);
    const BACKEND_URL = import.meta.env.VITE_API_URL;
    const { products, setProducts } = useContext(productContext);
    const [filteredProducts, setFilteredProducts] = React.useState([])
    useEffect(() => {
        (async function fetchProducts() {
            const response = await axios.get(`${BACKEND_URL}/product/all`);
            console.log(response.data.products);
            setProducts(response.data.products);
            setFilteredProducts(response.data.products);
        })();
    }, [BACKEND_URL])

    useEffect(() => {
        (async function filterProducts() {
            const filtered = products.filter((product) => {
                return product.name.toLowerCase().includes(query.toLowerCase()) || product.description.toLowerCase().includes(query.toLowerCase());
            })
            setFilteredProducts(filtered);
        })()
    }, [query])

    return (
        <>
            <h1 className='text-3xl font-bold text-center mt-10'>Products</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6 mt-6">
                {filteredProducts.map((product) => (
                    <Product key={product.pId} pId={product.pId} name={product.name} image={product.image} price={product.price} description={product.description} categories={product.categories} />
                ))}
            </div>
        </>
    )
}

export default Products