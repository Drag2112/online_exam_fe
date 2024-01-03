import Paper from '@mui/material/Paper';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import { useQueryParams, useSetQueryParams } from '../../../hook';
import { QUERY_PARAM_KEY, ROUTE_PATH } from '../../../config/routes.config';
import './JoinedClassList.scss';

const JoinedClassList = (props) => {
    const { rows } = props
    const queryParams = useQueryParams()
    const setQueryParams = useSetQueryParams()

    const handleClickViewDetailButton = (classId) => {
        setQueryParams(ROUTE_PATH.CLASS_DETAIL, {
            ...queryParams,
            [QUERY_PARAM_KEY.CLASS_ID]: classId
        })
    }

    return (
        <div>
            <div className='d-flex flex-row row'>
                {rows.map(row => (
                    <div className='col mb-4'>
                        <Paper elevation={2}>
                            <Card sx={{ minWidth: 275 }}>
                                <CardContent sx={{borderBottom: '1px solid #e0e0e0', backgroundColor: '#e3ecf9'}}>
                                    <Typography gutterBottom classes={{root: 'joined-class-typography-root'}}>{`${row.class_name} - ${row.class_code}`}</Typography>
                                    <Chip label={row.status} sx={{marginBottom: 3, borderRadius: '6px', height: '20px', backgroundColor: '#376fd0', color: 'white'}}/>
                                    <Typography variant="body2">{row.description}</Typography>
                                </CardContent>
                                <CardActions>
                                    <Button size="small" onClick={() => handleClickViewDetailButton(row.class_id)}>Chi tiết</Button>
                                </CardActions>
                            </Card>
                        </Paper>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default JoinedClassList