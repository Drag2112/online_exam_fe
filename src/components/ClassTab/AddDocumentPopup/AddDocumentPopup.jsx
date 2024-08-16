import { useContext, useEffect, useState } from 'react';
import { ClassContext } from '../../../context/ClassProvider';
import { Modal } from 'react-bootstrap';
import { Button, TextField } from '@mui/material';
import { API } from '../../../api/api';
import { toast } from 'react-toastify'; 
import { initToast, isValidURL } from '../../../utils/helper';
import { ToastId } from '../../../config/app.config';
import './AddDocumentPopup.scss';

const AddDocumentPopup = (props) => {
    const { classId, teacherId } = props
    const context = useContext(ClassContext)
    const [fileName, setFileName] = useState('')
    const [filePath, setFilePath] = useState('')
    const [warningMessage, setWarningMessage] = useState('')
    const [submit, setSubmit] = useState(false)

    const handleClosePopup = () => {
        setWarningMessage('')
        context.setOpenAddDocumentPopup(false)
    }

    const handleClickAddButton = () => {
        let arrField = []
        if (!fileName) {
            arrField.push('Tên tài liệu')
        }

        if (!filePath) {
            arrField.push('Link download')
        }

        if (arrField.length > 0) {
            setWarningMessage(`${arrField.join(', ')} không được để trống!`)
        } else {
            if (!isValidURL(filePath)) {
                setWarningMessage('Link download tài liệu không hợp lệ!')
            } else {
                setSubmit(true)
            }
        }
    }

    useEffect(() => {
        if (submit) {
            const postData = async () => {
                initToast(ToastId.AddDocument)
                try {
                    const resultApi = await API.classService.addClassDocument({ classId, teacherId, fileName, filePath })
                    if (resultApi && resultApi.data && resultApi.data.code === 0) {
                        context.setReloadDocument(prev => !prev)
                        context.setOpenAddDocumentPopup(false)
                        toast.update(ToastId.AddDocument, { 
                            render: "Thêm mới tài liệu thành công", 
                            type: "success", 
                            isLoading: false, 
                            autoClose: 2000 
                        })
                    } else {
                        toast.update(ToastId.AddDocument, { 
                            render: resultApi.data.message || "Thêm tài liệu thất bại", 
                            type: "error", 
                            isLoading: false, 
                            autoClose: 3000 
                        })
                    }
                } catch (err) {
                    toast.update(ToastId.AddDocument, { 
                        render: err.response.data.message || "Thêm tài liệu thất bại", 
                        type: "error", 
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
        <Modal centered className='add-document-popup-modal' backdropClassName='add-document-popup-backdrop-modal'
            show={context.openAddDocumentPopup} onHide={handleClosePopup}
        >
            <Modal.Header closeButton>
                <Modal.Title className='add-document-popup-title'>Thêm tài liệu cho lớp học</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div>
                    <div className='add-document-popup-text-field'>
                        <TextField variant="outlined" label='Tên tài liệu' placeholder='Nhập tên tài liệu' fullWidth 
                            value={fileName} onChange={(event) => setFileName(event.target.value)} onKeyDown={() => setWarningMessage('')}
                        />
                    </div>
                    <div className='add-document-popup-text-field'>
                        <TextField variant="outlined" label='Link download' placeholder='Nhập link download tài liệu' fullWidth 
                            value={filePath} onChange={(event) => setFilePath(event.target.value)} onKeyDown={() => setWarningMessage('')}
                        />
                    </div>
                    <div className='add-document-popup-text-field'>
                        <span className='add-document-popup-warning-message'>{warningMessage}</span>
                    </div>
                    <div className='d-flex flex-row-reverse mt-3'>
                        <Button variant='outlined' classes={{root: 'mui-cancel-button-root'}} className='add-document-popup-cancel-button' onClick={handleClosePopup}>Hủy</Button>
                        <Button variant='contained' className='add-document-popup-confirm-button' onClick={handleClickAddButton}>Thêm</Button>
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    )
}

export default AddDocumentPopup