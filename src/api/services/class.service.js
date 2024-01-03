class classService {
    #_baseApi = null;
    constructor(baseApi) {
        this.#_baseApi = baseApi;
    }
    
    createNewClass = async (payload) => {
        const result = await this.#_baseApi.post('/class/create', {
            teacherId: payload.teacherId, 
            classCode: payload.classCode, 
            className: payload.className, 
            description: payload.description
        })
        return result
    }

    getListClassNotJoin = async (payload) => {
        const result = await this.#_baseApi.get('/class/not-join-list', {
            params: {
                userId: payload.userId
            }
        })
        return result
    }

    getListClassJoined = async (payload) => {
        const result = await this.#_baseApi.get('/class/joined-list', {
            params: {
                userId: payload.userId
            }
        })
        return result
    }

    joinClass = async (payload) => {
        const result = await this.#_baseApi.post('/class/join', {
            classId: payload.classId,
            userId: payload.userId
        })
        return result
    }
}

export default classService;