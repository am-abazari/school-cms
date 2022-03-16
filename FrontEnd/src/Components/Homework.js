import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Cookies from 'universal-cookie';
import { v4 } from 'uuid';
import BaseURL from '../BaseURL';
import { gregorian_to_jalali } from '../Functions/jdf';

const Homework = (props) => {
    const cookies = new Cookies();

    const [homeworkStatus, setHomeworkStatus] = useState([]);
    useEffect(() => {
        setHomeworkStatus([]);
        axios.post(BaseURL + "cms-backend/homeworkStatus.php", {
            user_id: cookies.get("id"),
        })
            .then(function (response) {
                for (let i = 0; i < Object.keys(response.data).length - 1; i++) {
                    setHomeworkStatus(homeworkStatus => [...homeworkStatus, Number(response.data[i].homework_id)])
                }
            })
            .catch(function (error) {
            })

    }, []);
    return (
        <div className='px-8'>
            {
                props.children.map(data => {
                    let year = data[4].split(" ")[0].split("-")[0];
                    let month = data[4].split(" ")[0].split("-")[1];
                    let date = data[4].split(" ")[0].split("-")[2];
                    let hour = data[4].split(" ")[1].split(":")[0] + ":" + data[4].split(" ")[1].split(":")[1]
                    return (
                        <div key={v4()} className='w-full mb-6 h-32 sm:h-24 block sm:flex flex-wrap py-2 items-center justify-between rounded-lg px-4 bg-gray-400 dark:bg-gray-600 bg-opacity-25 dark:bg-opacity-40 shadow-md shadow-gray-600 dark:shadow-bg_dark-100'>
                            <div className='w-full flex justify-between'>
                                <Link to={`/Homeworks/${data[5]}`} className='text-green-500'>{data[0]}</Link>
                                <p>{homeworkStatus.includes(Number(data[5])) ? <i className="text-xl text-green-400 fa-solid fa-check"></i> : <i className="text-xl text-red-500 fa-solid fa-xmark"></i>}</p>

                            </div>
                            <div className='flex items-center text-sm mt-2 sm:mt-0'>
                                <p className='dark:text-gray-400 text-bg_dark-200'>{data[1]}</p>
                                <p>{data[2] && <i className=" mx-2 dark:text-gray-600 mt-2 fa-solid fa-arrow-left"></i>}</p>
                                <p className='dark:text-gray-400 text-bg_dark-200'>{data[2]}</p>
                            </div>
                            <div>
                                {
                                    <p className='dark:text-gray-500 text-bg_dark-200 text-sm'><span>تا </span> {hour}  {gregorian_to_jalali(Number(year), Number(month), Number(date))[0] + "/" + gregorian_to_jalali(Number(year), Number(month), Number(date))[1] + "/" + gregorian_to_jalali(Number(year), Number(month), Number(date))[2]} </p>
                                }
                            </div>
                        </div>
                    )
                })
            }
        </div>
    );
};

export default React.memo(Homework);