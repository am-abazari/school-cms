import React, {  useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import school from "../Images/Signup/school.jpg";
import loading from "../Images/Elements/loading.png";

import { Toastify_Success, Toastify_Error } from '../Components/Toastify';
import axios from 'axios';
import BaseURL from '../BaseURL';
import BaseName from "../BaseName"


const Signup = () => {
    const navigate = useNavigate();

    let [name, setName] = useState("");
    let [family, setFamily] = useState("");
    let [mobile, setMobile] = useState("");
    let [username, setUsername] = useState("");
    let [password, setPassword] = useState("");

    let [nameActive, setNameActive] = useState(false);
    let [familyActive, setFamilyActive] = useState(false);
    let [mobileActive, setMobileActive] = useState(false);
    let [usernameActive, setUsernameActive] = useState(false);
    let [passwordActive, setPasswordActive] = useState(false);

    let [nameFinal, setNameFinal] = useState(false);
    let [familyFinal, setFamilyFinal] = useState(false);
    let [mobileFinal, setMobileFinal] = useState(false);
    let [usernameFinal, setUsernameFinal] = useState(false);
    let [passwordFinal, setPasswordFinal] = useState(false);



    useEffect(() => {
        if (nameActive) {
            if (name.length < 3) {
                setNameFinal(true);
            } else {
                setNameFinal(false);
            }
        }
    }, [name, nameActive]);
    useEffect(() => {
        if (familyActive) {
            if (family.length < 3) {
                setFamilyFinal(true);
            } else {
                setFamilyFinal(false);
            }
        }
    }, [family, familyActive]);
    useEffect(() => {
        if (mobileActive) {
            if (mobile.length != 11) {
                setMobileFinal(true);
            } else {
                setMobileFinal(false);
            }
        }
    }, [mobile, mobileActive]);
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


    useEffect(() => {
        document.title = BaseName + "ثبت نام";
    }, []);

    // Submit
    const [isSignup, setisSignup] = useState(false);
    const mobileValidat = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
    const usernameValidate = /^[a-zA-Z0-9_]+$/;

    const signup = () => {
        if (!nameFinal && !familyFinal && !mobileFinal && !usernameFinal && !passwordFinal && nameActive && familyActive && mobileActive && usernameActive && passwordActive && name.length && family.length && username.length && mobile.length && password.length) {
            if (mobile.match(mobileValidat)) {
                if (username.match(usernameValidate)) {
                    setName("");
                    setFamily("");
                    setMobile("");
                    setUsername("");
                    setPassword("");

                    setisSignup(true);

                    axios.post(BaseURL + "cms-backend/signup.php", {
                        name: name,
                        family: family,
                        mobile: mobile,
                        username: username.toLowerCase(),
                        password: password,
                    })
                        .then(function (response) {
                            if (response.data == "200") {
                                Toastify_Success("ثبت نام موفقیت آمیز بود");
                                setisSignup(false);
                                navigate("/Login")

                            } else if (response.data.username == username) {
                                Toastify_Error(`موجود میباشد ${response.data.username} نام کاربری`);
                                setisSignup(false);
                            }
                            else {
                                Toastify_Error("خطایی هنگام عملیات رخ داده است !");
                                setisSignup(false);
                            }
                        })
                        .catch(function () {
                            Toastify_Error("خطایی هنگام عملیات رخ داده است !");
                            setisSignup(false);
                        })
                } else {
                    Toastify_Error("نام کاربری نا معتبر است");
                    setUsername("");
                    setPassword("");
                    setisSignup(false);
                }
            } else {
                Toastify_Error("شماره موبایل نا معتبر است");
                setMobile("");
                setPassword("");
                setisSignup(false);
            }


        } else {
            Toastify_Error("لطفا فیلد هارا پر کنید");
            setisSignup(false);
        }
    }

    return (
        <div className='w-screen  px-4 py-4 md:py-0 md:px-0 h-screen flex items-start font-Shabnam '>
            <div className='w-240 pb-8 xl:pb-0 dark:bg-bg_dark-50 m-auto rounded-2xl shadow-lg bg-bg_light-100 dark:shadow-slate-900 flex'>
                <img src={school} alt="" className='w-0 xl:w-1/2 h-full rounded-l-2xl' />
                <div className='w-full xl:w-1/2 h-full rounded-r-2xl' dir='rtl'>
                    <h2 className='font-Shabnam_Bold text-3xl text-center text-gray-600 dark:text-gray-400 my-16'><span className='text-green-600'>ثبت نام</span> در  سامانه</h2>
                    <form className='dark:text-gray-400 text-gray-600 mx-14 m-auto select-none'>
                        <label htmlFor="name" className={'block mb-2 ' + (nameActive && name && (nameFinal ? " text-red-600 " : " text-green-500 ")) + (isSignup ? " pointer-events-none" : "pointer-events-auto")}> نام </label>
                        <input value={name} onFocus={() => {
                            setNameActive(true);
                        }} onChange={(event) => {
                            setName(event.target.value.trim());
                        }} type="text" required id='name' autoComplete='off' className={" bg-gray-200 focus:bg-gray-300 block w-full border-none outline-none outline-offset-0 text-bg_dark-100 py-2 border border-gray-100 px-3 dark:bg-gray-400 rounded-md dark:focus:bg-gray-300 " + (nameActive && name && (nameFinal ? "outline outline-red-500 dark:bg-red-200 dark:focus:bg-red-200 bg-red-100 focus:bg-red-100 text-red-800" : "outline outline-green-500 bg-green-50 focus:bg-green-50 dark:bg-green-50 dark:focus:bg-green-50 text-green-700")) + (isSignup ? " pointer-events-none" : "pointer-events-auto")} />



                        <label htmlFor="family" className={'block mb-2 mt-5 ' + (familyActive && family && (familyFinal ? " text-red-600 " : " text-green-500 ")) + (isSignup ? " pointer-events-none" : "pointer-events-auto")}> نام خانوادگی </label>
                        <input value={family} onFocus={() => {
                            setFamilyActive(true);
                        }} onChange={(event) => {
                            setFamily(event.target.value.trim());
                        }} type="text" required id='family' autoComplete='off' className={" bg-gray-200 focus:bg-gray-300 block w-full border-none outline-none outline-offset-0 text-bg_dark-100 py-2 border border-gray-100 px-3 dark:bg-gray-400 rounded-md dark:focus:bg-gray-300 " + (familyActive && family && (familyFinal ? "outline outline-red-500 dark:bg-red-200 dark:focus:bg-red-200 bg-red-100 focus:bg-red-100 text-red-800" : "outline outline-green-500 bg-green-50 focus:bg-green-50 dark:bg-green-50 dark:focus:bg-green-50 text-green-700")) + (isSignup ? " pointer-events-none" : "pointer-events-auto")} />



                        <label htmlFor="mobile" className={'block mb-2 mt-5 ' + (mobileActive && mobile && (mobileFinal ? " text-red-600 " : " text-green-500 ")) + (isSignup ? " pointer-events-none" : "pointer-events-auto")}> تلفن همراه </label>
                        <input value={mobile} onFocus={() => {
                            setMobileActive(true);
                        }} onChange={(event) => {
                            setMobile(event.target.value);

                        }} type="tel" required id='mobile' autoComplete='off' className={" bg-gray-200 focus:bg-gray-300 block w-full border-none outline-none outline-offset-0 text-bg_dark-100 py-2 border border-gray-100 px-3 dark:bg-gray-400 rounded-md dark:focus:bg-gray-300 " + (mobileActive && mobile && (mobileFinal ? "outline outline-red-500 dark:bg-red-200 dark:focus:bg-red-200 bg-red-100 focus:bg-red-100 text-red-800" : "outline outline-green-500 bg-green-50 focus:bg-green-50 dark:bg-green-50 dark:focus:bg-green-50 text-green-700")) + (isSignup ? " pointer-events-none" : "pointer-events-auto")} />



                        <label htmlFor="username" className={'block mb-2 mt-5 ' + (usernameActive && username && (usernameFinal ? " text-red-600 " : " text-green-500 ")) + (isSignup ? " pointer-events-none" : "pointer-events-auto")}> نام کاربری </label>
                        <input value={username} onFocus={() => {
                            setUsernameActive(true);
                        }} onChange={(event) => {
                            setUsername(event.target.value.trim());
                        }} type="text" required id='username' autoComplete='off' className={" bg-gray-200 focus:bg-gray-300 block w-full border-none outline-none outline-offset-0 text-bg_dark-100 py-2 border border-gray-100 px-3 dark:bg-gray-400 rounded-md dark:focus:bg-gray-300 " + (usernameActive && username && (usernameFinal ? "outline outline-red-500 dark:bg-red-200 dark:focus:bg-red-200 bg-red-100 focus:bg-red-100 text-red-800" : "outline outline-green-500 bg-green-50 focus:bg-green-50 dark:bg-green-50 dark:focus:bg-green-50 text-green-700")) + (isSignup ? " pointer-events-none" : "pointer-events-auto")} />



                        <label htmlFor="password" className={'block mb-2 mt-5 ' + (passwordActive && password && (passwordFinal ? " text-red-600 " : " text-green-500 ")) + (isSignup ? " pointer-events-none" : "pointer-events-auto")}> رمز عبور </label>
                        <input value={password} onFocus={() => {
                            setPasswordActive(true);
                        }} onChange={(event) => {
                            setPassword(event.target.value);
                        }} type="password" required id='password' autoComplete='off' className={" bg-gray-200 focus:bg-gray-300 block w-full border-none outline-none outline-offset-0 text-bg_dark-100 py-2 px-3 dark:bg-gray-400 rounded-md dark:focus:bg-gray-300 " + (passwordActive && password && (passwordFinal ? "outline outline-red-500 dark:bg-red-200 dark:focus:bg-red-200 bg-red-100 focus:bg-red-100 text-red-800" : "outline outline-green-500 bg-green-50 focus:bg-green-50 dark:bg-green-50 dark:focus:bg-green-50 text-green-700")) + (isSignup ? " pointer-events-none" : "pointer-events-auto")} />




                        <div className='flex justify-between mt-12 mb-12'>
                            <button type='button' onClick={signup} className={'w-full bg-green-600 text-white text-center ml-3 py-1 rounded-md hover:bg-green-500 transition-all flex items-center justify-around ' + (isSignup ? "pointer-events-none" : "pointer-events-auto")}><p className={'text-center m-auto ' + (isSignup && "hidden")}>ثبت نام</p> <img className={'w-6 absolute animate-spin ' + (!isSignup && " hidden")} src={loading} alt="loading" /></button>
                            <Link type='button' className='w-full border-2 text-green-600 border-green-600 text-center mr-3 py-1 rounded-md hover:border-green-500 transition-all' to={"/Login"}>ورود</Link>
                        </div>
                    </form>
                </div>

            </div>
        </div>

    );
};

export default React.memo(Signup);