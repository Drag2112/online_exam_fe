import { Box, Checkbox, Divider, FormControl, FormControlLabel, IconButton, Paper, Radio, RadioGroup, Stack, TextField, Tooltip, Typography } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useContext, useState } from 'react';
import { ClassContext } from '../../../context/ClassProvider';
import { QuestionType, QuestionTypeName } from '../../../config/app.config';
import './QuestionItem.scss';

const QuestionItem = (props) => {
    const context = useContext(ClassContext)
    const { questionNumber, questionType, questionContent, results, testcases } = props

    const handleClickEditButton = () => {
        context.setQuestionEdit({questionNumber, questionType, questionContent, results, testcases})
        context.setOpenQuestionEditPopup(true)
    }

    const handleClickDeleteButton = () => {
        const newQuestions = context.questions?.filter(question => question.questionNumber !== questionNumber)?.map((question, index) => {
            question.questionNumber = index + 1
            return question
        })
        context.setQuestions(newQuestions)
    }

    return (
        <Paper elevation={2}>
            <Box sx={{ borderRadius: '6px', padding: '15px', marginBottom: 2 }}>
                <Stack direction='row' alignItems='center' justifyContent='space-between'>
                    <Typography sx={{ fontWeight: '600', color: '#376fd0' }}>Câu hỏi {questionNumber} - {QuestionTypeName[questionType]}</Typography>
                    <Stack direction='row' alignItems='center'>
                        <Tooltip title='Chỉnh sửa câu hỏi'>
                            <IconButton onClick={handleClickEditButton}>
                                <EditIcon sx={{color: '#376fd0'}} />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title='Xóa câu hỏi'>
                            <IconButton onClick={handleClickDeleteButton}>
                                <DeleteIcon sx={{color: '#376fd0'}} />
                            </IconButton>
                        </Tooltip>
                    </Stack>
                </Stack>
                <Typography><strong>Đề bài: </strong>{questionContent}</Typography>
                {[QuestionType.Type_1, QuestionType.Type_2].includes(questionType) && (
                    <FormControl fullWidth>
                        <RadioGroup aria-labelledby='radio-buttons-group' name='radio-buttons-group' row={false}>
                            {results.map(result => {
                                return (
                                    <FormControlLabel value={result.resultKey} label={result.resultValue} 
                                        control={questionType === QuestionType.Type_1 ? <Radio checked={result.isCorrect}/> : <Checkbox checked={result.isCorrect}/>}
                                    />
                                )
                            })}
                        </RadioGroup>
                    </FormControl>
                )}
                {questionType === QuestionType.Type_3 && (
                    <Stack direction='column' spacing={2} marginTop={1}>
                        <TextField variant='standard' label='' placeholder='Nhập câu trả lời cho lựa chọn' fullWidth/>
                        <Stack direction='row' spacing={1}>
                            <Typography sx={{ fontWeight: '400', color: '#376fd0' }}>Đáp án đúng:</Typography>
                            <Typography sx={{ fontWeight: '400', color: '#404040' }}>{results[0].resultValue}</Typography>
                        </Stack>
                    </Stack>
                )}
                {questionType === QuestionType.Type_4 && (
                    <Stack direction='column' spacing={1}>
                        <Divider className='question-item-divider'/>
                        {testcases?.map((testcase, index) => testcase.isSampleCase && (
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
                )}
            </Box>
        </Paper>
    )
}

export default QuestionItem