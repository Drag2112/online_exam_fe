import { Box, Checkbox, FormControl, FormControlLabel, IconButton, Paper, Radio, RadioGroup, Stack, TextField, Tooltip, Typography } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useContext, useState } from 'react';
import { ClassContext } from '../../../context/ClassProvider';
import { QuestionType, QuestionTypeName } from '../../../config/app.config';
import './QuestionItem.scss';

const QuestionItem = (props) => {
    const context = useContext(ClassContext)
    const { questionNumber, questionType, questionContent, results } = props

    const handleClickEditButton = () => {
        context.setQuestionEdit({questionNumber, questionType, questionContent, results})
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
                                <EditIcon />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title='Xóa câu hỏi'>
                            <IconButton onClick={handleClickDeleteButton}>
                                <DeleteIcon />
                            </IconButton>
                        </Tooltip>
                    </Stack>
                </Stack>
                <Typography>{questionContent}</Typography>
                {questionType !== QuestionType.Type_3 ?
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
                    </FormControl> :
                    <Stack direction='column' spacing={2} marginTop={1}>
                        <TextField variant='standard' label='' placeholder='Nhập câu trả lời cho lựa chọn' fullWidth/>
                        <Stack direction='row' spacing={1}>
                            <Typography sx={{ fontWeight: '400', color: '#376fd0' }}>Đáp án đúng:</Typography>
                            <Typography sx={{ fontWeight: '400', color: '#404040' }}>{results[0].resultValue}</Typography>
                        </Stack>
                    </Stack>
                }
            </Box>
        </Paper>
    )
}

export default QuestionItem