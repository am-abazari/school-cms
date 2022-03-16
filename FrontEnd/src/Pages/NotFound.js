import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import BaseName from "../BaseName"
import Footer from '../Components/Footer'
import img from "../Images/pageNotFount/ops-removebg-preview.png"
const NotFound = () => {
    useEffect(() => {
        document.title = BaseName + "404";
    }, []);
    return (
        <>
            <div className='flex w-full h-full '>
                <div className='w-full h-full absolute left-0 font-Shabnam' >
                    <h3 className='text-gray-400 text-center  font-Shabnam_Bold p-24 text-3xl w-full'>صفحه مورد نظر پیدا نشد</h3>
                    <div className='flex items-center justify-center flex-wrap'>
                        <img src={img} alt="OOOps" className='m-auto text-center max-h-137.5' />
                    </div>
                    <Link className='pb-24 dark:text-texts text-text_light-100 mt-12 text-center text-3xl m-auto w-full block' to={"/"}><i class="fa-solid fa-arrow-right-from-bracket rotate-180 font-thin mx-4"></i>  خانه </Link>
                </div>
            </div >
            <Footer />
        </>
    );
};

export default NotFound;