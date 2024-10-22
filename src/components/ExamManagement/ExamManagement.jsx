import './ExamManagement.scss'
import { Button, FormControl, InputLabel, MenuItem, Select, Stack, Typography } from '@mui/material'
import ExamTable from './ExamTable/ExamTable'
import { useContext, useEffect, useState } from 'react'
import { AppContext } from '../../context/AppProvider'
import { AddNewExamPopup } from '../shared'
import { AddExamPopupLocation, MenuSelectSize } from '../../config/app.config'
import { API } from '../../api/api'


const ExamManagement = () => {
    const appContext = useContext(AppContext)
    const [subjects, setSubjects] = useState([])
    const [subjectFilter, setSubjectFilter] = useState(null)

    const examResults = [
        { subject: 'Tin học đại cương', exam_name: 'Đề kiểm tra giữa kỳ', exam_type: 'Trắc nghiệm', created_user: 'admin', created_date: '2024-08-10' },
        { subject: 'Tin học đại cương', exam_name: 'Đề kiểm tra cuối kỳ', exam_type: 'Lập trình tự động', created_user: 'admin', created_date: '2024-08-10' },
        { subject: 'Thuật toán cơ bản', exam_name: 'Đề kiểm tra giữa kỳ', exam_type: 'Trắc nghiệm', created_user: 'admin', created_date: '2024-08-10' },
        { subject: 'Lập trình ứng dụng web', exam_name: 'Đề kiểm tra cuối kỳ', exam_type: 'Lập trình tự động', created_user: 'admin', created_date: '2024-08-10' }
    ]

    const handleChangeSubjectFilter = (value) => {
        setSubjectFilter(value)
    }

    const onClickButtonCreateExam = () => {
        appContext.setOpenAddExamPopup(true)
    }


    useEffect(() => {
        const fetchMasterData = async () => {
            const resultApi = await API.classService.getMasterDataSubjects()
            if (resultApi && resultApi.data && resultApi.data.data) {
                setSubjects(resultApi.data.data)
            }
        }
        fetchMasterData()
    }, [])

    return (
        <div className='tab-container'>
            <Stack direction='row' justifyContent='space-between' >
                <Typography sx={{fontSize: '20px', fontWeight: 600, color: '#376fd0'}}>Kho đề thi</Typography>
                <Button variant='contained' sx={{backgroundColor: '#376fd0'}} onClick={onClickButtonCreateExam}>Tạo đề mới</Button>
            </Stack>
            <Stack direction='row' spacing={2} marginTop={2} marginBottom={3}>
                <FormControl fullWidth classes={{root: 'exam-management-filter-dropdown-root'}}>
                    <InputLabel>Tìm kiếm theo môn học</InputLabel>
                    <Select value={subjectFilter} label='Tìm kiếm theo môn học' onChange={(event) => handleChangeSubjectFilter(event.target.value)}
                        MenuProps={{
                            PaperProps: {
                                style: {
                                  maxHeight: MenuSelectSize.ITEM_HEIGHT * 4.5 + MenuSelectSize.ITEM_PADDING_TOP,
                                },
                            },
                        }}
                    >
                    {subjects.map(subject => (
                        <MenuItem value={subject.subjectId}>
                            {subject.subjectName}
                        </MenuItem>
                    ))} 
                    </Select>
                </FormControl>
            </Stack>
            <ExamTable dataRows={examResults}/>
            <AddNewExamPopup location={AddExamPopupLocation.EXAM_MANAGEMENT_PAGE} subjects={subjects}/>
        </div>
    )
}

export default ExamManagement