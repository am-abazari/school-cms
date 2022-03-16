import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie';
import { Toastify_Error, Toastify_Info, Toastify_Success } from '../Components/Toastify';
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

const Setting = () => {

    const cookies = new Cookies();
    const navigate = new useNavigate();

    const [id, setid] = useState();
    const [avatar, setavatar] = useState();
    const [name, setName] = useState();
    const [family, setfamily] = useState();
    const [time, settime] = useState();
    const [activity, setActivity] = useState();
    const [mobile, setMobile] = useState();


    // Extra Infos
    const [grade, setgrade] = useState();
    const [userClass, setUserClass] = useState();
    const [groups, setgroups] = useState();
    const [field, setfield] = useState();
    const [mustStudy, setmustStudy] = useState();
    const [changeable, setChangeable] = useState(1);

    // Data
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
                            setavatar(response.data.avatar);
                            setName(response.data.name);
                            setfamily(response.data.family);
                            settime(response.data.time);
                            setActivity(response.data.activity);
                            setMobile(response.data.mobile);

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
                            setChangeable(response.data.changeable);
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
        document.title = BaseName + "تنظیمات";

    }, []);

    const setData = () => {
        axios.post(BaseURL + "cms-backend/setData.php", {
            id: id,
            name: name,
            family: family,
            mobile: mobile,
            must_study: mustStudy,
            activity: activity,
            grade: gradeToInt(grade),
            field: fieldToInt(field),
            class: userClass,
            groups: groups,
        })
            .then(function (response) {
                if (response.data == "200") {
                    Toastify_Success("اطلاعات با موفقیت ذخیره شد")
                } else {
                    Toastify_Error("هنگام زخیره اطلاعات مشکلی رخ داد ")
                }
            })
            .catch(function () {
                Toastify_Error("هنگام زخیره اطلاعات مشکلی رخ داد ")

            })
    }
    const [selectedImage, setSelectedImage] = useState();


    const onFileChange = (e) => {
        let files = e.target.files;
        let fileReader = new FileReader();
        if (files.length > 0) {
            fileReader.readAsDataURL(files[0]);

            fileReader.onload = (event) => {
                setSelectedImage(event.target.result)
            }
        }
    }
    const onSubmit = () => {
        const formData = { image: selectedImage }
        let endpoint = BaseURL + "cms-backend/avatars.php";
        axios.post(endpoint, formData, {
        }).then((resp) => {
            if (resp.data[0] == "200") {
                Toastify_Info("لطفا سایت را رفرش کنید");
                cookies.set("avatar", resp.data[1]);
            } else {
                cookies.set("avatar", "defult.png");
            }
        }).catch(() => {
            cookies.set("avatar", "defult.png");
        })
    }

    return (
        <>
            <div className='flex w-full h-full'>
                <Horizontal name={name} family={family} activity={activity} />
                <Vertical name={name} family={family} activity={activity} activeTab={6} />
                <div className='width-set h-full absolute left-0 py-2 pt-28 sm:pt-28 2xl:pt-9 sm:py-9 px-2 sm:px-8 font-Shabnam' >
                    <div className='w-full mb-9 h-hfull  bg-bg_light-100 dark:bg-bg_dark-50 rounded-xl overflow-y-auto  pb-9 ' dir='rtl'>
                        <h3 className='text-gray-400 font-Shabnam_Bold text-xl p-6'>تنظیمات</h3>
                        {
                            !changeable && <p className='mr-12 text-red-700 text-sm font-Shabnam_Bold'> <i className="fa-solid fa-circle-exclamation text-lg ml-3"></i> این قسمت برای شما غیر فعال نمیباشد ! </p>
                        }
                        <div className={' select-none  ' + (!changeable && "opacity-40 pointer-events-none")}>
                            <div className='flex p-12 '>
                                <img className=' w-24 h-24 rounded-md mx-3' src={avatar ? require(`../Images/avatars/${avatar}`) : require(`../Images/avatars/defult.png`)} alt="avatar" />
                                <div className='mx-3 mt-1'>
                                    <p className='capitalize text-bg_dark-200 dark:text-texts mb-5 text-lg'>{name}&nbsp;{family}</p>
                                    <input className=' absolute -mr-36 p-8 z -mt-10 opacity-0' type="file" onChange={onFileChange} />
                                    <button onClick={onSubmit} className='relative z-10 ml-2 text-texts border-transparent border bg-btns w-24 py-1.5 rounded-lg hover:shadow-lg hover:shadow-actives transition-all' type='button'>بروزرسانی</button>
                                </div>
                            </div>
                            <form className='block sm:flex justify-between w-full pt-5 px-6 font-Shabnam'>
                                <div className='w-full sm:w-1/2  mx-0 sm:mx-8'>
                                    <div className="relative z-0 mb-16 group w-full">
                                        <input onChange={(event) => {
                                            setName(event.target.value)
                                        }} value={name ? name : ""} type="text" name="name" className=" input-set block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " autoComplete='off' />
                                        <label htmlFor="name" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-9 scale-80 top-3 -z-10 origin-[0] peer-focus:right-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-80 peer-focus:-translate-y-9">نام</label>
                                    </div>
                                    <div className="mt-9 sm:mt-20 relative z-0 mb-16 group w-full">
                                        <input onChange={(event) => {
                                            setMobile(event.target.value)
                                        }} value={mobile ? mobile : ""} type="tel" name="tel" className=" input-set block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " autoComplete='off' />
                                        <label htmlFor="tel" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-9 scale-80 top-3 -z-10 origin-[0] peer-focus:right-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-80 peer-focus:-translate-y-9">تلفن همراه</label>
                                    </div>
                                </div>

                                <div className='w-full sm:w-1/2  mx-0 sm:mx-8'>
                                    <div className=" relative z-0 w-full group mb-16">
                                        <input onChange={(event) => {
                                            setfamily(event.target.value)
                                        }} value={family ? family : ""} type="text" name="family" id="family" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " autoComplete='off' />
                                        <label htmlFor="family" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-9 scale-80 top-3 -z-10 origin-[0] peer-focus:right-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-80 peer-focus:-translate-y-9">نام خانوادگی</label>
                                    </div>
                                    <div className="mt-9 sm:mt-20 relative z-0 mb-16 group w-full">
                                        <input onChange={(event) => {
                                            setmustStudy(event.target.value)
                                        }} value={mustStudy ? mustStudy : ""} type="number" name="must_study" className=" input-set block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " autoComplete='off' />
                                        <label htmlFor="must_study" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-9 scale-80 top-3 -z-10 origin-[0] peer-focus:right-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-80 peer-focus:-translate-y-9  ">میزان مطالعه</label>
                                    </div>
                                </div>
                            </form>

                            <div className='px-12'>
                                <div className='mt-12 tbl-width border border-gray-700 rounded-lg'>
                                    <div className='m-6 text-bg_dark-200 dark:text-gray-300 text-lg flex'>
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mx-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                        </svg>
                                        تنظیمات حساب کاربری
                                    </div>
                                    <div className=" bg-opacity-80 ">
                                        <table className=" w-full  text-bg_dark-200 dark:text-gray-300 ">
                                            <tbody>
                                                <tr className='border-b border-t  border-b-gray-700 border-t-gray-700'>
                                                    <th className='w-1/5 text-right p-5 pb-8 pr-12 font-Shabnam_Bold'>وضعیت</th>
                                                    <td className='w-1/5 text-right'>
                                                        <label htmlFor="active" className='dark:text-green-300 text-green-500'>
                                                            <input onChange={() => { setActivity(1) }} checked={activity == 1 ? true : false} type="radio" id='active' name="status" className="radio radio-primary mx-4 w-5 h-5 " />
                                                            فعال</label>
                                                    </td>
                                                    <td className='w-1/5 text-right' >
                                                        <label htmlFor="ide" className='dark:text-yellow-300 text-yellow-500'>
                                                            <input onChange={() => { setActivity(2) }} checked={activity == 2 ? true : false} type="radio" id='ide' name="status" className="radio radio-secondary mx-4 w-5 h-5 " />
                                                            استراحت</label>
                                                    </td>
                                                    <td className='w-1/5 text-right'>
                                                        <label htmlFor="dnd" className='dark:text-red-400 text-red-600'>
                                                            <input onChange={() => { setActivity(3) }} checked={activity == 3 ? true : false} type="radio" id='dnd' name="status" className=" radio radio-accent mx-4 w-5 h-5 " />
                                                            مزاحم نشوید</label>
                                                    </td>
                                                </tr>
                                                <tr className='border-b border-t border-b-gray-700 border-t-gray-700'>
                                                    <th className='w-1/5 text-right p-5 pb-8 pr-12 font-Shabnam_Bold'>پایه</th>
                                                    <td className='w-1/5 text-right'>
                                                        <label htmlFor="no09">
                                                            <input onChange={() => { setgrade("نهم") }} checked={gradeToInt(grade) == 9 ? true : false} type="radio" id='no09' name="grade" className="border border-gray-800 dark:border-gray-600 radio mx-4 w-5 h-5 " />
                                                            نهم</label>
                                                    </td>
                                                    <td className='w-1/5 text-right'>
                                                        <label htmlFor="no10">
                                                            <input onChange={() => { setgrade("دهم") }} checked={gradeToInt(grade) == 10 ? true : false} type="radio" id='no10' name="grade" className="border border-gray-800 dark:border-gray-600 radio mx-4 w-5 h-5 " />
                                                            دهم</label>
                                                    </td>
                                                    <td className='w-1/5 text-right'>
                                                        <label htmlFor="no11">
                                                            <input onChange={() => setgrade("یازدهم")} checked={gradeToInt(grade) == 11 ? true : false} type="radio" id='no11' name="grade" className=" border border-gray-800 dark:border-gray-600  radio mx-4 w-5 h-5 " />
                                                            یازدهم</label>
                                                    </td>
                                                    <td className='w-1/5 text-right'>
                                                        <label htmlFor="no12">
                                                            <input onChange={() => setgrade('دوازدهم')} checked={gradeToInt(grade) == 12 ? true : false} type="radio" id='no12' name="grade" className=" border border-gray-800 dark:border-gray-600  radio mx-4 w-5 h-5 " />
                                                            دوازدهم</label>
                                                    </td>
                                                </tr>
                                                <tr className='border-b border-t border-b-gray-700 border-t-gray-700'>
                                                    <th className='w-1/5 text-right p-5 pb-8 pr-12 font-Shabnam_Bold'>رشته</th>
                                                    <td className='w-1/5 text-right'>
                                                        <label htmlFor="fl01">
                                                            <input onChange={() => setfield("ریاضی")} checked={fieldToInt(field) == 1 ? true : false} type="radio" id='fl01' name="field" className=" border border-gray-800 dark:border-gray-600  radio mx-4 w-5 h-5 " />
                                                            ریاضی</label>
                                                    </td>
                                                    <td className='w-1/5 text-right'>
                                                        <label htmlFor="fl02">
                                                            <input onChange={() => setfield("تجربی")} checked={fieldToInt(field) == 2 ? true : false} type="radio" id='fl02' name="field" className=" border border-gray-800 dark:border-gray-600  radio mx-4 w-5 h-5 " />
                                                            تجربی</label>
                                                    </td>
                                                    <td className='w-1/5 text-right'>
                                                        <label htmlFor="fl03">
                                                            <input onChange={() => setfield("انسانی")} checked={fieldToInt(field) == 3 ? true : false} type="radio" id='fl03' name="field" className="border border-gray-800 dark:border-gray-600 radio mx-4 w-5 h-5 " />
                                                            انسانی</label>
                                                    </td>
                                                    <td className='w-1/5 text-right'>
                                                        <label htmlFor="fl04">
                                                            <input onChange={() => setfield("هنر")} checked={fieldToInt(field) == 4 ? true : false} type="radio" id='fl04' name="field" className=" border border-gray-800 dark:border-gray-600  radio mx-4 w-5 h-5 " />
                                                            هنر</label>
                                                    </td>
                                                </tr>
                                                {
                                                    gradeToInt(grade) &&
                                                    <tr className='border-b border-t border-b-gray-700 border-t-gray-700'>
                                                        <th className='w-1/5 text-right p-5 pb-8 pr-12 font-Shabnam_Bold'>کلاس</th>
                                                        <td className='w-1/5 text-right'>
                                                            <label htmlFor="cl01">
                                                                <input onChange={() => gradeToInt(grade) == 9 ? setUserClass(91) : gradeToInt(grade) == 10 ? setUserClass(101) : gradeToInt(grade) == 11 ? setUserClass(111) : gradeToInt(grade) == 12 ? setUserClass(121) : setUserClass(0)} checked={userClass == "91" || userClass == "101" || userClass == "111" || userClass == "121" ? true : false} type="radio" id='cl01' name="class" className=" border border-gray-800 dark:border-gray-600  radio mx-4 w-5 h-5 " />
                                                                {gradeToInt(grade) == 9 ? "91" : gradeToInt(grade) == 10 ? "101" : gradeToInt(grade) == 11 ? "111" : gradeToInt(grade) == 12 ? '121' : "نا معتبر"}</label>

                                                        </td>
                                                        <td className='w-1/5 text-right'>
                                                            <label htmlFor="cl02">
                                                                <input onChange={() => gradeToInt(grade) == 9 ? setUserClass(92) : gradeToInt(grade) == 10 ? setUserClass(102) : gradeToInt(grade) == 11 ? setUserClass(112) : gradeToInt(grade) == 12 ? setUserClass(122) : setUserClass(0)} checked={userClass == "92" || userClass == "102" || userClass == "112" || userClass == "122" ? true : false} type="radio" id='cl02' name="class" className=" border border-gray-800 dark:border-gray-600  radio mx-4 w-5 h-5 " />
                                                                {gradeToInt(grade) == 9 ? "92" : gradeToInt(grade) == 10 ? "102" : gradeToInt(grade) == 11 ? "112" : gradeToInt(grade) == 12 ? '122' : "نا معتبر"}</label>

                                                        </td>
                                                        <td className='w-1/5 text-right'>
                                                            <label htmlFor="cl03">
                                                                <input onChange={() => gradeToInt(grade) == 9 ? setUserClass(93) : gradeToInt(grade) == 10 ? setUserClass(103) : gradeToInt(grade) == 11 ? setUserClass(113) : gradeToInt(grade) == 12 ? setUserClass(123) : setUserClass(0)} checked={userClass == "93" || userClass == "103" || userClass == "113" || userClass == "123" ? true : false} type="radio" id='cl03' name="class" className=" border border-gray-800 dark:border-gray-600  radio mx-4 w-5 h-5 " />
                                                                {gradeToInt(grade) == 9 ? "93" : gradeToInt(grade) == 10 ? "103" : gradeToInt(grade) == 11 ? "113" : gradeToInt(grade) == 12 ? '123' : "نا معتبر"}</label>
                                                        </td>
                                                        <td className='w-1/5 text-right'>
                                                            <label htmlFor="cl04">
                                                                <input onChange={() => gradeToInt(grade) == 9 ? setUserClass(94) : gradeToInt(grade) == 10 ? setUserClass(104) : gradeToInt(grade) == 11 ? setUserClass(114) : gradeToInt(grade) == 12 ? setUserClass(124) : setUserClass(0)} checked={userClass == "94" || userClass == "104" || userClass == "114" || userClass == "124" ? true : false} type="radio" id='cl04' name="class" className=" border border-gray-800 dark:border-gray-600  radio mx-4 w-5 h-5 " />
                                                                {gradeToInt(grade) == 9 ? "94" : gradeToInt(grade) == 10 ? "104" : gradeToInt(grade) == 11 ? "114" : gradeToInt(grade) == 12 ? '124' : "نا معتبر"}</label>

                                                        </td>
                                                    </tr>
                                                }
                                                {
                                                    field &&
                                                    <tr className=' border-t border-b-gray-700 border-t-gray-700'>
                                                        <th className='w-1/5 text-right p-5 pb-8 pr-12 font-Shabnam_Bold '>گروه</th>
                                                        <td className='w-1/5 text-right'>
                                                            <label htmlFor="gr01">
                                                                {
                                                                    groups.trim() == "المپیاد ریاضی ".trim() || groups.trim() == "المپیاد زیست شناسی".trim() || groups.trim() == "المپیاد اقتصاد".trim() || groups.trim() == "المپیاد هنر ".trim() ?
                                                                        <input onChange={() => fieldToInt(field) == 1 ? setgroups("المپیاد ریاضی") : fieldToInt(field) == 2 ? setgroups("المپیاد زیست شناسی") : fieldToInt(field) == 3 ? setgroups("المپیاد اقتصاد") : fieldToInt(field) == 4 ? setgroups("المپیاد هنر ") : '0'} checked type="radio" id='gr01' name="group" className=" border border-gray-800 dark:border-gray-600  pointer-events-none radio mx-4 w-5 h-5 " />
                                                                        :
                                                                        <input onChange={() => fieldToInt(field) == 1 ? setgroups("المپیاد ریاضی") : fieldToInt(field) == 2 ? setgroups("المپیاد زیست شناسی") : fieldToInt(field) == 3 ? setgroups("المپیاد اقتصاد") : fieldToInt(field) == 4 ? setgroups("المپیاد هنر ") : '0'} type="radio" id='gr01' name="group" className=" border border-gray-800 dark:border-gray-600  pointer-events-none radio mx-4 w-5 h-5 " />
                                                                }
                                                                {fieldToInt(field) == 1 ? "المپیاد ریاضی" : fieldToInt(field) == 2 ? "المپیاد زیست شناسی" : fieldToInt(field) == 3 ? "المپیاد اقتصاد" : fieldToInt(field) == 4 ? "المپیاد هنر" : "نا معتبر"}</label>
                                                        </td>
                                                        <td className='w-1/5 text-right'>
                                                            <label htmlFor="gr02">
                                                                {
                                                                    groups.trim() == "المپیاد کامپیوتر".trim() || groups.trim() == "المپیاد سلول های بنیادی".trim() || groups.trim() == "المپیاد سواد رسانه".trim() || groups.trim() == "المپیاد دینی".trim() ?
                                                                        <input onChange={() => fieldToInt(field) == 1 ? setgroups("المپیاد کامپیوتر") : fieldToInt(field) == 2 ? setgroups("المپیاد سلول های بنیادی") : fieldToInt(field) == 3 ? setgroups("المپیاد سواد رسانه") : fieldToInt(field) == 4 ? setgroups("المپیاد دینی") : '0'} checked type="radio" id='gr02' name="group" className=" border border-gray-800 dark:border-gray-600  pointer-events-none radio mx-4 w-5 h-5 " />
                                                                        :
                                                                        <input onChange={() => fieldToInt(field) == 1 ? setgroups("المپیاد کامپیوتر") : fieldToInt(field) == 2 ? setgroups("المپیاد سلول های بنیادی") : fieldToInt(field) == 3 ? setgroups("المپیاد سواد رسانه") : fieldToInt(field) == 4 ? setgroups("المپیاد دینی") : '0'} type="radio" id='gr02' name="group" className=" border border-gray-800 dark:border-gray-600  pointer-events-none radio mx-4 w-5 h-5 " />
                                                                }
                                                                {fieldToInt(field) == 1 ? "المپیاد کامپیوتر" : fieldToInt(field) == 2 ? "المپیاد سلول های بنیادی" : fieldToInt(field) == 3 ? "المپیاد سواد رسانه" : fieldToInt(field) == 4 ? "المپیاد دینی" : "نا معتبر"}</label>
                                                        </td>
                                                        <td className='w-1/5 text-right'>
                                                            <label htmlFor="gr03">
                                                                {
                                                                    groups.trim() == "المپیاد شیمی".trim() || groups.trim() == "المپیاد شیمی".trim() || groups.trim() == "المپیاد کار آفرینی".trim() || groups.trim() == "المپیاد زبان خارجه".trim() ?
                                                                        <input onChange={() => fieldToInt(field) == 1 ? setgroups("المپیاد شیمی") : fieldToInt(field) == 2 ? setgroups("المپیاد شیمی") : fieldToInt(field) == 3 ? setgroups("المپیاد کار آفرینی") : fieldToInt(field) == 4 ? setgroups("المپیاد زبان خارجه") : '0'} checked type="radio" id='gr03' name="group" className=" border border-gray-800 dark:border-gray-600  pointer-events-none radio mx-4 w-5 h-5 " />
                                                                        :
                                                                        <input onChange={() => fieldToInt(field) == 1 ? setgroups("المپیاد شیمی") : fieldToInt(field) == 2 ? setgroups("المپیاد شیمی") : fieldToInt(field) == 3 ? setgroups("المپیاد کار آفرینی") : fieldToInt(field) == 4 ? setgroups("المپیاد زبان خارجه") : '0'} type="radio" id='gr03' name="group" className=" border border-gray-800 dark:border-gray-600  pointer-events-none radio mx-4 w-5 h-5 " />
                                                                }
                                                                {fieldToInt(field) == 1 ? "المپیاد شیمی" : fieldToInt(field) == 2 ? "المپیاد شیمی" : fieldToInt(field) == 3 ? "المپیاد کار آفرینی" : fieldToInt(field) == 4 ? "المپیاد زبان خارجه" : "نا معتبر"}</label>
                                                        </td>
                                                        <td className='w-1/5 text-right '>
                                                            <label htmlFor="gr04">
                                                                {
                                                                    groups.trim() == "المپیاد فیزیک".trim() || groups.trim() == "المپیاد فیزیک".trim() || groups.trim() == "المپیاد ادبی".trim() || groups.trim() == "المپیاد فرهنگی".trim() ?
                                                                        <input onChange={() => fieldToInt(field) == 1 ? setgroups("المپیاد فیزیک") : fieldToInt(field) == 2 ? setgroups("المپیاد فیزیک") : fieldToInt(field) == 3 ? setgroups("المپیاد ادبی") : fieldToInt(field) == 4 ? setgroups("المپیاد فرهنگی") : '0'} checked type="radio" id='gr04' name="group" className=" border border-gray-800 dark:border-gray-600  pointer-events-none radio mx-4 w-5 h-5 " />
                                                                        :
                                                                        <input onChange={() => fieldToInt(field) == 1 ? setgroups("المپیاد فیزیک") : fieldToInt(field) == 2 ? setgroups("المپیاد فیزیک") : fieldToInt(field) == 3 ? setgroups("المپیاد ادبی") : fieldToInt(field) == 4 ? setgroups("المپیاد فرهنگی") : '0'} type="radio" id='gr04' name="group" className=" border border-gray-800 dark:border-gray-600  pointer-events-none radio mx-4 w-5 h-5 " />
                                                                }
                                                                {fieldToInt(field) == 1 ? "المپیاد فیزیک" : fieldToInt(field) == 2 ? "المپیاد فیزیک" : fieldToInt(field) == 3 ? "المپیاد ادبی" : fieldToInt(field) == 4 ? "المپیاد فرهنگی" : "نا معتبر"}</label>

                                                        </td>
                                                    </tr>
                                                }
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                            <button onClick={setData} type='button' className='mt-9 mx-12 bg-btns text-texts py-2 px-9 rounded-lg hover:shadow-lg hover:shadow-actives transition-all'>ثبت اطلاعات</button>
                        </div>
                    </div>
                </div>

            </div >
            <Footer />
        </>
    );
}
export default Setting;