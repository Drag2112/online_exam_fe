import { useState, createContext } from 'react';

const ClassContext = createContext()

const ClassProvider = ({children}) => {
    const [openAddClassPopup, setOpenAddClassPopup] = useState(false)
    const [openAddDocumentPopup, setOpenAddDocumentPopup] = useState(false)
    const [openAddExamPopup, setOpenAddExamPopup] = useState(false)
    const [questions, setQuestions] = useState([])
    const [openQuestionAddPopup, setOpenQuestionAddPopup] = useState(false)
    const [openQuestionEditPopup, setOpenQuestionEditPopup] = useState(false)
    const [questionEdit, setQuestionEdit] = useState({questionNumber: 0, questionType: '', questionContent: '', results: []})

    const value = {
        openAddClassPopup, setOpenAddClassPopup,
        openAddDocumentPopup, setOpenAddDocumentPopup,
        openAddExamPopup, setOpenAddExamPopup,
        questions, setQuestions,
        openQuestionAddPopup, setOpenQuestionAddPopup,
        openQuestionEditPopup, setOpenQuestionEditPopup,
        questionEdit, setQuestionEdit
    }

    return (
        <ClassContext.Provider value={value}>
            {children}
        </ClassContext.Provider>
    )
}

export { ClassContext, ClassProvider }