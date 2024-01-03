import logoHeader from '../../assets/logo_header.png';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import './Header.scss';

const Header = (props) => {
    const { isAuthen } = props

    return (
        <div className='header-container'>
            <div className='header-container-0-1'>
                <div className='d-flex flex-row align-items-center header-container-1'>
                    <img src={logoHeader} alt="logo" className='header-container-1-logo-img'/>
                    <span className='header-container-1-title'>HỆ THỐNG THI TRẮC NGHIỆM ONLINE</span>
                </div>
                <div className='d-flex flex-row align-items-center header-container-2'>
                    {isAuthen && (
                        <div className='d-flex flex-row align-items-center header-container-2-sub-1'>
                            <AccountCircleIcon sx={{marginRight: '5px'}}/>
                            <span className='header-container-2-sub-1-username'>User Admin</span>
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