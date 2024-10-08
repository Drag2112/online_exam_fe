import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ROUTE_PATH } from './config/routes.config';
import { Login, Dashboard, Class, ClassDetail, ClassExam, ClassExamRoom, Admin, Profile, LearningResult, StudentLearningResut, ExamManagementPage, NotFound } from './pages';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
	return (
		<>
			<BrowserRouter>
				<Routes>
					<Route path={ROUTE_PATH.LOGIN} element={<Login />} />
					<Route path={ROUTE_PATH.DASHBOARD} element={<Dashboard />} />
					<Route path={ROUTE_PATH.CLASS} element={<Class />} />
					<Route path={ROUTE_PATH.CLASS_DETAIL} element={<ClassDetail />} />
					<Route path={ROUTE_PATH.CLASS_EXAM} element={<ClassExam />} />
					<Route path={ROUTE_PATH.CLASS_EXAM_ROOM} element={<ClassExamRoom />} />
					<Route path={ROUTE_PATH.ADMIN} element={<Admin />} />
					<Route path={ROUTE_PATH.PROFILE} element={<Profile />} />
					<Route path={ROUTE_PATH.LEARNING_RESULT} element={<LearningResult />} />
					<Route path={ROUTE_PATH.LEARNING_RESULT_DETAIL} element={<StudentLearningResut />} />
					<Route path={ROUTE_PATH.EXAM_MANAGEMENT} element={<ExamManagementPage />} />
					<Route path={ROUTE_PATH.NOT_FOUND} element={<NotFound />} />
				</Routes>
			</BrowserRouter>
			<ToastContainer pauseOnFocusLoss={false}/>
		</>
	)
};

export default App;
