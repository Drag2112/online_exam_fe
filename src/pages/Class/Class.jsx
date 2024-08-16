import { Header, MenuTab, ClassTab, Footer, AboutUs } from '../../components';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { useState } from 'react';
import { ClassProvider } from '../../context/ClassProvider';
import './Class.scss';

const Class = () => {
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
                    <ClassProvider>
                        <ClassTab />
                    </ClassProvider>
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

export default Class