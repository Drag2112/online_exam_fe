import './AddExistExam.scss'
import { ClassContext } from '../../../context/ClassProvider'
import { Typography } from '@mui/material'
import { Modal } from 'react-bootstrap'
import { useContext } from 'react'

const AddExistExam = () => {
    const classContext = useContext(ClassContext)

    const handleClosePopup = () => classContext.setOpenAddExistExamPopup(false)

    return (
        <Modal centered className='add-exam-popup-modal' backdropClassName='add-exam-popup-backdrop-modal'
            show={classContext.openAddExistExamPopup} onHide={handleClosePopup}
        >
            <Modal.Header closeButton>
                <Modal.Title className='add-exam-popup-title'>Tạo đề thi cho lớp học</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div>
                    <Typography>Chọn đề thi từ kho đề</Typography>


                </div>
            </Modal.Body>
        </Modal>
    )
}

export default AddExistExam