import React, { useContext, useEffect, useState } from 'react'
import { checkOutContext } from '../CONTEXT/Context'
import { useNavigate } from 'react-router-dom';
import axios from "axios";
// import WebApp from "@twa-dev/sdk"

function Checkout() {
    const [userData, setuserData] = useState(null);
    const { checkoutNavigated, setCheckOutNavigated } = useContext(checkOutContext);
    const [chat, setChat] = useState(null);
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

        const checkTelegram = () => {
            if (window.Telegram.WebApp) {
                const user = window.Telegram.WebApp.initDataUnsafe?.user || null;
                setuserData(user);
                if (window.Telegram.WebApp.initDataUnsafe?.chat) {
                    setChat(window.Telegram.WebApp.initDataUnsafe.chat.id);
                }
            } else {
                // Try again in 100ms until Telegram is ready
                setTimeout(checkTelegram, 100);
            }
        }

        checkTelegram();

        return () => {
            setCheckOutNavigated(false);
        }


    }, []);
    return (
        <>
            {/* // <div>User Id : {user.id}</div> */}
            {
                userData ? <div>User id : {userData}</div> : <div>Not Found User Id</div>
            }
            {
                chat ? <div>Chat id : {chat}</div> : <div>Not Found Chat Id</div>
            }
        </>
    )
}

export default Checkout