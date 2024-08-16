import './ExamManagement.scss'
import { Button, FormControl, InputLabel, MenuItem, Select, Stack, Typography } from '@mui/material'
import ExamTable from './ExamTable/ExamTable'
import { useState } from 'react'


const ExamManagement = () => {
    const [subjectFilter, setSubjectFilter] = useState(1)
    const [examType, setExamType] = useState(1)

    const subjects = [
        { subjectId: 1, subjectName: 'Tin học đại cương' },
        { subjectId: 2, subjectName: 'Thuật toán cơ bản' },
        { subjectId: 3, subjectName: 'Lập trình ứng dụng web' }
    ]

    const examTypes = [
        { examTypeId: 1, examTypeName: 'Trắc nghiệm' },
        { examTypeId: 2, examTypeName: 'Lập trình tự động' }
    ]

    const examResults = [
        { subject: 'Tin học đại cương', exam_name: 'Đề kiểm tra giữa kỳ', exam_type: 'Trắc nghiệm', created_user: 'admin', created_date: '2024-08-10' },
        { subject: 'Tin học đại cương', exam_name: 'Đề kiểm tra cuối kỳ', exam_type: 'Lập trình tự động', created_user: 'admin', created_date: '2024-08-10' },
        { subject: 'Thuật toán cơ bản', exam_name: 'Đề kiểm tra giữa kỳ', exam_type: 'Trắc nghiệm', created_user: 'admin', created_date: '2024-08-10' },
        { subject: 'Lập trình ứng dụng web', exam_name: 'Đề kiểm tra cuối kỳ', exam_type: 'Lập trình tự động', created_user: 'admin', created_date: '2024-08-10' }
    ]

    const handleChangeTeacherFilter = (value) => {
        setSubjectFilter(value)
    }

    const handleChangeClassFilter = (value) => {
        setExamType(value)
    }

    return (
        <div className='tab-container'>
            <Stack direction='row' justifyContent='space-between' >
                <Typography sx={{fontSize: '20px', fontWeight: 600, color: '#376fd0'}}>Quản lý đề thi</Typography>
                <Button variant='contained'>Tạo đề thi</Button>
            </Stack>
            <Stack direction='row' spacing={2} marginTop={2} marginBottom={3}>
                <FormControl fullWidth classes={{root: 'exam-management-filter-dropdown-root'}}>
                    <InputLabel>Môn học</InputLabel>
                    <Select value={subjectFilter} label='Môn học' onChange={(event) => handleChangeTeacherFilter(event.target.value)}>
                    {subjects.map(subject => (
                        <MenuItem value={subject.subjectId}>
                            {subject.subjectName}
                        </MenuItem>
                    ))} 
                    </Select>
                </FormControl>
                <FormControl fullWidth classes={{root: 'exam-management-filter-dropdown-root'}}>
                    <InputLabel>Hình thức thi</InputLabel>
                    <Select value={examType} label='Hình thức thi' onChange={(event) => handleChangeClassFilter(event.target.value)}>
                    {examTypes.map(examType => (
                        <MenuItem value={examType.examTypeId}>
                            {examType.examTypeName}
                        </MenuItem>
                    ))}
                    </Select>
                </FormControl>
            </Stack>
            <ExamTable dataRows={examResults}/>
        </div>
    )
}

export default ExamManagement