import { useState, createContext } from 'react';

const AppContext = createContext()

const AppProvider = ({children}) => {
    const [openAddExamPopup, setOpenAddExamPopup] = useState(false)

    const value = {
        openAddExamPopup, setOpenAddExamPopup,
    }

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    )
}

export { AppContext, AppProvider }