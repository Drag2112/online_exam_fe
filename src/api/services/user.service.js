import { LOCAL_STORAGE_KEY } from '../../config/memory.config';

class userService {
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

    getAllTeachers = async () => {
        this.setAuthorizationHeader()
        const result = await this.#_baseApi.get('/user/all-teachers')
        return result
    }

    getAllRoles = async () => {
        this.setAuthorizationHeader()
        const result = await this.#_baseApi.get('/user/all-roles')
        return result
    }

    getAllUsersPaging = async (pageValue, sizeValue, searchValue) => {
        this.setAuthorizationHeader()
        const result = await this.#_baseApi.get('user/search', {
            params: {
                page: pageValue,
                size: sizeValue,
                search: searchValue
            }
        })
        return result
    }

    getUserByProfileId = async (profileId) => {
        this.setAuthorizationHeader()
        const result = await this.#_baseApi.get('user', {
            params: {
                profileId: profileId
            }
        })
        return result
    }

    lockUser = async (payload) => {
        this.setAuthorizationHeader()
        const result = await this.#_baseApi.post('/user/lock', {
            userId: payload.userId,
            lock: payload.lock
        })
        return result
    }

    updateUserInfor = async ({userId, userName, fullName, roleId, dateOfBirth, gender, email, phoneNumber, address}) => {
        this.setAuthorizationHeader()
        const result = await this.#_baseApi.post('/user/update-infor', {
            userId, userName, fullName, roleId, dateOfBirth, gender, email, phoneNumber, address
        })
        return result
    }
}

export default userService;