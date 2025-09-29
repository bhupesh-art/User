import React from 'react'
import SearchBar from '../shared/SearchBar';
import CartSidePanel from '../shared/CartSidePanel';
import Navbar from '../shared/Navbar';
import Products from '../shared/Products'

function Home() {
    const [query, setQuery] = React.useState("");
    return (
        <div>
            <Navbar />
            <SearchBar setQuery={setQuery} />
            <Products query={query} />
            <CartSidePanel />
        </div>
    )
}

export default Home