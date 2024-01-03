import DataTable from './DataTable/DataTable';
import JoinedClassList from './JoinedClassList/JoinedClassList';
import Button from '@mui/material/Button';
import AddBoxIcon from '@mui/icons-material/AddBox';
import { ClassContext } from '../../context/ClassProvider';
import React, { useContext, useEffect, useState } from 'react';
import AddClassPopup from './AddClassPopup/AddClassPopup';
import API from '../../api/api';
import { toast } from 'react-toastify'; 
import { initToast } from '../../utils/helper';
import { ToastId } from '../../config/app.config';
import { LOCAL_STORAGE_KEY } from '../../config/memory.config';
import { FUNCTION_CODE } from '../../config/authorization.config';
import { AccessDenied } from '../shared';
import './ClassTab.scss';

const ClassTab = () => {
    const userId = localStorage.getItem(LOCAL_STORAGE_KEY.USER_ID)
    const functionCodes = localStorage.getItem(LOCAL_STORAGE_KEY.FUNCTION_CODES)?.split(';') || []

    const context = useContext(ClassContext)
    const handleClickAddClassButton = () => {
        context.setOpenAddClassPopup(true)
    }

    const [refreshDataTable, setRefreshDataTable] = useState(true)
    const [refreshJoinedList, setRefreshJoinedList] = useState(true)

    const [dataTable, setDataTable] = useState([])
    const [joinedList, setJoinedList] = useState([])

    useEffect(() => {
        if (refreshDataTable) {
            const fetchDataTable = async () => {
                initToast(ToastId.CreateClass)
                try {
                    const resultApi = await API.classService.getListClassNotJoin({ userId: userId })
                    if (resultApi && resultApi.data && resultApi.data.data) {
                        setDataTable(resultApi.data.data)
                        toast.update(ToastId.CreateClass, { 
                            render: "Tải dữ liệu thành công", 
                            type: "success", 
                            isLoading: false, 
                            autoClose: 2000 
                        })
                    }
                } catch (err) {
                    toast.update(ToastId.CreateClass, { 
                        render: err.response.data.message || "Tải dữ liệu thất bại", 
                        type: "error", 
                        isLoading: false, 
                        autoClose: 3000 
                    })
                }
                setRefreshDataTable(false)
            }
            fetchDataTable()
        }
    }, [refreshDataTable])

    useEffect(() => {
        if (refreshJoinedList) {
            const fetchDataJoinedList = async () => {
                initToast(ToastId.CreateClass)
                try {
                    const resultApi = await API.classService.getListClassJoined({ userId: userId })
                    if (resultApi && resultApi.data && resultApi.data.data) {
                        setJoinedList(resultApi.data.data)
                        toast.update(ToastId.CreateClass, { 
                            render: "Tải dữ liệu thành công", 
                            type: "success", 
                            isLoading: false, 
                            autoClose: 2000 
                        })
                    }
                } catch (err) {
                    toast.update(ToastId.CreateClass, { 
                        render: err.response.data.message || "Tải dữ liệu thất bại", 
                        type: "error", 
                        isLoading: false, 
                        autoClose: 3000 
                    })
                }
                setRefreshJoinedList(false)
            }
            fetchDataJoinedList()
        }
    }, [refreshJoinedList])

    return (
        <React.Fragment>
            {userId && functionCodes.includes(FUNCTION_CODE.VIEW_CLASS_TAB) ?
                <div className='class-container-0'>
                    <div className='class-container-1'>
                        <div className='d-flex flex-row row align-items-center mb-3'>
                            <div className='col-8 class-container-title'>Danh sách các lớp học hiện có trên hệ thống</div>
                            <div className='col-4 d-flex justify-content-end'>
                                <Button variant='contained' startIcon={<AddBoxIcon fontSize='small' />} classes={{root: 'class-tab-button-root'}}
                                    sx={{width: '150px', height: '30px', fontSize: '14px'}} onClick={handleClickAddClassButton}
                                >
                                    Tạo lớp học
                                </Button>
                            </div>
                        </div>
                        <DataTable rows={dataTable} setRefreshDataTable={setRefreshDataTable} setRefreshJoinedList={setRefreshJoinedList}/>
                    </div>
                    <div className='class-container-1'>
                        <div className='class-container-title'>Các lớp đã tham gia</div>
                        <JoinedClassList rows={joinedList}/>
                    </div>
                    <div style={{height: '40px'}}></div>
                    <AddClassPopup setRefreshDataTable={setRefreshDataTable}/>
                </div> :
                <AccessDenied />
            }
        </React.Fragment>
    )
}

export default ClassTab;