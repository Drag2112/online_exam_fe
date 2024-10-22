import './CodingRoomPopup.scss'
import { Modal } from 'react-bootstrap';
import { Button, Stack, Typography } from '@mui/material';
import { ClassContext } from '../../../../context/ClassProvider';
import React, { useContext, useState } from 'react';
import Editor from "@monaco-editor/react";
import Navbar from './Navbar/Navbar';
import spinner from '../../../../assets/spinner.svg';

const CodingRoomPopup = React.memo((props) => {
    const { questionNumber, questionContent, sampleTestCases} = props
    const classContext = useContext(ClassContext)

    const [userSourceCode, setUserSourceCode] = useState('')
    const [codeLanguage, setCodeLanguage] = useState('python')
    const [editorTheme, setEditorTheme] = useState('vs-dark')
    const [editorFontSize, setEditorFontSize] = useState(12)
    const [userOutput, setUserOutput] = useState('')
    const [loading, setLoading] = useState(false)

    const onCloseCodingRoomPopup = () => classContext.setOpenCodingRoomPopup(false)

    const clearOutput = () => {
        setUserOutput('')
    }


    return (
        <Modal centered scrollable className='question-item-add-popup-modal' backdropClassName='question-item-add-popup-backdrop-modal'
            size='xl' show={classContext.openCodingRoomPopup} onHide={onCloseCodingRoomPopup}
        >
            <Modal.Header closeButton>
                <Modal.Title className='question-item-add-popup-title'>Câu hỏi {questionNumber}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Stack direction='column'>
                    <Stack direction='column'>
                        <Navbar
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
                            defaultLanguage="python"
                            defaultValue='# Enter your code here'
                            onChange={(value) => { setUserSourceCode(value) }}
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