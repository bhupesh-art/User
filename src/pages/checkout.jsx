import React, { useContext, useEffect, useState } from 'react'
import { checkOutContext } from '../CONTEXT/Context'
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import WebApp from "@twa-dev/sdk"

function Checkout() {
    const [user, setuser] = useState(null);
    const { checkoutNavigated, setCheckOutNavigated } = useContext(checkOutContext);
    const navigate = useNavigate();
    useEffect(() => {
        if (!checkoutNavigated) {
            navigate("/", { replace: true });
            return;
        }
        // const tg = window.Telegram.WebApp;
        // const user = tg.initDataUnsafe.user;
        // // const user = { user: "user" };

        // (async function () {
        //     const BACKEND_URL = import.meta.env.VITE_API_URL;
        //     try {
        //         const response = await axios.post(`${BACKEND_URL}/api/test`, user);
        //         console.log(response.data);
        //     } catch (err) {
        //         console.error(`ERROR IN TELEGRAM : ${err}`);
        //     }
        // })()

        // const handleTasks = () => {
        //     setCheckOutNavigated(false);
        //     document.body.removeChild(script);
        // }

        // let script;
        // if (!window.Telegram) {
        //     script = document.createElement("script");
        //     script.src = "https://telegram.org/js/telegram-web-app.js";
        //     script.async = true;

        //     script.onload = () => {
        //         const tgUser = window.Telegram?.WebApp?.initDataUnsafe?.user;
        //         if (tgUser) setuser(tgUser.id);
        //     };

        //     document.body.appendChild(script);


        // }
        // else {
        //     const tgUser = window.Telegram?.WebApp?.initDataUnsafe?.user;
        //     if (tgUser) setuser(tgUser.id);
        // }

        // return () => {
        //     if (script && document.body.contains(script)) document.body.removeChild(script);
        //     setCheckOutNavigated(false);
        // };

        if (WebApp.initDataUnsafe.user) {
            setuser(WebApp.initDataUnsafe.user);
        }

        return () => {
            setCheckOutNavigated(false);
        }


    }, []);
    return (
        <div>User Id : {user.id}</div>
    )
}

export default Checkout