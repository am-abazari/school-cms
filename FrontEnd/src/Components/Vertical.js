import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie';
import deleteAllCookies from '../Functions/deleteCookies';

const Vertical = (props) => {
    const navigate = new useNavigate();
    const [isDark, setisDark] = useState(true);
    let selector = document.getElementById("theme");



    // Defult Dark Theme ...
    const [avatar, setAvatar] = useState(new Cookies().get("avatar"));
    useEffect(() => {
        if (localStorage.getItem("theme")) {
            if (localStorage.getItem("theme") == "dark") {
                setisDark(true)
            } else {
                setisDark(false)
            }
        } else {
            setisDark(true)
            localStorage.setItem("theme", "dark")
        }
    }, []);


    return (
        <>
            <div className={'w-72 h-screen fixed z-40 bg-bg_light-100 sidebar dark:bg-bg_dark-50 right-0 parent-scroll shadow-lg '} dir='rtl' id='sidebar'>
                <button className='block 2xl:hidden' onClick={() => {
                    const sidebar = document.getElementById("sidebar");
                    sidebar.classList.remove("sidebar-active")
                    sidebar.classList.add("sidebar-inactive")
                }}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="relative right-0 mt-6 -mb-6 mr-56 h-7 w-7 text-btns" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
                <div className='mb-5 child-scroll hidden 2xl:block'>
                    <div className="relative block m-auto mt-8 w-32 h-32">
                        <img src={avatar ? require(`../Images/avatars/${avatar}`) : require(`../Images/avatars/defult.png`)} alt="Avatar" className='inline-block object-cover rounded-full w-32 h-32 m-auto shadow-lg shadow-gray-400 dark:shadow-bg_dark-200' />
                        <span className={"absolute bottom-2 right-2 inline-block w-4 h-4  border-2 border-white rounded-full " + (props.activity == 1 ? "bg-green-600" : props.activity == 2 ? "bg-yellow-400" : "bg-red-600")}></span>
                    </div>
                    <p className='text-tags  mt-5 text-center font-Shabnam_Bold text-lg capitalize'>{props.name}&nbsp;{props.family}</p>
                    <div className="form-control w-full items-center mt-5">
                        <label className="label cursor-pointer">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 ml-2 text-gray-500 dark:text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                            </svg>
                            <input type="checkbox" checked={isDark ? false : true} className="toggle" onChange={() => {
                                if (isDark) {
                                    setisDark(false);
                                    selector.classList.remove("dark");
                                    localStorage.setItem("theme", "light");
                                } else {
                                    setisDark(true);
                                    selector.classList.add("dark");
                                    localStorage.setItem("theme", "dark");
                                }
                            }} />
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                            </svg>
                        </label>
                    </div>
                    {/* <button onClick={() => {
                        if (isDark) {
                            setisDark(false);
                            selector.classList.remove("dark");
                            localStorage.setItem("theme", "light");
                        } else {
                            setisDark(true);
                            selector.classList.add("dark");
                            localStorage.setItem("theme", "dark");
                        }
                    }} className='w-20 flex h-7 m-auto mt-6 shadow-lg shadow-gray-300 dark:shadow-bg_dark-200 rounded-full'>
                        <div className={'w-1/2 h-full rounded-r-full  flex justify-center items-center ' + (isDark ? "active-theme" : "inactive-theme")}>
                            <i className="fa-solid fa-moon  text-xl"></i>
                        </div>
                        <div className={'w-1/2 h-full flex justify-center items-center text-lg rounded-l-full ' + (isDark ? "inactive-theme" : "active-theme")}>
                            <i className="fa-solid fa-sun  text-sm"></i>
                        </div>
                    </button> */}
                </div>

                <div className='mx-4 pb-3 px-4 mt-9'>
                    <nav className='font-Shabnam_Medium'>
                        {/* -----------First Part----------- */}
                        <ul>
                            <p className='dark:text-gray-500 text-bg_dark-100 border-b-2 dark:border-gray-700 pb-2 uppercase mb-8 font-Shabnam_Light'>منو</p>
                            <li className={'list-none dark:text-texts text-gray-600  py-2.5 flex mb-8 hover:pr-7 transition-all ' + (props.activeTab == 1 ? "active-tab" : "inactive-tab")}>
                                <Link to={"/Dashboard"} className={"w-full h-full pr-3 flex"}><svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                                </svg>صفحه اصلی
                                </Link>
                            </li>


                            <li className={'list-none dark:text-texts text-gray-600  py-2.5 flex mb-8 hover:pr-7 transition-all ' + (props.activeTab == 2 ? "active-tab" : "inactive-tab")}>
                                <Link to={"/Study"} className={"w-full h-full pr-3 flex"}><svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>ساعت مطالعه
                                </Link>
                            </li>


                            <li className={'list-none dark:text-texts text-gray-600  py-2.5 flex mb-8 hover:pr-7 transition-all ' + (props.activeTab == 3 ? "active-tab" : "inactive-tab")}>
                                <Link to={"/Homeworks"} className={"w-full h-full pr-3 flex"}>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                    </svg>تکالیف
                                </Link>
                            </li>


                            <li className={'list-none dark:text-texts text-gray-600  py-2.5 flex mb-8 hover:pr-7 transition-all ' + (props.activeTab == 4 ? "active-tab" : "inactive-tab")}>
                                <Link to={"/Class"} className={"w-full h-full pr-3 flex"}>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                    </svg>کلاس های آنلاین
                                </Link>
                            </li>


                            <li className={'list-none dark:text-texts text-gray-600  py-2.5 flex mb-8 hover:pr-7 transition-all ' + (props.activeTab == 5 ? "active-tab" : "inactive-tab")}>
                                <Link to={"/Exam"} className={"w-full h-full pr-3 flex"}><svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                </svg>آزمون ها
                                </Link>
                            </li>
                        </ul>


                        {/* -----------Second Part----------- */}
                        <ul className='mt-16'>
                            <p className='dark:text-gray-500 text-bg_dark-100 border-b-2 dark:border-gray-700 pb-2 uppercase mb-8 font-Shabnam_Light'>سایر</p>
                            <li className={'list-none dark:text-texts text-gray-600  py-2.5 flex mb-8 hover:pr-7 transition-all ' + (props.activeTab == 6 ? "active-tab" : "inactive-tab")}>
                                <Link to={"/Setting"} className={"w-full h-full pr-3 flex"}><svg xmlns="http://www.w3.org/2000/svg" className="ml-2 h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg> تنظیمات
                                </Link>
                            </li>


                            <li className={'list-none  py-2.5 flex mb-8 hover:pr-7 transition-all inactive-tab text-red-500'}>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                </svg>
                                <button type='button' className={" mr-3 inline"} onClick={() => {
                                    deleteAllCookies();
                                    navigate("/Login");
                                }}>خروج</button>
                            </li>
                        </ul>
                    </nav>
                </div>

            </div >
        </>
    );
};

export default React.memo(Vertical);