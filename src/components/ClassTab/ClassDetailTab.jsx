import './ClassDetailTab.scss';
import Paper from '@mui/material/Paper';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import Button from '@mui/material/Button';
import ExamTable from './ExamTable/ExamTable';
import PublishedExamTable from './PublishedExamTable/PublishedExamTable';
import UserList from './UserList/UserList';
import DocumentList from './DocumentList/DocumentList';
import AddDocumentPopup from './AddDocumentPopup/AddDocumentPopup';
import { AccessDenied, AddNewExamPopup } from '../shared';
import { QUERY_PARAM_KEY, ROUTE_PATH } from '../../config/routes.config';
import { ClassContext } from '../../context/ClassProvider';
import { AppContext } from '../../context/AppProvider';
import React, { useContext, useEffect, useState } from 'react';
import { useQueryParams } from '../../hook';
import { API } from '../../api/api';
import { LOCAL_STORAGE_KEY } from '../../config/memory.config';
import { FUNCTION_CODE } from '../../config/authorization.config';
import { AddExamPopupLocation } from '../../config/app.config';
import SelectExamSource from './AddExemPopup/SelectExamSource';
import AddExistExam from './AddExemPopup/AddExistExam';


const ClassDetailTab = () => {
    const [classInfor, setClassInfor] = useState({
        classCode: '',
        className: '',
        teacherName: '',
        description: '',
        subjectCode: '',
        subjectName: '',
        students: []
    })

    const appContext = useContext(AppContext)
    const classContext = useContext(ClassContext)

    const handleClickAddDocumentPopup = () => {
        classContext.setOpenAddDocumentPopup(true)
    }

    const handleClickAddExamPopup = () => {
        classContext.setOpenSelectExamSourcePopup(true)
    }

    const queryParams = useQueryParams()
    const classId = Number(queryParams[QUERY_PARAM_KEY.CLASS_ID] || 0)
    const userId = Number(localStorage.getItem(LOCAL_STORAGE_KEY.USER_ID) || 0)
    const functionCodes = localStorage.getItem(LOCAL_STORAGE_KEY.FUNCTION_CODES)?.split(';') || []

    useEffect(() => {
        const fetchData = async () => {
            const resultApi = await API.classService.getClassDetail({ classId: classId, userId: userId })
            if (resultApi && resultApi.data && resultApi.data.data) {
                setClassInfor(resultApi.data.data)
            }
        }
        fetchData()
    }, [classId, userId])


    return (
        <React.Fragment>
            {userId && functionCodes.includes(FUNCTION_CODE.VIEW_CLASS_TAB) ?
                <div className='class-detail-container-0'>
                    <div className='class-detail-container-1'>
                        <Stack spacing={2}>
                            <Breadcrumbs aria-label='breadcrumb' classes={{li: 'class-detail-breadcrum-li'}} separator={<NavigateNextIcon fontSize='small' sx={{color: '#376fd0'}} />}>
                                <Link underline='hover' key='1' color='inherit' href={ROUTE_PATH.CLASS}>Danh sách lớp học</Link>
                                <Typography key='2' classes={{root: 'class-detail-typography-root'}}>{classInfor.className}</Typography>
                            </Breadcrumbs>
                        </Stack>
                    </div>
                    <div className='class-detail-container-2'>
                        <div className='d-flex flex-row row'>
                            <div className='col-8'>
                                <div className='d-flex flex-column'>
                                    <div className='class-detail-class-infor'>
                                        <div className='class-detail-class-title'><strong>Tên lớp: </strong>{classInfor.className} (<strong>Mã lớp: </strong>{classInfor.classCode})</div>
                                    </div>
                                    <div className='class-detail-class-infor'>
                                        <div className='class-detail-class-title'><strong>Môn học: </strong>{classInfor.subjectName}</div>
                                    </div>
                                    <div className='class-detail-class-infor'>
                                        <div className='class-detail-class-title'><strong>Giáo viên phụ trách: </strong>{classInfor.teacherName}</div>
                                    </div>
                                    <div className='class-detail-class-infor'>
                                        <div className='class-detail-class-title'><strong>Mô tả:</strong></div>
                                        <div className='class-detail-class-content'>{classInfor.description}</div>
                                    </div>
                                    {functionCodes.includes(FUNCTION_CODE.CREATE_CLASS) ? 
                                        <div className='class-detail-class-infor mt-4'>
                                            <div className='d-flex flex-row row class-detail-class-title'>
                                                <div className='col-8'><strong>Danh sách đề thi đã tạo:</strong></div>
                                                <div className='col-4 d-flex justify-content-end'>
                                                    <Button variant='contained' sx={{width: '150px', height: '30px', fontSize: '14px'}}
                                                        classes={{root: 'class-detail-button-root'}} onClick={handleClickAddExamPopup}
                                                    >
                                                        Tạo đề thi
                                                    </Button>
                                                </div>
                                            </div>
                                            <ExamTable classId={classId} userId={userId} className={classInfor.className} />
                                        </div> :
                                        <div className='class-detail-class-infor mt-2'>
                                            <div className='d-flex flex-row row class-detail-class-title'>
                                                <div><strong>Danh sách bài thi cần hoàn thành:</strong></div>
                                            </div>
                                            <PublishedExamTable classId={classId} className={classInfor.className} userId={userId}/>
                                        </div>
                                    }
                                </div>
                            </div>
                            <div className='col-4'>
                                <div className='d-flex flex-column'>
                                    <div className='class-detail-class-infor'>
                                        <div className='class-detail-class-title'><strong>Danh sách thành viên lớp:</strong></div>
                                        <Paper elevation={2}>
                                            <UserList users={classInfor.students}/>
                                        </Paper>
                                    </div>
                                    <div className='class-detail-class-infor mt-2'>
                                        <div className='d-flex flex-row row class-detail-class-title mb-2'>
                                            <div className='col'><strong>Danh sách tài liệu:</strong></div>
                                            {functionCodes.includes(FUNCTION_CODE.CREATE_CLASS) && (
                                                <div className='col d-flex justify-content-end'>
                                                    <Button variant='contained' sx={{width: '160px', height: '30px', fontSize: '14px'}}
                                                        classes={{root: 'class-detail-button-root'}} onClick={handleClickAddDocumentPopup}
                                                    >
                                                        Thêm tài liệu
                                                    </Button>
                                                </div>
                                            )}
                                        </div>
                                        <Paper elevation={2}>
                                            <DocumentList classId={classId} userId={userId}/>
                                        </Paper>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <SelectExamSource />
                    <AddExistExam />
                    <AddNewExamPopup 
                        className={classInfor.className} 
                        location={AddExamPopupLocation.CLASS_DETAIL_PAGE} 
                        subjectOfClass={{subjectCode: classInfor.subjectCode, subjectName: classInfor.subjectName}}
                    />
                    <AddDocumentPopup classId={classId} teacherId={userId}/>
                    <div style={{height: '40px'}}></div>
                </div> : 
                <AccessDenied />
            }
        </React.Fragment>
    )
}

export default ClassDetailTab