import { useContext } from 'react';
import { ClassContext } from '../../../context/ClassProvider';
import { Modal } from 'react-bootstrap';
import { Button, TextField } from '@mui/material';
import './AddDocumentPopup.scss'

const AddDocumentPopup = () => {
    const context = useContext(ClassContext)

    const handleClosePopup = () => {
        context.setOpenAddDocumentPopup(false)
    }

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
                        <TextField variant="outlined" label='Tên tài liệu' placeholder='Nhập tên tài liệu' fullWidth />
                    </div>
                    <div className='add-document-popup-text-field'>
                        <TextField variant="outlined" label='Link download' placeholder='Nhập link download tài liệu' fullWidth />
                    </div>
                    <div className='d-flex flex-row-reverse mt-3'>
                        <Button variant='contained' className='add-document-popup-cancel-button' onClick={handleClosePopup}>Hủy</Button>
                        <Button variant='contained' className='add-document-popup-confirm-button' onClick={handleClosePopup}>Thêm</Button>
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    )
}

export default AddDocumentPopup