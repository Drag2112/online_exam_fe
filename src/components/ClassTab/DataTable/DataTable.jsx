import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import DonutSmallIcon from '@mui/icons-material/DonutSmall';
import Modal from 'react-bootstrap/Modal';
import { useEffect, useState } from 'react';
import {API} from '../../../api/api';
import { toast } from 'react-toastify'; 
import { initToast } from '../../../utils/helper';
import { ToastId } from '../../../config/app.config';
import { LOCAL_STORAGE_KEY } from '../../../config/memory.config';
import { FUNCTION_CODE } from '../../../config/authorization.config';
import { useQueryParams, useSetQueryParams } from '../../../hook';
import { QUERY_PARAM_KEY, ROUTE_PATH } from '../../../config/routes.config';
import './DataTable.scss';

const DataTable = (props) => {
    const { rows, setRefreshDataTable, setRefreshJoinedList } = props
    const [showConfirmPopup, setShowConfirmPopup] = useState(false)
    const [submitJoin, setSubmitJoin] = useState(false)
    const [classIdJoin, setClassIdJoin] = useState(0)

    const queryParams = useQueryParams()
    const setQueryParams = useSetQueryParams()

    const userId = localStorage.getItem(LOCAL_STORAGE_KEY.USER_ID)
    const functionCodes = localStorage.getItem(LOCAL_STORAGE_KEY.FUNCTION_CODES)?.split(';') || []

    const handleCloseConfirmPopup = () => setShowConfirmPopup(false)

    const handleClickJoinButton = (classId) => {
        setShowConfirmPopup(true)
        setClassIdJoin(classId)
    }

    const handleClickViewButton = (classId) => {
        setQueryParams(ROUTE_PATH.CLASS_DETAIL, {
            ...queryParams,
            [QUERY_PARAM_KEY.CLASS_ID]: classId
        })
    }

    const handleClickConfirmJoinButton = () => {
        setSubmitJoin(true)
    }

    useEffect(() => {
        if (submitJoin) {
            const postData = async () => {
                initToast(ToastId.CreateClass)
                try {
                    const resultApi = await API.classService.joinClass({ classId: classIdJoin, userId: userId })
                    if (resultApi && resultApi.data && resultApi.data.code === 0) {
                        setShowConfirmPopup(false)
                        setRefreshDataTable(true)
                        setRefreshJoinedList(true)            
                        toast.update(ToastId.CreateClass, { 
                            render: "Tham gia lớp học thành công", 
                            type: "success", 
                            isLoading: false, 
                            autoClose: 2000 
                        })
                    } else {
                        toast.update(ToastId.CreateClass, { 
                            render: resultApi.data.message || "Tham gia lớp học thất bại", 
                            type: "error", 
                            isLoading: false, 
                            autoClose: 3000 
                        })
                    }
                } catch (err) {
                    toast.update(ToastId.CreateClass, { 
                        render: err.response.data.message || "Tham gia lớp học thất bại", 
                        type: "error", 
                        isLoading: false, 
                        autoClose: 3000 
                    })
                }
                setSubmitJoin(false)
            }
            postData()
        }
    }, [submitJoin])

    return (
        <div>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell align='center' className='class-tab-table-header'>STT</TableCell>
                            <TableCell align='left' className='class-tab-table-header'>Mã lớp</TableCell>
                            <TableCell align='left' className='class-tab-table-header'>Tên lớp</TableCell>
                            <TableCell align='left' className='class-tab-table-header'>Giáo viên phụ trách</TableCell>
                            <TableCell align='right' className='class-tab-table-header'>Số học sinh tham gia</TableCell>
                            <TableCell align='right' className='class-tab-table-header'>Số bài thi cần vượt qua</TableCell>
                            <TableCell align='center' className='class-tab-table-header'>Tham gia</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                    {rows.map((row, index) => (
                        <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                            <TableCell align='center'>{index + 1}</TableCell>
                            <TableCell align='left'>{row.class_code}</TableCell>
                            <TableCell align='left'>{row.class_name}</TableCell>
                            <TableCell align='left'>{row.teacher_name}</TableCell>
                            <TableCell align='right'>{row.total_student}</TableCell>
                            <TableCell align='right'>{row.total_exam}</TableCell>
                            <TableCell align='center'>
                                {functionCodes.includes(FUNCTION_CODE.CREATE_CLASS) ?
                                    <Button variant='contained' startIcon={<DonutSmallIcon fontSize='small' />} classes={{root: 'class-tab-table-join-button-root'}}
                                        sx={{width: '135px', height: '30px', fontSize: '14px'}} onClick={() => handleClickViewButton(row.class_id)}
                                    >
                                        Chi tiết
                                    </Button> :
                                    <Button variant='contained' startIcon={<PersonAddIcon fontSize='small' />} classes={{root: 'class-tab-table-join-button-root'}}
                                        sx={{width: '135px', height: '30px', fontSize: '14px'}} onClick={() => handleClickJoinButton(row.class_id)}
                                    >
                                        Tham gia
                                    </Button>
                                }
                            </TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Modal centered className='class-tab-table-join-modal' backdropClassName='class-tab-table-join-backdrop-modal'
                show={showConfirmPopup} onHide={handleCloseConfirmPopup}
            >
                <Modal.Header closeButton>
                    <Modal.Title className='class-tab-table-join-title'>Xác nhận</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>
                        <div className='mb-3'>Bạn chắc chắn muốn tham gia lớp chứ?</div>
                        <div className='d-flex flex-row-reverse'>
                            <Button variant='contained' className='class-tab-table-join-cancel-button' onClick={handleCloseConfirmPopup}>Hủy</Button>
                            <Button variant='contained' className='class-tab-table-join-confirm-button' onClick={handleClickConfirmJoinButton}>Đồng ý</Button>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    )
}

export default DataTable