import { LOCAL_STORAGE_KEY } from '../../config/memory.config';

class examService {
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

    compileCode = async ({examId, questionNumber, language, code}) => {
        this.setAuthorizationHeader()
        const result = await this.#_baseApi.post('/exam/compile-code', { examId, questionNumber, language, code })
        return result
    }
}

export default examService;