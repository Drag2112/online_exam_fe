import logoHeader from '../../assets/logo_header.png';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { LOCAL_STORAGE_KEY } from '../../config/memory.config';
import './Header.scss';

const Header = () => {
    const userName = localStorage.getItem(LOCAL_STORAGE_KEY.USER_NAME)
    const fullName = localStorage.getItem(LOCAL_STORAGE_KEY.FULL_NAME)

    return (
        <div className='header-container'>
            <div className='header-container-0-1'>
                <div className='d-flex flex-row align-items-center'>
                    <img src={logoHeader} alt="logo" className='header-container-1-logo-img'/>
                    <span className='header-container-1-title'>HỆ THỐNG THI TRẮC NGHIỆM ONLINE</span>
                </div>
                <div className='d-flex flex-row align-items-center'>
                    {userName && fullName && (
                        <div className='d-flex flex-row align-items-center header-container-2-sub-1'>
                            <AccountCircleIcon sx={{marginRight: '5px'}}/>
                            <span className='header-container-2-sub-1-username'>{`${fullName} (${userName})`}</span>
                        </div>
                    )}
                </div>           
            </div>
            <div className='header-container-0-2'>
                <span className='header-container-0-2-title'>HỆ THỐNG THI TRẮC NGHIỆM ONLINE</span>
            </div>
        </div>
    )
}

export default Header;