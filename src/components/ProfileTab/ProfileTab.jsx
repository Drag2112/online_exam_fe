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


const ProfileTab = () => {
    const queryParams = useQueryParams()
    const profileId = Number(queryParams?.profile_id || 0)

    const [user, setUser] = useState({
        userId: profileId,
        userName: '',
        fullName: '',
        roleName: ''
    })

    const [showPopupChangePassword, setShowPopupChangePassword] = useState(false);
    
    const handleShowPopupChangePassword = () => setShowPopupChangePassword(true);

    useEffect(() => {
        const fetchData = async () => {
            initToast(ToastId.Profile)
            try {
                const resultApi = await API.userService.getUserByProfileId(profileId)
                if (resultApi && resultApi.data && resultApi.data.data) {
                    const userInfor = resultApi.data.data
                    setUser({
                        userId: userInfor.user_id || 0,
                        userName: userInfor.user_name || '',
                        fullName: userInfor.full_name || '',
                        roleName: userInfor.role_name || ''
                    })
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
                        <Typography sx={{ fontSize: 16, fontWeight: 600 }}>{user?.fullName} ({user?.userName})</Typography>
                        <Typography sx={{ fontSize: 15, fontWeight: 500 }}>{user?.roleName}</Typography>
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
                        />
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DemoContainer components={['DatePicker']} >
                                <DemoItem>
                                    <DatePicker label='Ngày sinh' format='DD-MM-YYYY' className='profile-tab-date-picker'
                                        value={dayjs()}
                                    />
                                </DemoItem>
                            </DemoContainer>
                        </LocalizationProvider>
                    </Stack>
                    <Stack direction='row' spacing={3} justifyContent='space-between'>
                        <TextField variant='outlined' label='Địa chỉ' placeholder='Nhập địa chỉ' fullWidth 
                            classes={{ root: 'profile-tab-text-field-root' }}
                        />
                        <FormControl fullWidth className='profile-tab-form-control'>
                            <InputLabel id="demo-simple-select-label">Giới tính</InputLabel>
                            <Select label='Giới tính'
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
                        />
                        <TextField variant='outlined' label='Email' placeholder='Nhập email' fullWidth 
                            classes={{ root: 'profile-tab-text-field-root' }}
                        />
                    </Stack>
                </Stack>
                <Stack direction='row-reverse' spacing={1} className='profile-tab-button-row'>
                    <Button variant='contained' classes={{root: 'mui-ok-button-root'}}>
                        Lưu
                    </Button>
                    <Button variant='outlined' classes={{root: 'mui-cancel-button-root'}}>
                        Hủy
                    </Button>
                </Stack>
            </Paper>
            <ChangePasswordPopup showPopupChangePassword={showPopupChangePassword} setShowPopupChangePassword={setShowPopupChangePassword}/>
        </div>
    )
}

export default ProfileTab