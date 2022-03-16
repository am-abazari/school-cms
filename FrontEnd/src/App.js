import './App.css';
import { Route, Routes } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import { ToastContainer } from 'react-toastify';
import Login from './Pages/Login';
import Signup from './Pages/Signup';
import Study from './Pages/Study';
import Homeworks from './Pages/Homeworks';
import Class from './Pages/Class';
import Exam from './Pages/Exam';
import Setting from './Pages/Setting';
import NotFound from './Pages/NotFound';

import Loading from "./Images/Elements/loading.png"


const Dashboard = lazy(() => import('./Pages/Dashboard'));
function App() {
    return (
        <Suspense fallback={<img src={Loading} className={"text-center m-auto w-7 h-7 animate-spin mt-6"} />}>
            <div className={localStorage.getItem("theme") ? localStorage.getItem("theme") == "dark" ? "dark" : "" : "dark"} id='theme' >
                <div className="select-none App w-screen h-screen overflow-y-auto fixed bg-gradient-to-bl bg-bg_light-200 dark:bg-bg ">
                    <Routes>
                        <Route path='/' element={<Login />} />
                        <Route path='/Login' element={<Login />} />
                        <Route path='/Signup' element={<Signup />} />
                        <Route path='/Dashboard' element={<Dashboard />} />
                        <Route path='/Study' element={<Study />} />
                        <Route path='/Homeworks' element={<Homeworks />} />
                        <Route path='/Class' element={<Class />} />
                        <Route path='/Exam' element={<Exam />} />
                        <Route path='/Setting' element={<Setting />} />
                        <Route path='/*' element={<NotFound />} />

                    </Routes>
                    <ToastContainer rtl
                        draggable
                        pauseOnHover />
                </div>
            </div>
        </Suspense>
    );
}

export default App;
