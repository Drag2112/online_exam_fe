import './CodingRoomPopup.scss'
import { Modal } from 'react-bootstrap';
import { Button, Stack, Typography } from '@mui/material';
import { ClassContext } from '../../../../context/ClassProvider';
import React, { useContext, useEffect, useState } from 'react';
import Editor from "@monaco-editor/react";
import Navbar from './Navbar/Navbar';
import spinner from '../../../../assets/spinner.svg';
import { DefaultCodeLanguage } from '../../../../config/app.config';
import { API } from '../../../../api/api';

const CodingRoomPopup = React.memo((props) => {
    const { examId, questionNumber, sourceCode } = props
    const classContext = useContext(ClassContext)

    const [userSourceCode, setUserSourceCode] = useState(sourceCode?.submitedCode || '')
    const [codeLanguage, setCodeLanguage] = useState(sourceCode?.language || DefaultCodeLanguage)
    const [editorTheme, setEditorTheme] = useState('vs-dark')
    const [editorFontSize, setEditorFontSize] = useState(12)
    const [userOutput, setUserOutput] = useState('')
    const [loading, setLoading] = useState(false)
    const [executeCode, setExecuteCode] = useState(false)

    const onCloseCodingRoomPopup = () => classContext.setOpenCodingRoomPopup(prev => ({...prev, status: false}))

    const clearOutput = () => {
        setUserOutput('')
    }

    useEffect(() => {
        const postDataCompile = async () => {
            const resultApi = await API.examService.compileCode({ 
                examId: examId,
                questionNumber: questionNumber,
                language: codeLanguage,
                code: userSourceCode
            })
            if (resultApi && resultApi.data && resultApi.data.data) {
                const executeResult = resultApi.data.data
                setUserOutput(`Số test case pass: ${executeResult.totalTestCasePass || 0} / ${executeResult.totalTestCase || 0}\n\n${executeResult.executeMessage}`)   
            }
            setLoading(false)
            setExecuteCode(false)
        }

        if (executeCode) {
            postDataCompile()
        }
    }, [executeCode])


    return (
        <Modal key={questionNumber} centered scrollable className='question-item-add-popup-modal' backdropClassName='question-item-add-popup-backdrop-modal'
            size='xl' show={classContext.openCodingRoomPopup.status && classContext.openCodingRoomPopup.key === questionNumber} onHide={onCloseCodingRoomPopup}
        >
            <Modal.Header closeButton>
                <Modal.Title className='question-item-add-popup-title'>Câu hỏi {questionNumber}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Stack direction='column'>
                    <Stack direction='column'>
                        <Navbar
                            setExecuteCode={setExecuteCode}
                            questionNumber={questionNumber} userSourceCode={userSourceCode}
                            codeLanguage={codeLanguage} setCodeLanguage={setCodeLanguage}
                            editorTheme={editorTheme} setEditorTheme={setEditorTheme}
                            editorFontSize={editorFontSize} setEditorFontSize={setEditorFontSize}
                            setLoading={setLoading}
                        />
                        <Editor
                            options={{ fontSize: editorFontSize }}
                            height='400px'
                            width='100%'
                            theme={editorTheme}
                            language={codeLanguage}
                            defaultLanguage={sourceCode?.language || DefaultCodeLanguage}
                            defaultValue={sourceCode?.submitedCode || (codeLanguage === DefaultCodeLanguage ? '# Enter your code here' : '// Enter your code here')}
                            onChange={(value) => setUserSourceCode(value)}
                        />
                    </Stack>
                    {loading ? (
                        <div className='spinner-box'>
                            <img src={spinner} alt="Loading..." />
                        </div>
                    ) : (
                        <div className='output-box'>
                            <Typography color='#afec3f'>Kết quả thực thi:</Typography>
                            <pre>{userOutput}</pre>
                            <Button variant='contained' className='clear-btn' onClick={clearOutput}>Clear</Button>
                        </div>
                    )}
                </Stack>
            </Modal.Body>
        </Modal>
    )
})

export default CodingRoomPopup