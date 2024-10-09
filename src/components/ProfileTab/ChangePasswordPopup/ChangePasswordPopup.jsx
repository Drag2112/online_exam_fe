import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { Button, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, Stack } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { API } from '../../../api/api';
import { ToastId } from '../../../config/app.config';
import { toast } from 'react-toastify'; 
import { initToast } from '../../../utils/helper';

const ChangePasswordPopup = (props) => {
    const { userName, showPopupChangePassword, setShowPopupChangePassword } = props
    const [currentPassword, setCurrentPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [showCurrentPassword, setShowCurrentPassword] = useState(false)
    const [showNewPassword, setShowNewPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const [warningMessage, setWarningMessage] = useState('')
    
    const handleClosePopupChangePassword = () => setShowPopupChangePassword(false)
    const handleMouseDownPassword = (event) => event.preventDefault()

    const handleSaveNewPassword = () => {
        const postData = async () => {
            initToast(ToastId.ChangePassword)
            try {
                const resultApi = await API.authenticationService.changePassword({ username: userName, password: currentPassword, newPassword })
                if (resultApi && resultApi.data && resultApi.data.code === 0) {
                    toast.update(ToastId.ChangePassword, { 
                        render: 'Cập nhật mật khẩu thành công', 
                        type: 'success', 
                        isLoading: false, 
                        autoClose: 2000 
                    })
                } else {
                    toast.update(ToastId.ChangePassword, { 
                        render: resultApi.data.message || 'Cập nhật mật khẩu thất bại', 
                        type: 'error', 
                        isLoading: false, 
                        autoClose: 2000 
                    })
                }
            } catch (err) {
                toast.update(ToastId.ChangePassword, { 
                    render: err.response.data.message || 'Cập nhật mật khẩu thất bại', 
                    type: 'error', 
                    isLoading: false, 
                    autoClose: 2000
                })
            }
        }

        if (currentPassword === newPassword) {
            setWarningMessage('Mật khẩu mới không được trùng với mật khẩu hiện tại')
        } else if (newPassword !== confirmPassword) {
            setWarningMessage('Kiểm tra lại mật khẩu mới')
        } else {
            setWarningMessage('')
            postData()
        }
    }

    return (
        <Modal
            centered className='react-bootstrap-popup-modal' 
            backdropClassName='react-bootstrap-popup-backdrop-modal'
            show={showPopupChangePassword}
            onHide={handleClosePopupChangePassword}
        >
            <Modal.Header closeButton>
                <Modal.Title className='react-bootstrap-popup-title'>Đổi mật khẩu</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Stack direction='column' spacing={2} paddingX={2} paddingY={1}>
                    <div className='change-password-popup-warning-message'>{warningMessage}</div>
                    <FormControl variant='outlined' fullWidth>
                        <InputLabel htmlFor='outlined-adornment-password'>Mật khẩu hiện tại (*)</InputLabel>
                        <OutlinedInput type={showCurrentPassword ? 'text' : 'password'}
                            endAdornment={
                                <InputAdornment position='end'>
                                    <IconButton
                                        aria-label='toggle password visibility'
                                        onClick={() => setShowCurrentPassword((show) => !show)}
                                        onMouseDown={handleMouseDownPassword}
                                        edge='end'
                                    >
                                        {showCurrentPassword ? <Visibility /> : <VisibilityOff />}
                                    </IconButton>
                                </InputAdornment>
                            }
                            label='Mật khẩu hiện tại (*)'
                            sx={{fontFamily: 'IBM Plex Sans'}}
                            value={currentPassword}
                            onChange={(event) => setCurrentPassword(event.target.value)}                                
                        />
                    </FormControl>
                    <FormControl variant='outlined' fullWidth>
                        <InputLabel htmlFor='outlined-adornment-password'>Mật khẩu mới (*)</InputLabel>
                        <OutlinedInput type={showNewPassword ? 'text' : 'password'}
                            endAdornment={
                                <InputAdornment position='end'>
                                    <IconButton
                                        aria-label='toggle password visibility'
                                        onClick={() => setShowNewPassword((show) => !show)}
                                        onMouseDown={handleMouseDownPassword}
                                        edge='end'
                                    >
                                        {showNewPassword ? <Visibility /> : <VisibilityOff />}
                                    </IconButton>
                                </InputAdornment>
                            }
                            label='Mật khẩu mới (*)'
                            sx={{fontFamily: 'IBM Plex Sans'}}
                            value={newPassword}
                            onChange={(event) => setNewPassword(event.target.value)}                                
                        />
                    </FormControl>
                    <FormControl variant='outlined' fullWidth>
                        <InputLabel htmlFor='outlined-adornment-password'>Nhập lại mật khẩu mới (*)</InputLabel>
                        <OutlinedInput type={showConfirmPassword ? 'text' : 'password'}
                            endAdornment={
                                <InputAdornment position='end'>
                                    <IconButton
                                        aria-label='toggle password visibility'
                                        onClick={() => setShowConfirmPassword((show) => !show)}
                                        onMouseDown={handleMouseDownPassword}
                                        edge='end'
                                    >
                                        {showConfirmPassword ? <Visibility /> : <VisibilityOff />}
                                    </IconButton>
                                </InputAdornment>
                            }
                            label='Nhập lại mật khẩu mới'
                            sx={{fontFamily: 'IBM Plex Sans'}}
                            value={confirmPassword}
                            onChange={(event) => setConfirmPassword(event.target.value)}                                
                        />
                    </FormControl>
                </Stack>
            </Modal.Body>
            <Modal.Footer>
                <Stack direction='row' spacing={1}>
                    <Button variant='outlined' classes={{root: 'mui-cancel-button-root'}} onClick={handleClosePopupChangePassword}>
                        Hủy
                    </Button>
                    <Button variant='contained' classes={{root: 'mui-ok-button-root'}} onClick={handleSaveNewPassword}>
                        Đồng ý
                    </Button>
                </Stack>
            </Modal.Footer>
        </Modal>
    );
}

export default ChangePasswordPopup