import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { IconButton, TablePagination } from '@mui/material';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import { ClassContext } from '../../../context/ClassProvider';
import { useEffect, useState, useContext } from 'react';
import { API } from '../../../api/api';
import { toast } from 'react-toastify'; 
import { initToast, isValidURL } from '../../../utils/helper';
import { ToastId } from '../../../config/app.config';
import './DocumentList.scss';

const DocumentList = (props) => {
    const { classId, userId } = props
    const [page, setPage] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(10)
    const [dataRows, setDataRows] = useState([])
    const [totalData, setTotalData] = useState(0)

    const context = useContext(ClassContext)

    const handleChangePage = (event, newPage) => {
        setPage(newPage)
    }

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10))
        setPage(0)
    }

    const handleClickDownloadDocument = (event, url) => {
        event.preventDefault()

        if (url && typeof(url) === 'string' && isValidURL(url)) {
            window.open(url)
            window.focus()
        } else {
            initToast(ToastId.DownloadDocument)
            toast.update(ToastId.DownloadDocument, { 
                render: 'Không tìm thấy tài liệu trên hệ thống!', 
                type: 'error', 
                isLoading: false, 
                autoClose: 3000 
            })
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            const resultApi = await API.classService.getDocumentList({ classId, userId, page: page, size: rowsPerPage })
            if (resultApi && resultApi.data && resultApi.data.data) {
                setDataRows(resultApi.data.data.data)
                setTotalData(resultApi.data.data.total)
            }
        }
        fetchData()
    }, [classId, userId, page, rowsPerPage, context.reloadDocument])

    return (
        <div>
            <Paper>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell align='center' className='class-tab-table-header'>STT</TableCell>
                                <TableCell align='left' className='class-tab-table-header'>Tên tài liệu</TableCell>
                                <TableCell align='center' className='class-tab-table-header'>Download</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                        {dataRows.map((row, index) => (
                            <TableRow>
                                <TableCell align='center'>{index + 1}</TableCell>
                                <TableCell align='left'>{row.file_name}</TableCell>
                                <TableCell align='center'>
                                    <IconButton onClick={(event) => handleClickDownloadDocument(event, row.file_path)}>
                                        <CloudDownloadIcon sx={{color: '#1976d2'}}/>
                                    </IconButton>
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

export default DocumentList