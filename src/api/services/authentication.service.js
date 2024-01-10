import { LOCAL_STORAGE_KEY } from "../../config/memory.config";

class authenticationService {
    #_baseApi = null;   // private property
    constructor(baseApi) {
        this.#_baseApi = baseApi;
    }

    setAuthorizationHeader = () => {
        const accessToken = localStorage.getItem(LOCAL_STORAGE_KEY.ACCESS_TOKEN)
        if (accessToken) {
            this.#_baseApi.defaults.headers.Authorization = 'Bearer ' + accessToken
        }
    }

    register = async (data) => {
        this.setAuthorizationHeader()
        const result = await this.#_baseApi.post('/auth/register', {
            username: data.username || '',
            password: data.password || '',
            roleId: data.roleId || 0,
            fullName: data.fullName || '',
            dateOfBirth: data.dateOfBirth || '',
            gender: data.gender || '',
            email: data.email || '',
            phoneNumber: data.phoneNumber || '',
            address: data.address || ''
        })
        return result
    }

    login = async (data) => {
        const result = await this.#_baseApi.post('/auth/login', {
            username: data.username || '',
            password: data.password || ''
        })
        return result
    }

    resetPassword = async (data) => {
        this.setAuthorizationHeader()
        const result = await this.#_baseApi.post('/auth/reset-password', {
            username: data.username || '',
            newPassword: data.newPassword || ''
        })
        return result
    }
}

export default authenticationService;