import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Chip from '@mui/material/Chip';
import { IconButton, Stack, Tooltip } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import './ExamTable.scss'

function createData(examId, examName, totalQuestion, totalTime, status) {
    return { examId, examName, totalQuestion, totalTime, status}
}
  
const rows = [
    createData(1, 'Bài kiểm tra chuyên cần số 1', 20, 60, 1),
    createData(2, 'Bài kiểm tra chuyên cần số 2', 20, 60, 0),
    createData(3, 'Bài kiểm tra giữa kỳ', 50, 120, 0),
    createData(4, 'Bài kiểm tra cuối kỳ', 50, 120, 0),
];

const ExamTable = () => {


    return (
        <div className='exam-table-container'>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell align='center' className='class-tab-table-header'>STT</TableCell>
                            <TableCell align='left' className='class-tab-table-header'>Tên bài thi</TableCell>
                            <TableCell align='left' className='class-tab-table-header'>Tổng số câu hỏi</TableCell>
                            <TableCell align='center' className='class-tab-table-header'>Thời gian làm bài (phút)</TableCell>
                            <TableCell align='center' className='class-tab-table-header'>Trạng thái</TableCell>
                            <TableCell align='center' className='class-tab-table-header'>Hành động</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                    {rows.map((row, index) => (
                        <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                            <TableCell align='center'>{index + 1}</TableCell>
                            <TableCell align='left'>{row.examName}</TableCell>
                            <TableCell align='left'>{row.totalQuestion}</TableCell>
                            <TableCell align='center'>{row.totalTime}</TableCell>
                            <TableCell align='center'>
                                <Chip 
                                    sx={{borderRadius: '6px', width: '125px', height: '20px', backgroundColor: row.status === 1 ? '#376fd0' : '#919191', color: 'white'}}
                                    label={row.status === 1 ? 'Đã công bố' : 'Chưa công bố'}
                                />
                            </TableCell>
                            <TableCell align='center'>
                                <Stack direction='row' justifyContent='center' alignItems='center'>
                                    <Tooltip title='Chỉnh sửa bài thi'>
                                        <IconButton>
                                            <EditIcon />
                                        </IconButton>
                                    </Tooltip>
                                    <Tooltip title='Xóa bài thi'>
                                        <IconButton>
                                            <DeleteIcon />
                                        </IconButton>
                                    </Tooltip>
                                </Stack>
                            </TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}

export default ExamTable