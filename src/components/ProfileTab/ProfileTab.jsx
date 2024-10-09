import './ProfileTab.scss'
import { Avatar, Button, FormControl, InputLabel, MenuItem, Paper, Select, Stack, TextField, Typography } from '@mui/material';
import LockIcon from '@mui/icons-material/Lock';
import { useEffect, useState } from 'react';
import ChangePasswordPopup from './ChangePasswordPopup/ChangePasswordPopup';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useQueryParams } from '../../hook';
import {API} from '../../api/api';
import { ToastId } from '../../config/app.config';
import { toast } from 'react-toastify'; 
import { initToast } from '../../utils/helper';
import _ from 'lodash';


const ProfileTab = () => {
    const queryParams = useQueryParams()
    const profileId = Number(queryParams?.profile_id || 0)

    const initialUserInfor = {
        userId: profileId,
        userName: '',
        fullName: '',
        roleId: '',
        roleName: '',
        dateOfBirth: '',
        gender: '',
        address: '',
        email: '',
        phoneNumber: ''
    }
    const [initialUser, setInitialUser] = useState(initialUserInfor)
    const [user, setUser] = useState(initialUserInfor)

    const [showPopupChangePassword, setShowPopupChangePassword] = useState(false);
    const [edited, setEdited] = useState(false)

    const handleShowPopupChangePassword = () => setShowPopupChangePassword(true);

    const handleChangeUserInfor = (paramName, value) => {
        const newUser = {...user, [paramName]: value}
        setUser(newUser)

        if (!_.isEqual(initialUser, newUser)) {
            setEdited(true)
        } else {
            setEdited(false)
        }
    }

    const handleSaveUserInfor = () => {
        const postData = async () => {
            initToast(ToastId.UpdateUserId)
            try {
                const resultApi = await API.userService.updateUserInfor(user)
                if (resultApi && resultApi.data && resultApi.data.code === 0) {
                    setInitialUser(user)
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
        }
        postData()
    }

    const handleCancelUpdateUser = () => {
        setUser(initialUser)
        setEdited(false)
    }

    useEffect(() => {
        const fetchData = async () => {
            initToast(ToastId.Profile)
            try {
                const resultApi = await API.userService.getUserByProfileId(profileId)
                if (resultApi && resultApi.data && resultApi.data.data) {
                    const userInfor = resultApi.data.data
                    const userInforUpdate = {
                        userId: userInfor.user_id || 0,
                        userName: userInfor.user_name || '',
                        fullName: userInfor.full_name || '',
                        roleId: userInfor.role_id || 0,
                        roleName: userInfor.role_name || '',
                        dateOfBirth: userInfor.date_of_birth || '',
                        gender: userInfor.gender || '',
                        address: userInfor.address || '',
                        email: userInfor.email || '',
                        phoneNumber: userInfor.phone_number || ''
                    }
                    setUser(userInforUpdate)
                    setInitialUser(userInforUpdate)
                    toast.update(ToastId.Profile, { 
                        render: "Tải dữ liệu thành công", 
                        type: "success", 
                        isLoading: false, 
                        autoClose: 2000 
                    })
                }
            } catch (err) {
                toast.update(ToastId.Profile, { 
                    render: err.response.data.message || "Tải dữ liệu thất bại", 
                    type: "error", 
                    isLoading: false, 
                    autoClose: 3000 
                })
            }
        }

        fetchData()
    }, [profileId])

    return (
        <div className='tab-container'>
            <Paper elevation={1}>
                <Stack direction='row' className='profile-tab-user-avatar-row'>
                    <Avatar src='/broken-image.jpg' sx={{ width: 100, height: 100 }} />
                    <Stack direction='column' marginLeft={3} spacing={1}>
                        <Typography sx={{ fontSize: 16, fontWeight: 600 }}>{initialUser?.fullName} ({initialUser?.userName})</Typography>
                        <Typography sx={{ fontSize: 15, fontWeight: 500 }}>{initialUser?.roleName}</Typography>
                        <Button variant='contained' startIcon={<LockIcon sx={{ width: 16 }}/>} 
                            sx={{ fontSize: 15, textTransform: 'none' }} classes={{root: 'profile-tab-button-root'}}
                            onClick={handleShowPopupChangePassword}
                        >
                            Đổi mật khẩu
                        </Button>
                    </Stack>
                </Stack>
                <Stack direction='column' spacing={2} marginTop={2} className='profile-tab-user-infor-row'>
                    <Stack direction='row' spacing={3} justifyContent='space-between'>
                        <TextField variant='outlined' label='Họ tên' placeholder='Nhập họ tên' fullWidth 
                            className='profile-tab-text-field-with-dp' classes={{ root: 'profile-tab-text-field-root' }}
                            value={user.fullName} onChange={(event) => handleChangeUserInfor('fullName', event.target.value)}
                        />
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DemoContainer components={['DatePicker']} >
                                <DemoItem>
                                    <DatePicker label='Ngày sinh' format='DD-MM-YYYY' className='profile-tab-date-picker'
                                        value={dayjs(user.dateOfBirth)}
                                        onChange={(value) => handleChangeUserInfor('dateOfBirth', dayjs(value).format('YYYY-MM-DD'))}
                                    />
                                </DemoItem>
                            </DemoContainer>
                        </LocalizationProvider>
                    </Stack>
                    <Stack direction='row' spacing={3} justifyContent='space-between'>
                        <TextField variant='outlined' label='Địa chỉ' placeholder='Nhập địa chỉ' fullWidth 
                            classes={{ root: 'profile-tab-text-field-root' }} 
                            value={user.address} onChange={(event) => handleChangeUserInfor('address', event.target.value)}
                        />
                        <FormControl fullWidth className='profile-tab-form-control'>
                            <InputLabel id="demo-simple-select-label">Giới tính</InputLabel>
                            <Select label='Giới tính' value={user.gender} onChange={(event) => handleChangeUserInfor('gender', event.target.value)}
                            >
                                <MenuItem value='male'>Nam</MenuItem>
                                <MenuItem value='female'>Nữ</MenuItem>
                                <MenuItem value='other'>Khác</MenuItem>
                            </Select>
                        </FormControl>
                    </Stack>
                    <Stack direction='row' spacing={3} justifyContent='space-between'>
                        <TextField variant='outlined' label='SĐT' placeholder='Nhập SĐT' fullWidth 
                            classes={{ root: 'profile-tab-text-field-root' }} 
                            value={user.phoneNumber} onChange={(event) => handleChangeUserInfor('phoneNumber', event.target.value)}
                        />
                        <TextField variant='outlined' label='Email' placeholder='Nhập email' fullWidth 
                            classes={{ root: 'profile-tab-text-field-root' }}
                            value={user.email} onChange={(event) => handleChangeUserInfor('email', event.target.value)}
                        />
                    </Stack>
                </Stack>
                <Stack direction='row-reverse' spacing={1} className='profile-tab-button-row'>
                    <Button variant='contained' disabled={!edited} onClick={handleSaveUserInfor} classes={{root: 'mui-ok-button-root'}}>
                        Lưu
                    </Button>
                    <Button variant='outlined' disabled={!edited} onClick={handleCancelUpdateUser} classes={{root: 'mui-cancel-button-root'}}>
                        Hủy
                    </Button>
                </Stack>
            </Paper>
            <ChangePasswordPopup userName={initialUser.userName} showPopupChangePassword={showPopupChangePassword} setShowPopupChangePassword={setShowPopupChangePassword}/>
        </div>
    )
}

export default ProfileTab