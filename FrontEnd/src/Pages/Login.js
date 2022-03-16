import React, { useCallback, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import school from "../Images/Login/school.jpg"
import loading from "../Images/Elements/loading.png";
import Cookies from "universal-cookie";

import { Toastify_Success, Toastify_Error } from '../Components/Toastify';
import axios from 'axios';
import deleteAllCookies from '../Functions/deleteCookies';
import BaseURL from '../BaseURL';
import BaseName from "../BaseName"




const Login = () => {
    const navigate = useNavigate();
    const cookies = new Cookies();

    useEffect(() => {
        if (cookies.get("id") && cookies.get("username") && cookies.get("password")) {
            navigate("/Dashboard")
        } else {
            deleteAllCookies();
        }
        document.title = BaseName + "ورود";
    }, []);

    let [username, setUsername] = useState("");
    let [password, setPassword] = useState("");

    let [usernameActive, setUsernameActive] = useState(false);
    let [passwordActive, setPasswordActive] = useState(false);

    let [usernameFinal, setUsernameFinal] = useState(false);
    let [passwordFinal, setPasswordFinal] = useState(false);

    let [remember, setRemember] = useState(false);




    useEffect(() => {
        if (usernameActive) {
            if (username.length < 3) {
                setUsernameFinal(true);
            } else {
                setUsernameFinal(false);
            }
        }
    }, [username, usernameActive]);
    useEffect(() => {
        if (passwordActive) {
            if (password.length < 6) {
                setPasswordFinal(true);
            } else {
                setPasswordFinal(false);
            }
        }
    }, [password, passwordActive]);




    // Do Login
    const [isLogging, setisLogging] = useState(false);

    const doLogin = useCallback(() => {
        deleteAllCookies();
        if (!usernameFinal && !passwordFinal && usernameActive && passwordActive && username.length && password.length) {
            setUsername("");
            setPassword("");
            setisLogging(true);

            axios.post(BaseURL + "cms-backend/login.php", {
                username: username,
                password: password,
            })
                .then(function (response) {
                    if (response.data.resp == "200") {
                        let time;
                        if (remember) {
                            time = 30 * 24 * 60 * 60 * 1000; // 30 day
                        } else {
                            time = 15 * 60 * 1000; // 15 min
                        }
                        cookies.set("id", response.data.id, { expires: new Date(Date.now() + time) });
                        cookies.set("username", response.data.username, { expires: new Date(Date.now() + time) });
                        cookies.set("password", response.data.password, { expires: new Date(Date.now() + time) });
                        cookies.set("avatar", response.data.avatar, { expires: new Date(Date.now() + time) });

                        Toastify_Success("با موفقیت وارد شدید");
                        setisLogging(false);
                        if (response.data.role == 1) {
                            navigate("/Dashboard");
                        }

                    } else if (response.data.resp == 400) {
                        Toastify_Error("حساب کاربری شما در حال حاضر غیر فعال میباشد");
                        setisLogging(false);
                    } else {
                        Toastify_Error("نام کاربری یا رمز عبور موجود نمیباشید");
                        setisLogging(false);
                    }
                })
                .catch(function (err) {
                    Toastify_Error("اروری به هنگام ورود رخ داده است")
                    setisLogging(false);
                })
        } else {
            Toastify_Error("لطفا فیلد هارا پر کنید")
        }
    })

    return (
        <div className='w-screen h-screen px-4 py-4 md:py-0 md:px-0 flex items-start font-Shabnam '>
            <div className='w-225 pb-12 xl:pb-0 h-137.5 dark:bg-bg_dark-50 m-auto rounded-2xl shadow-lg bg-bg_light-100 dark:shadow-slate-900 flex'>
                <div className='w-full xl:w-1/2 h-full rounded-l-2xl' dir='rtl'>
                    <h2 className='font-Shabnam_Bold text-3xl text-center text-gray-600 dark:text-gray-400 my-16'><span className='text-blue-700 font-Shabnam_Bold'>ورود</span> به سامانه</h2>
                    <form className=' text-gray-600 dark:text-gray-400 mx-14 m-auto select-none'>
                        <label htmlFor="username" className={'block mb-3 ' + (isLogging ? " pointer-events-none " : " pointer-events-auto ") + (usernameActive && username && (usernameFinal ? "text-red-600" : "text-green-500"))} > نام کاربری </label>
                        <input value={username} onFocus={() => {
                            setUsernameActive(true);
                        }} onChange={(event) => {
                            setUsername(event.target.value.trim());
                        }} type="text" id='username' autoComplete='off'
                            className={'bg-gray-200 focus:bg-gray-300 outline-offset-0 block w-full outline-none text-bg_dark-100 py-2 px-3 dark:bg-gray-400 rounded-md dark:focus:bg-gray-300 ' + (usernameActive && username && (usernameFinal ? " outline outline-red-500 dark:bg-red-200 dark:focus:bg-red-200 bg-red-100 focus:bg-red-100 text-red-800 " : " outline outline-green-500 bg-green-50 focus:bg-green-50 dark:bg-green-50 dark:focus:bg-green-50 text-green-700 ")) + (isLogging ? " pointer-events-none" : "pointer-events-auto")} />


                        <label htmlFor="password" className={'block mb-3 mt-5  ' + (isLogging ? " pointer-events-none " : " pointer-events-auto ") + (passwordActive && password && (passwordFinal ? "text-red-600" : "text-green-500"))}> رمز عبور </label>
                        <input value={password} onFocus={() => {
                            setPasswordActive(true);
                        }} onChange={(event) => {
                            setPassword(event.target.value);
                        }} type="password" id='password' autoComplete='off'
                            className={'bg-gray-200 focus:bg-gray-300  outline-offset-0 block w-full outline-none text-bg_dark-100 py-2 px-3 dark:bg-gray-400 rounded-md dark:focus:bg-gray-300 ' + (passwordActive && password && (passwordFinal ? " outline outline-red-500 dark:bg-red-200 dark:focus:bg-red-200 bg-red-100 focus:bg-red-100 text-red-800 " : " outline outline-green-500 bg-green-50 focus:bg-green-50 dark:bg-green-50 dark:focus:bg-green-50 text-green-700 ")) + (isLogging ? " pointer-events-none" : "pointer-events-auto")} />


                        <div className="block sm:flex justify-between pt-6">
                            <div className="flex items-start mb-7 sm:mb-0  ">
                                <div className="flex items-center h-5">
                                    <input id="remember" defaultChecked={remember}
                                        onChange={() => setRemember(!remember)} aria-describedby="remember" type="checkbox" className={"checkbox checkbox dark:checkbox  checkbox-secondary  w-4 h-4 rounded " + (isLogging ? " pointer-events-none" : "pointer-events-auto")} required />
                                </div>
                                <div className="ml-3 text-sm">
                                    <label htmlFor="remember" className={"font-medium text-gray-900 dark:text-gray-400 px-3 " + (isLogging ? " pointer-events-none" : "pointer-events-auto")}>مرا به خاطر بسپار</label>
                                </div>
                            </div>
                            <Link to={"#"} className={'text-rose-500 ' + (isLogging ? " pointer-events-none" : "pointer-events-auto")}>فراموشی رمز عبور ؟</Link>
                        </div>

                        <div className='flex justify-between mt-12'>
                            <button onClick={doLogin} type='button' className={'w-full bg-blue-700 text-white text-center ml-3 py-1 rounded-md hover:bg-primary transition-all flex items-center justify-around ' + (isLogging ? " pointer-events-none" : "pointer-events-auto")}><p className={'text-center m-auto ' + (isLogging && "hidden")}>ورود</p> <img className={'w-6 absolute animate-spin ' + (!isLogging && " hidden")} src={loading} alt="loading" /></button>
                            <Link type='button' className='w-full dark:text-blue-500 text-blue-700 border-2 border-blue-700 text-center mr-3 py-1 rounded-md hover:border-primary transition-all' to={"/Signup"}>ثبت نام</Link>
                        </div>
                    </form>
                </div>
                <img src={school} alt="" className='w-0 lg:w-1/2 h-full rounded-r-2xl' />
            </div>
        </div>


    );
};

export default React.memo(Login);