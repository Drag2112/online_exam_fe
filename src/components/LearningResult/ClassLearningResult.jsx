import './ClassLearningResult.scss'
import { FormControl, InputLabel, MenuItem, Select, Stack, Typography } from '@mui/material'
import { useState } from 'react'
import LearningTable from './LearningTable/LearningTable.jsx'

const ClassLearningResult = () => {
    const [teacherFilter, setTeacherFilter] = useState(1)
    const [classFilter, setClassFilter] = useState(1)

    const teachers = [
        { teacherId: 1, teacherName: 'Nguyễn Văn Hùng (hungnv)' },
        { teacherId: 2, teacherName: 'Nguyễn Văn Huy (huynv)' }
    ]

    const classes = [
        { classId: 1, className: 'Tin học đại cương (IT1101)' },
        { classId: 2, className: 'Tin học nâng cao (IT1111)' }
    ]

    const learningResults = [
        {studen_name: 'Lê Văn Tiến', test_15_minutes_score: 8, test_midterm_score: 9, test_final_score: 8.5, avg_score: 8.75 },
        {studen_name: 'Lê Văn Tiến', test_15_minutes_score: 8, test_midterm_score: 9, test_final_score: 8.5, avg_score: 8.75 },
        {studen_name: 'Lê Văn Tiến', test_15_minutes_score: 8, test_midterm_score: 9, test_final_score: 8.5, avg_score: 8.75 },
        {studen_name: 'Lê Văn Tiến', test_15_minutes_score: 8, test_midterm_score: 9, test_final_score: 8.5, avg_score: 8.75 }
    ]


    const handleChangeTeacherFilter = (value) => {
        setTeacherFilter(value)
    }

    const handleChangeClassFilter = (value) => {
        setClassFilter(value)
    }

    return (
        <div className='tab-container'>
            <Typography sx={{fontSize: '20px', fontWeight: 600, color: '#376fd0'}}>Kết quả học tập</Typography>
            <Stack direction='row' spacing={2} marginTop={2} marginBottom={3}>
                <FormControl fullWidth classes={{root: 'class-learning-result-filter-dropdown-root'}}>
                    <InputLabel>Giáo viên phụ trách</InputLabel>
                    <Select value={teacherFilter} label='Giáo viên phụ trách' onChange={(event) => handleChangeTeacherFilter(event.target.value)}>
                    {teachers.map(teacher => (
                        <MenuItem value={teacher.teacherId}>
                            {teacher.teacherName}
                        </MenuItem>
                    ))} 
                    </Select>
                </FormControl>
                <FormControl fullWidth classes={{root: 'class-learning-result-filter-dropdown-root'}}>
                    <InputLabel>Lớp học</InputLabel>
                    <Select value={classFilter} label='Lớp học' onChange={(event) => handleChangeClassFilter(event.target.value)}>
                    {classes.map(theClass => (
                        <MenuItem value={theClass.classId}>
                            {theClass.className}
                        </MenuItem>
                    ))} 
                    </Select>
                </FormControl>
            </Stack>
            <LearningTable dataRows={learningResults}/>
        </div>
    )
}

export default ClassLearningResult