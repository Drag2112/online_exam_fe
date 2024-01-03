class authenticationService {
    #_baseApi = null;   // private property
    constructor(baseApi) {
        this.#_baseApi = baseApi;
    }

    register = async (data) => {
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
}

export default authenticationService;