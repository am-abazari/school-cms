import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie';
import { Toastify_Error } from '../Components/Toastify';
import Vertical from '../Components/Vertical';
import Horizontal from '../Components/Horizontal';

import Medal from "../Images/Dashboard/Medalsvg.svg";
import ItemUser from '../Components/ItemUser';
import deleteAllCookies from '../Functions/deleteCookies';
import { v4 } from 'uuid';
import Footer from '../Components/Footer';

import BaseURL from "../BaseURL"
import BaseName from "../BaseName"

// Charts
import Gauges from '../Components/Gauges';
import LineChart from '../Components/LineChart';


// Functions
import infToField from '../Functions/intToField';
import intToGrade from '../Functions/intToGrade';
import fieldToInt from '../Functions/fieldToInt';
import gradeToInt from '../Functions/gradeToInt';
import { gregorian_to_jalali } from '../Functions/jdf'
import { giveToday } from '../Functions/giveToday';
import { IsEnd, IsStart } from '../Functions/CompareTime';

const Dashboard = () => {

    const cookies = new Cookies();
    const navigate = new useNavigate();

    const [id, setid] = useState();
    const [avatar, setavatar] = useState();
    const [name, setName] = useState();
    const [family, setfamily] = useState();
    const [time, settime] = useState();
    const [activity, setActivity] = useState();

    const [userCount, setuserCount] = useState();

    // Extra Infos
    const [grade, setgrade] = useState();
    const [userClass, setUserClass] = useState();
    const [groups, setgroups] = useState();
    const [field, setfield] = useState();

    const [mustStudy, setmustStudy] = useState();


    // Home Works


    async function getData() {
        if (cookies.get("id") && cookies.get("username") && cookies.get("password")) {
            if (!avatar && !id && !name && !family && !time && !activity) {
                await axios.post(BaseURL + "cms-backend/checkAuth.php", {
                    id: cookies.get("id"),
                    username: cookies.get("username"),
                    password: cookies.get("password"),
                })
                    .then(function (response) {
                        if (response.data.resp == "200" && response.data.id == cookies.get("id")) {
                            setid(response.data.id);
                            setavatar(`../Images/avatars/${response.data.avatar}`);
                            setName(response.data.name);
                            setfamily(response.data.family);
                            settime(response.data.time);
                            setActivity(response.data.activity);


                        } else {
                            Toastify_Error("لطفا وارد حساب کاربری خود شوید");
                            deleteAllCookies();
                            navigate("/Login")
                        }
                    })
                    .catch(function () {
                        Toastify_Error("هنگام ارسال اطلاعات مشکلی پیش رخ داده");
                        deleteAllCookies();
                        navigate("/Login")

                    })
            }





            // ----------Get Data On Mount------------
            // User Counts
            if (!userCount) {
                await axios.get(BaseURL + "cms-backend/userCount.php")
                    .then((response) => {
                        setuserCount(response.data);
                    })
            }

            // user Extra Infos
            if (!userClass && !field && !grade && !groups && !mustStudy) {
                await axios.post(BaseURL + "cms-backend/extraInfos.php", {
                    user_id: cookies.get("id"),
                })
                    .then(function (response) {
                        if (response.data.resp == "200") {
                            // Must Study
                            setmustStudy(response.data.must_study);

                            // "Grade"
                            setgrade(intToGrade(response.data.grade));

                            // Class
                            if (response.data.class != "0") {
                                setUserClass(response.data.class);
                            } else {
                                setUserClass("نامعتبر");
                            }

                            // Groups
                            if (response.data.groups != "0") {
                                setgroups(response.data.groups);
                            } else {
                                setgroups("نامعتبر");
                            }

                            // field
                            setfield(infToField(response.data.field));


                        } else {
                            setgrade("نامعتبر");
                            setUserClass("نامعتبر");
                            setgroups("نامعتبر");
                            setfield("نامعتبر");
                        }



                    })
                    .catch(function () {
                        setgrade("نامعتبر");
                        setUserClass("نامعتبر");
                        setgroups("نامعتبر");
                        setfield("نامعتبر");
                    })

            }
        } else {
            Toastify_Error("لطفا وارد حساب کاربری خود شوید");
            deleteAllCookies();
            navigate("/Login")
        }


    }
    useEffect(() => {
        getData();
        document.title = BaseName + "حساب کاربری";
    }, []);



    // Home Works Get Data
    // Classes Get Data

    const [classes, setclasses] = useState();
    const [homeworkCount, sethomeworkCount] = useState();
    useEffect(() => {
        if (userClass && field && grade && id) {
            if (!homeworkCount) {
                axios.post(BaseURL + "cms-backend/homework.php", {
                    class: userClass,
                    field: fieldToInt(field),
                    grade: gradeToInt(grade),

                })
                    .then(function (response) {
                        if (response.data.resp == "200") {

                            sethomeworkCount(Object.keys(response.data).length - 1)

                        } else if (response.data == "400") {
                            sethomeworkCount(0);
                        } else {
                            sethomeworkCount(0);
                        }
                    })
                    .catch(function () {
                        sethomeworkCount(0);
                    })
            }


            if (!classes) {
                axios.post(BaseURL + "cms-backend/schedule.php", {
                    class: userClass,
                    field: fieldToInt(field),
                    grade: gradeToInt(grade),
                })
                    .then(function (response) {
                        if (response.data.resp == "200") {
                            setclasses(response.data);
                        } else if (response.data == "400") {
                            setclasses(null);
                        } else {
                            setclasses(null);
                        }
                    })
                    .catch(function (e) {
                        setclasses(null)
                    })
            }
        }
    }, [userClass, field, grade, id, classes, homeworkCount]);


    const [homeworkStatus, sethomeworkStatus] = useState();
    useEffect(() => {
        if (homeworkCount && id) {
            axios.post(BaseURL + "cms-backend/homeworkStatus.php", {
                user_id: id,
            })
                .then(function (response) {
                    if (response.data.resp == "200") {
                        sethomeworkStatus(Object.keys(response.data).length - 1);
                    } else if (response.data == "400") {
                        sethomeworkStatus(0);
                    } else {
                        sethomeworkStatus(0);
                    }
                })
                .catch(function () {
                    sethomeworkStatus(0);
                })

        }
    }, [homeworkCount, id]);


    const [totalStudyTime, settotalStudyTime] = useState();
    const [studyTime, setStudyTime] = useState();
    const [studys, setStudys] = useState([]);
    useEffect(() => {
        if (mustStudy && id && !totalStudyTime) {
            let counter = 0;
            axios.post(BaseURL + "cms-backend/studyHr.php", {
                user_id: id,
            })
                .then(function (response) {
                    if (response.data.resp == "200") {
                        let resultTime = [];
                        let studysPush = [];

                        for (let i = 0; i < Object.keys(response.data).length - 1; i++) {
                            let year = new Date(response.data[i].time).getFullYear();
                            let month = new Date(response.data[i].time).getMonth() + 1;
                            let day = new Date(response.data[i].time).getDate();
                            if (gregorian_to_jalali(year, month, day)[0] == gregorian_to_jalali(new Date().getFullYear(), new Date().getMonth() + 1, new Date().getDate())[0] && gregorian_to_jalali(year, month, day)[1] == gregorian_to_jalali(new Date().getFullYear(), new Date().getMonth() + 1, new Date().getDate())[1]) {
                                studysPush.push(response.data[i].count_time)
                                setStudys(studysPush);

                                counter += Number(response.data[i].count_time);
                                settotalStudyTime(counter);

                                resultTime.push(gregorian_to_jalali(year, month, day)[0] + "/" + gregorian_to_jalali(year, month, day)[1] + "/" + gregorian_to_jalali(year, month, day)[2]);
                                setStudyTime(resultTime);
                            }

                        }
                    } else if (response.data == "500") {
                        settotalStudyTime(0);
                    } else {
                        settotalStudyTime(0);
                    }
                })
                .catch(function () {
                    settotalStudyTime(0);
                })
        }
    }, [mustStudy, id, totalStudyTime]);


    const [examResult, setExamResult] = useState();
    const [examTime, setexamTime] = useState();
    useEffect(() => {
        let resultExam = [];
        let resultTime = [];
        axios.post(BaseURL + "cms-backend/examResult.php", {
            user_id: id,
        })
            .then(function (response) {
                if (response.data.resp == "200") {
                    for (let i = 0; i < Object.keys(response.data).length - 1; i++) {
                        let year = new Date(response.data[i].time).getFullYear();
                        let month = new Date(response.data[i].time).getMonth() + 1;
                        let day = new Date(response.data[i].time).getDate();
                        if (gregorian_to_jalali(year, month, day)[0] == gregorian_to_jalali(new Date().getFullYear(), new Date().getMonth() + 1, new Date().getDate())[0] && gregorian_to_jalali(year, month, day)[1] == gregorian_to_jalali(new Date().getFullYear(), new Date().getMonth() + 1, new Date().getDate())[1]) {
                            resultExam.push(response.data[i].result);
                            resultTime.push(gregorian_to_jalali(year, month, day)[0] + "/" + gregorian_to_jalali(year, month, day)[1] + "/" + gregorian_to_jalali(year, month, day)[2]);
                            setExamResult(resultExam);
                            setexamTime(resultTime);
                        }
                    }
                } else if (response.data == "500") {
                    setExamResult([0]);
                } else {
                    setExamResult([0]);

                }
            })
            .catch(function () {
                setExamResult([0]);
            })

    }, [id]);

    const runCallback = (cb) => {
        return cb();
    };



    return (
        <>
            <div className='flex'>
                <Horizontal name={name} family={family} activity={activity} />
                <Vertical name={name} family={family} activity={activity} activeTab={1} />
                <div className='width-set h-full absolute left-0 py-2 pt-28 sm:pt-28 2xl:pt-9 sm:py-9 px-2 sm:px-8 overflow-y-auto' dir='rtl' >
                    <div className=' w-full mb-9 h-72 md:h-48 dark:bg-bg_dark-50 text-text_light-100  bg-bg_light-100 rounded-xl flex justify-between' dir='rtl'>
                        <div className='p-5 dark:text-texts'>
                            <p className='font-Shabnam_Medium  text-xl'>🎉 به حساب کاربری خود خوش آمدید </p>
                            <p className='font-Shabnam_Thin text-gray-500 mr-8 mt-4'>بسیار مفتخر هستیم که پذیرای شما عزیزان در سامانه مدارس آنلاین هستیم .</p>
                            <p className='font-Shabnam_Medium tracking-wide mt-2 text-actives mr-8'>با <span className='font-Shabnam_Bold'>{userCount}</span>  کاربر فعال</p>
                            <Link to={"#"} className='inline-block  font-Shabnam_Bold mr-8 mt-4 bg-btns px-10 py-1.5 rounded-lg transition-all shadow-lg hover:shadow-tags text-texts'>بلاگ</Link>
                        </div>
                        <img src={Medal} alt="Medal" className='w-20 h-32  ml-5' />
                    </div>


                    <div className="flex flex-row-reverse flex-wrap xl:flex-nowrap mb-9 xl:mb-0">
                        <div className='xl:mr-6 xl:w-2/3 w-full h-105 md:h-48 dark:bg-bg_dark-50 mb-9 bg-bg_light-100 rounded-xl p-6 text-texts font-Shabnam ' dir='rtl'>
                            <h3 className='dark:text-gray-400 text-text_light-100 text-xl'>اطلاعات</h3>
                            <div className='p-11 justify-between block md:flex'>
                                <ItemUser context={field} content="رشته" bg_color="bg-green-300" text_color="text-green-500" dPath="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                                <ItemUser context={grade} content="پایه" bg_color="bg-yellow-300" text_color="text-yellow-500" dPath="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                                <ItemUser context={userClass} content="کلاس" bg_color="bg-red-300" text_color="text-red-500" dPath="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
                                <ItemUser context={groups} content="گروه ها" bg_color="bg-purple-300" text_color="text-purple-500" dPath="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                            </div>
                        </div>

                        <div className='xl:w-1/3 w-full h-96 md:h-48 xl:mt-0 mb-9 md:mb-0' dir='rtl'>
                            <div className='w-full h-48 rounded-xl  flex flex-wrap md:flex-nowrap justify-between mb-9 xl:ml-3' dir='rtl'>
                                <div className='md:w-1/2 w-full h-full dark:bg-bg_dark-50 bg-bg_light-100 mb-9 md:mb-0 md:ml-2 rounded-xl flex'>
                                    <h3 className='dark:text-gray-400 text-text_light-100 font-Shabnam_Thin px-5 pt-5 pb-2 absolute'>تکالیف</h3>
                                    <Gauges opacity={localStorage.getItem("theme") == "dark" ? .15 : 1} title={"انجام شده"} size={"45%"} series={homeworkStatus && !isNaN(Number(homeworkStatus)) ? Number(homeworkStatus) / Number(homeworkCount) * 100 : 0} color={"#28C76F"} />
                                </div>
                                <div className='md:w-1/2 w-full h-full dark:bg-bg_dark-50 bg-bg_light-100  rounded-xl  md:mr-2 flex'>
                                    <h3 className='dark:text-gray-400 text-text_light-100 font-Shabnam_Thin px-5 pt-5 pb-2 absolute'>ساعت مطالعه</h3>
                                    <Gauges opacity={localStorage.getItem("theme") == "dark" ? .15 : 1} title={"مطالعه"} size={"45%"} series={totalStudyTime && mustStudy && !isNaN(Number(totalStudyTime)) && !isNaN(Number(mustStudy)) ? totalStudyTime / mustStudy * 100 : 0} color={"#655CD4"} />
                                </div>

                            </div>
                        </div>


                    </div>





                    {/* --Second Part-- */}
                    <div className="flex flex-row-reverse flex-wrap xl:flex-nowrap">
                        <div className='w-full xl:w-2/3 h-105 dark:bg-bg_dark-50 bg-bg_light-100  rounded-xl mr-0 xl:mr-6 p-6 text-texts font-Shabnam pb-9' dir='rtl'>
                            <h3 className='dark:text-gray-400 text-text_light-100 font-Shabnam_Thin absolute'>برنامه کلاسی امروز</h3>
                            <div className='pt-14 flexs w-full h-full flex flex-wrap justify-between px-6 font-Shabnam overflow-y-auto'>
                                {
                                    classes &&
                                    runCallback(() => {
                                        const row = [];
                                        for (let i = 0; i < Object.keys(classes).length - 1; i++) {
                                            let time_start;
                                            let time_end;
                                            let class_name;
                                            let class_link;
                                            let time_end_splite;
                                            let time_start_splite;
                                            let checkClassStatus;

                                            if (classes[i].days == giveToday(new Date())) {
                                                time_start = classes[i].time_start;
                                                time_end = classes[i].time_end;

                                                time_end_splite = time_end.split(":");
                                                time_start_splite = time_start.split(":");

                                                class_name = classes[i].class_name;
                                                class_link = classes[i].class_link;

                                                checkClassStatus = !IsEnd(time_end_splite) && IsStart(time_start_splite);
                                            }
                                            row.push(
                                                class_name && time_start && time_end &&
                                                <div key={v4()} className='w-full h-16 flex items-center justify-between'>
                                                    <div className='flex'>
                                                        <p className='font-Shabnam_Medium flex pl-4  text-text_light-100 dark:text-texts min-set'>{class_name}</p>
                                                        <p className='hidden sm:block text-center font-Shabnam_Thin dark:text-gray-400 text-text_light-100 border-2 border-gray-300 dark:border-gray-800 shadow-md dark:shadow-slate-800 px-4 py-1 rounded-xl min-set '>{time_start + "  تا  " + time_end}</p>
                                                    </div>
                                                    <a target="_blank" href={checkClassStatus ? class_link : "#"} className={'flex hover:text-green-400  transition-all dark:text-texts   dark:hover:text-green-400 ' + (checkClassStatus ? "pointer-events-auto text-text_light-100" : "pointer-events-none dark:text-gray-500 text-gray-300")} >ورود به جلسه
                                                        <span className={'mr-3  ' + (checkClassStatus ? "text-green-400" : 'text-red-500 opacity-40')}>
                                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                                                <path strokeLinecap="round" strokeLinejoin="round" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                                                            </svg>
                                                        </span>
                                                    </a>
                                                </div>
                                            );

                                        }
                                        return row;
                                    })
                                }
                            </div>
                        </div>
                        
                        <div className='w-full xl:w-1/3 h-105 font-Shabnam flex flex-wrap md:flex-nowrap xl:block  xl:mt-0 mt-9'>
                            <div className='w-full h-48 dark:bg-bg_dark-50 bg-bg_light-100  rounded-xl mb-9 md:ml-2 xl:ml-0' dir='rtl'>
                                <h3 className='dark:text-gray-400 text-text_light-100 font-Shabnam_Thin px-5 pt-5 pb-2 absolute'>نتایج آزمون ها</h3>
                                {examResult && Array.isArray(examResult) &&
                                    <LineChart max={100} curv="straight" colors="#685FD7" name={" آزمون "} height={190} paddingLeft={40} data={examResult} cat={examTime} />
                                }
                            </div>
                            <div className=' w-full h-48 dark:bg-bg_dark-50 bg-bg_light-100  rounded-xl md:mr-2 xl:mr-0' dir='rtl'>
                                <h3 className='dark:text-gray-400 text-text_light-100 font-Shabnam_Thin px-5 pt-5 pb-2 absolute'>مطالعات</h3>
                                {studys && Array.isArray(studys) &&
                                    <LineChart max={undefined} curv="smooth" colors="#EA5455" name={"مطالعه "} height={190} paddingLeft={40} data={studys} cat={studyTime} />
                                }
                            </div>
                        </div>

                    </div>

                </div>

            </div>
            <Footer />

        </>
    );
};

export default React.memo(Dashboard);