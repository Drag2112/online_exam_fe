import './LearningTable.scss';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const LearningTable = (props) => {
    const { dataRows } = props

    return (
        <div>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell align='center' className='dashboard-tab-table-header'>STT</TableCell>
                            <TableCell align='left' className='dashboard-tab-table-header'>Tên học sinh</TableCell>
                            <TableCell align='right' className='dashboard-tab-table-header'>Điểm kiểm tra 15'</TableCell>
                            <TableCell align='right' className='dashboard-tab-table-header'>Điểm giữa kỳ</TableCell>
                            <TableCell align='right' className='dashboard-tab-table-header'>Điểm cuối kỳ</TableCell>
                            <TableCell align='right' className='dashboard-tab-table-header'>Điểm trung bình</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                    {dataRows.map((row, index) => (
                        <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                            <TableCell align='center'>{index + 1}</TableCell>
                            <TableCell align='left'>{row.studen_name}</TableCell>
                            <TableCell align='right'>{Number(row.test_15_minutes_score).toFixed(2)}</TableCell>
                            <TableCell align='right'>{Number(row.test_midterm_score).toFixed(2)}</TableCell>
                            <TableCell align='right'>{Number(row.test_final_score).toFixed(2)}</TableCell>
                            <TableCell align='right'>{Number(row.avg_score).toFixed(2)}</TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}

export default LearningTable