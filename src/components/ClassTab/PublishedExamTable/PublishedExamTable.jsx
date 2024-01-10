import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import { Stack, TablePagination } from '@mui/material';
import { Modal } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { API } from '../../../api/api';
import { useQueryParams, useSetQueryParams } from '../../../hook';
import { QUERY_PARAM_KEY, ROUTE_PATH } from '../../../config/routes.config';
import { ExamRoomActionType } from '../../../config/app.config';
import './PublishedExamTable.scss';


const PublishedExamTable = (props) => {
    const { classId, className, userId } = props
    const [page, setPage] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(10)
    const [dataRows, setDataRows] = useState([])
    const [totalData, setTotalData] = useState(0)
    const [openPopup, setOpenPopup] = useState(false)
    const [examInforJoin, setExamInforJoin] = useState(null)

    const queryParams = useQueryParams()
    const setQueryParams = useSetQueryParams()

    const handleChangePage = (event, newPage) => {
        setPage(newPage)
    }

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10))
        setPage(0)
    }

    const handleClosePopup = () => {
        setOpenPopup(false)
    }

    const handleClickViewExam = (examInfor, actionType) => {
        setExamInforJoin(examInfor)

        if (actionType === ExamRoomActionType.JOIN) {
            setOpenPopup(true)
        } else {
            setQueryParams(ROUTE_PATH.CLASS_EXAM_ROOM, {
                ...queryParams,
                [QUERY_PARAM_KEY.EXAM_ACTION_TYPE]: actionType,
                [QUERY_PARAM_KEY.CLASS_NAME]: className,
                [QUERY_PARAM_KEY.EXAM_ID]: examInfor?.exam_id || 0,
                [QUERY_PARAM_KEY.EXAM_NAME]: examInfor?.exam_name || '',
                [QUERY_PARAM_KEY.EXAM_TIME]: examInfor?.total_minutes || '',
            })
        }
    }

    const handleClickConfirmViewExam = (actionType) => {
        setQueryParams(ROUTE_PATH.CLASS_EXAM_ROOM, {
            ...queryParams,
            [QUERY_PARAM_KEY.EXAM_ACTION_TYPE]: actionType,
            [QUERY_PARAM_KEY.CLASS_NAME]: className,
            [QUERY_PARAM_KEY.EXAM_ID]: examInforJoin?.exam_id || 0,
            [QUERY_PARAM_KEY.EXAM_NAME]: examInforJoin?.exam_name || '',
            [QUERY_PARAM_KEY.EXAM_TIME]: examInforJoin?.total_minutes || '',
        })
    }

    useEffect(() => {
        const fetchData = async () => {
            const resultApi = await API.classService.getListExamNeedDone({ classId, userId, page: page, size: rowsPerPage})
            if (resultApi && resultApi.data && resultApi.data.data) {
                setDataRows(resultApi.data.data.data)
                setTotalData(resultApi.data.data.total)
            }
        }
        fetchData()
    }, [classId, userId, page, rowsPerPage])

    return (
        <div className='published-exam-table-container'>
            <Paper>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell align='center' className='class-tab-table-header'>STT</TableCell>
                                <TableCell align='left' className='class-tab-table-header'>Tên bài thi</TableCell>
                                <TableCell align='left' className='class-tab-table-header'>Tổng số câu hỏi</TableCell>
                                <TableCell align='center' className='class-tab-table-header'>Thời gian làm bài (phút)</TableCell>
                                <TableCell align='center' className='class-tab-table-header'>Trạng thái</TableCell>
                                <TableCell align='center' className='class-tab-table-header'>Hành động</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                        {dataRows.map((row, index) => (
                            <TableRow>
                                <TableCell align='center'>{index + 1}</TableCell>
                                <TableCell align='left'>{row.exam_name}</TableCell>
                                <TableCell align='left'>{row.total_question}</TableCell>
                                <TableCell align='center'>{row.total_minutes}</TableCell>
                                <TableCell align='center'>
                                    <Chip 
                                        sx={{borderRadius: '6px', width: '125px', height: '20px', backgroundColor: row.status === 1 ? '#376fd0' : '#919191', color: 'white'}}
                                        label={row.status === 1 ? 'Đã hoàn thành' : 'Chưa hoàn thành'}
                                    />
                                </TableCell>
                                <TableCell align='center'>
                                    {row.status === 1 ?
                                        <Button variant='contained' sx={{width: '110px', height: '30px', fontSize: '14px'}} classes={{root: 'published-exam-button-root'}}
                                            onClick={() => handleClickViewExam(row, ExamRoomActionType.VIEW)}
                                        >
                                            Xem lại
                                        </Button> :
                                        <Button variant='contained' sx={{width: '110px', height: '30px', fontSize: '14px'}} classes={{root: 'published-exam-button-root'}}
                                            onClick={() => handleClickViewExam(row, ExamRoomActionType.JOIN)}
                                        >
                                            Vào thi
                                        </Button>
                                    }
                                </TableCell>
                            </TableRow>
                        ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[10, 20, 50]}
                    component='div'
                    labelRowsPerPage='Số bản ghi mỗi trang:'
                    labelDisplayedRows={({ from, to, count }) => { return `${from}-${to} của ${count}`}}
                    count={totalData}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
            <Modal centered className='published-exam-popup-modal' backdropClassName='published-exam-popup-backdrop-modal'
                show={openPopup} onHide={handleClosePopup}
            >
                <Modal.Header closeButton>
                    <Modal.Title className='published-exam-confirm-popup-title'>Xác nhận</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>Bạn có đồng ý tham gia thi không?</div>
                    <Stack direction='row' spacing={2} marginTop={2} justifyContent='flex-end'>
                        <Button variant='contained' className='published-exam-popup-confirm-button' classes={{root: 'published-exam-btn-root'}} 
                            onClick={() => handleClickConfirmViewExam('join')}
                        >
                            Xác nhận
                        </Button>
                        <Button variant='contained' className='published-exam-popup-cancel-button' classes={{root: 'published-exam-btn-root'}} 
                            onClick={handleClosePopup}
                        >
                            Hủy
                        </Button>
                    </Stack>
                </Modal.Body>
            </Modal>
        </div>
    )
}

export default PublishedExamTable