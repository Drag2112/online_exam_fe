import DashboardIcon from '@mui/icons-material/Dashboard';
import ClassIcon from '@mui/icons-material/Class';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import QuizIcon from '@mui/icons-material/Quiz';
import { FUNCTION_CODE } from './authorization.config';

export const ROUTE_KEY = {
    LOGIN: 'r0',
    DASHBOARD: 'r1',
    CLASS: 'r2',
    ADMIN: 'r3',
    EXAM_MANAGEMENT: 'r4'
}

export const ROUTE_PATH = {
    LOGIN: '/',
    DASHBOARD: '/dashboard',
    CLASS: '/class',
    CLASS_DETAIL: '/class/detail',
    CLASS_EXAM: '/class/exam',
    CLASS_EXAM_ROOM: '/class/exam/room',
    ADMIN: '/admin',
    PROFILE: '/profile',
    LEARNING_RESULT: '/learning-result',
    LEARNING_RESULT_DETAIL: '/learning-result/detail',
    EXAM_MANAGEMENT: '/exam-management',
    NOT_FOUND: '*'
}

export const routes = [
    { key: ROUTE_KEY.DASHBOARD, path: ROUTE_PATH.DASHBOARD, name: 'Dashboard', icon: <DashboardIcon />, functionCode: FUNCTION_CODE.VIEW_DASHBOARD_TAB, subRoutes: [], },
    { key: ROUTE_KEY.CLASS, path: ROUTE_PATH.CLASS, name: 'Danh sách lớp học', icon: <ClassIcon />, functionCode: FUNCTION_CODE.VIEW_CLASS_TAB, subRoutes: [], },
    { key: ROUTE_KEY.EXAM_MANAGEMENT, path: ROUTE_PATH.EXAM_MANAGEMENT, name: 'Quản lý đề thi', icon: <QuizIcon />, functionCode: FUNCTION_CODE.VIEW_ADMIN_TAB, subRoutes: [], },
    { key: ROUTE_KEY.ADMIN, path: ROUTE_PATH.ADMIN, name: 'Quản lý người dùng', icon: <AdminPanelSettingsIcon />, functionCode: FUNCTION_CODE.VIEW_ADMIN_TAB, subRoutes: [], },
]

export const QUERY_PARAM_KEY = {
    CLASS_ID: 'class_id',
    CLASS_NAME: 'class_name',
    EXAM_ID: 'exam_id',
    EXAM_NAME: 'exam_name',
    EXAM_TIME: 'exam_time',
    EXAM_ACTION_TYPE: 'exam_action_type',
    PROFILE_ID: 'profile_id'
}