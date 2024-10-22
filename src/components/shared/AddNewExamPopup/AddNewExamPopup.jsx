import './AddNewExamPopup.scss';
import { useContext, useState } from 'react';
import { AppContext } from '../../../context/AppProvider';
import { ClassContext } from '../../../context/ClassProvider';
import { Modal } from 'react-bootstrap';
import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { useQueryParams, useSetQueryParams } from '../../../hook';
import { QUERY_PARAM_KEY, ROUTE_PATH } from '../../../config/routes.config';
import { AddExamPopupLocation, MenuSelectSize } from '../../../config/app.config';

const AddNewExamPopup = (props) => {
    const { className, subjectOfClass, location, subjects } = props
    const appContext = useContext(AppContext)
    const classContext = useContext(ClassContext)
    const queryParams = useQueryParams()
    const setQueryParams = useSetQueryParams()

    const [subjectId, setSubjectId] = useState(null)
    const [newExamName, setNewExamName] = useState('')
    const [newExamTime, setNewExamTime] = useState('')
    const [showWarningSubjectName, setShowWarningSubjectName] = useState(false)
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
        appContext.setOpenAddExamPopup(false)
    }

    const handleBackPopup = () => {
        appContext.setOpenAddExamPopup(false)
        classContext.setOpenSelectExamSourcePopup(true)
    }

    const handleChangeSubjectName = (event) => {
        setShowWarningSubjectName(false)
        setSubjectId(event.target.value)
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
        if (location === AddExamPopupLocation.EXAM_MANAGEMENT_PAGE && !subjectId) {
            setShowWarningSubjectName(true)
        } else if (!newExamName) {
            setShowWarningExamName(true)
        } else if (!newExamTime) {
            setShowWarningExamTime02(true)
        } else {
            setShowWarningSubjectName(false)
            setShowWarningExamName(false)
            setShowWarningExamTime02(false)
            
            if (location === AddExamPopupLocation.CLASS_DETAIL_PAGE && className) {
                setQueryParams(ROUTE_PATH.CLASS_EXAM, {
                    ...queryParams,
                    [QUERY_PARAM_KEY.CLASS_NAME]: className,
                    [QUERY_PARAM_KEY.EXAM_ID]: 'create',
                    [QUERY_PARAM_KEY.EXAM_NAME]: newExamName,
                    [QUERY_PARAM_KEY.EXAM_TIME]: newExamTime,
                })
            } else {
                
            }
        } 
    }

    

    return (
        <Modal centered className='add-exam-popup-modal' backdropClassName='add-exam-popup-backdrop-modal'
            show={appContext.openAddExamPopup} onHide={handleClosePopup}
        >
            <Modal.Header closeButton>
                <Modal.Title className='add-exam-popup-title'>Tạo đề thi {location === AddExamPopupLocation.CLASS_DETAIL_PAGE ? 'cho lớp học' : ''}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div>
                    {location === AddExamPopupLocation.CLASS_DETAIL_PAGE && subjectOfClass && (
                        <div className='add-exam-popup-text-field'>
                            <TextField variant='outlined' label='Tên môn học' fullWidth value={subjectOfClass.subjectName}/>
                        </div>
                    )}
                    {location === AddExamPopupLocation.EXAM_MANAGEMENT_PAGE && subjects && Array.isArray(subjects) && (
                        <div className='add-exam-popup-text-field'>
                            <FormControl fullWidth>
                                <InputLabel>Chọn môn học</InputLabel>
                                <Select value={subjectId} label='Chọn môn học' onChange={handleChangeSubjectName}
                                    MenuProps={{
                                        classes: { root: 'add-exam-popup-subject-menu-root'},
                                        PaperProps: {
                                            style: {
                                              maxHeight: MenuSelectSize.ITEM_HEIGHT * 4.5 + MenuSelectSize.ITEM_PADDING_TOP,
                                            },
                                        },
                                    }}
                                >
                                {subjects.map(subject => (
                                    <MenuItem value={subject.subjectId}>
                                        {subject.subjectName}
                                    </MenuItem>
                                ))} 
                                </Select>
                            </FormControl>
                            {showWarningSubjectName && (
                                <span className='add-exam-popup-warning'>Tên môn học không được để trống!</span>
                            )}
                        </div>
                    )}
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
                    <div className='d-flex flex-row justify-content-end mt-3'>
                        {location === AddExamPopupLocation.EXAM_MANAGEMENT_PAGE && (
                            <Button variant='contained' className='add-exam-popup-cancel-button' onClick={handleClosePopup}>Hủy</Button>
                        )}
                        {location === AddExamPopupLocation.CLASS_DETAIL_PAGE && (
                            <Button variant='contained' className='add-exam-popup-cancel-button' onClick={handleBackPopup}>Quay lại</Button>
                        )}
                        <Button variant='contained' className='add-exam-popup-confirm-button' onClick={handleClickNextButton}>Tiếp theo</Button>
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    )
}

export default AddNewExamPopup