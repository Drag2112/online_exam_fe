import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { IconButton } from '@mui/material';
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
import { useContext, useState } from 'react';
import { AdminContext } from '../../../context/AdminProvider';
import dayjs from 'dayjs';
import moment from 'moment';
import './EditUserPopup.scss'

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
    const { user } = props
    const [role, setRole] = useState('')

    const handleChangeRole = (event) => {
        setRole(event.target.value);
    }

    const handleClose = () => context.setOpenEditUserPopup(false)

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
                                fullWidth disabled value={user?.userName || ''}
                            />
                        </div>
                        <div className='add-new-user-popup-body-text-field'>
                            <TextField  variant="outlined" label='Họ tên'
                                placeholder='Nhập họ tên' fullWidth 
                            />
                        </div>
                        <div className='add-new-user-popup-body-text-field'>
                            <FormControl fullWidth>
                                <InputLabel>Role</InputLabel>
                                <Select label='Role' value={role} onChange={handleChangeRole}>
                                    <MenuItem value={1}>Quản trị viên</MenuItem>
                                    <MenuItem value={2}>Giáo viên</MenuItem>
                                    <MenuItem value={3}>Học viên</MenuItem>
                                </Select>
                            </FormControl>
                        </div>
                        <div className='d-flex flex-row add-new-user-popup-body-text-field'>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DemoContainer components={['DatePicker']} >
                                    <DemoItem>
                                        <DatePicker label='Ngày sinh' format='DD-MM-YYYY' className='add-user-popup-date-picker'
                                            value={dayjs(moment().format('YYYY-MM-DD'))}
                                        />
                                    </DemoItem>
                                </DemoContainer>
                            </LocalizationProvider>
                            <FormControlLabel control={<Radio />} labelPlacement='start' label='Nam' value='male' />
                            <FormControlLabel control={<Radio />} labelPlacement='start' label='Nữ' value='female' />
                        </div>
                        <div className='add-new-user-popup-body-text-field'>
                            <TextField  variant="outlined" label='Email'
                                placeholder='Nhập email' fullWidth 
                            />
                        </div>
                        <div className='add-new-user-popup-body-text-field'>
                            <TextField  variant="outlined" label='SĐT'
                                placeholder='Nhập SĐT' fullWidth 
                            />
                        </div>
                        <div className='add-new-user-popup-body-text-field'>
                            <TextField  variant="outlined" label='Địa chỉ'
                                placeholder='Nhập địa chỉ' fullWidth 
                            />
                        </div>
                        <Button variant="contained" fullWidth className='add-new-user-popup-body-confirm-btn'>Xác nhận</Button>
                    </div>
                </Box>
            </Modal>
        </div>
    )
}

export default EditUserPopup