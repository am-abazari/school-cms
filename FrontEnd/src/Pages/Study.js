import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie';
import { Toastify_Error, Toastify_Info, Toastify_Success } from '../Components/Toastify';
import Vertical from '../Components/Vertical';
import Horizontal from '../Components/Horizontal';


import loading from "../Images/Elements/loading.png";

import deleteAllCookies from '../Functions/deleteCookies';
import { v4 } from 'uuid';
import Footer from '../Components/Footer';

import BaseURL from "../BaseURL"
import BaseName from "../BaseName"



// Functions
import infToField from '../Functions/intToField';
import intToGrade from '../Functions/intToGrade';
import fieldToInt from '../Functions/fieldToInt';
import gradeToInt from '../Functions/gradeToInt';
import PatternItem from '../Components/PatternItem';
import getExtraInfos from '../Functions/getExtraInfos';
import Auth from '../Functions/Auth';

const Study = () => {

    const cookies = new Cookies();
    const navigate = new useNavigate();

    const [id, setid] = useState();
    const [avatar, setavatar] = useState();
    const [name, setName] = useState();
    const [family, setfamily] = useState();
    const [time, settime] = useState();
    const [activity, setActivity] = useState();


    // Extra Infos
    const [grade, setgrade] = useState();
    const [userClass, setUserClass] = useState();
    const [groups, setgroups] = useState();
    const [field, setfield] = useState();

    const [mustStudy, setmustStudy] = useState();


    const [pattern, setpattern] = useState([]);


    useEffect(() => {
        (async () => {
            if (cookies.get("id") && cookies.get("username") && cookies.get("password")) {
                const result = await Auth(cookies.get("id"), cookies.get("username"), cookies.get("password"))
                if (result) {
                    setid(result.id);
                    setavatar(`../Images/avatars/${result.avatar}`);
                    setName(result.name);
                    setfamily(result.family);
                    settime(result.time);
                    setActivity(result.activity);
                } else {
                    Toastify_Error("لطفا وارد حساب کاربری خود شوید");
                    deleteAllCookies();
                    navigate("/Login")
                }
                const result_extra = await getExtraInfos(cookies.get("id"));
                if (result_extra) {
                    // Must Study
                    setmustStudy(result_extra.must_study);
                    // "Grade"
                    setgrade((result_extra.grade));
                    // Class
                    if (result_extra.class != "0") {
                        setUserClass(result_extra.class);
                    } else {
                        setUserClass("نامعتبر");
                    }
                    // Groups
                    if (result_extra.groups != "0") {
                        setgroups(result_extra.groups);
                    } else {
                        setgroups("نامعتبر");
                    }
                    // field
                    setfield((result_extra.field));

                } else {
                    setgrade("نامعتبر");
                    setUserClass("نامعتبر");
                    setgroups("نامعتبر");
                    setfield("نامعتبر");
                }
            } else {
                Toastify_Error("لطفا وارد حساب کاربری خود شوید");
                deleteAllCookies();
                navigate("/Login")
            }
        })()
    }, []);



    const [schedule, setschedule] = useState([]);

    const getSchedule = useCallback((class_set, grade_set, field_set) => {
        setschedule([]);
        if (class_set && gradeToInt(grade_set) && fieldToInt(field_set)) {
            axios.post(BaseURL + "cms-backend/lessons.php", {
                class: class_set,
                grade: gradeToInt(grade_set),
                field: fieldToInt(field_set),
            })
                .then(function (response) {
                    if (response.data.resp == "200") {
                        for (let i = 0; i < Object.keys(response.data).length - 1; i++) {
                            setschedule(schedule => [...schedule, response.data[i].class_name])
                        }
                    } else {
                        setschedule([]);
                    }
                })
                .catch(function () {
                    setschedule([]);
                })
        }
    },
        [userClass, grade, field],
    )

    useEffect(() => {
        getSchedule(userClass, grade, field)
        document.title = BaseName + "مطالعه";
    }, [userClass, grade, field]);



    const [lesson, setlesson] = useState();
    const [studyTime, setStudyTime] = useState();
    const [isLoading, setIsLoading] = useState(false);

    const sendStudy_Hr = (studyHr, lessonUs) => {
        setIsLoading(true);
        if (id && studyHr && lessonUs) {
            axios.post(BaseURL + "cms-backend/studyHrInsert.php", {
                user_id: id,
                count_time: studyHr,
                lesson: lessonUs,
            })
                .then(function (response) {
                    if (response.data == "200") {
                        Toastify_Success("ساعت مطالعه با موفقیت ثبت شد")
                        setlesson("");
                        setStudyTime("");
                        setIsLoading(false)
                    } else {
                        Toastify_Error("خطلایی به هنگام ارسال رخ داده است")
                        setlesson("");
                        setStudyTime("");
                        setIsLoading(false)
                    }
                })
                .catch(function (eor) {
                    Toastify_Error("خطلایی به هنگام ارسال رخ داده است")
                    setlesson("");
                    setStudyTime("");
                    setIsLoading(false)
                })
        } else {
            Toastify_Info("لطفا فیلد هارا پر کنید")
            setlesson("");
            setStudyTime("");
            setIsLoading(false)
        }
    }


    return (
        <>
            <div className='flex w-full h-full'>
                <Horizontal name={name} family={family} activity={activity} />
                <Vertical name={name} family={family} activity={activity} activeTab={2} />
                <div className='width-set h-full absolute left-0  py-2 pt-28 sm:pt-28 2xl:pt-9 sm:py-9 px-2 sm:px-8 font-Shabnam ' >
                    <div className='w-full mb-9 h-115 sm:h-80 dark:bg-bg_dark-50 rounded-xl bg-bg_light-100' dir='rtl'>
                        <h3 className='text-gray-400 absolute  font-Shabnam_Bold text-xl p-6'>ثبت ساعت مطالعه</h3>
                        <form className='block sm:flex justify-between w-full h-full pt-28 px-16 font-Shabnam'>
                            <div className='w-full sm:w-1/2 mx-2 sm:mx-8'>
                                <div className="mb-5 block w-full">
                                    <select value={lesson} onChange={(event) => {

                                        setlesson(event.target.value);
                                    }}
                                        className=" form-select appearance-none outline-none bg-transparent  dark:bg-bg_dark-50 border-b-2 border-gray-300 dark:border-gray-600  dark:text-gray-400 block w-full px-3 py-2 font-Shabnam text-gray-500  bg-clip-padding bg-no-repeat transition ease-in-out m-0 focus:border-blue-600">
                                        <option value={null}>کلاس را انتخاب کنید</option>
                                        {schedule &&
                                            schedule.map((item) => {
                                                return (
                                                    <option key={v4()} value={item}>{item}</option>);
                                            })
                                        }
                                    </select>
                                </div>

                                <div className="mt-9 relative z-0 mb-6 group w-full">
                                    <input max={200} onChange={(event) => {
                                        setStudyTime(event.target.value);
                                    }
                                    }
                                        type="number" name="study_hr" className=" input-set block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " autoComplete='off' />
                                    <label htmlFor="study_hr" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-80 top-3 -z-10 origin-[0] peer-focus:right-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-80 peer-focus:-translate-y-6">میزان مطالعه</label>
                                </div>
                            </div>

                            <div className='w-full sm:w-1/2 mx-2 sm:mx-10'>
                                <div className="mb-5 relative z-0 w-full group">
                                    <input type="text" name="subject" id="subject" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " autoComplete='off' />
                                    <label htmlFor="subject" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-80 top-3 -z-10 origin-[0] peer-focus:right-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-80 peer-focus:-translate-y-6">موضوع مطالعه</label>
                                </div>
                                <div className="mt-9 relative z-0 mb-6 group w-full">
                                    <input max={200}
                                        type="number" name="test" className=" input-set block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " autoComplete='off' />
                                    <label htmlFor="test" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-80 top-3 -z-10 origin-[0] peer-focus:right-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-80 peer-focus:-translate-y-6">تعداد تست</label>
                                </div>
                            </div>
                        </form>
                        <div className='absolute -mt-14 mx-24'>
                            <div className='w-36 h-9 font-Shabnam_Bold'>
                                <button onClick={() => {
                                    sendStudy_Hr(studyTime, lesson)
                                }} type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm w-full h-full text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"><p className={isLoading ? "hidden" : "block"}>ثبت اطلاعات</p><img className={' w-6 m-auto animate-spin ' + (isLoading ? " block" : " hidden")} src={loading} alt="loading" /> </button>

                            </div>
                        </div>
                    </div>


                    <div className='w-full mb-9 p-6 dark:bg-bg_dark-50 bg-bg_light-100 rounded-xl ' dir='rtl'>
                        <h3 className='text-gray-400  font-Shabnam_Bold text-xl'>الگوی مطالعاتی</h3>
                        <div className='text-texts mt-8'>
                            {
                                pattern.map((item) => {
                                    return (
                                        <PatternItem key={v4()} item={item} />
                                    )
                                })
                            }
                        </div>
                    </div>

                </div>
            </div >
            <Footer />
        </>
    );
};

export default React.memo(Study);