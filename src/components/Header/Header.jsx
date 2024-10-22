import './Header.scss';
import logoHeader from '../../assets/logo_header.png';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Avatar from '@mui/material/Avatar';
import Logout from '@mui/icons-material/Logout';
import InsertChartIcon from '@mui/icons-material/InsertChart';
import { LOCAL_STORAGE_KEY } from '../../config/memory.config';
import { Divider, IconButton, ListItemIcon, Menu, MenuItem, Stack, Typography } from '@mui/material';
import React, { useState } from 'react';
import { QUERY_PARAM_KEY, ROUTE_PATH } from '../../config/routes.config';
import { useSetQueryParams } from '../../hook';

const Header = () => {
    const userId = localStorage.getItem(LOCAL_STORAGE_KEY.USER_ID)
    const email = localStorage.getItem(LOCAL_STORAGE_KEY.EMAIL)
    const fullName = localStorage.getItem(LOCAL_STORAGE_KEY.FULL_NAME)

    const setQueryParams = useSetQueryParams()
    const [anchorEl, setAnchorEl] = useState(null)
    const openPopover = Boolean(anchorEl)
    const handleOpenPopover = (event) => {
        setAnchorEl(event.currentTarget)
    };
    const handleClosePopover = () => {
        setAnchorEl(null)
    };

    const handleClickProfile = () => {
        setAnchorEl(null)
        setQueryParams(ROUTE_PATH.PROFILE, {
            [QUERY_PARAM_KEY.PROFILE_ID]: userId
        })
    }

    const handleClickLearningResut = () => {
        const role1 = 'view-all-learning-result'
        const role2 = 'view-personal-learning-result'
        let select = role1

        setAnchorEl(null)
        if (select === role1) {
            setQueryParams(ROUTE_PATH.LEARNING_RESULT)
        } else {
            setQueryParams(ROUTE_PATH.LEARNING_RESULT_DETAIL, {
                [QUERY_PARAM_KEY.PROFILE_ID]: userId
            })
        }
    }

    const handleClickLogo = () => {
        setQueryParams(ROUTE_PATH.DASHBOARD)
    }

    const handleClickLogout = () => {
        localStorage.clear()
        setAnchorEl(null)
        setQueryParams(ROUTE_PATH.LOGIN, {})
    }

    return (
        <div className='header-container'>
            <div className='header-container-0-1'>
                <div className='d-flex flex-row align-items-center'>
                    <img src={logoHeader} alt="logo" className='header-container-1-logo-img' onClick={handleClickLogo}/>
                    <span className='header-container-1-title'>HỆ THỐNG QUẢN LÝ ĐỀ THI & THI TRỰC TUYẾN</span>
                </div>
                <div className='d-flex flex-row align-items-center'>
                    {email && fullName && (
                        <IconButton onClick={handleOpenPopover} size='small'>
                            <AccountCircleIcon fontSize='large'/>
                        </IconButton>
                    )}
                    <Menu id='account-menu' anchorEl={anchorEl} open={openPopover}
                        onClose={handleClosePopover} onClick={handleClosePopover}
                        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                        classes={{ paper: 'header-account-menu' }}
                    >
                        <MenuItem onClick={handleClickProfile}>
                            <Avatar alt={fullName?.charAt(0)} src='/broken-image.jpg' />
                            <Stack direction='column' marginLeft={2} padding='6px 0 0 0' width='185px'>
                                <Typography sx={{ fontSize: '15px', fontWeight: 600 }}>{fullName}</Typography>
                                <Typography sx={{ fontSize: '14px', fontWeight: 400 }}>{email?.length > 24 ? `${email.substring(0, 21)}...` : email}</Typography>
                            </Stack>
                        </MenuItem>
                        <Divider />
                        <MenuItem onClick={handleClickLearningResut}>
                            <ListItemIcon>
                                <InsertChartIcon fontSize='small' />
                            </ListItemIcon>
                            <Typography>Kết quả học tập</Typography>
                        </MenuItem>
                        <MenuItem onClick={handleClickLogout}>
                            <ListItemIcon>
                                <Logout fontSize='small' />
                            </ListItemIcon>
                            <Typography>Đăng xuất</Typography>
                        </MenuItem>
                    </Menu>
                </div>
            </div>
            <div className='header-container-0-2'>
                <span className='header-container-0-2-title'>HỆ THỐNG THI TRẮC NGHIỆM ONLINE</span>
            </div>
        </div>
    )
}

export default Header;