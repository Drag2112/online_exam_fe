import { Header, MenuTab, ClassExamRoom as ClassExamRoomTab, Footer, AboutUs } from '../../components';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { ClassProvider } from '../../context/ClassProvider';
import { useState } from 'react';
import './ClassExamRoom.scss';

const ClassExamRoom = () => {
    const [showAboutUs, setShowAboutUs] = useState(false)

    return (
        <div className='layout-container'>
            <header>
                <Header />
            </header>
            <div className='layout-content'>
                <div className='layout-menu-tab'>
                    <MenuTab />
                </div>
                <div className='layout-main-component'>
                    <ClassProvider>
                        <ClassExamRoomTab />
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

export default ClassExamRoom