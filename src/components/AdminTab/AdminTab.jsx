import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder';
import React, { useState, useContext, useEffect } from 'react';
import { AdminContext } from '../../context/AdminProvider';
import UserTable from './UserTable/UserTable.jsx';
import AddUserPopup from './AddUserPopup/AddUserPopup.jsx';
import { LOCAL_STORAGE_KEY } from '../../config/memory.config.js';
import { FUNCTION_CODE } from '../../config/authorization.config.js';
import { AccessDenied } from '../shared';
import './AdminTab.scss';

const AdminTab = () => {
    const userId = localStorage.getItem(LOCAL_STORAGE_KEY.USER_ID)
    const functionCodes = localStorage.getItem(LOCAL_STORAGE_KEY.FUNCTION_CODES)?.split(';') || []

    const context = useContext(AdminContext)
    const [valueSearch, setValueSearch] = useState('')
    const [submitChange, setSubmitChange] = useState(true)

    const handleTypeEnter = (event) => {
        if (event.key === 'Enter') {
            setSubmitChange(true)
        }
    }

    const handleSubmitSearch = () => {
        setSubmitChange(true)
    }

    const handleClickAddUserButton = () => {
        context.setOpenAddUserPopup(true)
    }

    return (
        <React.Fragment>
            {userId && functionCodes.includes(FUNCTION_CODE.VIEW_ADMIN_TAB) ?
                <div className='admin-container-0'>
                    <div className='d-flex flex-row row align-items-center admin-container-1'>
                        <div className='col d-flex flex-row justify-content-start'>
                            <TextField  id="outlined-search" label='Tìm kiếm' placeholder='Nhập tên người dùng' type='search'
                                value={valueSearch} onKeyDown={handleTypeEnter} onChange={(event) => setValueSearch(event.target.value)}
                                InputProps={{
                                    classes: {
                                        root: 'admintab-root-outlined-input-custom',
                                        notchedOutline: 'admintab-root-not-outlined-input-custom'
                                    }
                                }}
                            />
                            <div className='d-flex align-items-center justify-content-center admin-search-button' onClick={handleSubmitSearch}>
                                <SearchIcon />
                            </div>
                        </div>
                        <div className='col d-flex justify-content-end justify-content-end'>
                            <Button variant="contained" startIcon={<CreateNewFolderIcon />} onClick={handleClickAddUserButton}>Tạo mới user</Button>
                        </div>
                    </div>
                    <div className='admin-container-1'>
                        <UserTable valueSearch={valueSearch} submit={submitChange} setSubmit={setSubmitChange}/>
                    </div>
                    <AddUserPopup setRefreshUserTable={setSubmitChange}/>
                </div> :
                <AccessDenied />
            }
        </React.Fragment>
    )
}

export default AdminTab