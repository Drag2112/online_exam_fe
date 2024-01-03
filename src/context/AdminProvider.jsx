import { useState, createContext } from 'react';

const AdminContext = createContext()

const AdminProvider = ({children}) => {
    const [openAddUserPopup, setOpenAddUserPopup] = useState(false)
    const [openEditUserPopup, setOpenEditUserPopup] = useState(false)
    const [openResetPassPopup, setOpenResetPassPopup] = useState(false)
    const [openLockAndUnLockUserPopup, setOpenLockAndUnLockUserPopup] = useState(false)

    const value = {
        openAddUserPopup, setOpenAddUserPopup,
        openEditUserPopup, setOpenEditUserPopup,
        openResetPassPopup, setOpenResetPassPopup,
        openLockAndUnLockUserPopup, setOpenLockAndUnLockUserPopup
    }

    return (
        <AdminContext.Provider value={value}>
            {children}
        </AdminContext.Provider>
    )
}

export { AdminContext, AdminProvider }