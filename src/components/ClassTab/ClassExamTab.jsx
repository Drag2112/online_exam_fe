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
import { useState, useContext } from 'react';
import { ClassContext } from '../../context/ClassProvider';
import QuestionItemAddPopup from './QuestionItemPopup/QuestionItemAddPopup';
import QuestionItemEditPopup from './QuestionItemPopup/QuestionItemEditPopup';
import './ClassExamTab.scss';

const ClassExamTab = () => {
    const queryParams = useQueryParams()
    const setQueryParams = useSetQueryParams()
    const context = useContext(ClassContext)

    const [examDescription, setExamDescription] = useState('')

    const handleClickRouteClass = () => {
        setQueryParams(ROUTE_PATH.CLASS, {})
    }

    const handleClickRouteClassDetail = () => {
        setQueryParams(ROUTE_PATH.CLASS_DETAIL, {
            [QUERY_PARAM_KEY.CLASS_ID]: queryParams[QUERY_PARAM_KEY.CLASS_ID]
        })
    }

    const handleChangeExamDescription = (event) => {
        setExamDescription(event.target.value)
    }

    const handleClickAddQuestion = () => {
        context.setOpenQuestionAddPopup(true)
    }

    const handleClickReturnButton = () => {
        setQueryParams(ROUTE_PATH.CLASS_DETAIL, {
            [QUERY_PARAM_KEY.CLASS_ID]: queryParams[QUERY_PARAM_KEY.CLASS_ID]
        })
    }

    // Show cảnh báo cho người dùng về các thay đổi có thể không được lưu nếu reload/tắt trang
    window.addEventListener('beforeunload', (event) => {
        if (examDescription || context.questions.length > 0) {
            event.preventDefault()
            event.returnValue = ''
        }
    })


    return (
        <div className='class-exam-container-0'>
            <div className='class-exam-container-1'>
                <Stack spacing={2}>
                    <Breadcrumbs aria-label='breadcrumb' classes={{li: 'class-exam-breadcrum-li'}} separator={<NavigateNextIcon fontSize='small' sx={{color: '#376fd0'}} />}>
                        <Typography key='1' classes={{root: 'class-exam-typography-root-01'}} onClick={handleClickRouteClass}>Danh sách lớp học</Typography>
                        <Typography key='2' classes={{root: 'class-exam-typography-root-01'}} onClick={handleClickRouteClassDetail}>Tin học đại cương</Typography>
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
                                <IconButton>
                                    <SaveAsIcon sx={{color: '#376fd0'}} />
                                </IconButton>
                            </Tooltip>
                            <Tooltip title='Công bố bài thi'>
                                <IconButton>
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
                            questionContent={question.questionContent} results={question.results} 
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