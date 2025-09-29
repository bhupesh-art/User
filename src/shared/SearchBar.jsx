import React, { useState } from "react";
// import { FaSearch } from "react-icons/fa";

function SearchBar({ setQuery }) {
    return (
        <form
            className="w-full max-w-lg mx-auto flex items-center bg-white rounded-full shadow-md overflow-hidden border border-slate-200 focus-within:ring-2 focus-within:ring-indigo-500 mt-5 "
        >
            {/* Input */}
            <input
                type="text"
                // value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search products..."
                className="flex-1 px-4 py-2 text-slate-700 placeholder-slate-400 focus:outline-none"
            />
        </form>
    );
}

export default SearchBar;
