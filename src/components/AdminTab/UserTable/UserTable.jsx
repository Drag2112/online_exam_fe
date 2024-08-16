import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TablePagination from '@mui/material/TablePagination';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Tooltip from '@mui/material/Tooltip';
import { IconButton } from '@mui/material';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import LockResetIcon from '@mui/icons-material/LockReset';
import HttpsIcon from '@mui/icons-material/Https';
import PersonIcon from '@mui/icons-material/Person';
import NoEncryptionGmailerrorredIcon from '@mui/icons-material/NoEncryptionGmailerrorred';
import { useState, useContext, useEffect } from 'react';
import { useSetQueryParams } from '../../../hook';
import { AdminContext } from '../../../context/AdminProvider';
import EditUserPopup from '../EditUserPopup/EditUserPopup';
import ResetPasswordPopup from '../ResetPasswordPopup/ResetPasswordPopup';
import DeleteUserPopup from '../DeleteUserPopup/DeleteUserPopup';
import {API} from '../../../api/api';
import { toast } from 'react-toastify'; 
import { initToast, formatPhoneNumber } from '../../../utils/helper';
import { ToastId } from '../../../config/app.config';
import { QUERY_PARAM_KEY, ROUTE_PATH } from '../../../config/routes.config';
import './UserTable.scss';

const UserTable = (props) => {
    const { valueSearch, submit, setSubmit } = props
    const context = useContext(AdminContext)
    const [page, setPage] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(10)
    const [dataRows, setDataRows] = useState([])
    const [totalData, setTotalData] = useState(0)
    const [userAction, setUserAction] = useState(null)

    const setQueryParams = useSetQueryParams()

    const handleChangePage = (event, newPage) => {
        setPage(newPage)
        setSubmit(true)
    }

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10))
        setPage(0)
        setSubmit(true)
    }

    const handleOpenEditPopup = (userInfor) => {
        setUserAction(userInfor)
        context.setOpenEditUserPopup(true)
    }

    const handleOpenResetPassPopup = (userInfor) => {
        setUserAction(userInfor)
        context.setOpenResetPassPopup(true)
    }

    const handleOpenLockOrUnLockPopup = (userInfor) => {
        setUserAction(userInfor)
        context.setOpenLockAndUnLockUserPopup(true)
    }

    const handleClickViewDetail = (userInfor) => {
        const options = { openNewTab: true }
        const queryParams = {
            [QUERY_PARAM_KEY.PROFILE_ID]: userInfor?.user_id || 0
        }
        setQueryParams(ROUTE_PATH.PROFILE, queryParams, options)
    }
    
    useEffect(() => {
        if (submit) {
            const fetchData = async () => {
                initToast(ToastId.SearchUser)
                try {
                    const resultApi = await API.userService.getAllUsersPaging(page, rowsPerPage, valueSearch)
                    if (resultApi && resultApi.data && resultApi.data.data) {
                        setDataRows(resultApi.data.data.data)
                        setTotalData(resultApi.data.data.total)
                        toast.update(ToastId.SearchUser, { 
                            render: 'Tải thông tin thành công', 
                            type: 'success', 
                            isLoading: false, 
                            autoClose: 2000 
                        })
                    } else {
                        toast.update(ToastId.SearchUser, { 
                            render: resultApi.data.message || 'Tải thông tin thất bại', 
                            type: 'error', 
                            isLoading: false, 
                            autoClose: 3000 
                        })
                    }
                } catch (err) {
                    toast.update(ToastId.SearchUser, { 
                        render: err.response.data.message || 'Tải thông tin thất bại', 
                        type: 'error', 
                        isLoading: false, 
                        autoClose: 3000 
                    })
                }
                setSubmit(false)
            }
            fetchData()
        }
    }, [submit])

    return (
        <div className='admin-tab-user-table-container'>
            <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell align='center' className='admin-tab-user-table-header'>STT</TableCell>
                                <TableCell align='left' className='admin-tab-user-table-header'>Tên đăng nhập</TableCell>
                                <TableCell align='left' className='admin-tab-user-table-header'>Họ tên</TableCell>
                                <TableCell align='left' className='admin-tab-user-table-header'>Role</TableCell>
                                <TableCell align='left' className='admin-tab-user-table-header'>Ngày sinh</TableCell>
                                <TableCell align='left' className='admin-tab-user-table-header'>Email</TableCell>
                                <TableCell align='left' className='admin-tab-user-table-header'>SĐT</TableCell>
                                <TableCell align='left' className='admin-tab-user-table-header'>Trạng thái</TableCell>
                                <TableCell align='center' className='admin-tab-user-table-header'>Hành động</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                        {dataRows.map((row, index) => (
                            <TableRow>
                                <TableCell align='center' sx={{cursor: 'pointer'}}>{index + 1}</TableCell>
                                <TableCell align='left' sx={{cursor: 'pointer'}} onClick={() => handleClickViewDetail(row)}>{row.user_name}</TableCell>
                                <TableCell align='left' sx={{cursor: 'pointer'}} onClick={() => handleClickViewDetail(row)}>{row.full_name}</TableCell>
                                <TableCell align='left' sx={{cursor: 'pointer'}} onClick={() => handleClickViewDetail(row)}>{row.role_name}</TableCell>
                                <TableCell align='left' sx={{cursor: 'pointer'}} onClick={() => handleClickViewDetail(row)}>{row.date_of_birth}</TableCell>
                                <TableCell align='left' sx={{cursor: 'pointer'}} onClick={() => handleClickViewDetail(row)}>{row.email}</TableCell>
                                <TableCell align='left' sx={{cursor: 'pointer'}} onClick={() => handleClickViewDetail(row)}>
                                    {formatPhoneNumber(row.phone_number)}
                                </TableCell> 
                                <TableCell align='left' sx={{cursor: 'pointer'}} onClick={() => handleClickViewDetail(row)}>
                                    {row.is_locked === 0 ? 'Đang hoạt động' : 'Đã khóa'}
                                </TableCell> 
                                <TableCell align='center'>
                                    <Stack direction='row' justifyContent='center'>
                                        <Tooltip title='Thay đổi thông tin user'>
                                            <IconButton onClick={() => handleOpenEditPopup(row)}>
                                                <ModeEditIcon />
                                            </IconButton>
                                        </Tooltip>
                                        <Tooltip title='Reset password'>
                                            <IconButton onClick={() => handleOpenResetPassPopup(row)}>
                                                <LockResetIcon />
                                            </IconButton>
                                        </Tooltip>
                                        <Tooltip title={row.is_locked === 0 ? 'Khóa tài khoản' : 'Mở khóa tài khoản'}>
                                            <IconButton onClick={() => handleOpenLockOrUnLockPopup(row)}>
                                                {row.is_locked === 0 ? <HttpsIcon /> : <NoEncryptionGmailerrorredIcon />}
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
            <EditUserPopup user={userAction} setRefreshUserTable={setSubmit}/>
            <ResetPasswordPopup user={userAction}/>
            <DeleteUserPopup user={userAction} setRefreshUserTable={setSubmit}/>
        </div>
    )
}

export default UserTable