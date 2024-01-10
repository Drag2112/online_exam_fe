import Modal from 'react-bootstrap/Modal';
import logoHeader from '../../assets/logo_header.png';
import './AboutUs.scss'

const AboutUs = (props) => {
    const { showAboutUs, setShowAboutUs } = props

    return (
        <Modal animation className='aboutus-modal' backdropClassName='aboutus-custom-backdrop-modal' 
            show={showAboutUs} onHide={() => setShowAboutUs(false)}
        >
            <Modal.Header closeButton className='aboutus-modal-header'>Về chúng tôi</Modal.Header>
            <Modal.Body>
                <div className='d-flex flex-row align-items-center aboutus-body-container'>
                    <img src={logoHeader} alt="logo" className='aboutus-body-container-1-img'/>
                    <div className='d-flex flex-column '>
                        <div className='aboutus-body-container-1-title-name'>Nhóm 09</div>
                        <div className='aboutus-body-container-1-title-name'>Nguyễn Hải Long - Nguyễn Ngọc Huy</div>
                    </div>
                </div>
                <div className='aboutus-body-container'>
                    <table>
                        <tr>
                            <td className='aboutus-body-container-table-c1'>Ứng dụng:</td>
                            <td className='aboutus-body-container-table-row-value'>Hệ thống thi trắc nghiệm online</td>
                        </tr>
                        <tr>
                            <td className='aboutus-body-container-table-c1'>Phiên bản:</td>
                            <td className='aboutus-body-container-table-row-value'>1.0.0</td>
                        </tr>
                        <tr>
                            <td className='aboutus-body-container-table-c1'>Hỗ trợ:</td>
                            <td className='aboutus-body-container-table-row-value'>longqtubqn@gmail.com</td>
                        </tr>
                        <tr>
                            <td className='aboutus-body-container-table-c1'></td>
                            <td className='aboutus-body-container-table-row-value'>huy315674@gmail.com</td>
                        </tr>
                    </table>
                </div>
            </Modal.Body>
        </Modal>
    )
}

export default AboutUs;