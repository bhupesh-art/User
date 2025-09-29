import React, { useContext, useEffect } from 'react'
import { checkOutContext } from '../CONTEXT/Context'
import { useNavigate } from 'react-router-dom';
import axios from "axios";

function Checkout() {
    const { checkoutNavigated, setCheckOutNavigated } = useContext(checkOutContext);
    const navigate = useNavigate();
    useEffect(() => {
        if (!checkoutNavigated) {
            navigate("/", { replace: true });
        }
        const tg = window.Telegram.WebApp;
        const user = tg.initDataUnsafe.user;
        // const user = { user: "user" };

        (async function () {
            const BACKEND_URL = import.meta.env.VITE_API_URL;
            try {
                const response = await axios.post(`${BACKEND_URL}/test`, user);
                console.log(response.data);
            } catch (err) {
                console.error(`ERROR IN TELEGRAM : ${err}`);
            }
        })()


        return () => { setCheckOutNavigated(false) };
    }, []);
    return (
        <div>checkout page </div>
    )
}

export default Checkout