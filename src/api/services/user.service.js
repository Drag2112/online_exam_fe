class userService {
    #_baseApi = null;
    constructor(baseApi) {
        this.#_baseApi = baseApi;
    }

    getAllTeachers = async () => {
        const result = await this.#_baseApi.get('/user/all-teachers')
        return result
    }

    getAllRoles = async () => {
        const result = await this.#_baseApi.get('/user/all-roles')
        return result
    }

    getAllUsersPaging = async (pageValue, sizeValue, searchValue) => {
        const result = await this.#_baseApi.get('user/search', {
            params: {
                page: pageValue,
                size: sizeValue,
                search: searchValue
            }
        })
        return result
    }

    lockUser = async (payload) => {
        const result = await this.#_baseApi.post('/user/lock', {
            userId: payload.userId,
            lock: payload.lock
        })
        return result
    }
}

export default userService;