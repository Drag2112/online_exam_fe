import { Modal } from 'react-bootstrap';
import { useContext, useEffect, useMemo, useState } from 'react';
import { ClassContext } from '../../../context/ClassProvider';
import { Button, Checkbox, FormControl, IconButton, InputLabel, MenuItem, Radio, Select, Stack, TextField, Typography } from '@mui/material';
import { QuestionType, QuestionTypeName } from '../../../config/app.config';
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import SegmentIcon from '@mui/icons-material/Segment';
import DeleteIcon from '@mui/icons-material/Delete';
import CodeIcon from '@mui/icons-material/Code';
import './QuestionItemEditPopup.scss';

const QuestionItemEditPopup = () => {
    const context = useContext(ClassContext)

    const [questionType, setQuestionType] = useState(context.questionEdit.questionType)
    const [questionContent, setQuestionContent] = useState(context.questionEdit.questionContent)
    const [results, setResults] = useState(context.questionEdit.results)
    const [testcases, setTestcases] = useState(context.questionEdit.testcases)

    useEffect(() => {
        setQuestionType(context.questionEdit.questionType)
        setQuestionContent(context.questionEdit.questionContent)
        setResults(context.questionEdit.results)
        setTestcases(context.questionEdit.testcases)
    }, [context.questionEdit])

    const handleClosePopupQuestion = () => context.setOpenQuestionEditPopup(false)

    const handleChangeQuestionContent = (event) => {
        setQuestionContent(event.target.value)
    }

    const handleChangeQuestionType = (event) => {
        setQuestionType(event.target.value)
        
        if (event.target.value === QuestionType.Type_3) {
            setResults([{resultKey: 1, resultValue: '', isCorrect: true}])
        } else if (event.target.value === QuestionType.Type_4) {
            setTestcases([{isSampleCase: true, inputData: '', expectedOutput: ''}])
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

    const handleAddTestCaseItem = () => {
        setTestcases([...testcases, {isSampleCase: false, inputData: '', expectedOutput: ''}])
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

    const onChangeTestCase = (itemIndex, property, value) => {
        const newTestCases = testcases.map((testcase, index) => {
            if (index === itemIndex) {
                testcase[property] = value
            }
            return testcase
        })
        setTestcases(newTestCases)
    }

    const handleDeleteTestCaseItem = (itemIndex) => {
        if (testcases.length === 1) {
            // setWarningMessage('Câu hỏi lập trình cần có ít nhất 1 test case')
            return
        }

        const newTestCases = testcases.filter((testcase, index) => index !== itemIndex)
        setTestcases(newTestCases)
    }

    const handleClickConfirmQuestion = () => {
        const newQuestions = context.questions?.map(question => {
            if (question.questionNumber === context.questionEdit.questionNumber) {
                question.questionType = questionType
                question.questionContent = questionContent
                question.results = questionType !== QuestionType.Type_4 ? results : []
                question.testcases = questionType === QuestionType.Type_4 ? testcases : []
            }
            return question
        })
        context.setQuestions(newQuestions)
        handleClosePopupQuestion()
    }

    return (
        <Modal aria-labelledby={`question-item-edit-popup-title-${context.questionEdit.questionNumber}`}
            aria-describedby={`question-item-edit-popup-desc-${context.questionEdit.questionNumber}`}
            className='question-item-edit-popup-modal' backdropClassName='question-item-edit-popup-backdrop-modal'
            centered size='lg' show={context.openQuestionEditPopup} onHide={handleClosePopupQuestion}
        >
            <Modal.Header closeButton>
                <Modal.Title className='question-item-edit-popup-title'>Câu hỏi {context.questionEdit.questionNumber}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div>
                    <Stack direction='row'>
                        <TextField variant='outlined' label='Nội dung câu hỏi' placeholder='Nhập nội dung câu hỏi' fullWidth multiline rows={4.5}
                            value={questionContent} onChange={handleChangeQuestionContent}
                        />
                        <Stack direction='column' spacing={2} width='265px' minWidth='265px' marginLeft={2}>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Loại câu hỏi</InputLabel>
                                <Select label='Loại câu hỏi' defaultValue={context.questionEdit.questionType} value={questionType} onChange={handleChangeQuestionType}>
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
                                    <MenuItem value={QuestionType.Type_4}>
                                        <Stack direction='row' spacing={1} alignItems='center'>
                                            <CodeIcon fontSize='small'/>
                                            <Typography>{QuestionTypeName[QuestionType.Type_4]}</Typography>
                                        </Stack>                                    
                                    </MenuItem>
                                </Select>
                            </FormControl>
                            {[QuestionType.Type_1, QuestionType.Type_2].includes(questionType) && (
                                <Button variant='contained' onClick={handleAddResult}>Thêm lựa chọn</Button>
                            )}
                            {questionType === QuestionType.Type_4 && (
                                <Stack direction='column' spacing={1}>
                                    <Typography >Số lượng testcase: {testcases.length}</Typography>
                                    <Button variant='contained' className='question-item-add-popup-add-option-button' onClick={handleAddTestCaseItem}>Thêm test case</Button>
                                </Stack>
                            )}
                        </Stack>
                    </Stack>
                    {results.map(result => (
                        (questionType === QuestionType.Type_1 && (
                            <Stack direction='row' alignItems='center' spacing={1} marginTop={2} marginLeft={1} marginRight={2}>
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
                            <Stack direction='row' alignItems='center' spacing={1} marginTop={2} marginX={2}>
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
                            <Stack direction='row' alignItems='center' spacing={1} marginTop={2} marginX={2}>
                                <TextField variant='standard' label='' placeholder='Nhập câu trả lời cho lựa chọn' fullWidth
                                    value={result.resultValue} onChange={(event) => handleChangeResultValue(result.resultKey, event.target.value)}
                                />
                            </Stack>
                        ))
                    ))}
                    {questionType === QuestionType.Type_4 && testcases.map((testcase, index) => (
                        <Stack direction='column' spacing={0.5} marginTop={2} marginX={2} marginBottom={1}>
                            <Stack direction='row' spacing={2} alignItems='center'>
                                <Typography classes={{ root: 'question-item-add-popup-testcase-no-root'}}>Test case số {index + 1}</Typography>
                                <Stack direction='row' width='100%' justifyContent='space-between'>
                                    <Stack direction='row' alignItems='center'>
                                        <Checkbox inputProps={{ 'aria-label': 'controlled' }} checked={testcase.isSampleCase}
                                            onChange={(event) => onChangeTestCase(index, 'isSampleCase', event.target.checked)}
                                        />
                                        <Typography>Là testcase mẫu</Typography>
                                    </Stack>
                                    <IconButton onClick={() => handleDeleteTestCaseItem(index)}>
                                        <DeleteIcon />
                                    </IconButton>
                                </Stack>
                            </Stack>
                            <Stack direction='row' spacing={2}>
                                <TextField variant='outlined' label='Đầu vào' placeholder='Nhập dữ liệu đầu vào' fullWidth multiline rows={2} 
                                    value={testcase.inputData} onChange={(event) => onChangeTestCase(index, 'inputData', event.target.value)}
                                />
                                <TextField variant='outlined' label='Đầu ra mong muốn' placeholder='Nhập dữ liệu đầu ra mong muốn' fullWidth multiline rows={2} 
                                    value={testcase.expectedOutput} onChange={(event) => onChangeTestCase(index, 'expectedOutput', event.target.value)}
                                />
                            </Stack>
                        </Stack>
                    ))}
                    <Stack direction='row' justifyContent='center' marginTop={3}>
                        <Button variant='contained' className='question-item-edit-popup-cancel-button' onClick={handleClosePopupQuestion}>Hủy</Button>
                        <Button variant='contained' className='question-item-edit-popup-confirm-button' onClick={handleClickConfirmQuestion}>Cập nhật</Button>
                    </Stack>
                </div>
            </Modal.Body>
        </Modal>
    )
}

export default QuestionItemEditPopup