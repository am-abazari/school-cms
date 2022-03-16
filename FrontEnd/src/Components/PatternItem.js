import React from 'react';
import timeConvert from "../Functions/timeConvert";
import { giveTodayShamsi } from '../Functions/giveToday';
const PatternItem = (props) => {
    const lesson = props.item.split("=")[0];
    const time = props.item.split("=")[1];
    const days = props.item.split("=")[2];
    return (
        <div className='block sm:flex justify-between w-full bg-gray-400 dark:bg-gray-600 mb-6 py-9 px-10 rounded-xl bg-opacity-25 dark:bg-opacity-40 shadow-md shadow-gray-400 dark:shadow-bg_dark-100'>
            <div className='flex mb-6 sm:mb-0'>
                <p className='ml-2 dark:text-green-500 text-green-600'>{giveTodayShamsi(Number(days))} :</p>
                <p className='mr-2 dark:text-texts text-text_light-100 dark:font-medium font-bold'>{lesson}</p>
            </div>
            <p className='mr-2 dark:text-gray-400 text-gray-600'>میزان مطالعه : <span className='dark:text-texts text-bg_dark-200 font-bold'>{timeConvert(time)}</span></p>
        </div>
    );
};

export default React.memo(PatternItem);