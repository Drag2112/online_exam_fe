import { Modal } from 'react-bootstrap';
import { useContext, useState } from 'react';
import { ClassContext } from '../../../context/ClassProvider';
import { Button, Checkbox, FormControl, IconButton, InputLabel, MenuItem, Radio, Select, Stack, TextField, Typography } from '@mui/material';
import { QuestionType, QuestionTypeName } from '../../../config/app.config';
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import SegmentIcon from '@mui/icons-material/Segment';
import DeleteIcon from '@mui/icons-material/Delete';
import './QuestionItemAddPopup.scss';

const QuestionItemAddPopup = (props) => {
    const { questionNumber } = props
    const context = useContext(ClassContext)
    
    const [questionType, setQuestionType] = useState(QuestionType.Type_1)
    const [questionContent, setQuestionContent] = useState('')
    const [results, setResults] = useState([{resultKey: 1, resultValue: '', isCorrect: false}])
    const [warningMessage, setWarningMessage] = useState('')

    const handleClosePopupQuestion = () => {
        setQuestionContent('')
        setQuestionType(QuestionType.Type_1)
        setWarningMessage('')
        context.setOpenQuestionAddPopup(false)
    }

    const handleChangeQuestionContent = (event) => {
        setQuestionContent(event.target.value)
    }

    const handleChangeQuestionType = (event) => {
        setQuestionType(event.target.value)
        
        if (event.target.value === QuestionType.Type_3) {
            setResults([{resultKey: 1, resultValue: '', isCorrect: true}])
        } else {
            setResults([{resultKey: 1, resultValue: '', isCorrect: false}])
        }
    }

    const handleAddResult = () => {
        setResults([
            ...results,
            {resultKey: results.length + 1, resultValue: '', isCorrect: false}
        ])
    }

    const handleClickDeleteResult = (resultKey) => {
        const newResults = results.filter(result => result.resultKey !== resultKey).map((result, index) => {
            result.resultKey = index + 1
            return result
        })  
        setResults(newResults)
    }

    const handleClickSelectResult = (event) => {
        if (questionType === QuestionType.Type_1) {
            const newResults = results.map(result => {
                if (result.resultKey === Number(event.target.defaultValue) && event.target.checked) {
                    result.isCorrect = true
                } else {
                    result.isCorrect = false
                }
                return result
            })
            setResults(newResults)
        }

        if (questionType === QuestionType.Type_2) {
            const newResults = results.map(result => {
                if (result.resultKey === Number(event.target.defaultValue)) {
                    result.isCorrect = event.target.checked
                }
                return result
            })
            setResults(newResults)
        }
    }

    const handleChangeResultValue = (resultKey, newValue) => {
        const newResults = results.map(result => {
            if (result.resultKey === resultKey) {
                result.resultValue = newValue
            }
            return result
        })
        setResults(newResults)
    }

    const handleClickConfirmQuestion = () => {
        if (!questionContent) {
            setWarningMessage('Vui lòng nhập nội dung câu hỏi!')
            return
        }

        const existCorrectResult = results.find(item => item.isCorrect === true)
        if (!existCorrectResult) {
            if (questionType === QuestionType.Type_1) {
                setWarningMessage('Vui lòng tick chọn đáp án đúng của câu hỏi!')
            } else if (questionType === QuestionType.Type_2) {
                setWarningMessage('Vui lòng tick chọn ít nhất một đáp án đúng của câu hỏi!')
            }
            
            return
        }

        const existEmptyResult = results.find(item => item.resultValue === '')
        if (existEmptyResult) {
            if (questionType === QuestionType.Type_3) {
                setWarningMessage(`Câu trả lời đang để trống!`)
            } else {
                setWarningMessage(`Đáp án thứ ${existEmptyResult.resultKey} đang để trống!`)
            }
            
            return
        }

        const newQuestion = { questionNumber, questionType, questionContent, results }
        context.setQuestions([...context.questions, newQuestion])
        setQuestionType(QuestionType.Type_1)
        setQuestionContent('')
        setResults([{resultKey: 1, resultValue: '', isCorrect: false}])
        handleClosePopupQuestion()
    }

    return (
        <Modal centered className='question-item-add-popup-modal' backdropClassName='question-item-add-popup-backdrop-modal'
            size='lg' show={context.openQuestionAddPopup} onHide={handleClosePopupQuestion}
        >
            <Modal.Header closeButton>
                <Modal.Title className='question-item-add-popup-title'>Câu hỏi {questionNumber}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div>
                    <Stack direction='row'>
                        <TextField variant='outlined' label='Nội dung câu hỏi' placeholder='Nhập nội dung câu hỏi' fullWidth multiline rows={4}
                            value={questionContent} onChange={handleChangeQuestionContent} onKeyDown={() => setWarningMessage('')}
                        />
                        <Stack direction='column' spacing={2} width='265px' minWidth='265px' marginLeft={2}>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Loại câu hỏi</InputLabel>
                                <Select label='Loại câu hỏi' value={questionType} onChange={handleChangeQuestionType}>
                                    <MenuItem value={QuestionType.Type_1}>
                                        <Stack direction='row' spacing={1} alignItems='center'>
                                            <RadioButtonCheckedIcon fontSize='small'/>
                                            <Typography>{QuestionTypeName[QuestionType.Type_1]}</Typography>
                                        </Stack>
                                    </MenuItem>
                                    <MenuItem value={QuestionType.Type_2}>
                                        <Stack direction='row' spacing={1} alignItems='center'>
                                            <CheckBoxIcon fontSize='small'/>
                                            <Typography>{QuestionTypeName[QuestionType.Type_2]}</Typography>
                                        </Stack>
                                    </MenuItem>
                                    <MenuItem value={QuestionType.Type_3}>
                                        <Stack direction='row' spacing={1} alignItems='center'>
                                            <SegmentIcon fontSize='small'/>
                                            <Typography>{QuestionTypeName[QuestionType.Type_3]}</Typography>
                                        </Stack>                                    
                                    </MenuItem>
                                </Select>
                            </FormControl>
                            {questionType !== QuestionType.Type_3 && (
                                <Button variant='contained' onClick={handleAddResult}>Thêm lựa chọn</Button>
                            )}
                        </Stack>
                    </Stack>
                    {results.map(result => (
                        (questionType === QuestionType.Type_1 && (
                            <Stack direction='row' alignItems='center' spacing={1} marginTop={2} marginLeft={1} marginRight={2} marginBottom={2}>
                                <Radio name='radio-buttons' value={result.resultKey} checked={result.isCorrect} onChange={handleClickSelectResult}/>
                                <TextField variant='standard' label='' placeholder='Nhập câu trả lời cho lựa chọn' fullWidth 
                                    value={result.resultValue} onChange={(event) => handleChangeResultValue(result.resultKey, event.target.value)}
                                />
                                <IconButton onClick={() => handleClickDeleteResult(result.resultKey)}>
                                    <DeleteIcon />
                                </IconButton>
                            </Stack>
                        )) ||
                        (questionType === QuestionType.Type_2 && (
                            <Stack direction='row' alignItems='center' spacing={1} marginTop={2} marginX={2} marginBottom={2}>
                                <Checkbox name='radio-buttons' value={result.resultKey} checked={result.isCorrect} onChange={handleClickSelectResult}/>
                                <TextField variant='standard' label='' placeholder='Nhập câu trả lời cho lựa chọn' fullWidth 
                                    value={result.resultValue} onChange={(event) => handleChangeResultValue(result.resultKey, event.target.value)}
                                />
                                <IconButton onClick={() => handleClickDeleteResult(result.resultKey)}>
                                    <DeleteIcon />
                                </IconButton>
                            </Stack>
                        )) || 
                        (questionType === QuestionType.Type_3 && (
                            <Stack direction='row' alignItems='center' spacing={1} marginTop={2} marginX={2} marginBottom={2}>
                                <TextField variant='standard' label='' placeholder='Nhập câu trả lời cho lựa chọn' fullWidth
                                    value={result.resultValue} onChange={(event) => handleChangeResultValue(result.resultKey, event.target.value)}
                                />
                            </Stack>
                        ))
                    ))}
                    <div>
                        <span className='question-item-add-popup-warning-message'>{warningMessage}</span>
                    </div>
                    <Stack direction='row' justifyContent='center' marginTop={2}>
                        <Button variant='contained' className='question-item-add-popup-confirm-button' onClick={handleClickConfirmQuestion}>Thêm</Button>
                        <Button variant='contained' className='question-item-add-popup-cancel-button' onClick={handleClosePopupQuestion}>Hủy</Button>
                    </Stack>
                </div>
            </Modal.Body>
        </Modal>
    )
}

export default QuestionItemAddPopup