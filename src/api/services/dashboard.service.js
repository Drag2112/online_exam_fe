import { LOCAL_STORAGE_KEY } from "../../config/memory.config";

class dashboardService {
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

    getSummaryData = async () => {
        this.setAuthorizationHeader()
        const result = await this.#_baseApi.get('/dashboard/summary-data')
        return result
    }
}

export default dashboardService;