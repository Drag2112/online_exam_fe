import Paper from '@mui/material/Paper';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import Button from '@mui/material/Button';
import ExamTable from './ExamTable/ExamTable';
import PublishedExamTable from './PublishedExamTable/PublishedExamTable';
import UserList from './UserList/UserList';
import DocumentList from './DocumentList/DocumentList';
import AddExamPopup from './AddExamPopup/AddExamPopup';
import AddDocumentPopup from './AddDocumentPopup/AddDocumentPopup';
import { ROUTE_PATH } from '../../config/routes.config';
import { ClassContext } from '../../context/ClassProvider';
import { useContext } from 'react';
import './ClassDetailTab.scss';

const ClassDetailTab = () => {
    const context = useContext(ClassContext)
    
    const handleClickAddDocumentPopup = () => {
        context.setOpenAddDocumentPopup(true)
    }

    const handleClickAddExamPopup = () => {
        context.setOpenAddExamPopup(true)
    }


    return (
        <div className='class-detail-container-0'>
            <div className='class-detail-container-1'>
                <Stack spacing={2}>
                    <Breadcrumbs aria-label='breadcrumb' classes={{li: 'class-detail-breadcrum-li'}} separator={<NavigateNextIcon fontSize='small' sx={{color: '#376fd0'}} />}>
                        <Link underline='hover' key='1' color='inherit' href={ROUTE_PATH.CLASS}>Danh sách lớp học</Link>
                        <Typography key='2' classes={{root: 'class-detail-typography-root'}}>Tin học đại cương</Typography>
                    </Breadcrumbs>
                </Stack>
            </div>
            <div className='class-detail-container-2'>
                <div className='class-detail-class-infor'>
                    <div className='class-detail-class-title'><strong>Mã lớp: </strong>IT1100</div>
                </div>
                <div className='class-detail-class-infor'>
                    <div className='class-detail-class-title'><strong>Giáo viên phụ trách: </strong>Nguyễn Tuấn Khải</div>
                </div>
                <div className='d-flex flex-row row'>
                    <div className='col-8'>
                        <div className='d-flex flex-column'>
                            <div className='class-detail-class-infor'>
                                <div className='class-detail-class-title'><strong>Mô tả:</strong></div>
                                <div className='class-detail-class-content'>
                                    Xin các bạn tại F8, khi mình đọc những bài viết trên nhóm F8 thì mình thấy có nhiều bạn vẫn không biết đưa code lên GitHub,
                                    hoặc bị lỗi, hoặc có thể là những bạn mới và đặc biệt là các bạn không biết tạo GitHub Pages (cụ thể là hiển thị ra trang 
                                    web để cho mọi người xem á!). Ok, hôm nay mình sẽ hướng dẫn cụ thể để cho những bạn không biết bấy lâu nay có thể đưa code
                                    mình lên GitHub được nhé.
                                </div>
                            </div>
                            <div className='class-detail-class-infor mt-2'>
                                <div className='d-flex flex-row row class-detail-class-title'>
                                    <div><strong>Danh sách bài thi cần hoàn thành:</strong></div>
                                </div>
                                <PublishedExamTable />
                            </div>
                            <div className='class-detail-class-infor mt-4'>
                                <div className='d-flex flex-row row class-detail-class-title'>
                                    <div className='col-8'><strong>Danh sách bài thi đã tạo:</strong></div>
                                    <div className='col-4 d-flex justify-content-end'>
                                        <Button variant='contained' sx={{width: '150px', height: '30px', fontSize: '14px'}}
                                            classes={{root: 'class-detail-button-root'}} onClick={handleClickAddExamPopup}
                                        >
                                            Tạo bài thi
                                        </Button>
                                    </div>
                                </div>
                                <ExamTable />
                            </div> 
                        </div>
                    </div>
                    <div className='col-4'>
                        <div className='d-flex flex-column'>
                            <div className='class-detail-class-infor'>
                                <div className='class-detail-class-title'><strong>Danh sách thành viên lớp:</strong></div>
                                <Paper elevation={2}>
                                    <UserList />
                                </Paper>
                            </div>
                            <div className='class-detail-class-infor mt-2'>
                                <div className='d-flex flex-row row class-detail-class-title mb-2'>
                                    <div className='col'><strong>Danh sách tài liệu:</strong></div>
                                    <div className='col d-flex justify-content-end'>
                                        <Button variant='contained' sx={{width: '160px', height: '30px', fontSize: '14px'}}
                                            classes={{root: 'class-detail-button-root'}} onClick={handleClickAddDocumentPopup}
                                        >
                                            Thêm tài liệu
                                        </Button>
                                    </div>
                                </div>
                                <Paper elevation={2}>
                                    <DocumentList />
                                </Paper>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <AddExamPopup />
            <AddDocumentPopup />
            <div style={{height: '40px'}}></div>
        </div>
    )
}

export default ClassDetailTab