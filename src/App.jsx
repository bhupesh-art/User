import { productContext, cartContext, checkOutContext } from './CONTEXT/Context';
import { useState } from 'react';;
import Home from './pages/home';
import { Route, Routes, Navigate } from 'react-router-dom';
import Checkout from './pages/checkout';
import Product from './pages/productPage';

function App() {
  const [products, setProducts] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [cart, setCart] = useState([]);
  const [checkoutNavigated, setCheckOutNavigated] = useState(false);

  return (
    <>
      <productContext.Provider value={{ products, setProducts }}>
        <cartContext.Provider value={{ cart, setCart, isOpen, setIsOpen }} >
          <checkOutContext.Provider value={{ checkoutNavigated, setCheckOutNavigated }}>
            <Routes>
              <Route path="/" element={<Home />} />
              //!protected Route
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/product/:productId" element={<Product />} />
            </Routes>
          </checkOutContext.Provider>
        </cartContext.Provider>
      </productContext.Provider >
    </>
  )
}

export default App
