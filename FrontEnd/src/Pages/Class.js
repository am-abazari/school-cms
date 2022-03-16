import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie';
import { Toastify_Error } from '../Components/Toastify';
import Vertical from '../Components/Vertical';
import Horizontal from '../Components/Horizontal';

import deleteAllCookies from '../Functions/deleteCookies';
import Footer from '../Components/Footer';

import BaseURL from "../BaseURL"
import BaseName from "../BaseName"



// Functions
import infToField from '../Functions/intToField';
import intToGrade from '../Functions/intToGrade';
import fieldToInt from '../Functions/fieldToInt';
import gradeToInt from '../Functions/gradeToInt';
import ClassItem from '../Components/ClassItem';

const Class = () => {


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

    const getData = () => {
        if (cookies.get("id") && cookies.get("username") && cookies.get("password")) {
            if (!avatar && !id && !name && !family && !time && !activity) {
                axios.post(BaseURL + "cms-backend/checkAuth.php", {
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

            // user Extra Infos
            if (!userClass && !field && !grade && !groups && !mustStudy) {
                axios.post(BaseURL + "cms-backend/extraInfos.php", {
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
        document.title = BaseName + "کلاس های مجازی";
    }, []);

    const [scheduleData, setscheduleData] = useState([]);
    useEffect(() => {
        setscheduleData([]);
        if (userClass && id && field && grade) {
            axios.post(BaseURL + "cms-backend/schedule.php", {
                class: userClass,
                grade: gradeToInt(grade),
                field: fieldToInt(field),
            })
                .then(function (response) {
                    for (let i = 0; i < Object.keys(response.data).length - 1; i++) {
                        setscheduleData(scheduleData => [...scheduleData, [response.data[i].class_name, response.data[i].class_link, response.data[i].time_start, response.data[i].time_end, response.data[i].days]])
                    }
                })
                .catch(function (error) {
                })
        }
    }, [userClass, id, field, grade]);

    return (
        <>
            <div className='flex w-full h-full'>
                <Horizontal name={name} family={family} activity={activity} />
                <Vertical name={name} family={family} activity={activity} activeTab={4} />
                <div className='width-set h-full absolute left-0  py-2 pt-28 sm:pt-28 2xl:pt-9 sm:py-9 px-2 sm:px-8 font-Shabnam' >
                    <div className='w-full mb-9 h-hfull bg-bg_light-100 dark:bg-bg_dark-50 rounded-xl overflow-y-auto ' dir='rtl'>
                        <h3 className='text-gray-400   font-Shabnam_Bold text-xl p-6'>مدرسه مجازی</h3>
                        <div className='mt-12'>
                            {
                                scheduleData.length > 0 &&
                                <>
                                    <ClassItem day={1}>{scheduleData}</ClassItem>
                                    <ClassItem day={2}>{scheduleData}</ClassItem>
                                    <ClassItem day={3}>{scheduleData}</ClassItem>
                                    <ClassItem day={4}>{scheduleData}</ClassItem>
                                    <ClassItem day={5}>{scheduleData}</ClassItem>
                                    <ClassItem day={6}>{scheduleData}</ClassItem>
                                    <ClassItem day={7}>{scheduleData}</ClassItem>
                                </>
                            }

                        </div>
                    </div>
                </div>

            </div >
            <Footer />
        </>
    );
};

export default Class;