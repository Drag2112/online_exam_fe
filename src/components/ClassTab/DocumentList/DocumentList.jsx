import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import { IconButton } from '@mui/material';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import './DocumentList.scss';

function createData(documentId, documentName) {
    return { documentId, documentName }
}
  
const rows = [
    createData(1, 'Bài kiểm tra chuyên cần số 1', 20, 60, 1),
    createData(2, 'Bài kiểm tra chuyên cần số 2', 20, 60, 0),
    createData(3, 'Bài kiểm tra giữa kỳ', 50, 120, 0),
    createData(4, 'Bài kiểm tra cuối kỳ', 50, 120, 0),
];

const DocumentList = () => {


    return (
        <div>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell align='center' className='class-tab-table-header'>STT</TableCell>
                            <TableCell align='left' className='class-tab-table-header'>Tên tài liệu</TableCell>
                            <TableCell align='center' className='class-tab-table-header'>Download</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                    {rows.map((row, index) => (
                        <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                            <TableCell align='center'>{index + 1}</TableCell>
                            <TableCell align='left'>{row.documentName}</TableCell>
                            <TableCell align='center'>
                                <IconButton>
                                    <CloudDownloadIcon sx={{color: '#1976d2'}}/>
                                </IconButton>
                            </TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}

export default DocumentList