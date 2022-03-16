import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Cookies from 'universal-cookie';
import { v4 } from 'uuid';
import BaseURL from '../BaseURL';
import { gregorian_to_jalali } from '../Functions/jdf';

const ExamItem = (props) => {

    const cookies = new Cookies();

    const [examResult, setexamResult] = useState([]);
    useEffect(() => {
        setexamResult([]);
        axios.post(BaseURL + "cms-backend/examResult.php", {
            user_id: cookies.get("id"),
        })
            .then(function (response) {
                for (let i = 0; i < Object.keys(response.data).length - 1; i++) {
                    setexamResult(examResult => [...examResult, Number(response.data[i].exam_id)])
                }
            })
            .catch(function (error) {
            })

    }, []);


    return (
        <div className='px-8'>
            {
                props.children.map(data => {
                    let year = data[3].split(" ")[0].split("-")[0];
                    let month = data[3].split(" ")[0].split("-")[1];
                    let date = data[3].split(" ")[0].split("-")[2];

                    const today_date = new Date().getDate();
                    const today_year = new Date().getFullYear();
                    const today_month = new Date().getMonth() + 1;
                    const isToday = year == today_year && month == today_month && date == today_date;
                    return (
                        <div key={v4()} className='w-full mb-6 h-32 md:h-24 block md:flex flex-wrap py-2 items-center justify-between rounded-lg px-4 bg-gray-400 dark:bg-gray-600 bg-opacity-25 dark:bg-opacity-40 shadow-md shadow-gray-500 dark:shadow-bg_dark-100'>
                            <div className='w-full flex justify-between'>
                                <Link to={`/Exam/${data[0]}`} className='mb-4 md:mb-0 text-green-500'>{data[1]}</Link>
                                <p>{examResult.includes(Number(data[0])) ? <i className="text-xl text-green-400 fa-solid fa-check"></i> : <i className="text-xl text-red-500 fa-solid fa-xmark"></i>}</p>

                            </div>
                            <div className='flex items-center text-sm mb-4 md:mb-0 '>
                                <p className='dark:text-gray-400 text-bg_dark-200'>{data[1]}</p>
                                <p>{data[2] && <i className=" mx-2 text-gray-600 mt-2 fa-solid fa-arrow-left"></i>}</p>
                                <p className='dark:text-gray-400 text-bg_dark-200'>{data[2]}</p>
                            </div>
                            <div>
                                {
                                    <p className='dark:text-gray-500 text-bg_dark-50 text-sm'> {data[4]} <span>تا </span> {data[5]}  {gregorian_to_jalali(Number(year), Number(month), Number(date))[0] + "/" + gregorian_to_jalali(Number(year), Number(month), Number(date))[1] + "/" + gregorian_to_jalali(Number(year), Number(month), Number(date))[2]} </p>
                                }
                            </div>
                        </div>
                    );
                })
            }
        </div>
    );
};
export default ExamItem;