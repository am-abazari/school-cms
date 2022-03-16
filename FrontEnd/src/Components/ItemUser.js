import React from 'react';

const ItemUser = (props) => {
    return (
        <div className='flex  mb-6'>
            <div className={`rounded-full p-2 ml-16 md:ml-5 h-12 w-12 ${props.bg_color} bg-opacity-10 ml-8 flex items-center justify-center ${props.text_color}`}>
                <svg xmlns={props.url} className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d={props.dPath} />
                </svg>
            </div>
            <div className=''>
                <p className=' font-Shabnam_Bold text-xl dark:text-texts text-text_light-100'>{props.context}</p>
                <p className=' dark:text-gray-400 text-text_light-100 mt-2text-sm'>{props.content}</p>
            </div>
        </div>
    );
};

export default ItemUser;