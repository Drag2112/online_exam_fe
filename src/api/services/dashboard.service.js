class dashboardService {
    #_baseApi = null;   // private property
    constructor(baseApi) {
        this.#_baseApi = baseApi;
    }

    getSummaryData = async () => {
        const result = await this.#_baseApi.get('/dashboard/summary-data')
        return result
    }
}

export default dashboardService;