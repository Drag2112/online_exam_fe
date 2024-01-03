import { useContext, useEffect, useState } from 'react';
import { AdminContext } from '../../../context/AdminProvider';
import { Modal } from 'react-bootstrap';
import { Button } from '@mui/material';
import API from '../../../api/api';
import { toast } from 'react-toastify'; 
import { initToast } from '../../../utils/helper';
import { ToastId } from '../../../config/app.config';
import './DeleteUserPopup.scss';

const DeleteUserPopup = (props) => {
    const { user, setRefreshUserTable } = props
    const context = useContext(AdminContext)
    const [submit, setSubmit] = useState(false)

    const handleClosePopup = () => {
        context.setOpenLockAndUnLockUserPopup(false)
    }

    const handleClickConfirmButton = () => {
        setSubmit(true)
    }

    useEffect(() => {
        if (submit) {
            const postData = async () => {
                initToast(ToastId.LockUser)
                try {
                    const resultApi = await API.userService.lockUser({ 
                        userId: user.user_id, 
                        lock: user?.is_locked === 0 ? true : false
                    })

                    if (resultApi && resultApi.data && resultApi.data.code === 0) {
                        toast.update(ToastId.LockUser, { 
                            render: `${user?.is_locked === 0 ? 'Khoá tài khoản' : 'Mở khóa tài khoản'} thành công!`, 
                            type: 'success', 
                            isLoading: false, 
                            autoClose: 2000 
                        })
                        handleClosePopup()
                        setRefreshUserTable(true)
                    } else {
                        toast.update(ToastId.LockUser, { 
                            render: resultApi.data.message || `${user?.is_locked === 0 ? 'Khoá tài khoản' : 'Mở khóa tài khoản'} thất bại!`, 
                            type: 'error', 
                            isLoading: false, 
                            autoClose: 3000 
                        })
                    }
                } catch (err) {
                    toast.update(ToastId.LockUser, { 
                        render: err.response.data.message || `${user?.is_locked === 0 ? 'Khoá tài khoản' : 'Mở khóa tài khoản'} thất bại!`, 
                        type: 'error', 
                        isLoading: false, 
                        autoClose: 3000 
                    })
                }
            }
            postData()
        }
    }, [submit])

    return (
        <Modal centered className='delete-user-popup-modal' backdropClassName='delete-user-popup-backdrop-modal'
            show={context.openLockAndUnLockUserPopup} onHide={handleClosePopup}
        >
            <Modal.Header closeButton>
                <Modal.Title className='delete-user-popup-title'>Xác nhận</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div>
                    <div className='mb-3'>Bạn chắc chắn muốn {user?.is_locked === 0 ? 'khoá tài khoản' : 'mở khóa tài khoản'} của user <strong>{user?.user_name || ''}</strong> chứ?</div>
                    <div className='d-flex flex-row-reverse'>
                        <Button variant='contained' className='delete-user-popup-cancel-button' onClick={handleClosePopup}>Hủy</Button>
                        <Button variant='contained' className='delete-user-popup-confirm-button' onClick={handleClickConfirmButton}>Đồng ý</Button>
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    )
}

export default DeleteUserPopup