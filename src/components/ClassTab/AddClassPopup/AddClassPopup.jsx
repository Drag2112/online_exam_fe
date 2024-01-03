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
import { useContext, useEffect, useState } from 'react';
import { ClassContext } from '../../../context/ClassProvider';
import { toast } from 'react-toastify'; 
import { initToast } from '../../../utils/helper';
import { ToastId } from '../../../config/app.config';
import API from '../../../api/api';
import './AddClassPopup.scss'


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


const AddClassPopup = (props) => {
    const { setRefreshDataTable } = props
    const [teachers, setTeachers] = useState([])
    const [classBody, setClassBody] = useState({
        classCode: '',
        className: '',
        teacherId: '',
        description: ''
    })
    const [submit, setSubmit] = useState(false)

    const handleChangeTeacher = (event) => {
        setClassBody(prev => ({...prev, teacherId: event.target.value}))
    }

    const handleChangeValueClass = (paramName, value) => {
        setClassBody(prev => ({...prev, [paramName]: value}))
    }

    const context = useContext(ClassContext)
    const handleClose = () => context.setOpenAddClassPopup(false)

    const handleSubmitButton = () => {
        setSubmit(true)
    }

    useEffect(() => {
        const fetchMasterData = async () => {
            const resultApi = await API.userService.getAllTeachers()
            if (resultApi && resultApi.data && resultApi.data.data) {
                setTeachers(resultApi.data.data)
            }
        }
        fetchMasterData()
    }, [])

    useEffect(() => {
        if (submit) {
            const postClassData = async () => {
                initToast(ToastId.CreateClass)
                try {
                    const resultApi = await API.classService.createNewClass(classBody)
                    if (resultApi && resultApi.data && resultApi.data.code === 0) {
                        setRefreshDataTable(true)
                        toast.update(ToastId.CreateClass, { 
                            render: "Tạo mới lớp học thành công", 
                            type: "success", 
                            isLoading: false, 
                            autoClose: 2000 
                        })
                    } else {
                        toast.update(ToastId.CreateClass, { 
                            render: resultApi.data.message || "Tạo lớp học thất bại", 
                            type: "error", 
                            isLoading: false, 
                            autoClose: 3000 
                        })
                    }
                } catch(err) {
                    toast.update(ToastId.CreateClass, { 
                        render: err.response.data.message || "Tạo lớp học thất bại", 
                        type: "error", 
                        isLoading: false, 
                        autoClose: 3000 
                    })
                }
                setSubmit(false)
            }
            postClassData()
        }
    }, [submit])

    return (
        <div>
            <Modal 
                open={context.openAddClassPopup} onClose={handleClose} 
                aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description"
                className='add-new-class-popup'
            >
                <Box sx={modalStyle}>
                    <div className='add-new-class-popup-header'>
                        <div className='add-new-class-popup-header-title'>Tạo lớp học mới</div>
                        <IconButton size='medium' onClick={handleClose}>
                            <CloseIcon />
                        </IconButton>
                    </div>
                    <div className='add-new-class-popup-body'>
                        <div className='add-new-class-popup-body-text-field'>
                            <TextField  variant="outlined" label='Mã lớp' placeholder='Nhập mã lớp' fullWidth 
                                value={classBody.classCode} onChange={(event) => handleChangeValueClass('classCode', event.target.value)}
                            />
                        </div>
                        <div className='add-new-class-popup-body-text-field'>
                            <TextField  variant="outlined" label='Tên lớp' placeholder='Nhập tên lớp' fullWidth 
                                value={classBody.className} onChange={(event) => handleChangeValueClass('className', event.target.value)}
                            />
                        </div>
                        <div className='add-new-class-popup-body-text-field'>
                            <FormControl fullWidth>
                                <InputLabel>Giáo viên phụ trách</InputLabel>
                                <Select label='Giáo viên phụ trách' value={classBody.teacherId} onChange={handleChangeTeacher}>
                                    {teachers.map(teacher => (
                                        <MenuItem value={teacher.user_id}>{`${teacher.full_name} (${teacher.user_name})`}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </div>
                        <div className='add-new-class-popup-body-text-field'>
                            <TextField  variant="outlined" label='Mô tả' placeholder='Nhập mô tả về lớp ...' fullWidth multiline rows={5}
                                value={classBody.description} onChange={(event) => handleChangeValueClass('description', event.target.value)}
                            />
                        </div>
                        <Button variant="contained" fullWidth className='add-new-class-popup-body-confirm-btn'
                            onClick={handleSubmitButton}
                        >
                            Xác nhận
                        </Button>
                    </div>
                </Box>
            </Modal>
        </div>
    )
}

export default AddClassPopup