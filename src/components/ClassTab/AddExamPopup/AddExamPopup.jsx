import { useContext, useState } from 'react';
import { ClassContext } from '../../../context/ClassProvider';
import { Modal } from 'react-bootstrap';
import { Button, TextField } from '@mui/material';
import { useQueryParams, useSetQueryParams } from '../../../hook';
import { QUERY_PARAM_KEY, ROUTE_PATH } from '../../../config/routes.config';
import './AddExamPopup.scss';

const AddExamPopup = (props) => {
    const { className } = props
    const classContext = useContext(ClassContext)
    const queryParams = useQueryParams()
    const setQueryParams = useSetQueryParams()

    const [newExamName, setNewExamName] = useState('')
    const [newExamTime, setNewExamTime] = useState('')
    const [showWarningExamName, setShowWarningExamName] = useState(false)
    const [showWarningExamTime01, setShowWarningExamTime01] = useState(false)
    const [showWarningExamTime02, setShowWarningExamTime02] = useState(false)

    const handleOnKeyDownExamTime = (event) => {
        setShowWarningExamTime02(false)
        if ((event.keyCode < 48 || event.keyCode > 57) && ![8, 46].includes(event.keyCode)) {
            setShowWarningExamTime01(true)
            event.preventDefault()
        } else {
            setShowWarningExamTime01(false)
        }
    }

    const handleClosePopup = () => {
        classContext.setOpenAddExamPopup(false)
    }

    const handleChangeExamName = (event) => {
        setShowWarningExamName(false)
        setNewExamName(event.target.value)
    }

    const handleChangeExamTime = (event) => {
        setShowWarningExamTime02(false)
        setNewExamTime(event.target.value)
    }

    const handleClickNextButton = () => {
        if (!newExamName) {
            setShowWarningExamName(true)
        } else if (!newExamTime) {
            setShowWarningExamTime02(true)
        } else {
            setShowWarningExamName(false)
            setShowWarningExamTime02(false)

            setQueryParams(ROUTE_PATH.CLASS_EXAM, {
                ...queryParams,
                [QUERY_PARAM_KEY.CLASS_NAME]: className,
                [QUERY_PARAM_KEY.EXAM_ID]: 'create',
                [QUERY_PARAM_KEY.EXAM_NAME]: newExamName,
                [QUERY_PARAM_KEY.EXAM_TIME]: newExamTime,
            })
        } 
    }

    return (
        <Modal centered className='add-exam-popup-modal' backdropClassName='add-exam-popup-backdrop-modal'
            show={classContext.openAddExamPopup} onHide={handleClosePopup}
        >
            <Modal.Header closeButton>
                <Modal.Title className='add-exam-popup-title'>Tạo bài thi cho lớp học</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div>
                    <div className='add-exam-popup-text-field'>
                        <TextField variant="outlined" label='Tên bài thi' placeholder='Nhập tên bài thi' fullWidth
                            value={newExamName} onChange={handleChangeExamName} 
                        />
                        {showWarningExamName && (
                            <span className='add-exam-popup-warning'>Tên bài thi không được để trống!</span>
                        )}
                    </div>
                    <div className='add-exam-popup-text-field'>
                        <TextField variant="outlined" label='Thời gian làm bài (phút)' placeholder='Nhập thời gian làm bài (phút)' fullWidth 
                            value={newExamTime} onKeyDown={handleOnKeyDownExamTime} onChange={handleChangeExamTime}
                        />
                        {showWarningExamTime01 && (
                            <span className='add-exam-popup-warning'>Chỉ được nhập chữ số ở trường này!</span>
                        )}
                        {showWarningExamTime02 && (
                            <span className='add-exam-popup-warning'>Thời gian làm bài không được để trống!</span>
                        )}
                    </div>
                    <div className='d-flex flex-row-reverse mt-3'>
                        <Button variant='contained' className='add-exam-popup-cancel-button' onClick={handleClosePopup}>Hủy</Button>
                        <Button variant='contained' className='add-exam-popup-confirm-button' onClick={handleClickNextButton}>Tiếp theo</Button>
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    )
}

export default AddExamPopup