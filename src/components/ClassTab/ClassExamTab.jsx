import Breadcrumbs from '@mui/material/Breadcrumbs';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { TextField, Tooltip, IconButton } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import SaveAsIcon from '@mui/icons-material/SaveAs';
import PublishIcon from '@mui/icons-material/Publish';
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import QuestionItem from './QuestionItem/QuestionItem';
import { useQueryParams, useSetQueryParams } from '../../hook';
import { QUERY_PARAM_KEY, ROUTE_PATH } from '../../config/routes.config';
import { LOCAL_STORAGE_KEY } from '../../config/memory.config';
import { useState, useContext, useEffect } from 'react';
import { ClassContext } from '../../context/ClassProvider';
import QuestionItemAddPopup from './QuestionItemPopup/QuestionItemAddPopup';
import QuestionItemEditPopup from './QuestionItemPopup/QuestionItemEditPopup';
import { API } from '../../api/api';
import { toast } from 'react-toastify'; 
import { initToast } from '../../utils/helper';
import { ToastId } from '../../config/app.config';
import './ClassExamTab.scss';

const ClassExamTab = () => {
    const queryParams = useQueryParams()
    const setQueryParams = useSetQueryParams()
    const context = useContext(ClassContext)

    const [examId, setExamId] = useState(queryParams[QUERY_PARAM_KEY.EXAM_ID])
    const [publishExam, setPublishExam] = useState(false)
    const [saveSuccess, setSaveSuccess] = useState(false)
    const [submit, setSubmit] = useState(false)

    const [examDescription, setExamDescription] = useState('')

    const handleClickRouteClass = () => {
        if (!saveSuccess && (examDescription || context.questions.length > 0)) {
            if (window.confirm('Các thay đổi bạn đã thực hiện có thể không được lưu.\nBạn có muốn tiếp tục?')) {
                setQueryParams(ROUTE_PATH.CLASS, {})
            }
        } else {
            setQueryParams(ROUTE_PATH.CLASS, {})
        }
    }

    const handleClickRouteClassDetail = () => {
        if (!saveSuccess && (examDescription || context.questions.length > 0)) {
            if (window.confirm('Các thay đổi bạn đã thực hiện có thể không được lưu.\nBạn có muốn tiếp tục?')) {
                setQueryParams(ROUTE_PATH.CLASS_DETAIL, {
                    [QUERY_PARAM_KEY.CLASS_ID]: queryParams[QUERY_PARAM_KEY.CLASS_ID]
                })
            }
        } else {
            setQueryParams(ROUTE_PATH.CLASS_DETAIL, {
                [QUERY_PARAM_KEY.CLASS_ID]: queryParams[QUERY_PARAM_KEY.CLASS_ID]
            })
        }
    }

    const handleChangeExamDescription = (event) => {
        setExamDescription(event.target.value)
    }

    const handleClickAddQuestion = () => {
        context.setOpenQuestionAddPopup(true)
    }

    const handleClickSaveExamButton = () => {
        setSubmit(true)
    }

    const handleClickSaveAndPublishExamButton = () => {
        setPublishExam(true)
        setSubmit(true)
    }

    const handleClickReturnButton = () => {
        if (!saveSuccess && (examDescription || context.questions.length > 0)) {
            if (window.confirm('Các thay đổi bạn đã thực hiện có thể không được lưu.\nBạn có muốn tiếp tục?')) {
                setQueryParams(ROUTE_PATH.CLASS_DETAIL, {
                    [QUERY_PARAM_KEY.CLASS_ID]: queryParams[QUERY_PARAM_KEY.CLASS_ID]
                })
            }
        } else {
            setSaveSuccess(false)
            setQueryParams(ROUTE_PATH.CLASS_DETAIL, {
                [QUERY_PARAM_KEY.CLASS_ID]: queryParams[QUERY_PARAM_KEY.CLASS_ID]
            })
        }
    }

    // Show cảnh báo cho người dùng về các thay đổi có thể không được lưu nếu reload/tắt trang
    window.addEventListener('beforeunload', (event) => {
        if (examDescription || context.questions.length > 0) {
            event.preventDefault()
            event.returnValue = ''
        }
    })

    // Lấy thông tin về bài thi đã tạo
    useEffect(() => {
        if (examId !== 'create') {
            const fetchData = async () => {
                const resultApi = await API.classService.getExamInfor({ 
                    examId: Number(examId), 
                    classId: Number(queryParams[QUERY_PARAM_KEY.CLASS_ID] || 0),
                })

                if (resultApi && resultApi.data && resultApi.data.data) {
                    const examInfor = resultApi.data.data
                    setPublishExam(examInfor.publish)
                    setExamDescription(examInfor.description)
                    context.setQuestions(examInfor.questions)
                }
            }
            fetchData()
        }
    }, [examId])

    // Tạo mới/chỉnh sửa thông tin bài thi
    useEffect(() => {
        if (submit) {
            const postData = async () => {
                initToast(ToastId.CreateExam)
                try {
                    const examInfor = {
                        classId: Number(queryParams[QUERY_PARAM_KEY.CLASS_ID] || 0),
                        teacherId: Number(localStorage.getItem(LOCAL_STORAGE_KEY.USER_ID) || 0),
                        examName: queryParams[QUERY_PARAM_KEY.EXAM_NAME],
                        description: examDescription,
                        totalMinutes: Number(queryParams[QUERY_PARAM_KEY.EXAM_TIME] || 0),
                        publish: publishExam,
                        questions: context.questions,
                    }

                    let resultApi = null
                    if (examId === 'create') {
                        resultApi = await API.classService.createExam(examInfor)
                    } else {
                        examInfor.examId = Number(examId)
                        resultApi = await API.classService.updateExam(examInfor)
                    }

                    if (resultApi && resultApi.data && resultApi.data.code === 0) {
                        setExamId(resultApi.data.data)
                        setSaveSuccess(true)
                        toast.update(ToastId.CreateExam, { 
                            render: `Lưu${publishExam ? ' và công bố ' : ' '}bài thi thành công`, 
                            type: "success", 
                            isLoading: false, 
                            autoClose: 2000 
                        })
                    } else {
                        toast.update(ToastId.CreateExam, { 
                            render: resultApi.data.message || `Lưu${publishExam ? ' và công bố ' : ' '}bài thi thất bại`, 
                            type: "error", 
                            isLoading: false, 
                            autoClose: 3000 
                        })
                    }
                } catch (err) {
                    toast.update(ToastId.CreateExam, { 
                        render: err.response.data.message || `Lưu${publishExam ? ' và công bố ' : ' '}bài thi thất bại`, 
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
        <div className='class-exam-container-0'>
            <div className='class-exam-container-1'>
                <Stack spacing={2}>
                    <Breadcrumbs aria-label='breadcrumb' classes={{li: 'class-exam-breadcrum-li'}} separator={<NavigateNextIcon fontSize='small' sx={{color: '#376fd0'}} />}>
                        <Typography key='1' classes={{root: 'class-exam-typography-root-01'}} onClick={handleClickRouteClass}>Danh sách lớp học</Typography>
                        <Typography key='2' classes={{root: 'class-exam-typography-root-01'}} onClick={handleClickRouteClassDetail}>{queryParams[QUERY_PARAM_KEY.CLASS_NAME]}</Typography>
                        <Typography key='3' classes={{root: 'class-exam-typography-root-02'}}>{queryParams[QUERY_PARAM_KEY.EXAM_NAME]}</Typography>
                    </Breadcrumbs>
                </Stack>
            </div>
            <div className='class-exam-container-2'>
                <Stack direction='row' spacing={3} marginBottom={2}>
                    <TextField variant='outlined' label='Mô tả' placeholder='Nhập mô tả về bài thi ...' fullWidth multiline rows={6}
                        value={examDescription} onChange={handleChangeExamDescription}
                    />
                    <Stack direction='column' spacing={1.5} marginLeft={3} width='250px'>
                        <TextField variant='outlined' label='Số lượng câu hỏi' value={context.questions.length} disabled />
                        <TextField variant='outlined' label='Thời gian làm bài (phút)' value={queryParams[QUERY_PARAM_KEY.EXAM_TIME]} disabled />
                        <Stack direction='row' spacing={1}>
                            <Tooltip title='Thêm câu hỏi'>
                                <IconButton onClick={handleClickAddQuestion}>
                                    <AddCircleIcon sx={{color: '#376fd0'}} />
                                </IconButton>
                            </Tooltip>
                            <Tooltip title='Lưu bài thi'>
                                <IconButton disabled={publishExam} onClick={handleClickSaveExamButton}>
                                    <SaveAsIcon sx={{color: publishExam ? 'rgb(0 0 0 / 54%)' : '#376fd0'}} />
                                </IconButton>
                            </Tooltip>
                            <Tooltip title='Lưu và công bố bài thi'>
                                <IconButton onClick={handleClickSaveAndPublishExamButton}>
                                    <PublishIcon sx={{color: '#376fd0'}} />
                                </IconButton>
                            </Tooltip>
                            <Tooltip title='Trở về'>
                                <IconButton onClick={handleClickReturnButton}>
                                    <KeyboardReturnIcon sx={{color: '#376fd0'}} />
                                </IconButton>
                            </Tooltip>
                        </Stack>
                    </Stack>
                </Stack>
                <Box sx={context.questions.length > 0 ? {border: '1px solid #b0b0b0', borderRadius: '6px', padding: '15px', marginBottom: 4, overflow: 'auto', maxHeight: '560px'} : {}}>
                    {context.questions.map((question) => (
                        <QuestionItem questionNumber={question.questionNumber} questionType={question.questionType}
                            questionContent={question.questionContent} results={question.results} testcases={question.testcases}
                        />
                    ))}
                </Box>
            </div>
            <QuestionItemAddPopup questionNumber={context.questions.length + 1}/>
            <QuestionItemEditPopup />
        </div>
    )
}

export default ClassExamTab