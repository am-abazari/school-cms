import React from 'react';
import { v4 } from 'uuid';
import { IsEnd, IsStart } from '../Functions/CompareTime';
import { dayToint, giveToday, giveTodayShamsi } from '../Functions/giveToday';

const ClassItem = (props) => {
    let flag = true;

    let counter = 0;
    props.children.map(data => {
        data.map(data2 => {
            if (data2 == undefined) {
                counter++;
            }
        })
        if (counter == data.length) {
            flag = false;
        }
    })
    return (
        <div className='px-4 md:px-14 text-font-Shabnam text-texts '>
            <div className='block md:flex w-full mb-7 dark:bg-gray-800 bg-gray-700 dark:bg-opacity-40 shadow-lg  shadow-gray-300 dark:shadow-bg_dark-100 rounded-lg items-center justify-between'>
                <div className='font-Shabnam_Bold text-lg h-20 flex items-center md:h-0 '>
                    <p className='w-32 text-center :text-gray-300  '>{giveTodayShamsi(props.day)}</p>
                </div>
                <div className=' w-full dark:bg-gray-700 bg-gray-200 bg-opacity-850 dark:bg-opacity-40 px-8 py-4 rounded-l-lg'>
                    {flag && props.children.map(data => {
                        let isToday = giveToday(new Date().getDate()) == data[4];
                        let IsYetStart = IsStart(data[2].split(":"))
                        let IsYetEnd = IsEnd(data[3].split(":"));
                        return (
                            dayToint(data[4]) == props.day &&
                            <div key={v4()} className=' border-set justify-between flex py-4 px-2 border-b-2 border-gray-600 border-opacity-25'>
                                <div className='flex'>
                                    <p className='dark:text-texts text-bg_dark-200 min-set'>{data[0]}</p>
                                    <p className='hidden sm:block text-center font-Shabnam_Thin dark:text-gray-400 text-bg_dark-200 border-2 border-gray-800 border-opacity-50 shadow-sm shadow-gray-600 dark:shadow-slate-800 px-4 py-1 rounded-xl' style={{ minWidth: "150px" }}>{data[2] + "  تا  " + data[3]}</p>
                                </div>
                                <a target={"_blank"} href={IsYetStart && !IsYetEnd && isToday ? data[1] : ""} className={"flex  " + (IsYetStart && !IsYetEnd && isToday ? " pointer-events-auto text-white hover:text-green-400" : "pointer-events-none text-gray-500")} >ورود به جلسه
                                    <span className={'mr-3  ' + (IsYetStart && !IsYetEnd && isToday ? "text-green-400" : 'text-red-500 opacity-40')}>
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 flex text-sm" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                                        </svg>
                                    </span>
                                </a>
                            </div>
                        );
                    })}
                </div>
            </div>

        </div>
    );
};

export default React.memo(ClassItem);