import moment from 'moment';
import React, { useEffect, useState } from 'react';
import StatusBar from './StatusBar/StatusBar.jsx';
import ChartView from './ChartView/ChartView.jsx';
import DataTable from './DataTable/DataTable.jsx';
import { ChartConfig } from '../../config/app.config';
import { getLastSevenDay } from '../../utils/helper';
import { LOCAL_STORAGE_KEY } from '../../config/memory.config.js';
import { AccessDenied } from '../shared';
import {API} from '../../api/api.js';
import { FUNCTION_CODE } from '../../config/authorization.config.js';
import './DashboardTab.scss';

const DashboardTab = () => {
    const userId = localStorage.getItem(LOCAL_STORAGE_KEY.USER_ID)
    const functionCodes = localStorage.getItem(LOCAL_STORAGE_KEY.FUNCTION_CODES)?.split(';') || []

    const dates = getLastSevenDay()
    const initChartData = []
    dates.map(date => {
        initChartData.push({label: moment(date).format('DD-MM-YYYY'), y: 0})
    })

    const initStatusData = {
        total_class: 0,
        total_student: 0,
        total_exam: 0,
        total_joined_exam: 0,
        avg_score: 0
    }

    const [statusData, setStatusData] = useState(initStatusData)
    const [chartData, setChartData] = useState(initChartData)
    const [tableData, setTableData] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            const resultApi = await API.dashboardService.getSummaryData()
            if (resultApi && resultApi.data && resultApi.data.data) {
                setStatusData(resultApi.data.data.overview || initStatusData)
                setChartData(resultApi.data.data.chart || initChartData)
                setTableData(resultApi.data.data.table || [])
            }
        }

        fetchData()
    }, [])

    return (
        <React.Fragment>
            {userId && functionCodes.includes(FUNCTION_CODE.VIEW_DASHBOARD_TAB) ? 
                <div className='dashboard-tab-container-0'>
                    <div className='dashboard-tab-cards'>
                        <div className='dashboard-tab-title'>Tổng quan</div>
                        <StatusBar data={statusData}/>
                    </div>
                    <div className='dashboard-tab-charts'>
                        <div className='dashboard-tab-title'>Thống kê</div>
                        <div className='d-flex flex-row row'>
                            <div className='col dashboard-tab-chart-1'>
                                <ChartView chartType={ChartConfig.ChartType.ExamTaken} points={chartData}/>
                            </div>
                            <div className='col dashboard-tab-chart-2'>
                                <div className='dashboard-tab-chart-2-title'>Thống kê 5 lớp có điểm thi trung bình cao nhất</div>
                                <DataTable dataRows={tableData}/>
                            </div>
                        </div>
                    </div>
                </div> :
                <AccessDenied />
            }
        </React.Fragment>
    )
}

export default DashboardTab;