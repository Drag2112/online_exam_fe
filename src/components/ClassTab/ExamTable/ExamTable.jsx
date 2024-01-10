import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Chip from '@mui/material/Chip';
import { IconButton, Stack, TablePagination, Tooltip } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useEffect, useState, useContext } from 'react';
import { useQueryParams, useSetQueryParams } from '../../../hook';
import { ClassContext } from '../../../context/ClassProvider';
import { API } from '../../../api/api';
import { toast } from 'react-toastify'; 
import { initToast } from '../../../utils/helper';
import { ToastId } from '../../../config/app.config';
import './ExamTable.scss';
import { QUERY_PARAM_KEY, ROUTE_PATH } from '../../../config/routes.config';


const ExamTable = (props) => {
    const { classId, userId, className } = props
    const [page, setPage] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(10)
    const [dataRows, setDataRows] = useState([])
    const [totalData, setTotalData] = useState(0)
    const [examIdDelete, setExamIdDelete] = useState(0)

    const context = useContext(ClassContext)
    const queryParams = useQueryParams()
    const setQueryParams = useSetQueryParams()

    const handleChangePage = (event, newPage) => {
        setPage(newPage)
    }

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10))
        setPage(0)
    }

    const handleClickEditExam = (examId, examName, examTime) => {
        setQueryParams(ROUTE_PATH.CLASS_EXAM, {
            ...queryParams,
            [QUERY_PARAM_KEY.CLASS_NAME]: className,
            [QUERY_PARAM_KEY.EXAM_ID]: examId,
            [QUERY_PARAM_KEY.EXAM_NAME]: examName,
            [QUERY_PARAM_KEY.EXAM_TIME]: examTime,
        })
    }

    const handleClickDeleteExam = (examId) => {
        setExamIdDelete(examId)
    }

    useEffect(() => {
        const fetchData = async () => {
            const resultApi = await API.classService.getListExamCreated({ classId, userId, page: page, size: rowsPerPage })
            if (resultApi && resultApi.data && resultApi.data.data) {
                setDataRows(resultApi.data.data.data)
                setTotalData(resultApi.data.data.total)
            }
        }
        fetchData()
    }, [classId, page, rowsPerPage, context.reloadCreatedExamList])

    useEffect(() => {
        if (examIdDelete > 0) {
            const deleteExam = async () => {
                initToast(ToastId.DeleteExam)
                try {
                    const resultApi = await API.classService.deleteExam({ classId, teacherId: userId, examId: examIdDelete })
                    if (resultApi && resultApi.data && resultApi.data.code === 0) {
                        context.setReloadCreatedExamList(prev => !prev)
                        toast.update(ToastId.DeleteExam, { 
                            render: 'Xóa bài thi thành công', 
                            type: 'success', 
                            isLoading: false, 
                            autoClose: 2000 
                        })
                    } else {
                        toast.update(ToastId.DeleteExam, { 
                            render: resultApi.data.message || 'Xóa bài thi thất bại',
                            type: 'error', 
                            isLoading: false, 
                            autoClose: 3000 
                        })
                    }
                } catch (err) {
                    toast.update(ToastId.DeleteExam, { 
                        render: err.response.data.message || 'Xóa bài thi thất bại',
                        type: 'error', 
                        isLoading: false, 
                        autoClose: 3000 
                    })
                }
                setExamIdDelete(0)
            }
            deleteExam()
        }
    }, [examIdDelete])

    return (
        <div className='exam-table-container'>
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
                                        sx={{borderRadius: '6px', width: '125px', height: '20px', backgroundColor: row.is_published === 1 ? '#376fd0' : '#919191', color: 'white'}}
                                        label={row.is_published === 1 ? 'Đã công bố' : 'Chưa công bố'}
                                    />
                                </TableCell>
                                <TableCell align='center'>
                                    <Stack direction='row' justifyContent='center' alignItems='center'>
                                        <Tooltip title='Chỉnh sửa bài thi'>
                                            <IconButton onClick={() => handleClickEditExam(row.exam_id, row.exam_name, row.total_minutes)}>
                                                <EditIcon />
                                            </IconButton>
                                        </Tooltip>
                                        <Tooltip title='Xóa bài thi'>
                                            <IconButton onClick={() => handleClickDeleteExam(row.exam_id)}>
                                                <DeleteIcon />
                                            </IconButton>
                                        </Tooltip>
                                    </Stack>
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
        </div>
    )
}

export default ExamTable