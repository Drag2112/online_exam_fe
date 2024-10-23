import './QuestionItemRoom.scss';
import { Box, Checkbox, Divider, FormControl, FormControlLabel, IconButton, Paper, Radio, RadioGroup, Stack, TextField, Tooltip, Typography } from '@mui/material';
import DoneIcon from '@mui/icons-material/Done';
import CloseIcon from '@mui/icons-material/Close';
import React, { useContext, useEffect, useState } from 'react';
import { ClassContext } from '../../../context/ClassProvider';
import { ExamRoomActionType, QuestionType, QuestionTypeName } from '../../../config/app.config';
import CodingRoomPopup from './CodingRoomPopup/CodingRoomPopup';
import TerminalIcon from '@mui/icons-material/Terminal';

const QuestionItemRoom = (props) => {
    const context = useContext(ClassContext)
    const { actionType, examId, questionNumber, questionType, questionContent, results, testcases, sourceCode } = props
    const [userResults, setUserResults] = useState(results)

    useEffect(() => {
        setUserResults(results)
    }, [results])

    const handleChangeUserResult = (newUserResult) => {
        const newQuestions = context.questions?.map(question => {
            if (question.questionNumber === questionNumber) {
                question.results = newUserResult
            }
            return question
        })
        context.setQuestions(newQuestions)
    }

    const handleChangeResultQuestionType1 = (result, checked) => {
        const newUserResults = userResults.map(item => {
            if (item.resultKey === result.resultKey) {
                item.userChoosed = checked
            } else {
                item.userChoosed = !checked
            }
            return item
        })
        setUserResults(newUserResults)
        handleChangeUserResult(newUserResults)
    }

    const handleChangeResultQuestionType2 = (result, checked) => {
        const newUserResults = userResults.map(item => {
            if (item.resultKey === result.resultKey) {
                item.userChoosed = checked
            }
            return item
        })
        setUserResults(newUserResults)
        handleChangeUserResult(newUserResults)
    }

    const handleChangeResultQuestionType3 = (value) => {
        const newUserResults = userResults.map((item, index) => {
            if (index === 0) {
                item.userResult = value
            }
            return item
        })
        setUserResults(newUserResults)
        handleChangeUserResult(newUserResults)
    }

    const onClickCodeButton = (activePopupNumber) => {
        context.setOpenCodingRoomPopup({key: activePopupNumber, status: true})
    }

    return (
        <Paper elevation={2}>
            <Box sx={{ borderRadius: '6px', padding: '15px', marginBottom: 2 }}>
                <Stack direction='row' alignItems='center' justifyContent='space-between'>
                    <Typography sx={{ fontWeight: '600', color: '#376fd0', marginBottom: 0.5 }}>Câu hỏi {questionNumber} - {QuestionTypeName[questionType]}</Typography>
                    {questionType === QuestionType.Type_4 && (
                        <Tooltip title='Trình soạn thảo code'>
                            <IconButton onClick={() => onClickCodeButton(questionNumber)}>
                                <TerminalIcon sx={{color: '#376fd0'}} />
                            </IconButton>
                        </Tooltip>
                    )}
                </Stack>
                <Typography><strong>Đề bài: </strong>{questionContent}</Typography>
                {[QuestionType.Type_1, QuestionType.Type_2].includes(questionType) && (
                    <FormControl fullWidth>
                    {actionType === ExamRoomActionType.VIEW ?
                        <RadioGroup aria-labelledby='radio-buttons-group' name='radio-buttons-group' row={false}>
                            {userResults.map(result => {
                                return (
                                    <Stack direction='row' alignItems='center' marginRight={2}>
                                        <FormControlLabel value={result.resultKey} label={result.resultValue} 
                                            control={questionType === QuestionType.Type_1 ? 
                                                <Radio checked={result.userChoosed}/> : 
                                                <Checkbox checked={result.userChoosed}/>
                                            }
                                        />
                                        {result.isCorrect ?
                                            <Stack direction='row' spacing={1} alignItems='center'>
                                                <DoneIcon sx={{color: '#18a100'}}/>
                                                <Typography sx={{fontSize: '14px', fontWeight: 600, color: '#289d1a'}}>Đáp án đúng</Typography>
                                            </Stack> : 
                                            <React.Fragment>
                                                {result.userChoosed && (
                                                    <Stack direction='row' spacing={1} alignItems='center'>
                                                        <CloseIcon sx={{color: '#cf3400'}}/>
                                                        <Typography sx={{fontSize: '14px', fontWeight: 600, color: '#cf3400'}}>Đáp án sai</Typography>
                                                    </Stack>
                                                )}
                                            </React.Fragment>
                                        }
                                    </Stack>
                                )
                            })}
                        </RadioGroup> :
                        <RadioGroup aria-labelledby='radio-buttons-group' name='radio-buttons-group' row={false}>
                            {userResults.map(result => {
                                return (
                                    <FormControlLabel value={result.resultKey} label={result.resultValue} 
                                        control={questionType === QuestionType.Type_1 ? 
                                            <Radio checked={result.userChoosed} onChange={(event) => handleChangeResultQuestionType1(result, event.target.checked)}/> : 
                                            <Checkbox checked={result.userChoosed} onChange={(event) => handleChangeResultQuestionType2(result, event.target.checked)}/>
                                        }
                                    />
                                )
                            })}
                        </RadioGroup>
                    }
                    </FormControl>
                )}
                {questionType === QuestionType.Type_3 && (
                    <Stack direction='column' spacing={2} marginTop={1}>
                        <Stack direction='row' spacing={1} alignItems='center'>
                            <Typography className='question-item-room-typography'>Câu trả lời của bạn là:</Typography>
                            <TextField variant='standard' label='' placeholder='Nhập câu trả lời của bạn' fullWidth
                                value={userResults[0].userResult} onChange={(event) => handleChangeResultQuestionType3(event.target.value)}
                            />
                        </Stack>
                        {actionType === ExamRoomActionType.VIEW && (
                            <Stack direction='row' spacing={1}>
                                <Typography sx={{ fontWeight: '400', color: '#376fd0' }}>Đáp án đúng:</Typography>
                                <Typography sx={{ fontWeight: '400', color: '#404040' }}>{userResults[0].resultValue}</Typography>
                            </Stack>
                        )}
                    </Stack>
                )}
                {questionType === QuestionType.Type_4 && (
                    <React.Fragment>
                        <Stack direction='column' spacing={1}>
                            <Divider className='question-item-divider'/>
                            {testcases?.map((testcase, index) => (
                                <Stack direction='row' spacing={2} width='100%'>
                                    <Typography className='question-item-test-case-title'>Mẫu kiểm thử số {index + 1}</Typography>
                                    <Stack direction='row' spacing={2} width='100%'>
                                        <TextField variant='outlined' label='Đầu vào' placeholder='Đầu vào' fullWidth multiline rows={2} 
                                            value={testcase.inputData}
                                        />
                                        <TextField variant='outlined' label='Đầu ra mong muốn' placeholder='Đầu ra mong muốn' fullWidth multiline rows={2} 
                                            value={testcase.expectedOutput}
                                        />
                                    </Stack>
                                </Stack>
                            ))}
                        </Stack>
                        <CodingRoomPopup examId={examId} questionNumber={Number(questionNumber)} sourceCode={sourceCode} />
                    </React.Fragment>
                )}
            </Box>
        </Paper>
    )
}

export default QuestionItemRoom