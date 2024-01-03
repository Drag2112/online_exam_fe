import { useContext, useState } from 'react';
import { AdminContext } from '../../../context/AdminProvider';
import { Modal } from 'react-bootstrap';
import { Button, IconButton } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import { InputAdornment, OutlinedInput } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { DefaultPassword } from '../../../config/app.config';
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

    return (
        <Modal centered className='reset-password-popup-modal' backdropClassName='reset-password-popup-backdrop-modal'
            show={context.openResetPassPopup} onHide={handleClosePopup}
        >
            <Modal.Header closeButton>
                <Modal.Title className='reset-password-popup-title'>Xác nhận</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div>
                    <div className='mb-3'>Reset password của user <strong>{user?.userName || ''}</strong> về password:</div>
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
                    <div className='d-flex flex-row-reverse mt-4'>
                        <Button variant='contained' className='reset-password-popup-cancel-button' onClick={handleClosePopup}>Hủy</Button>
                        <Button variant='contained' className='reset-password-popup-confirm-button' onClick={handleClickConfirmButton}>Đồng ý</Button>
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    )
}

export default ResetPasswordPopup