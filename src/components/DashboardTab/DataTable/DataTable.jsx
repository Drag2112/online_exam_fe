import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import './DataTable.scss'

const DataTable = (props) => {
    const { dataRows } = props

    return (
        <div>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell align='center' className='dashboard-tab-table-header'>STT</TableCell>
                            <TableCell align='left' className='dashboard-tab-table-header'>Tên lớp</TableCell>
                            <TableCell align='right' className='dashboard-tab-table-header'>Số học sinh</TableCell>
                            <TableCell align='right' className='dashboard-tab-table-header'>Số bài thi</TableCell>
                            <TableCell align='right' className='dashboard-tab-table-header'>Số lượt thi</TableCell>
                            <TableCell align='right' className='dashboard-tab-table-header'>Điểm trung bình</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                    {dataRows.map((row, index) => (
                        <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                            <TableCell align='center'>{index + 1}</TableCell>
                            <TableCell align='left'>{`${row.class_name} (${row.class_code})`}</TableCell>
                            <TableCell align='right'>{row.total_student}</TableCell>
                            <TableCell align='right'>{row.total_exam}</TableCell>
                            <TableCell align='right'>{row.total_joined_exam}</TableCell>
                            <TableCell align='right'>{Number(row.avg_score).toFixed(2)}</TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}

export default DataTable