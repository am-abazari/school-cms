import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie';
import flag from "../Images/Navbar/flag.png"

const Horizontal = (props) => {

    const navigate = new useNavigate();
    const [isDark, setisDark] = useState();
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
            <div className='fixed z-30 h-28 width-set left-0 px-2 sm:px-8 py-6 font-Shabnam block 2xl:hidden'>
                <div className='items-center px-4 justify-between w-full h-full bg-bg_light-100 dark:bg-bg_dark-50 flex rounded-lg shadow-md shadow-gray-300 dark:shadow-slate-900'>
                    <div className='flex items-center'>
                        <div className="relative block m-auto w-12 h-12">
                            <img src={avatar ? require(`../Images/avatars/${avatar}`) : require(`../Images/avatars/defult.png`)} alt="Avatar" className='inline-block object-cover rounded-full w-full h-full m-auto shadow-lg shadow-gray-400 dark:shadow-bg_dark-200' />
                            <span className={"absolute bottom-0 right-1 inline-block w-3 h-3  border border-white rounded-full " + (props.activity == 1 ? "bg-green-600" : props.activity == 2 ? "bg-yellow-400" : "bg-red-600")}></span>
                        </div>
                        <p className='mx-4 font-Shabnam_Bold text-text_light-100 dark:text-gray-400'>{props.name}&nbsp;{props.family}</p>
                        <button className='mr-4' onClick={() => {
                            if (isDark) {
                                setisDark(false);
                                selector.classList.remove("dark");
                                localStorage.setItem("theme", "light");
                            } else {
                                setisDark(true);
                                selector.classList.add("dark");
                                localStorage.setItem("theme", "dark");
                            }
                        }}>
                            {
                                isDark ?
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-bg_dark-50 dark:text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                                    </svg>
                                    :
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                                    </svg>
                            }
                        </button>
                        <button className='flex ml-2 items-center query-hidden '>
                            <img src={flag} alt="flag" className='w-8 h-6' />
                            <p className='text-text_light-100 dark:text-gray-400 text-sm  mx-3 font-Shabnam_Bold'>فارسی</p>
                        </button>
                        
                    </div>

                    <button onClick={() =>{
                        const sidebar = document.getElementById("sidebar") ;
                        sidebar.classList.remove("sidebar-inactive")
                        sidebar.classList.add("sidebar-active")
                    }}
                    
                    type='button' className='block 2xl:hidden'><svg xmlns="http://www.w3.org/2000/svg" className=" h-6 w-6 text-bg_dark-50 dark:text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                    </svg></button>
                </div>
            </div>
        </>
    );
};

export default Horizontal;