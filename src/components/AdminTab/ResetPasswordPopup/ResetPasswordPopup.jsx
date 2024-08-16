import { useContext, useEffect, useState } from 'react';
import { AdminContext } from '../../../context/AdminProvider';
import { Modal } from 'react-bootstrap';
import { Button, IconButton, Stack } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import { InputAdornment, OutlinedInput } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { DefaultPassword } from '../../../config/app.config';
import { API } from '../../../api/api';
import { toast } from 'react-toastify'; 
import { initToast } from '../../../utils/helper';
import { ToastId } from '../../../config/app.config';
import './ResetPasswordPopup.scss'

const ResetPasswordPopup = (props) => {
    const { user } = props
    const context = useContext(AdminContext)
    const [confirmReset, setConfirmReset] = useState(false)
    const [password, setPassword] = useState(DefaultPassword)
    const [showPassword, setShowPassword] = useState(false)

    const handleClickShowPassword = () => setShowPassword((show) => !show)

    const handleMouseDownPassword = (event) => {
        event.preventDefault()
    }

    const handleChangePassword = (event) => {
        setPassword(event.target.value)
    }

    const handleClickConfirmButton = () => {
        setConfirmReset(true)
    }

    const handleClosePopup = () => {
        context.setOpenResetPassPopup(false)
    }

    useEffect(() => {
        if (confirmReset) {
            const postData = async () => {
                initToast(ToastId.ResetPassword)
                try {
                    const resultApi = await API.authenticationService.resetPassword({
                        username: user?.user_name || '',
                        newPassword: password
                    })
                    if (resultApi && resultApi.data && resultApi.data.code === 0) {
                        toast.update(ToastId.ResetPassword, { 
                            render: "Reset mật khẩu người dùng thành công", 
                            type: "success", 
                            isLoading: false, 
                            autoClose: 2000 
                        })
                    } else {
                        toast.update(ToastId.ResetPassword, { 
                            render: resultApi.data.message || "Reset mật khẩu người dùng thất bại", 
                            type: "error", 
                            isLoading: false, 
                            autoClose: 3000 
                        })
                    }
                } catch(err) {
                    toast.update(ToastId.ResetPassword, { 
                        render: err.response.data.message || "Reset mật khẩu người dùng thất bại", 
                        type: "error", 
                        isLoading: false, 
                        autoClose: 3000 
                    })
                }
                setConfirmReset(false)
            }
            postData()
        }
    }, [confirmReset])

    return (
        <Modal centered className='reset-password-popup-modal' backdropClassName='reset-password-popup-backdrop-modal'
            show={context.openResetPassPopup} onHide={handleClosePopup}
        >
            <Modal.Header closeButton>
                <Modal.Title className='reset-password-popup-title'>Xác nhận</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Stack direction='column' spacing={2}>
                    <div>Reset password của user <strong>{user?.user_name || ''}</strong> về password:</div>
                    <FormControl variant="outlined" fullWidth>
                        <InputLabel htmlFor="outlined-adornment-password">Mật khẩu reset</InputLabel>
                        <OutlinedInput type={showPassword ? 'text' : 'password'}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                        edge="end"
                                    >
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            }
                            label='Mật khẩu reset'
                            sx={{fontFamily: 'IBM Plex Sans'}}
                            value={password}
                            onChange={handleChangePassword}                                
                        />
                    </FormControl>
                </Stack>
            </Modal.Body>
            <Modal.Footer>
                <Stack direction='row' spacing={1} marginTop={1}>
                    <Button variant='outlined' classes={{root: 'mui-cancel-button-root'}} onClick={handleClosePopup}>Hủy</Button>
                    <Button variant='contained' onClick={handleClickConfirmButton}>Đồng ý</Button>
                </Stack>
            </Modal.Footer>
        </Modal>
    )
}

export default ResetPasswordPopup