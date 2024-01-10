import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { IconButton, RadioGroup } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import { useContext, useEffect, useState } from 'react';
import { AdminContext } from '../../../context/AdminProvider';
import dayjs from 'dayjs';
import moment from 'moment';
import { API } from '../../../api/api';
import { toast } from 'react-toastify'; 
import { initToast } from '../../../utils/helper';
import { ToastId } from '../../../config/app.config';
import './EditUserPopup.scss';

const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '100%',
    transform: 'translate(-100%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    borderWidth: 0,
    boxShadow: 24,
    height: '100vh'
};

const EditUserPopup = (props) => {
    const context = useContext(AdminContext)
    const { user, setRefreshUserTable } = props
    const [submit, setSubmit] = useState(false)
    const [roles, setRoles] = useState([])
    const [userInfor, setUserInfor] = useState({
        userId: Number(user?.user_id || 0),
        userName: user?.user_name || '',
        roleId: user?.role_id ? Number(user?.role_id) : '',
        fullName: user?.full_name || '',
        dateOfBirth: user?.date_of_birth || moment().format('YYYY-MM-DD'),
        gender: user?.gender || '',
        email: user?.email || '',
        phoneNumber: user?.phone_number || '',
        address: user?.address || ''
    })

    const handleChangeUserInfor = (paramName, value) => {
        setUserInfor(prev => ({...prev, [paramName]: value}))
    }

    const handleClose = () => context.setOpenEditUserPopup(false)

    const handleClickConfirmButton = () => {
        setSubmit(true)
    }

    useEffect(() => {
        setUserInfor({
            userId: Number(user?.user_id || 0),
            userName: user?.user_name || '',
            roleId: user?.role_id ? Number(user?.role_id) : '',
            fullName: user?.full_name || '',
            dateOfBirth: user?.date_of_birth || moment().format('YYYY-MM-DD'),
            gender: user?.gender || '',
            email: user?.email || '',
            phoneNumber: user?.phone_number || '',
            address: user?.address || ''
        })
    }, [user])

    useEffect(() => {
        const fetchMasterData = async () => {
            const result = await API.userService.getAllRoles()
            if (result && result.data && result.data.data) {
                setRoles(result.data.data)
            }
        }
        fetchMasterData()
    }, [])

    useEffect(() => {
        if (submit) {
            const postData = async () => {
                initToast(ToastId.UpdateUserId)
                try {
                    const resultApi = await API.userService.updateUserInfor(userInfor)
                    if (resultApi && resultApi.data && resultApi.data.code === 0) {
                        setRefreshUserTable(true)
                        context.setOpenEditUserPopup(false)
                        toast.update(ToastId.UpdateUserId, { 
                            render: 'Cập nhật thông tin user thành công', 
                            type: 'success', 
                            isLoading: false, 
                            autoClose: 2000 
                        })
                    } else {
                        toast.update(ToastId.UpdateUserId, { 
                            render: resultApi.data.message || 'Cập nhật thông tin user thất bại', 
                            type: 'error', 
                            isLoading: false, 
                            autoClose: 3000 
                        })
                    }
                } catch (err) {
                    toast.update(ToastId.UpdateUserId, { 
                        render: err.response.data.message || 'Cập nhật thông tin user thất bại', 
                        type: 'error', 
                        isLoading: false, 
                        autoClose: 3000 
                    })
                }
                setSubmit(false)
            }
            postData()
        }
    }, [submit])

    return (
        <div>
            <Modal 
                open={context.openEditUserPopup} onClose={handleClose} 
                aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description"
                className='add-new-user-popup'
            >
                <Box sx={modalStyle}>
                    <div className='add-new-user-popup-header'>
                        <div className='add-new-user-popup-header-title'>Thay đổi thông tin user</div>
                        <IconButton size='medium' onClick={handleClose}>
                            <CloseIcon />
                        </IconButton>
                    </div>
                    <div className='add-new-user-popup-body'>
                        <div className='add-new-user-popup-body-text-field'>
                            <TextField  variant="outlined" label='Tên đăng nhập' placeholder='Nhập tên đăng nhập' 
                                fullWidth disabled value={userInfor.userName}
                            />
                        </div>
                        <div className='add-new-user-popup-body-text-field'>
                            <TextField  variant="outlined" label='Họ tên' placeholder='Nhập họ tên' fullWidth
                                value={userInfor.fullName} onChange={(event) => handleChangeUserInfor('fullName', event.target.value)}
                            />
                        </div>
                        <div className='add-new-user-popup-body-text-field'>
                            <FormControl fullWidth>
                                <InputLabel>Role</InputLabel>
                                <Select label='Role' value={userInfor.roleId} onChange={(event) => handleChangeUserInfor('roleId', event.target.value)}>
                                    {roles.map(role => (
                                        <MenuItem value={role.role_id}>{role.role_name}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </div>
                        <div className='d-flex flex-row add-new-user-popup-body-text-field'>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DemoContainer components={['DatePicker']} >
                                    <DemoItem>
                                        <DatePicker label='Ngày sinh' format='DD-MM-YYYY' className='add-user-popup-date-picker'
                                            value={dayjs(userInfor.dateOfBirth)}
                                            onChange={(value) => handleChangeUserInfor('dateOfBirth', dayjs(value).format('YYYY-MM-DD'))}
                                        />
                                    </DemoItem>
                                </DemoContainer>
                            </LocalizationProvider>
                            <RadioGroup row value={userInfor.gender} onChange={(event) => handleChangeUserInfor('gender', event.target.value)}
                            >
                                <FormControlLabel control={<Radio />} labelPlacement='start' label='Nam' value='male' />
                                <FormControlLabel control={<Radio />} labelPlacement='start' label='Nữ' value='female' />
                            </RadioGroup>
                        </div>
                        <div className='add-new-user-popup-body-text-field'>
                            <TextField  variant="outlined" label='Email' placeholder='Nhập email' fullWidth 
                                value={userInfor.email} onChange={(event) => handleChangeUserInfor('email', event.target.value)}
                            />
                        </div>
                        <div className='add-new-user-popup-body-text-field'>
                            <TextField  variant="outlined" label='SĐT' placeholder='Nhập SĐT' fullWidth 
                                value={userInfor.phoneNumber} onChange={(event) => handleChangeUserInfor('phoneNumber', event.target.value)}
                            />
                        </div>
                        <div className='add-new-user-popup-body-text-field'>
                            <TextField  variant="outlined" label='Địa chỉ' placeholder='Nhập địa chỉ' fullWidth 
                                value={userInfor.address} onChange={(event) => handleChangeUserInfor('address', event.target.value)}
                            />
                        </div>
                        <Button variant="contained" fullWidth className='add-new-user-popup-body-confirm-btn'
                            onClick={handleClickConfirmButton}
                        >
                            Xác nhận
                        </Button>
                    </div>
                </Box>
            </Modal>
        </div>
    )
}

export default EditUserPopup