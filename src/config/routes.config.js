import DashboardIcon from '@mui/icons-material/Dashboard';
import ClassIcon from '@mui/icons-material/Class';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import LogoutIcon from '@mui/icons-material/Logout';
import { FUNCTION_CODE } from './authorization.config';

export const ROUTE_KEY = {
    LOGIN: 'r0',
    DASHBOARD: 'r1',
    CLASS: 'r2',
    ADMIN: 'r3',
}

export const ROUTE_PATH = {
    LOGIN: '/',
    DASHBOARD: '/dashboard',
    CLASS: '/class',
    CLASS_DETAIL: '/class/detail',
    CLASS_EXAM: '/class/exam',
    ADMIN: '/admin',
    NOT_FOUND: '*'
}

export const menu = [
    { key: ROUTE_KEY.DASHBOARD, path: ROUTE_PATH.DASHBOARD, name: 'Dashboard', icon: <DashboardIcon />, functionCode: FUNCTION_CODE.VIEW_DASHBOARD_TAB, subRoutes: [], },
    { key: ROUTE_KEY.CLASS, path: ROUTE_PATH.CLASS, name: 'Danh sách lớp học', icon: <ClassIcon />, functionCode: FUNCTION_CODE.VIEW_CLASS_TAB, subRoutes: [], },
    { key: ROUTE_KEY.ADMIN, path: ROUTE_PATH.ADMIN, name: 'Quản trị', icon: <AdminPanelSettingsIcon />, functionCode: FUNCTION_CODE.VIEW_ADMIN_TAB, subRoutes: [], },
    { key: ROUTE_KEY.LOGIN, path: ROUTE_PATH.LOGIN, name: 'Đăng xuất', icon: <LogoutIcon />, subRoutes: [], },
]

export const QUERY_PARAM_KEY = {
    CLASS_ID: 'class_id',
    EXAM_ID: 'exam_id',
    EXAM_NAME: 'exam_name',
    EXAM_TIME: 'exam_time',
}