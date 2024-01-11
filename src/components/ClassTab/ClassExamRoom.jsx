import { Box, Breadcrumbs, Button, Stack, TextField, Typography } from '@mui/material';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { Modal } from 'react-bootstrap';
import { useQueryParams, useSetQueryParams } from '../../hook';
import { useState, useContext, useEffect } from 'react';
import { ClassContext } from '../../context/ClassProvider';
import { QUERY_PARAM_KEY, ROUTE_PATH } from '../../config/routes.config';
import { getCountDownTime } from '../../utils/helper';
import QuestionItemRoom from './QuestionItemRoom/QuestionItemRoom';
import { API } from '../../api/api';
import { toast } from 'react-toastify'; 
import { initToast } from '../../utils/helper';
import { ExamRoomActionType, ToastId } from '../../config/app.config';
import moment from 'moment';
import './ClassExamRoom.scss';

const ClassExamRoom = () => {
    const queryParams = useQueryParams()
    const setQueryParams = useSetQueryParams()
    const context = useContext(ClassContext)

	const [remainSeconds, setRemainSeconds] = useState(Number(queryParams[QUERY_PARAM_KEY.EXAM_TIME] || 0) * 60) 
    const [remainTime, setRemainTime] = useState(getCountDownTime(Number(queryParams[QUERY_PARAM_KEY.EXAM_TIME] || 0) * 60))
    const [examDescription, setExamDescription] = useState('')
    const [score, setScore] = useState("0.00")
    const [startTime, setStartTime] = useState(moment().format('YYYY-MM-DD HH:mm:ss'))
    const [endTime, setEndTime] = useState(moment().format('YYYY-MM-DD HH:mm:ss'))
    const [submitExam, setSubmitExam] = useState(false)
    const [openPopup, setOpenPopup] = useState(false)
    
    const handleClickRouteClass = () => {
        if (queryParams[QUERY_PARAM_KEY.EXAM_ACTION_TYPE] === ExamRoomActionType.JOIN && !submitExam) {
            alert('Vui lòng submit kết quả làm bài trước khi thoát ra khỏi phòng thi!')
        } else {
            setQueryParams(ROUTE_PATH.CLASS, {})
        }
    }

    const handleClickRouteClassDetail = () => {
        if (queryParams[QUERY_PARAM_KEY.EXAM_ACTION_TYPE] === ExamRoomActionType.JOIN && !submitExam) {
            alert('Vui lòng submit kết quả làm bài trước khi thoát ra khỏi phòng thi!')
        } else {
            setQueryParams(ROUTE_PATH.CLASS_DETAIL, {
                [QUERY_PARAM_KEY.CLASS_ID]: queryParams[QUERY_PARAM_KEY.CLASS_ID]
            })
        }
    }

    const handleSubmitExamResult = () => {
        setEndTime(moment().format('YYYY-MM-DD HH:mm:ss'))
        setSubmitExam(true)
    }

    const handleClosePopup = () => setOpenPopup(false)

    // Show cảnh báo cho người dùng về các thay đổi có thể không được lưu nếu reload/tắt trang
    window.addEventListener('beforeunload', (event) => {
        event.preventDefault()
        event.returnValue = ''
    })

    // Đếm ngược thời gian làm bài thi
    useEffect(() => {
        const countdownInterval = setInterval(() => {
            let _remainSeconds = remainSeconds - 1
            setRemainSeconds(_remainSeconds)
            setRemainTime(getCountDownTime(_remainSeconds))
        }, 1000)
    
        // Dừng đồng hồ khi hết thời gian hoặc bài thi đã được submit kết quả
        if (remainSeconds === 0 || submitExam) {
          clearInterval(countdownInterval)
        }

        // Tự động submit bài thi khi hết giờ
        if (remainSeconds === 0) {
            handleSubmitExamResult()
        }
    
        return () => {
            clearInterval(countdownInterval)
        }
    }, [remainSeconds])

    // Tải thông tin đề thi từ backend
    useEffect(() => {
        const fetchData = async () => {
            const resultApi = await API.classService.getExamInforByStudent({ 
                examId: Number(queryParams[QUERY_PARAM_KEY.EXAM_ID] || 0),
                classId: Number(queryParams[QUERY_PARAM_KEY.CLASS_ID] || 0),
                actionType: queryParams[QUERY_PARAM_KEY.EXAM_ACTION_TYPE]
            })

            if (resultApi && resultApi.data && resultApi.data.data) {
                const examInfor = resultApi.data.data
                setExamDescription(examInfor.description || 'Học viên vui lòng submit bài thi trước khi thoát ra khỏi màn hình thi.')
                setScore(examInfor.score)
                context.setQuestions(examInfor.questions)
            }
        }
        fetchData()
    }, [queryParams[QUERY_PARAM_KEY.EXAM_ACTION_TYPE]])

    useEffect(() => {
        if (submitExam) {
            const postData = async () => {
                initToast(ToastId.SubmitExam)
                try {
                    const resultApi = await API.classService.submitExamResult({
                        examId: Number(queryParams[QUERY_PARAM_KEY.EXAM_ID] || 0),
                        startTime: startTime,
                        endTime: endTime,
                        questionResults: context.questions
                    })
        
                    if (resultApi && resultApi.data && resultApi.data.code === 0) {
                        setScore(resultApi.data.data.score)
                        setQueryParams(ROUTE_PATH.CLASS_EXAM_ROOM, {
                            ...queryParams,
                            [QUERY_PARAM_KEY.EXAM_ACTION_TYPE]: ExamRoomActionType.VIEW
                        })
                        setOpenPopup(true)
                        toast.update(ToastId.SubmitExam, { 
                            render: 'Submit kết quả thi thành công',
                            type: "success", 
                            isLoading: false, 
                            autoClose: 2000 
                        })
                    } else {
                        toast.update(ToastId.SubmitExam, { 
                            render: resultApi.data.message || 'Submit kết quả thi thất bại',
                            type: "error", 
                            isLoading: false, 
                            autoClose: 3000 
                        })
                    }
                } catch (err) {
                    toast.update(ToastId.SubmitExam, { 
                        render: err.response.data.message || 'Submit kết quả thi thất bại',
                        type: "error", 
                        isLoading: false, 
                        autoClose: 3000 
                    })
                }
            }
            postData()
        }
    }, [submitExam])

    return (
        <div className='class-exam-room-container-0'>
            <div className='class-exam-room-container-1'>
                <Stack spacing={2}>
                    <Breadcrumbs aria-label='breadcrumb' classes={{li: 'class-exam-room-breadcrum-li'}} separator={<NavigateNextIcon fontSize='small' sx={{color: '#376fd0'}} />}>
                        <Typography key='1' classes={{root: 'class-exam-room-typography-root-01'}} onClick={handleClickRouteClass}>Danh sách lớp học</Typography>
                        <Typography key='2' classes={{root: 'class-exam-room-typography-root-01'}} onClick={handleClickRouteClassDetail}>{queryParams[QUERY_PARAM_KEY.CLASS_NAME]}</Typography>
                        <Typography key='3' classes={{root: 'class-exam-room-typography-root-02'}}>{queryParams[QUERY_PARAM_KEY.EXAM_NAME]}</Typography>
                    </Breadcrumbs>
                </Stack>
            </div>
            <div className='class-exam-room-container-2'>
                <Stack direction='row' spacing={3} marginBottom={2}>
                    <TextField variant='outlined' label='Mô tả' fullWidth disabled multiline rows={4} value={examDescription} 
                        InputProps={{
                            classes: {
                                notchedOutline: 'class-exam-room-input-props-notched-outline',
                            }
                        }}
                        InputLabelProps={{
                            classes: {
                                root: 'class-exam-room-input-label-props-root',
                            }
                        }}
                    />
                    <Stack direction='column' spacing={2} width='40%' minWidth='300px'>
                        <Stack direction='row' spacing={2}>
                            <TextField variant='outlined' label='Số lượng câu hỏi' fullWidth value={context.questions.length} disabled
                                InputProps={{
                                    classes: {
                                        notchedOutline: 'class-exam-room-input-props-notched-outline',
                                        input: 'class-exam-room-input-props-input'
                                    }
                                }}
                                InputLabelProps={{
                                    classes: {
                                        root: 'class-exam-room-input-label-props-root'
                                    }
                                }}
                            />
                            {queryParams[QUERY_PARAM_KEY.EXAM_ACTION_TYPE] === ExamRoomActionType.JOIN && !submitExam ?
                                <TextField variant='outlined' label='Thời gian còn lại' fullWidth value={remainTime} disabled 
                                    InputProps={{
                                        classes: {
                                            notchedOutline: 'class-exam-room-input-props-notched-outline',
                                            input: 'class-exam-room-input-props-input'
                                        }
                                    }}
                                    InputLabelProps={{
                                        classes: {
                                            root: 'class-exam-room-input-label-props-root',
                                        }
                                    }}
                                /> :
                                <TextField variant='outlined' label='Điểm số' fullWidth value={Number(score).toFixed(2)} disabled 
                                    InputProps={{
                                        classes: {
                                            notchedOutline: 'class-exam-room-input-props-notched-outline',
                                            input: 'class-exam-room-input-props-input'
                                        }
                                    }}
                                    InputLabelProps={{
                                        classes: {
                                            root: 'class-exam-room-input-label-props-root',
                                        }
                                    }}
                                />
                            }
                        </Stack> 
                        <hr className='class-exam-room-divider'/>
                        <Stack direction='row' spacing={2}>
                            <Button variant="contained" fullWidth classes={{root: 'class-exam-room-btn-root'}} onClick={handleSubmitExamResult}
                                disabled={queryParams[QUERY_PARAM_KEY.EXAM_ACTION_TYPE] === ExamRoomActionType.VIEW || (queryParams[QUERY_PARAM_KEY.EXAM_ACTION_TYPE] === ExamRoomActionType.JOIN && submitExam)}
                            >
                                Submit kết quả
                            </Button>
                            <Button variant="contained" fullWidth classes={{root: 'class-exam-room-btn-root'}} onClick={handleClickRouteClassDetail}>Trở về</Button>
                        </Stack>
                    </Stack>
                </Stack>
                <Box sx={{border: '1px solid #1976d2', borderRadius: '6px', padding: '15px', marginBottom: 4, overflow: 'auto', maxHeight: '560px'}}>
                    {context.questions.map((question) => (
                        <QuestionItemRoom actionType={queryParams[QUERY_PARAM_KEY.EXAM_ACTION_TYPE]} questionNumber={question.questionNumber} questionType={question.questionType}
                            questionContent={question.questionContent} results={question.results} 
                        />
                    ))}
                </Box>
            </div>
            <Modal centered className='class-exam-room-popup-modal' backdropClassName='class-exam-room-popup-backdrop-modal'
                show={openPopup} onHide={handleClosePopup}
            >
                <Modal.Header closeButton>
                    <Modal.Title className='class-exam-room-popup-title'>Thông báo</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Stack direction='column'>
                        <Typography>Thời gian làm bài đã hết!</Typography>
                        <div className='d-flex flex-row-reverse mt-3'>
                            <Button variant='contained' className='class-exam-room-popup-ok-button' onClick={handleClosePopup}>Ok</Button>
                        </div>
                    </Stack>
                </Modal.Body>
            </Modal>
        </div>
    )
}

export default ClassExamRoom