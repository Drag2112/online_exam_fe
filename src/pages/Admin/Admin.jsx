import { Header, MenuTab, AdminTab, Footer, AboutUs } from '../../components';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { useState } from 'react';
import { AdminProvider } from '../../context/AdminProvider';
import './Admin.scss'

const Admin = () => {
    const [showAboutUs, setShowAboutUs] = useState(false)

    return (
        <div class='layout-container'>
            <header>
                <Header />
            </header>
            <div class='layout-content'>
                <div class='layout-menu-tab'>
                    <MenuTab />
                </div>
                <div class='layout-main-component'>
                    <AdminProvider>
                        <AdminTab />
                    </AdminProvider>
                </div>
                <div className='about-us-container' onClick={() => setShowAboutUs(true)}>
                    <InfoOutlinedIcon sx={{ color: '#074E9F' }} />
                    <span className='about-us-title'>Về chúng tôi</span>
                </div>
            </div>
            <footer>
                <Footer />
            </footer>
            <AboutUs showAboutUs={showAboutUs} setShowAboutUs={setShowAboutUs} />
        </div>
    )
}

export default Admin