import { useState, createContext } from 'react';

const ClassContext = createContext()

const ClassProvider = ({children}) => {
    const [openAddClassPopup, setOpenAddClassPopup] = useState(false)
    const [openAddDocumentPopup, setOpenAddDocumentPopup] = useState(false)
    const [openSelectExamSourcePopup, setOpenSelectExamSourcePopup] = useState(false)
    const [openAddExistExamPopup, setOpenAddExistExamPopup] = useState(false)
    const [openCodingRoomPopup, setOpenCodingRoomPopup] = useState(false)
    const [questions, setQuestions] = useState([])
    const [openQuestionAddPopup, setOpenQuestionAddPopup] = useState(false)
    const [openQuestionEditPopup, setOpenQuestionEditPopup] = useState(false)
    const [questionEdit, setQuestionEdit] = useState({questionNumber: 0, questionType: '', questionContent: '', results: [], testcases: []})
    const [reloadDocument, setReloadDocument] = useState(false)
    const [reloadCreatedExamList, setReloadCreatedExamList] = useState(false)
    
    const value = {
        openAddClassPopup, setOpenAddClassPopup,
        openAddDocumentPopup, setOpenAddDocumentPopup,
        openSelectExamSourcePopup, setOpenSelectExamSourcePopup,
        openAddExistExamPopup, setOpenAddExistExamPopup,
        openCodingRoomPopup, setOpenCodingRoomPopup,
        questions, setQuestions,
        openQuestionAddPopup, setOpenQuestionAddPopup,
        openQuestionEditPopup, setOpenQuestionEditPopup,
        questionEdit, setQuestionEdit,
        reloadDocument, setReloadDocument,
        reloadCreatedExamList, setReloadCreatedExamList
    }

    return (
        <ClassContext.Provider value={value}>
            {children}
        </ClassContext.Provider>
    )
}

export { ClassContext, ClassProvider }