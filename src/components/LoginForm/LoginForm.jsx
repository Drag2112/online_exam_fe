import './LoginForm.scss';
import Modal from 'react-bootstrap/Modal';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ROUTE_PATH } from '../../config/routes.config';
import { FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { jwtDecode } from 'jwt-decode';
import { LOCAL_STORAGE_KEY } from '../../config/memory.config';
import { ToastId } from '../../config/app.config';
import { initToast } from '../../utils/helper';
import { API } from '../../api/api';
import { toast } from 'react-toastify';


const LoginForm = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [showWarningUsername, setShowWarningUsername] = useState(false)
    const [showWarningPassword, setShowWarningPassword] = useState(false)
    const [submit, setSubmit] = useState(false)

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault()
    }

    const handleChangeUsername = (event) => {
        setUsername(event.target.value)
        if (event.target.value) {
            setShowWarningUsername(false)
        }
    }

    const handleChangePassword = (event) => {
        setPassword(event.target.value)
        if (event.target.value) {
            setShowWarningPassword(false)
        }
    }

    const handlePressEnter = (event) => {
        if (event.code === 'Enter') {
            handleLoginBtn()
        }
    }

    const navigate = useNavigate()
    const handleLoginBtn = () => {
        if (!username) {
            setShowWarningUsername(true)
        }

        if (!password) {
            setShowWarningPassword(true)
        }

        if (username && password) {
            setSubmit(true)
        }
    }

    useEffect(() => {
        if (submit) {
            const postData = async () => {
                initToast(ToastId.Login)
                try {
                    const resultApi = await API.authenticationService.login({ username, password })
                    if (resultApi && resultApi.data && resultApi.data.data) {
                        const accessToken = resultApi.data.data.accessToken
                        const decodedResult = jwtDecode(accessToken)
                        localStorage.setItem(LOCAL_STORAGE_KEY.USER_ID, decodedResult?.userId?.toString())
                        localStorage.setItem(LOCAL_STORAGE_KEY.USER_NAME, decodedResult?.userName?.toString())
                        localStorage.setItem(LOCAL_STORAGE_KEY.FULL_NAME, decodedResult?.fullName?.toString())
                        localStorage.setItem(LOCAL_STORAGE_KEY.EMAIL, decodedResult?.email?.toString())
                        localStorage.setItem(LOCAL_STORAGE_KEY.FUNCTION_CODES, decodedResult?.functionCodes?.join(';'))
                        localStorage.setItem(LOCAL_STORAGE_KEY.ACCESS_TOKEN, accessToken)

                        navigate(ROUTE_PATH.DASHBOARD)
                        toast.update(ToastId.Login, { 
                            render: 'Đăng nhập thành công', 
                            type: 'success', 
                            isLoading: false, 
                            autoClose: 2000,
                        })
                    } else {
                        toast.update(ToastId.Login, { 
                            render: resultApi.data.message || 'Đăng nhập thất bại', 
                            type: 'error', 
                            isLoading: false, 
                            autoClose: 2000 
                        })
                    }
                } catch (err) {
                    toast.update(ToastId.Login, { 
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
            <Modal show={true} centered>
                <Modal.Body as='div'>
                    <div className='login-form-container'>
                        <div className='login-form-title'>Đăng nhập</div>
                        <div className='login-form-text-field'>
                            <TextField className='mui-text-field-custom' variant="outlined" label='Tên đăng nhập' fullWidth
                                value={username} onChange={handleChangeUsername} onKeyDown={handlePressEnter}
                            />
                            {showWarningUsername && (
                                <div className='login-form-text-field-warning'>Tên đăng nhập không được để trống!</div>
                            )}
                        </div>
                        <div className='login-form-text-field'>
                            <FormControl variant="outlined" fullWidth>
                                <InputLabel htmlFor="outlined-adornment-password">Mật khẩu</InputLabel>
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
                                    label='Mật khẩu'
                                    sx={{fontFamily: 'IBM Plex Sans'}}
                                    value={password}
                                    onChange={handleChangePassword}
                                    onKeyDown={handlePressEnter}                          
                                />
                            </FormControl>
                            {showWarningPassword && (
                                <div className='login-form-text-field-warning'>Mật khẩu không được để trống!</div>
                            )}
                        </div>
                        <Button variant="contained" fullWidth className='login-form-login-btn' onClick={handleLoginBtn}>Đăng nhập</Button>
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    )
}

export default LoginForm;