import './SelectExamSource.scss'
import { Modal } from 'react-bootstrap'
import { ClassContext } from '../../../context/ClassProvider'
import { AppContext } from '../../../context/AppProvider'
import { useContext, useRef, useState } from 'react'
import { Button, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from '@mui/material'

const SelectExamSource = () => {
    const classContext = useContext(ClassContext)
    const appContext = useContext(AppContext)

    const EXAM_SOURCE = useRef({
        EXAM_STORAGE: 1,
        CREATE_NEW: 2
    })

    const [examSourceSelected, setExamSourceSelected] = useState(EXAM_SOURCE.current.CREATE_NEW)

    const onChangeExamSource = (event) => setExamSourceSelected(Number(event.target.value))

    const handleClosePopup = () => classContext.setOpenSelectExamSourcePopup(false)
    const handleClickNextButton = () => {
        classContext.setOpenSelectExamSourcePopup(false)
        if (examSourceSelected === EXAM_SOURCE.current.CREATE_NEW) {
            appContext.setOpenAddExamPopup(true)
        } else {
            classContext.setOpenAddExistExamPopup(true)
        }
    }

    return (
        <Modal centered className='add-exam-popup-modal' backdropClassName='add-exam-popup-backdrop-modal'
            show={classContext.openSelectExamSourcePopup} onHide={handleClosePopup}
        >
            <Modal.Header closeButton>
                <Modal.Title className='add-exam-popup-title'>Tạo đề thi cho lớp học</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div>
                    <FormControl>
                        <FormLabel>Chọn nguồn đề</FormLabel>
                        <RadioGroup row value={examSourceSelected} onChange={onChangeExamSource}
                        >
                            <FormControlLabel value={EXAM_SOURCE.current.CREATE_NEW} control={<Radio />} label="Tạo đề thi mới" sx={{marginRight: 1}}/>
                            <FormControlLabel value={EXAM_SOURCE.current.EXAM_STORAGE} control={<Radio />} label="Lấy đề từ kho đề thi có sẵn" sx={{marginLeft: 1}}/>     
                        </RadioGroup>
                    </FormControl>
                    <div className='d-flex flex-row justify-content-end mt-3'>
                        <Button variant='contained' className='add-exam-popup-cancel-button' onClick={handleClosePopup}>Hủy</Button>
                        <Button variant='contained' className='add-exam-popup-confirm-button' onClick={handleClickNextButton}>Tiếp theo</Button>
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    )
}

export default SelectExamSource