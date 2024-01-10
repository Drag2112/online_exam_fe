import { LOCAL_STORAGE_KEY } from "../../config/memory.config";

class classService {
    #_baseApi = null;
    constructor(baseApi) {
        this.#_baseApi = baseApi;
    }

    setAuthorizationHeader = () => {
        const accessToken = localStorage.getItem(LOCAL_STORAGE_KEY.ACCESS_TOKEN)
        if (accessToken) {
            this.#_baseApi.defaults.headers.Authorization = 'Bearer ' + accessToken
        }
    }
    
    createNewClass = async (payload) => {
        this.setAuthorizationHeader()
        const result = await this.#_baseApi.post('/class/create', {
            teacherId: payload.teacherId, 
            classCode: payload.classCode, 
            className: payload.className, 
            description: payload.description
        })
        return result
    }

    getListClassNotJoin = async (payload) => {
        this.setAuthorizationHeader()
        const result = await this.#_baseApi.get('/class/not-join-list', {
            params: {
                userId: payload.userId
            }
        })
        return result
    }

    getListClassJoined = async (payload) => {
        this.setAuthorizationHeader()
        const result = await this.#_baseApi.get('/class/joined-list', {
            params: {
                userId: payload.userId
            }
        })
        return result
    }

    joinClass = async (payload) => {
        this.setAuthorizationHeader()
        const result = await this.#_baseApi.post('/class/join', {
            classId: payload.classId,
            userId: payload.userId
        })
        return result
    }

    getClassDetail = async ({ classId, userId }) => {
        this.setAuthorizationHeader()
        const result = await this.#_baseApi.get('/class/detail', {
            params: {
                userId: userId,
                classId: classId
            }
        })
        return result
    }

    getDocumentList = async ({ classId, userId, page, size }) => {
        this.setAuthorizationHeader()
        const result = await this.#_baseApi.get('/class/document-list', {
            params: {
                userId: userId,
                classId: classId,
                page: page,
                size: size
            }
        })
        return result
    }

    addClassDocument = async ({ classId, teacherId, fileName, filePath }) => {
        this.setAuthorizationHeader()
        const result = await this.#_baseApi.post('/class/add-document', {
            classId: classId,
            teacherId: teacherId,
            fileName: fileName,
            filePath: filePath
        })
        return result
    }

    getListExamNeedDone = async ({ classId, userId, page, size }) => {
        this.setAuthorizationHeader()
        const result = await this.#_baseApi.get('/class/exam/need-done', {
            params: {
                userId: userId,
                classId: classId,
                page: page,
                size: size
            }
        })
        return result
    }

    getListExamCreated = async ({ classId, userId, page, size }) => {
        this.setAuthorizationHeader()
        const result = await this.#_baseApi.get('/class/exam/created-list', {
            params: {
                userId: userId,
                classId: classId,
                page: page,
                size: size
            }
        })
        return result
    }

    createExam = async ({ classId, teacherId, examName, description, totalMinutes, publish, questions }) => {
        this.setAuthorizationHeader()
        const result = await this.#_baseApi.post('/class/exam/create', {
            classId, teacherId, examName, description, totalMinutes, publish, questions
        })
        return result
    }

    updateExam = async ({ examId, classId, teacherId, examName, description, totalMinutes, publish, questions }) => {
        this.setAuthorizationHeader()
        const result = await this.#_baseApi.post('/class/exam/update', {
            examId, classId, teacherId, examName, description, totalMinutes, publish, questions
        })
        return result
    }

    getExamInfor = async ({ examId, classId }) => {
        this.setAuthorizationHeader()
        const result = await this.#_baseApi.get('/class/exam/infor', {
            params: {
                examId, classId
            }
        })
        return result
    }

    getExamInforByStudent = async ({ examId, classId, actionType }) => {
        this.setAuthorizationHeader()
        const result = await this.#_baseApi.get('/class/exam/infor-for-student', {
            params: {
                examId, classId, actionType
            }
        })
        return result
    }

    deleteExam = async ({ classId, teacherId, examId }) => {
        this.setAuthorizationHeader()
        const result = await this.#_baseApi.post('/class/exam/delete', {
            classId, teacherId, examId
        })
        return result
    }

    submitExamResult = async ({ examId, startTime, endTime, questionResults }) => {
        this.setAuthorizationHeader()
        const result = await this.#_baseApi.post('/class/exam/submit-result', {
            examId, startTime, endTime, questionResults
        })
        return result
    }
}

export default classService;