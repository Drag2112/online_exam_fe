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
import { InputAdornment, OutlinedInput } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
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
import {API} from '../../../api/api';
import { DefaultPassword, ToastId } from '../../../config/app.config';
import { toast } from 'react-toastify'; 
import { initToast } from '../../../utils/helper';
import './AddUserPopup.scss'

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

const AddUserPopup = (props) => {
    const { setRefreshUserTable } = props
    const [roles, setRoles] = useState([])
    const [showPassword, setShowPassword] = useState(false)
    const [submit, setSubmit] = useState(false)
    const [userInfor, setUserInfor] = useState({
        username: '',
        password: DefaultPassword,
        roleId: '',
        fullName: '',
        dateOfBirth: moment().format('YYYY-MM-DD'),
        gender: 'male',
        email: '',
        phoneNumber: '',
        address: ''
    })

    const handleClickShowPassword = () => setShowPassword((show) => !show)

    const handleMouseDownPassword = (event) => {
        event.preventDefault()
    }

    const handleChangeUserInfor = (paramName, value) => {
        setUserInfor(prev => ({...prev, [paramName]: value}))
    }

    const context = useContext(AdminContext)
    const handleClose = () => context.setOpenAddUserPopup(false)

    const handleClickSubmitButton = (event) => {
        if (!userInfor.username || !userInfor.password || !userInfor.fullName || !userInfor.roleId || !userInfor.email) {
            initToast(ToastId.CreateUser)
            toast.update(ToastId.CreateUser, { 
                render: 'Vui lòng nhập đầy đủ các trường thông tin bắt buộc!', 
                type: 'info', 
                isLoading: false, 
                autoClose: 3000 
            })
            event.preventDefault()
        } else {
            setSubmit(true)
        }
    }

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
                initToast(ToastId.CreateUser)
                try {
                    const resultApi = await API.authenticationService.register(userInfor)
                    if (resultApi && resultApi.data && resultApi.data.code === 0) {
                        setRefreshUserTable(true)
                        toast.update(ToastId.CreateUser, { 
                            render: 'Tạo user thành công', 
                            type: 'success', 
                            isLoading: false, 
                            autoClose: 2000 
                        })
                    } else {
                        toast.update(ToastId.CreateUser, { 
                            render: resultApi.data.message || 'Tạo user thất bại', 
                            type: 'error', 
                            isLoading: false, 
                            autoClose: 3000 
                        })
                    }
                } catch(err) {
                    toast.update(ToastId.CreateUser, { 
                        render: err.response.data.message || 'Tạo user thất bại', 
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
                open={context.openAddUserPopup} onClose={handleClose} 
                aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description"
                className='add-new-user-popup'
            >
                <Box sx={modalStyle}>
                    <div className='add-new-user-popup-header'>
                        <div className='add-new-user-popup-header-title'>Tạo user mới</div>
                        <IconButton size='medium' onClick={handleClose}>
                            <CloseIcon />
                        </IconButton>
                    </div>
                    <div className='add-new-user-popup-body'>
                        <div className='add-new-user-popup-body-text-field'>
                            <TextField  variant="outlined" label='Tên đăng nhập (*)' placeholder='Nhập tên đăng nhập' fullWidth 
                                value={userInfor.username} onChange={(event) => handleChangeUserInfor('username', event.target.value)}
                            />
                        </div>
                        <div className='add-new-user-popup-body-text-field'>
                            <FormControl variant="outlined" fullWidth>
                                <InputLabel htmlFor="outlined-adornment-password">Mật khẩu (*)</InputLabel>
                                <OutlinedInput type={showPassword ? 'text' : 'password'}
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={handleClickShowPassword}
                                                onMouseDown={handleMouseDownPassword}
                                                edge="end"
                                            >
                                            {showPassword ? <Visibility /> : <VisibilityOff />}
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                    label='Mật khẩu (*)'
                                    sx={{fontFamily: 'IBM Plex Sans'}}
                                    value={userInfor.password}
                                    onChange={(event) => handleChangeUserInfor('password', event.target.value)}                                
                                />
                            </FormControl>
                        </div>
                        <div className='add-new-user-popup-body-text-field'>
                            <TextField  variant="outlined" label='Họ tên (*)' placeholder='Nhập họ tên' fullWidth 
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
                            <TextField  variant="outlined" label='Email (*)' placeholder='Nhập email' fullWidth 
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
                            onClick={handleClickSubmitButton}
                        >
                            Xác nhận
                        </Button>
                    </div>
                </Box>
            </Modal>
        </div>
    )
}

export default AddUserPopup