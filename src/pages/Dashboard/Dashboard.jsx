import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Box } from '@mui/material';
import { Header, MenuTab, DashboardTab, Footer, AboutUs } from '../../components';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { useState } from 'react';
import './Dashboard.scss';

const Dashboard = () => {
    const [showAboutUs, setShowAboutUs] = useState(false)

    return (
        <ThemeProvider theme={createTheme()}>
            <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh', overflow: 'auto' }}>
                <Header />
                <Box sx={{ display: 'flex', flexDirection: 'row', flexGrow: 1 }}>
                    <MenuTab />
                    <Box component="main" sx={{ backgroundColor: '#f1f1f1', flexGrow: 1 }}>
                        <DashboardTab />
                    </Box>
                </Box>
                <div>
                    <div className='about-us-container' onClick={() => setShowAboutUs(true)}>
                        <InfoOutlinedIcon sx={{color: '#074E9F'}}/>
                        <span className='about-us-title'>Về chúng tôi</span>
                    </div>
                </div>
                <Footer />
            </Box>
            <AboutUs showAboutUs={showAboutUs} setShowAboutUs={setShowAboutUs}/>
        </ThemeProvider>
    )
}

export default Dashboard;