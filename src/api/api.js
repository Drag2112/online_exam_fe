import apiInstance from './base/base.js';
import { authenticationService, dashboardService, userService, classService, examService } from './services';

const API = {
    authenticationService: new authenticationService(apiInstance),
    dashboardService: new dashboardService(apiInstance),
    userService: new userService(apiInstance),
    classService: new classService(apiInstance),
    examService: new examService(apiInstance)
}

export {
    API
}