import './ExamTable.scss';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';


const ExamTable = (props) => {
    const { dataRows } = props

    return (
        <div>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell align='center' className='dashboard-tab-table-header'>STT</TableCell>
                            <TableCell align='left' className='dashboard-tab-table-header'>Môn học</TableCell>
                            <TableCell align='left' className='dashboard-tab-table-header'>Tên đề thi</TableCell>
                            <TableCell align='left' className='dashboard-tab-table-header'>Hình thức thi</TableCell>
                            <TableCell align='left' className='dashboard-tab-table-header'>Người tạo</TableCell>
                            <TableCell align='left' className='dashboard-tab-table-header'>Ngày tạo</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                    {dataRows?.map((row, index) => (
                        <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                            <TableCell align='center'>{index + 1}</TableCell>
                            <TableCell align='left'>{row?.subject || ''}</TableCell>
                            <TableCell align='left'>{row?.exam_name || ''}</TableCell>
                            <TableCell align='left'>{row?.exam_type || ''}</TableCell>
                            <TableCell align='left'>{row?.created_user || ''}</TableCell>
                            <TableCell align='left'>{row?.created_date || ''}</TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}

export default ExamTable